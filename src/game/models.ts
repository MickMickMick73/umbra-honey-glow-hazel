import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { ArtMaps } from "./art";
import { DEPOT, PATHS, PLOTS } from "./map";
import type { EnemyKind, TowerKind, TowerTier } from "./types";

export interface Kit {
  mats: ReturnType<typeof makeMaterials>;
  geos: ReturnType<typeof makeGeos>;
  maps: ArtMaps;
}

export function makeMaterials(maps: ArtMaps) {
  const std = (
    color: number,
    map: THREE.Texture | undefined,
    extras?: THREE.MeshStandardMaterialParameters,
  ) =>
    new THREE.MeshStandardMaterial({
      color,
      map,
      roughness: 0.86,
      metalness: 0,
      ...extras,
    });
  return {
    dust: std(0xe4c9a0, maps.dirt, { roughness: 0.96 }),
    dustDark: std(0xb8956a, maps.dirt, { roughness: 0.95 }),
    packed: std(0xc4a07a, maps.dirt, { roughness: 0.92 }),
    sage: std(0xc5d0b0, maps.sage, { roughness: 0.9 }),
    sageDark: std(0x8a9a72, maps.sage, { roughness: 0.9 }),
    wood: std(0xe8c9a0, maps.wood, { roughness: 0.84 }),
    woodLight: std(0xf3ddc2, maps.wood, { roughness: 0.82 }),
    iron: std(0xcfd0d2, maps.iron, { roughness: 0.48, metalness: 0.55 }),
    ironDark: std(0x8a8b8e, maps.iron, { roughness: 0.42, metalness: 0.62 }),
    rust: std(0xe8a090, maps.rust, { roughness: 0.72, metalness: 0.22 }),
    rustBright: std(0xffb098, maps.rust, { roughness: 0.65, metalness: 0.18 }),
    brass: std(0xf0d090, maps.brass, { roughness: 0.4, metalness: 0.7 }),
    cream: new THREE.MeshStandardMaterial({ color: 0xe8d5b7, roughness: 0.7, metalness: 0 }),
    sandbag: std(0xf0e0c4, maps.sandbag, { roughness: 0.92 }),
    rail: std(0xb0b2b5, maps.iron, { roughness: 0.35, metalness: 0.7 }),
    tie: std(0xc8a078, maps.wood, { roughness: 0.88 }),
    runner: std(0xd4b090, maps.leather, { roughness: 0.86 }),
    runnerDark: std(0xa07850, maps.leather, { roughness: 0.86 }),
    brute: std(0xb0b0b2, maps.iron, { roughness: 0.5, metalness: 0.5 }),
    bruteRust: std(0xd09070, maps.rust, { roughness: 0.7, metalness: 0.25 }),
    swarm: std(0xd2b080, maps.leather, { roughness: 0.88 }),
    swarmDark: std(0xa08058, maps.leather, { roughness: 0.88 }),
    boss: std(0x9a9a9e, maps.iron, { roughness: 0.45, metalness: 0.6 }),
    bossRed: std(0xe07060, maps.rust, { roughness: 0.6, metalness: 0.3 }),
    hpBack: new THREE.MeshBasicMaterial({ color: 0x2a1810, depthTest: false }),
    hpFill: new THREE.MeshBasicMaterial({ color: 0xc45c3a, depthTest: false }),
    hpFillOk: new THREE.MeshBasicMaterial({ color: 0x7a8f5a, depthTest: false }),
    range: new THREE.MeshBasicMaterial({
      color: 0xc45c3a,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
    rangeLine: new THREE.MeshBasicMaterial({
      color: 0xf3eadc,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
    plot: std(0xc4a07a, maps.wood, { roughness: 0.88 }),
    plotHover: std(0xf0d0a0, maps.wood, { roughness: 0.88 }),
    plotSel: std(0xffb090, maps.rust, { roughness: 0.7, metalness: 0.2 }),
    beamSniper: new THREE.MeshBasicMaterial({
      color: 0xf3eadc,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    }),
    beamSlow: new THREE.MeshBasicMaterial({
      color: 0xc9a227,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    }),
    beamOil: new THREE.MeshBasicMaterial({
      color: 0xc45c3a,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
    }),
    bullet: std(0xf3eadc, maps.brass, { roughness: 0.35, metalness: 0.65 }),
    shell: std(0x9a9a9c, maps.iron, { roughness: 0.4, metalness: 0.7 }),
    unlitWhite: new THREE.MeshBasicMaterial({ color: 0xf3eadc }),
    blob: new THREE.MeshBasicMaterial({
      color: 0x3a2414,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    }),
  };
}

export function makeGeos() {
  return {
    box: new THREE.BoxGeometry(1, 1, 1),
    sphere: new THREE.SphereGeometry(1, 8, 6),
    cyl: new THREE.CylinderGeometry(1, 1, 1, 8),
    cone: new THREE.ConeGeometry(1, 1, 8),
    plane: new THREE.PlaneGeometry(1, 1),
    ring: new THREE.RingGeometry(0.92, 1, 48),
    ringThin: new THREE.RingGeometry(0.98, 1.04, 48),
  };
}

function addBox(
  parent: THREE.Object3D,
  mat: THREE.Material,
  w: number,
  h: number,
  d: number,
  x: number,
  y: number,
  z: number,
  geos: Kit["geos"],
  rotY = 0,
) {
  const m = new THREE.Mesh(geos.box, mat);
  m.scale.set(w, h, d);
  m.position.set(x, y, z);
  m.rotation.y = rotY;
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

function addCyl(
  parent: THREE.Object3D,
  mat: THREE.Material,
  rTop: number,
  rBot: number,
  h: number,
  x: number,
  y: number,
  z: number,
  geos: Kit["geos"],
  rotX = 0,
  rotZ = 0,
) {
  const geo = rTop === rBot ? geos.cyl : new THREE.CylinderGeometry(rTop, rBot, h, 8);
  const m = new THREE.Mesh(geo, mat);
  if (rTop === rBot) m.scale.set(rTop, h, rBot);
  m.position.set(x, y, z);
  m.rotation.x = rotX;
  m.rotation.z = rotZ;
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

export const UNIT_SIZE: Record<EnemyKind, { w: number; h: number }> = {
  runner: { w: 1.12, h: 1.42 },
  brute: { w: 1.42, h: 1.58 },
  swarm: { w: 1.12, h: 0.82 },
  boss: { w: 2.15, h: 1.62 },
  scout: { w: 1.02, h: 1.32 },
  rider: { w: 1.55, h: 1.48 },
  bomber: { w: 1.28, h: 1.45 },
};

export const GUN_SIZE: Record<TowerKind, { w: number; h: number }> = {
  gunner: { w: 1.38, h: 1.28 },
  cannon: { w: 1.62, h: 1.28 },
  slow: { w: 1.12, h: 2.25 },
  sniper: { w: 1.28, h: 2.18 },
  gatling: { w: 1.48, h: 1.32 },
  dynamite: { w: 1.42, h: 1.35 },
  oil: { w: 1.45, h: 1.18 },
};

export function makeUnitSprite(map: THREE.Texture, w: number, h: number) {
  const mat = new THREE.SpriteMaterial({
    map,
    transparent: true,
    alphaTest: 0.28,
    depthWrite: true,
  });
  const spr = new THREE.Sprite(mat);
  spr.name = "body";
  spr.center.set(0.5, 0);
  spr.scale.set(w, h, 1);
  spr.renderOrder = 3;
  return spr;
}

function addBlob(parent: THREE.Object3D, kit: Kit, w: number, d: number) {
  const m = new THREE.Mesh(kit.geos.plane, kit.mats.blob);
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.025;
  m.scale.set(w, d, 1);
  m.renderOrder = 1;
  parent.add(m);
  return m;
}

export function buildTerrain(scene: THREE.Scene, kit: Kit): THREE.Sprite[] {
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(80, 64), kit.mats.dust);
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(8, 0, 5);
  ground.receiveShadow = true;
  scene.add(ground);

  const rng = mulberry32(42);
  const rockGeo = kit.geos.box;
  for (let i = 0; i < 22; i++) {
    const x = rng() * 22 - 2;
    const z = rng() * 16 - 2;
    if (nearPath(x, z, 1.6) || nearPlot(x, z, 1.3)) continue;
    const rock = new THREE.Mesh(rockGeo, rng() > 0.45 ? kit.mats.dustDark : kit.mats.iron);
    const s = 0.28 + rng() * 0.6;
    rock.scale.set(s, 0.2 + rng() * 0.4, s * (0.7 + rng() * 0.5));
    rock.position.set(x, rock.scale.y / 2, z);
    rock.rotation.y = rng() * Math.PI;
    rock.castShadow = true;
    rock.receiveShadow = true;
    scene.add(rock);
  }

  const plantMats = kit.maps.plants.map(
    (t) =>
      new THREE.SpriteMaterial({
        map: t,
        transparent: true,
        depthWrite: false,
        alphaTest: 0.28,
      }),
  );
  const plants: THREE.Sprite[] = [];
  const plantRng = mulberry32(99);
  for (let i = 0; i < 56; i++) {
    const x = plantRng() * 26 - 4;
    const z = plantRng() * 20 - 4;
    if (nearPath(x, z, 1.35) || nearPlot(x, z, 1.15)) continue;
    const mat = plantMats[Math.floor(plantRng() * plantMats.length)]!;
    const spr = new THREE.Sprite(mat);
    const h = 0.75 + plantRng() * 0.85;
    spr.scale.set(h * 0.92, h, 1);
    spr.position.set(x, h * 0.46, z);
    scene.add(spr);
    plants.push(spr);
  }

  for (const [x, z, w, h, d] of [
    [-8, -6, 5.5, 2.2, 4.2],
    [24, -7, 6.5, 2.8, 4.8],
    [26, 16, 5.2, 1.8, 5],
    [-7, 16, 4.6, 2.4, 4.2],
  ] as const) {
    addBox(scene, kit.mats.dustDark, w, h, d, x, h / 2, z, kit.geos);
    addBox(scene, kit.mats.rust, w * 0.9, 0.16, d * 0.9, x, h + 0.05, z, kit.geos);
  }
  return plants;
}

export function buildHorizon(scene: THREE.Scene, kit: Kit) {
  const mat = new THREE.MeshBasicMaterial({
    map: kit.maps.horizon,
    fog: false,
    depthWrite: false,
  });
  const plate = new THREE.Mesh(new THREE.PlaneGeometry(88, 28), mat);
  plate.position.set(-16, 9, -18);
  plate.lookAt(8.15, 3, 5.7);
  scene.add(plate);

  const plate2 = plate.clone();
  plate2.position.set(-22, 8.5, 8);
  plate2.lookAt(8.15, 3, 5.7);
  scene.add(plate2);
}

export function buildRails(scene: THREE.Scene, kit: Kit) {
  const tieGeos: THREE.BufferGeometry[] = [];
  const dirtGeos: THREE.BufferGeometry[] = [];
  const tieProto = new THREE.BoxGeometry(0.72, 0.07, 0.16);
  const dirtProto = new THREE.BoxGeometry(1.15, 0.04, 0.5);

  const seen = new Set<string>();
  const walk = (pts: { x: number; z: number }[]) => {
    let dist = 0;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1]!;
      const b = pts[i]!;
      const len = Math.hypot(b.x - a.x, b.z - a.z);
      const heading = Math.atan2(b.x - a.x, b.z - a.z);
      const steps = Math.max(1, Math.floor(len / 0.42));
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const x = a.x + (b.x - a.x) * t;
        const z = a.z + (b.z - a.z) * t;
        const key = `${x.toFixed(2)}:${z.toFixed(2)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const tg = tieProto.clone();
        tg.rotateY(heading);
        tg.translate(x, 0.04, z);
        tieGeos.push(tg);
        const dg = dirtProto.clone();
        dg.rotateY(heading);
        dg.translate(x, 0.015, z);
        dirtGeos.push(dg);
        dist += 0.42;
      }
    }
  };
  PATHS.forEach(walk);

  if (dirtGeos.length) {
    const dirt = new THREE.Mesh(mergeGeometries(dirtGeos)!, kit.mats.packed);
    dirt.receiveShadow = true;
    scene.add(dirt);
    dirtGeos.forEach((g) => g.dispose());
  }
  if (tieGeos.length) {
    const ties = new THREE.Mesh(mergeGeometries(tieGeos)!, kit.mats.tie);
    ties.receiveShadow = true;
    ties.castShadow = true;
    scene.add(ties);
    tieGeos.forEach((g) => g.dispose());
  }
  tieProto.dispose();
  dirtProto.dispose();

  for (const pts of PATHS) {
    const vecs = pts.map((p) => new THREE.Vector3(p.x, 0.09, p.z));
    const curve = new THREE.CatmullRomCurve3(vecs, false, "catmullrom", 0.05);
    const side = 0.18;
    for (const sign of [-1, 1]) {
      const offset = pts.map((p, i) => {
        const n = i < pts.length - 1 ? i : i - 1;
        const a = pts[n]!;
        const b = pts[n + 1] ?? pts[n]!;
        const heading = Math.atan2(b.x - a.x, b.z - a.z);
        return new THREE.Vector3(p.x + Math.cos(heading) * side * sign, 0.1, p.z - Math.sin(heading) * side * sign);
      });
      const c = new THREE.CatmullRomCurve3(offset, false, "catmullrom", 0.05);
      const tube = new THREE.Mesh(new THREE.TubeGeometry(c, 80, 0.035, 5, false), kit.mats.rail);
      tube.castShadow = true;
      scene.add(tube);
    }
    void curve;
  }
}

export function buildDepot(kit: Kit): THREE.Group {
  const g = new THREE.Group();
  addBox(g, kit.mats.woodLight, 3.2, 0.14, 2.6, 0, 0.07, 0, kit.geos);
  addBox(g, kit.mats.wood, 2.2, 1.3, 1.6, 0.15, 0.78, 0, kit.geos);
  addBox(g, kit.mats.rust, 2.5, 0.12, 1.9, 0.15, 1.5, 0, kit.geos);
  const roof = new THREE.Mesh(kit.geos.box, kit.mats.rustBright);
  roof.scale.set(2.6, 0.08, 2.0);
  roof.position.set(0.15, 1.72, 0);
  roof.rotation.z = 0.08;
  roof.castShadow = true;
  g.add(roof);
  addBox(g, kit.mats.woodLight, 0.08, 0.9, 0.5, -0.9, 0.7, 0.82, kit.geos);
  addBox(g, kit.mats.ironDark, 0.35, 0.55, 0.08, 0.9, 0.9, 0.84, kit.geos);
  addCyl(g, kit.mats.wood, 0.05, 0.05, 1.6, -1.5, 0.8, -1.1, kit.geos);
  addCyl(g, kit.mats.wood, 0.05, 0.05, 1.6, -2.1, 0.8, -1.1, kit.geos);
  addCyl(g, kit.mats.wood, 0.05, 0.05, 1.6, -1.5, 0.8, -0.55, kit.geos);
  addCyl(g, kit.mats.wood, 0.05, 0.05, 1.6, -2.1, 0.8, -0.55, kit.geos);
  addCyl(g, kit.mats.rust, 0.55, 0.55, 0.7, -1.8, 1.85, -0.82, kit.geos);
  addCyl(g, kit.mats.rustBright, 0.08, 0.08, 0.35, -1.8, 2.35, -0.82, kit.geos);
  addBox(g, kit.mats.woodLight, 0.4, 0.32, 0.4, 1.3, 0.3, 1.0, kit.geos);
  addBox(g, kit.mats.wood, 0.32, 0.28, 0.32, 1.55, 0.28, 0.65, kit.geos);
  addBox(g, kit.mats.iron, 0.18, 0.55, 1.1, -1.55, 0.35, 0, kit.geos);
  addBox(g, kit.mats.brass, 0.12, 0.12, 0.12, 0.15, 1.15, 0.85, kit.geos);
  g.position.set(DEPOT.x, 0, DEPOT.z);
  return g;
}

export function buildPlot(kit: Kit): THREE.Group {
  const g = new THREE.Group();
  const pad = addBox(g, kit.mats.plot, 0.95, 0.1, 0.95, 0, 0.05, 0, kit.geos);
  pad.name = "pad";
  addBox(g, kit.mats.wood, 1.02, 0.06, 0.08, 0, 0.08, 0.48, kit.geos);
  addBox(g, kit.mats.wood, 1.02, 0.06, 0.08, 0, 0.08, -0.48, kit.geos);
  addBox(g, kit.mats.wood, 0.08, 0.06, 1.02, 0.48, 0.08, 0, kit.geos);
  addBox(g, kit.mats.wood, 0.08, 0.06, 1.02, -0.48, 0.08, 0, kit.geos);
  const hit = new THREE.Mesh(
    kit.geos.box,
    new THREE.MeshBasicMaterial({ visible: false }),
  );
  hit.scale.set(1.15, 0.5, 1.15);
  hit.position.y = 0.25;
  g.add(hit);
  return g;
}

export function buildTower(kind: TowerKind, tier: TowerTier, kit: Kit): THREE.Group {
  const g = new THREE.Group();
  const size = GUN_SIZE[kind];
  const grow = 1 + tier * 0.08;
  addBox(g, kit.mats.wood, 0.72, 0.1, 0.72, 0, 0.05, 0, kit.geos);
  if (kind === "gunner" || kind === "cannon" || kind === "gatling") {
    addBox(g, kit.mats.sandbag, 0.26, 0.14, 0.16, 0.22, 0.16, 0.2, kit.geos);
    addBox(g, kit.mats.sandbag, 0.26, 0.14, 0.16, -0.22, 0.16, 0.2, kit.geos);
  }
  addBlob(g, kit, size.w * 0.42 * grow, size.w * 0.28 * grow);
  const spr = makeUnitSprite(kit.maps.guns[kind][0]!, size.w * grow, size.h * grow);
  spr.position.y = 0.04;
  g.add(spr);
  const mz = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: kit.maps.fx[2],
      transparent: true,
      depthWrite: false,
    }),
  );
  mz.name = "muzzle";
  mz.visible = false;
  mz.center.set(0.5, 0.5);
  mz.position.y = size.h * grow * 0.62;
  mz.scale.set(0.7, 0.7, 1);
  mz.renderOrder = 4;
  g.add(mz);
  const hit = new THREE.Mesh(kit.geos.box, new THREE.MeshBasicMaterial({ visible: false }));
  hit.scale.set(Math.max(1.1, size.w * 0.7 * grow), size.h * grow, Math.max(1.1, size.w * 0.55 * grow));
  hit.position.y = (size.h * grow) / 2;
  g.add(hit);
  return g;
}

export function buildEnemy(kind: EnemyKind, kit: Kit): THREE.Group {
  const g = new THREE.Group();
  const size = UNIT_SIZE[kind];
  addBlob(g, kit, size.w * 0.38, size.w * 0.24);
  const spr = makeUnitSprite(kit.maps.units[kind][0]!, size.w, size.h);
  g.add(spr);
  if (kind === "boss") attachHp(g, kit, 1.05, size.h + 0.18);
  else if (kind === "brute" || kind === "bomber") attachHp(g, kit, 0.58, size.h + 0.16);
  else if (kind !== "swarm") attachHp(g, kit, 0.42, size.h + 0.14);
  return g;
}

function attachHp(g: THREE.Group, kit: Kit, width: number, y: number) {
  const bar = new THREE.Group();
  bar.name = "hp";
  bar.position.y = y;
  const back = new THREE.Mesh(kit.geos.plane, kit.mats.hpBack);
  back.scale.set(width, 0.07, 1);
  back.renderOrder = 10;
  bar.add(back);
  const fill = new THREE.Mesh(kit.geos.plane, kit.mats.hpFill);
  fill.name = "hpFill";
  fill.scale.set(width, 0.05, 1);
  fill.position.z = 0.01;
  fill.renderOrder = 11;
  bar.add(fill);
  g.add(bar);
}

function nearPath(x: number, z: number, r: number) {
  for (const pts of PATHS) {
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1]!;
      const b = pts[i]!;
      if (distToSeg(x, z, a.x, a.z, b.x, b.z) < r) return true;
    }
  }
  return false;
}

function nearPlot(x: number, z: number, r: number) {
  return PLOTS.some((p) => Math.hypot(p.x - x, p.z - z) < r);
}

function distToSeg(px: number, pz: number, ax: number, az: number, bx: number, bz: number) {
  const abx = bx - ax;
  const abz = bz - az;
  const t = Math.max(0, Math.min(1, ((px - ax) * abx + (pz - az) * abz) / (abx * abx + abz * abz || 1)));
  return Math.hypot(px - (ax + abx * t), pz - (az + abz * t));
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
