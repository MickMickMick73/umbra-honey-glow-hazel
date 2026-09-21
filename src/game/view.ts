import * as THREE from "three";
import { boostAnisotropy, loadArt } from "./art";
import {
  buildDepot,
  buildEnemy,
  buildHorizon,
  buildPlot,
  buildRails,
  buildTerrain,
  buildTower,
  GUN_SIZE,
  makeGeos,
  makeMaterials,
  UNIT_SIZE,
  type Kit,
} from "./models";
import { PLOTS, plotById } from "./map";
import { sim } from "./sim";
import { HUD_RESERVE_PX, TOWERS } from "./config";
import { cineLocked } from "./cineLock";
import { useGame } from "./store";
import type { Enemy, EnemyKind, TowerKind } from "./types";

const _v = new THREE.Vector3();
const _n = new THREE.Vector3();
const _up = new THREE.Vector3(0, 1, 0);
const _dir = new THREE.Vector3();

function isoFacing(yaw: number) {
  return Math.sin(yaw) - Math.cos(yaw) >= 0 ? 1 : -1;
}

export class GameView {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.OrthographicCamera;
  readonly raycaster = new THREE.Raycaster();
  readonly pointer = new THREE.Vector2();
  private kit: Kit;
  private canvas: HTMLCanvasElement;

  private ro: ResizeObserver;
  private unsub: () => void;
  private camBase = new THREE.Vector3();
  private look = new THREE.Vector3(8.15, 0, 5.7);
  private clock = new THREE.Timer();
  private disposed = false;
  private reduced = false;

  private plotMeshes = new Map<number, THREE.Group>();
  private towerMeshes = new Map<number, THREE.Group>();
  private enemyMeshes = new Map<number, THREE.Group>();
  private protoEnemy: Record<EnemyKind, THREE.Group>;
  private pickables: THREE.Object3D[] = [];

  private rangeRing: THREE.Mesh;
  private rangeRim: THREE.Mesh;
  private projGroup = new THREE.Group();
  private beamGroup = new THREE.Group();
  private pulseGroup = new THREE.Group();
  private particleMesh: THREE.InstancedMesh;
  private dummy = new THREE.Object3D();
  private particleMat: THREE.MeshBasicMaterial;
  private projPool: THREE.Mesh[] = [];
  private beamPool: THREE.Mesh[] = [];
  private pulsePool: THREE.Mesh[] = [];
  private burstPool: THREE.Sprite[] = [];
  private burstMats: THREE.SpriteMaterial[] = [];
  private plants: THREE.Sprite[] = [];
  private lastBuildRev = -1;
  private pointerOn = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(canvas.clientWidth || canvas.parentElement?.clientWidth || 1, canvas.clientHeight || canvas.parentElement?.clientHeight || 1, false);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.setClearColor(0xc4a882, 1);

    this.camera = new THREE.OrthographicCamera(-12, 12, 10, -10, 0.1, 120);
    const maps = loadArt();
    boostAnisotropy(maps, Math.min(8, this.renderer.capabilities.getMaxAnisotropy()));
    this.kit = { mats: makeMaterials(maps), geos: makeGeos(), maps };

    this.scene.fog = new THREE.Fog(0xc4a882, 38, 78);
    this.scene.background = maps.sky;

    const hemi = new THREE.HemisphereLight(0xf3e4c8, 0x7a5a3a, 1.12);
    this.scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xffe0b0, 1.55);
    sun.position.set(12, 18, 7);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.near = 2;
    sun.shadow.camera.far = 48;
    sun.shadow.camera.left = -16;
    sun.shadow.camera.right = 16;
    sun.shadow.camera.top = 16;
    sun.shadow.camera.bottom = -16;
    sun.shadow.bias = -0.001;
    this.scene.add(sun);
    const fill = new THREE.DirectionalLight(0xb8c4d8, 0.28);
    fill.position.set(-10, 12, -6);
    this.scene.add(fill);
    this.scene.add(new THREE.AmbientLight(0xfff1dc, 0.2));

    this.plants = buildTerrain(this.scene, this.kit);
    buildHorizon(this.scene, this.kit);
    buildRails(this.scene, this.kit);
    this.scene.add(buildDepot(this.kit));

    for (const plot of PLOTS) {
      const mesh = buildPlot(this.kit);
      mesh.position.set(plot.x, 0, plot.z);
      mesh.userData.plotId = plot.id;
      this.scene.add(mesh);
      this.plotMeshes.set(plot.id, mesh);
      this.pickables.push(mesh);
    }

    this.protoEnemy = {
      runner: buildEnemy("runner", this.kit),
      brute: buildEnemy("brute", this.kit),
      swarm: buildEnemy("swarm", this.kit),
      boss: buildEnemy("boss", this.kit),
      scout: buildEnemy("scout", this.kit),
      rider: buildEnemy("rider", this.kit),
      bomber: buildEnemy("bomber", this.kit),
    };

    this.rangeRing = new THREE.Mesh(this.kit.geos.ring, this.kit.mats.range);
    this.rangeRing.rotation.x = -Math.PI / 2;
    this.rangeRing.position.y = 0.07;
    this.rangeRing.visible = false;
    this.scene.add(this.rangeRing);
    this.rangeRim = new THREE.Mesh(this.kit.geos.ringThin, this.kit.mats.rangeLine);
    this.rangeRim.rotation.x = -Math.PI / 2;
    this.rangeRim.position.y = 0.08;
    this.rangeRim.visible = false;
    this.scene.add(this.rangeRim);

    this.scene.add(this.projGroup, this.beamGroup, this.pulseGroup);

    this.burstMats = this.kit.maps.fx.map(
      (t) =>
        new THREE.SpriteMaterial({
          map: t,
          transparent: true,
          depthWrite: false,
        }),
    );

    this.particleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.particleMesh = new THREE.InstancedMesh(this.kit.geos.box, this.particleMat, 220);
    this.particleMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.particleMesh.castShadow = false;
    this.particleMesh.frustumCulled = false;
    this.scene.add(this.particleMesh);

    this.fitCamera();
    this.camBase.copy(this.camera.position);
    requestAnimationFrame(() => this.fitCamera());

    this.ro = new ResizeObserver(() => this.fitCamera());
    this.ro.observe(this.canvas.parentElement ?? this.canvas);

    this.canvas.addEventListener("pointermove", this.onPointerMove);
    this.canvas.addEventListener("pointerdown", this.onPointerDown);
    this.canvas.addEventListener("pointerleave", this.onPointerLeave);

    this.unsub = useGame.subscribe(() => {
      this.syncTowers();
      this.syncRange();
    });

    this.clock.connect(document);
    this.renderer.setAnimationLoop(this.loop);

    const w = window as Window & {
      __ironPick?: (id: number) => { x: number; y: number } | null;
    };
    w.__ironPick = (id: number) => {
      const plot = plotById(id);
      if (!plot) return null;
      _v.set(plot.x, 0.2, plot.z).project(this.camera);
      const rect = this.renderer.domElement.getBoundingClientRect();
      return {
        x: (_v.x * 0.5 + 0.5) * rect.width + rect.left,
        y: (-_v.y * 0.5 + 0.5) * rect.height + rect.top,
      };
    };
  }

  dispose() {
    this.disposed = true;
    this.renderer.setAnimationLoop(null);
    this.clock.disconnect();
    this.ro.disconnect();
    this.unsub();
    delete (window as Window & { __ironPick?: unknown }).__ironPick;
    this.canvas.removeEventListener("pointermove", this.onPointerMove);
    this.canvas.removeEventListener("pointerdown", this.onPointerDown);
    this.canvas.removeEventListener("pointerleave", this.onPointerLeave);
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Sprite) {
        if (obj instanceof THREE.Mesh) obj.geometry.dispose();
        const m = obj.material;
        if (Array.isArray(m)) m.forEach((x) => x.dispose());
        else m.dispose();
      }
    });
    this.renderer.dispose();
  }

  private fitCamera() {
    const w = Math.max(1, this.canvas.clientWidth || this.canvas.parentElement?.clientWidth || 1);
    const h = Math.max(1, this.canvas.clientHeight || this.canvas.parentElement?.clientHeight || 1);
    this.renderer.setSize(w, h, false);
    const aspect = w / h;
    let halfH = 8.55;
    let halfW = halfH * aspect;
    if (halfW < 7.1) {
      halfW = 7.1;
      halfH = halfW / aspect;
    }
    this.camera.left = -halfW;
    this.camera.right = halfW;
    this.camera.top = halfH;
    this.camera.bottom = -halfH;
    this.look.set(8.15, 0, 5.7);
    this.camera.position.set(this.look.x + 13.2, 16.2, this.look.z + 13.2);
    this.camera.lookAt(this.look);
    const hudPx = Math.round(Math.min(h * 0.16, HUD_RESERVE_PX));
    this.camera.setViewOffset(w, h, 0, 0, w, Math.max(1, h - hudPx));
    this.camera.updateProjectionMatrix();
    this.camBase.copy(this.camera.position);
  }

  private loop = () => {
    if (this.disposed) return;
    this.clock.update();
    const dt = Math.min(this.clock.getDelta(), 0.1);
    const { speed, phase, cine } = useGame.getState();
    const simSpeed = cine ? 0 : phase === "combat" || phase === "prep" ? speed : 1;
    if (!cine) sim.step(dt, simSpeed);
    this.syncTowers();
    this.syncEnemies();
    this.syncProjectiles();
    this.syncBeams();
    this.syncPulses();
    this.syncParticles();
    this.syncRange();
    this.syncPlots();
    this.animTowers();
    this.animPlants();
    this.applyShake();
    this.renderer.render(this.scene, this.camera);
  };

  private applyShake() {
    if (this.reduced) {
      this.camera.position.copy(this.camBase);
      return;
    }
    const t = sim.trauma * sim.trauma;
    if (t <= 0.0008) {
      this.camera.position.copy(this.camBase);
      return;
    }
    const n = this.clock.getElapsed();
    this.camera.position.set(
      this.camBase.x + Math.sin(n * 37.1) * t * 0.28,
      this.camBase.y + Math.sin(n * 41.7) * t * 0.12,
      this.camBase.z + Math.cos(n * 33.3) * t * 0.28,
    );
  }

  private syncTowers() {
    if (this.lastBuildRev === sim.buildRev) return;
    this.lastBuildRev = sim.buildRev;
    for (const [id, mesh] of this.towerMeshes) {
      if (!sim.towers.has(id)) {
        this.scene.remove(mesh);
        this.towerMeshes.delete(id);
        const idx = this.pickables.indexOf(mesh);
        if (idx >= 0) this.pickables.splice(idx, 1);
      }
    }
    for (const t of sim.towers.values()) {
      const existing = this.towerMeshes.get(t.plotId);
      const key = `${t.kind}:${t.tier}`;
      if (existing && existing.userData.key === key) continue;
      if (existing) {
        this.scene.remove(existing);
        const idx = this.pickables.indexOf(existing);
        if (idx >= 0) this.pickables.splice(idx, 1);
      }
      const mesh = buildTower(t.kind, t.tier, this.kit);
      mesh.position.set(t.x, 0, t.z);
      mesh.userData.plotId = t.plotId;
      mesh.userData.tower = true;
      mesh.userData.key = key;
      this.scene.add(mesh);
      this.towerMeshes.set(t.plotId, mesh);
      this.pickables.push(mesh);
    }
    for (const [id, plot] of this.plotMeshes) {
      plot.visible = !sim.towers.has(id);
    }
  }

  private syncEnemies() {
    const live = new Set<number>();
    const reduced = this.reduced;
    for (const e of sim.enemies) {
      live.add(e.id);
      let mesh = this.enemyMeshes.get(e.id);
      if (!mesh) {
        mesh = this.protoEnemy[e.kind].clone(true);
        mesh.traverse((o) => {
          if (o instanceof THREE.Sprite && o.material instanceof THREE.SpriteMaterial) {
            o.material = o.material.clone();
          }
        });
        this.scene.add(mesh);
        this.enemyMeshes.set(e.id, mesh);
      }
      mesh.position.set(e.x, e.y, e.z);
      mesh.rotation.y = 0;
      const punch = e.flash > 0 ? 1 + e.flash * 0.9 : 1;
      this.setSpriteFrame(
        mesh,
        this.kit.maps.units[e.kind],
        reduced ? 0 : Math.floor(e.bob) % 4,
        isoFacing(e.heading),
        UNIT_SIZE[e.kind].w * punch,
        UNIT_SIZE[e.kind].h * (e.flash > 0 ? 1 + e.flash * 0.35 : 1),
        e.flash > 0 ? 0xffd0b8 : 0xffffff,
      );
      this.updateHp(mesh, e);
    }
    for (const [id, mesh] of this.enemyMeshes) {
      if (!live.has(id)) {
        this.scene.remove(mesh);
        this.enemyMeshes.delete(id);
      }
    }
  }

  private updateHp(mesh: THREE.Group, e: Enemy) {
    const hp = mesh.getObjectByName("hp") as THREE.Group | undefined;
    if (!hp) return;
    hp.quaternion.copy(this.camera.quaternion);
    const fill = hp.getObjectByName("hpFill") as THREE.Mesh | undefined;
    if (!fill) return;
    const ratio = Math.max(0, e.hp / e.maxHp);
    fill.scale.x = Math.max(0.02, ratio) * (e.kind === "boss" ? 1.05 : e.kind === "brute" || e.kind === "bomber" ? 0.58 : 0.42);
    fill.position.x = (fill.scale.x - (e.kind === "boss" ? 1.05 : e.kind === "brute" || e.kind === "bomber" ? 0.58 : 0.42)) / 2;
    fill.material = ratio < 0.35 ? this.kit.mats.hpFill : this.kit.mats.hpFillOk;
    hp.visible = e.kind !== "swarm";
  }

  private syncProjectiles() {
    while (this.projPool.length < sim.projectiles.length) {
      const m = new THREE.Mesh(this.kit.geos.sphere, this.kit.mats.shell);
      this.projGroup.add(m);
      this.projPool.push(m);
    }
    for (let i = 0; i < this.projPool.length; i++) {
      const m = this.projPool[i]!;
      const p = sim.projectiles[i];
      if (!p) {
        m.visible = false;
        continue;
      }
      m.visible = true;
      m.position.set(p.x, p.y, p.z);
      m.material = p.kind === "shell" ? this.kit.mats.shell : this.kit.mats.bullet;
      const s = p.kind === "shell" ? 0.14 : 0.06;
      m.scale.setScalar(s);
    }
  }

  private syncBeams() {
    while (this.beamPool.length < sim.beams.length) {
      const m = new THREE.Mesh(this.kit.geos.cyl, this.kit.mats.beamSniper);
      this.beamGroup.add(m);
      this.beamPool.push(m);
    }
    for (let i = 0; i < this.beamPool.length; i++) {
      const m = this.beamPool[i]!;
      const b = sim.beams[i];
      if (!b) {
        m.visible = false;
        continue;
      }
      m.visible = true;
      m.material = b.kind === "sniper" ? this.kit.mats.beamSniper : b.kind === "oil" ? this.kit.mats.beamOil : this.kit.mats.beamSlow;
      const start = _v.set(b.x1, b.y1, b.z1);
      const end = _n.set(b.x2, b.y2, b.z2);
      const dist = start.distanceTo(end);
      m.position.copy(start).add(end).multiplyScalar(0.5);
      m.scale.set(b.kind === "sniper" ? 0.03 : 0.045, dist, b.kind === "sniper" ? 0.03 : 0.045);
      _dir.copy(end).sub(start).normalize();
      m.quaternion.setFromUnitVectors(_up, _dir);
      const fade = b.ttl / b.max;
      (m.material as THREE.MeshBasicMaterial).opacity = 0.25 + fade * 0.65;
    }
  }

  private syncPulses() {
    while (this.pulsePool.length < sim.pulses.length) {
      const m = new THREE.Mesh(this.kit.geos.ring, this.kit.mats.range.clone());
      m.rotation.x = -Math.PI / 2;
      this.pulseGroup.add(m);
      this.pulsePool.push(m);
    }
    for (let i = 0; i < this.pulsePool.length; i++) {
      const m = this.pulsePool[i]!;
      const p = sim.pulses[i];
      if (!p) {
        m.visible = false;
        continue;
      }
      m.visible = true;
      const t = 1 - p.ttl / p.max;
      m.position.set(p.x, 0.08, p.z);
      m.scale.setScalar(p.radius * (0.35 + t * 1.1));
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.color.setHex(p.color);
      mat.opacity = (1 - t) * 0.45;
    }
    while (this.burstPool.length < sim.pulses.length) {
      const spr = new THREE.Sprite(this.burstMats[this.burstPool.length % this.burstMats.length]!);
      this.pulseGroup.add(spr);
      this.burstPool.push(spr);
    }
    for (let i = 0; i < this.burstPool.length; i++) {
      const spr = this.burstPool[i]!;
      const p = sim.pulses[i];
      if (!p) {
        spr.visible = false;
        continue;
      }
      spr.visible = true;
      const t = 1 - p.ttl / p.max;
      spr.position.set(p.x, 0.45 + t * 0.4, p.z);
      const s = p.radius * (0.55 + t * 1.35);
      spr.scale.set(s, s, 1);
      const sm = spr.material as THREE.SpriteMaterial;
      sm.opacity = (1 - t) * 0.95;
    }
  }

  private syncParticles() {
    const n = sim.particles.length;
    this.particleMesh.count = n;
    for (let i = 0; i < n; i++) {
      const p = sim.particles[i]!;
      this.dummy.position.set(p.x, p.y, p.z);
      const s = p.size * (p.life / p.max);
      this.dummy.scale.setScalar(s);
      this.dummy.rotation.set(p.vx, p.life, p.vz);
      this.dummy.updateMatrix();
      this.particleMesh.setMatrixAt(i, this.dummy.matrix);
      this.particleMesh.setColorAt?.(i, this.tmpColor.setHex(p.color));
    }
    this.particleMesh.instanceMatrix.needsUpdate = true;
    if (this.particleMesh.instanceColor) this.particleMesh.instanceColor.needsUpdate = true;
  }

  private tmpColor = new THREE.Color();

  private syncRange() {
    const { placing, selectedPlotId, hoveredPlotId, phase } = useGame.getState();
    if (phase === "title" || phase === "won" || phase === "lost") {
      this.rangeRing.visible = false;
      this.rangeRim.visible = false;
      return;
    }
    let kind: TowerKind | null = placing;
    let x = 0;
    let z = 0;
    let range = 0;
    const hoverId = hoveredPlotId ?? selectedPlotId;
    if (placing && hoverId != null && !sim.towers.has(hoverId)) {
      const plot = plotById(hoverId);
      if (plot) {
        kind = placing;
        x = plot.x;
        z = plot.z;
        range = TOWERS[placing].stats[0]!.range;
      }
    } else if (selectedPlotId != null) {
      const t = sim.towers.get(selectedPlotId);
      if (t) {
        kind = t.kind;
        x = t.x;
        z = t.z;
        range = TOWERS[t.kind].stats[t.tier]!.range;
      }
    }
    if (!kind || range <= 0) {
      this.rangeRing.visible = false;
      this.rangeRim.visible = false;
      return;
    }
    this.rangeRing.visible = true;
    this.rangeRim.visible = true;
    this.rangeRing.position.set(x, 0.07, z);
    this.rangeRim.position.set(x, 0.08, z);
    this.rangeRing.scale.setScalar(range);
    this.rangeRim.scale.setScalar(range);
  }

  private syncPlots() {
    const { hoveredPlotId, selectedPlotId, placing } = useGame.getState();
    for (const [id, mesh] of this.plotMeshes) {
      const pad = mesh.getObjectByName("pad") as THREE.Mesh | undefined;
      if (!pad) continue;
      if (selectedPlotId === id) pad.material = this.kit.mats.plotSel;
      else if (hoveredPlotId === id && (placing || !sim.towers.has(id))) pad.material = this.kit.mats.plotHover;
      else pad.material = this.kit.mats.plot;
    }
  }

  private animTowers() {
    const t = this.clock.getElapsed();
    for (const tower of sim.towers.values()) {
      const mesh = this.towerMeshes.get(tower.plotId);
      if (!mesh) continue;
      const size = GUN_SIZE[tower.kind];
      const grow = 1 + tower.tier * 0.08;
      const firing = tower.kick > 0;
      const aiming = tower.targetId >= 0;
      let frame: number;
      if (this.reduced) {
        frame = 0;
      } else if (tower.kind === "gatling") {
        const hz = firing ? 16 : aiming ? 10 : 5;
        frame = Math.floor(t * hz + tower.plotId) % 4;
      } else if (tower.kind === "slow" || tower.kind === "oil") {
        const hz = firing ? 8 : 3.4;
        frame = Math.floor(t * hz + tower.plotId) % 4;
      } else if (firing) {
        frame = tower.kick > 0.16 ? 2 : 3;
      } else if (aiming) {
        frame = Math.floor(t * 4.8 + tower.plotId) % 2;
      } else {
        frame = Math.floor(t * 2.4 + tower.plotId) % 2;
      }
      const rec = firing ? 1 + tower.kick * 0.28 : 1;
      this.setSpriteFrame(
        mesh,
        this.kit.maps.guns[tower.kind],
        frame,
        isoFacing(tower.yaw),
        size.w * grow * rec,
        size.h * grow * (firing && tower.kick > 0.14 ? 1.1 : 1),
        firing ? 0xffe8d0 : 0xffffff,
      );
      const body = mesh.getObjectByName("body") as THREE.Sprite | undefined;
      if (body && !this.reduced) {
        const bobHz = tower.kind === "gatling" ? 8.5 : tower.kind === "slow" ? 2.2 : 3.6;
        const amp = firing ? 0.055 : 0.028;
        body.position.y = 0.04 + Math.sin(t * bobHz + tower.plotId) * amp + (firing ? tower.kick * 0.06 : 0);
      }
      const mz = mesh.getObjectByName("muzzle") as THREE.Sprite | undefined;
      if (mz) {
        const on = firing && tower.kind !== "slow";
        mz.visible = on;
        if (on) {
          const s = (tower.kind === "gatling" ? 0.55 : 0.42) + tower.kick * 2.4;
          mz.scale.set(s, s * 0.9, 1);
          mz.position.y = size.h * grow * (tower.kind === "sniper" ? 0.72 : 0.58);
          const mat = mz.material as THREE.SpriteMaterial;
          const fx = this.kit.maps.fx[Math.floor(t * 22) % this.kit.maps.fx.length]!;
          if (mat.map !== fx) {
            mat.map = fx;
            mat.needsUpdate = true;
          }
          mat.opacity = Math.min(1, tower.kick * 7);
        }
      }
    }
  }

  private animPlants() {
    if (this.reduced) return;
    const t = this.clock.getElapsed();
    for (const p of this.plants) {
      const mat = p.material as THREE.SpriteMaterial;
      mat.rotation = Math.sin(t * 1.35 + p.position.x * 0.4 + p.position.z * 0.22) * 0.08;
    }
  }

  private setSpriteFrame(
    group: THREE.Object3D,
    frames: THREE.Texture[],
    frame: number,
    facing: number,
    w: number,
    h: number,
    tint: number,
  ) {
    const spr = group.getObjectByName("body") as THREE.Sprite | undefined;
    if (!spr) return;
    const mat = spr.material as THREE.SpriteMaterial;
    const map = frames[((frame % frames.length) + frames.length) % frames.length]!;
    if (mat.map !== map) {
      mat.map = map;
      mat.needsUpdate = true;
    }
    mat.color.setHex(tint);
    spr.scale.set(w * facing, h, 1);
  }

  private hitPlot(ev: PointerEvent): number | null {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(this.pickables, true);
    for (const h of hits) {
      let o: THREE.Object3D | null = h.object;
      while (o) {
        if (typeof o.userData.plotId === "number") return o.userData.plotId as number;
        o = o.parent;
      }
    }
    return null;
  }

  private onPointerMove = (ev: PointerEvent) => {
    this.pointerOn = true;
    const { phase } = useGame.getState();
    if (phase === "title") return;
    const id = this.hitPlot(ev);
    useGame.getState().setHovered(id);
  };

  private onPointerLeave = () => {
    this.pointerOn = false;
    useGame.getState().setHovered(null);
  };

  private onPointerDown = (ev: PointerEvent) => {
    if (ev.button !== 0) return;
    const state = useGame.getState();
    if (state.phase === "title" || state.phase === "won" || state.phase === "lost" || state.cine || cineLocked()) return;
    const id = this.hitPlot(ev);
    if (id == null) {
      state.setSelected(null);
      return;
    }
    if (state.placing && !sim.towers.has(id)) {
      if (sim.place(id, state.placing)) {
        state.setSelected(id);
      }
      return;
    }
    state.setSelected(id);
    state.setPlacing(null);
  };
}
