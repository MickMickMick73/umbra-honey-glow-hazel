import { ENEMIES, FIXED_DT, SELL_RATE, START_GOLD, START_LIVES, TOTAL_WAVES, TOWER_ORDER, TOWERS, WAVES, towerUnlocked } from "./config";
import { plotById, samplePath } from "./map";
import { useGame } from "./store";
import type {
  Beam,
  Enemy,
  EnemyKind,
  FxPulse,
  Particle,
  Phase,
  Projectile,
  Tower,
  TowerKind,
} from "./types";
import { audio } from "./audio";
import {
  clearSave,
  playable,
  queueSave,
  recordScore,
  readSettings,
  type GameSave,
} from "./persist";

interface SpawnEvent {
  time: number;
  kind: EnemyKind;
  path: number;
}

export class Sim {
  phase: Phase = "title";
  gold = START_GOLD;
  lives = START_LIVES;
  maxLives = START_LIVES;
  wave = 0;
  waveName = "";
  waveTime = 0;
  spawning = false;
  kills = 0;
  buildRev = 0;
  time = 0;
  trauma = 0;
  banner: string | null = null;
  bannerT = 0;

  towers = new Map<number, Tower>();
  enemies: Enemy[] = [];
  projectiles: Projectile[] = [];
  beams: Beam[] = [];
  particles: Particle[] = [];
  pulses: FxPulse[] = [];

  private spawnQ: SpawnEvent[] = [];
  private spawnI = 0;
  private nextId = 1;
  private acc = 0;
  private hudClock = 0;
  private expectedInWave = 0;

  reset() {
    this.phase = "prep";
    this.gold = START_GOLD;
    this.lives = START_LIVES;
    this.wave = 0;
    this.waveName = WAVES[0]?.name ?? "";
    this.waveTime = 0;
    this.spawning = false;
    this.kills = 0;
    this.buildRev = 0;
    this.time = 0;
    this.trauma = 0;
    this.towers.clear();
    this.enemies.length = 0;
    this.projectiles.length = 0;
    this.beams.length = 0;
    this.particles.length = 0;
    this.pulses.length = 0;
    this.spawnQ = [];
    this.spawnI = 0;
    this.nextId = 1;
    this.acc = 0;
    this.expectedInWave = 0;
    this.banner = "Place emplacements. Start the wave when ready.";
    this.bannerT = 3.2;
    clearSave();
    this.flushHud();
    this.autosave();
  }

  snapshot(): GameSave | null {
    if (!playable(this.phase)) return null;
    return {
      version: 1,
      savedAt: Date.now(),
      phase: this.phase,
      gold: this.gold,
      lives: this.lives,
      maxLives: this.maxLives,
      wave: this.wave,
      waveName: this.waveName,
      waveTime: this.waveTime,
      spawning: this.spawning,
      kills: this.kills,
      time: this.time,
      nextId: this.nextId,
      spawnI: this.spawnI,
      expectedInWave: this.expectedInWave,
      towers: [...this.towers.values()].map((t) => ({
        plotId: t.plotId,
        kind: t.kind,
        tier: t.tier,
        spent: t.spent,
        yaw: t.yaw,
        cooldown: t.cooldown,
      })),
      enemies: this.enemies.map((e) => ({
        id: e.id,
        kind: e.kind,
        hp: e.hp,
        maxHp: e.maxHp,
        speed: e.speed,
        path: e.path,
        s: e.s,
        lane: e.lane,
        gold: e.gold,
        radius: e.radius,
        slowUntil: e.slowUntil,
        slowMul: e.slowMul,
        enraged: e.enraged,
        bob: e.bob,
      })),
      spawnQ: this.spawnQ.map((ev) => ({ time: ev.time, kind: ev.kind, path: ev.path })),
    };
  }

  hydrate(save: GameSave): boolean {
    if (save.phase !== "prep" && save.phase !== "combat") return false;
    this.phase = save.phase;
    this.gold = Math.max(0, save.gold);
    this.lives = Math.max(0, save.lives);
    this.maxLives = Math.max(this.lives, save.maxLives || START_LIVES);
    this.wave = save.wave;
    this.waveName = save.waveName || WAVES[Math.min(save.wave, TOTAL_WAVES - 1)]?.name || "";
    this.waveTime = Math.max(0, save.waveTime);
    this.spawning = save.phase === "combat" ? save.spawning : false;
    this.kills = Math.max(0, save.kills);
    this.time = Math.max(0, save.time);
    this.trauma = 0;
    this.acc = 0;
    this.towers.clear();
    this.enemies.length = 0;
    this.projectiles.length = 0;
    this.beams.length = 0;
    this.particles.length = 0;
    this.pulses.length = 0;
    for (const t of save.towers) {
      const plot = plotById(t.plotId);
      if (!plot || this.towers.has(t.plotId)) continue;
      if (!(t.kind in TOWERS)) continue;
      this.towers.set(t.plotId, {
        plotId: t.plotId,
        kind: t.kind,
        tier: t.tier,
        x: plot.x,
        z: plot.z,
        cooldown: Math.max(0, t.cooldown),
        targetId: -1,
        yaw: t.yaw,
        spent: Math.max(0, t.spent),
        kick: 0,
      });
    }
    for (const e of save.enemies) {
      if (!(e.kind in ENEMIES)) continue;
      const sample = samplePath(e.path, e.s);
      if (sample.done) continue;
      const sideX = Math.cos(sample.heading) * e.lane;
      const sideZ = -Math.sin(sample.heading) * e.lane;
      this.enemies.push({
        id: e.id,
        kind: e.kind,
        hp: Math.max(1, e.hp),
        maxHp: Math.max(1, e.maxHp),
        speed: e.speed,
        path: e.path,
        s: e.s,
        x: sample.x + sideX,
        z: sample.z + sideZ,
        y: 0,
        heading: sample.heading,
        lane: e.lane,
        gold: e.gold,
        radius: e.radius,
        slowUntil: e.slowUntil,
        slowMul: e.slowMul,
        enraged: e.enraged,
        flash: 0,
        bob: e.bob,
      });
    }
    this.spawnQ = save.spawnQ.filter((ev) => ev.kind in ENEMIES);
    this.spawnI = Math.min(Math.max(0, save.spawnI), this.spawnQ.length);
    this.expectedInWave = save.expectedInWave;
    let maxId = this.nextId;
    for (const t of this.towers.values()) maxId = Math.max(maxId, t.plotId);
    for (const e of this.enemies) maxId = Math.max(maxId, e.id);
    this.nextId = Math.max(save.nextId, maxId + 1);
    this.buildRev++;
    this.banner = save.phase === "combat" ? `Wave ${this.wave} — back on the line.` : "Yard restored. Fortify.";
    this.bannerT = 2.6;
    this.flushHud();
    return true;
  }

  parkToTitle() {
    this.phase = "title";
    this.banner = null;
    this.bannerT = 0;
    this.flushHud();
  }

  private autosave() {
    const snap = this.snapshot();
    if (snap) queueSave(snap);
  }

  private finishRun(won: boolean) {
    const settings = readSettings();
    const run = recordScore({
      name: settings.callsign,
      wave: this.wave,
      kills: this.kills,
      lives: this.lives,
      gold: this.gold,
      won,
    });
    useGame.getState().setLastRun(run);
    clearSave();
  }

  step(dt: number, speed: number) {
    if (this.phase === "title" || this.phase === "won" || this.phase === "lost") {
      this.decayFx(dt);
      return;
    }
    const scaled = Math.min(dt, 0.1) * speed;
    this.acc += scaled;
    let steps = 0;
    while (this.acc >= FIXED_DT && steps < 10) {
      this.tick(FIXED_DT);
      this.acc -= FIXED_DT;
      steps++;
    }
    this.hudClock += dt;
    if (this.hudClock > 0.12) {
      this.hudClock = 0;
      this.flushHud();
    }
  }

  startWave(): boolean {
    if (this.phase !== "prep") return false;
    if (this.wave >= TOTAL_WAVES) return false;
    const def = WAVES[this.wave];
    if (!def) return false;
    this.wave += 1;
    this.waveName = def.name;
    this.waveTime = 0;
    this.spawning = true;
    this.phase = "combat";
    this.spawnQ = [];
    this.spawnI = 0;
    for (const g of def.groups) {
      let t = g.delay;
      for (let i = 0; i < g.count; i++) {
        this.spawnQ.push({ time: t, kind: g.kind, path: g.path });
        t += g.interval;
      }
    }
    this.spawnQ.sort((a, b) => a.time - b.time);
    this.expectedInWave = this.spawnQ.length;
    this.banner = `Wave ${this.wave} — ${def.name}`;
    this.bannerT = 2.4;
    audio.playWave();
    this.flushHud();
    this.autosave();
    return true;
  }

  place(plotId: number, kind: TowerKind): boolean {
    if (this.phase === "title" || this.phase === "won" || this.phase === "lost") return false;
    if (this.towers.has(plotId)) return false;
    const plot = plotById(plotId);
    if (!plot) return false;
    const def = TOWERS[kind];
    if (!towerUnlocked(kind, this.wave, this.phase === "combat")) {
      audio.playDeny();
      return false;
    }
    if (this.gold < def.cost) {
      audio.playDeny();
      return false;
    }
    this.gold -= def.cost;
    this.towers.set(plotId, {
      plotId,
      kind,
      tier: 0,
      x: plot.x,
      z: plot.z,
      cooldown: 0.15,
      targetId: -1,
      yaw: 0,
      spent: def.cost,
      kick: 0,
    });
    this.buildRev++;
    audio.playPlace();
    this.flushHud();
    this.autosave();
    return true;
  }

  upgrade(plotId: number): boolean {
    const t = this.towers.get(plotId);
    if (!t || t.tier >= 2) return false;
    const def = TOWERS[t.kind];
    const cost = t.tier === 0 ? def.upgradeCost[0] : def.upgradeCost[1];
    if (this.gold < cost) {
      audio.playDeny();
      return false;
    }
    this.gold -= cost;
    t.tier = (t.tier + 1) as 1 | 2;
    t.spent += cost;
    this.buildRev++;
    audio.playUpgrade();
    this.flushHud();
    this.autosave();
    return true;
  }

  sell(plotId: number): boolean {
    const t = this.towers.get(plotId);
    if (!t) return false;
    const refund = Math.floor(t.spent * SELL_RATE);
    this.gold += refund;
    this.towers.delete(plotId);
    this.buildRev++;
    audio.playSell();
    this.flushHud();
    this.autosave();
    return true;
  }

  sellValue(plotId: number): number {
    const t = this.towers.get(plotId);
    if (!t) return 0;
    return Math.floor(t.spent * SELL_RATE);
  }

  remainingInWave(): number {
    const queued = this.spawning ? this.spawnQ.length - this.spawnI : 0;
    return queued + this.enemies.length;
  }

  addTrauma(v: number) {
    this.trauma = Math.min(1, this.trauma + v);
  }

  private tick(dt: number) {
    this.time += dt;
    if (this.bannerT > 0) {
      this.bannerT -= dt;
      if (this.bannerT <= 0) this.banner = null;
    }
    this.trauma = Math.max(0, this.trauma - 1.7 * dt);

    if (this.phase === "combat") {
      this.waveTime += dt;
      while (this.spawnI < this.spawnQ.length && this.spawnQ[this.spawnI]!.time <= this.waveTime) {
        const ev = this.spawnQ[this.spawnI++]!;
        this.spawnEnemy(ev.kind, ev.path);
      }
      if (this.spawnI >= this.spawnQ.length) this.spawning = false;
    }

    this.updateEnemies(dt);
    this.updateTowers(dt);
    this.updateProjectiles(dt);
    this.updateFx(dt);

    if (this.phase === "combat" && !this.spawning && this.enemies.length === 0) {
      if (this.wave >= TOTAL_WAVES) {
        this.phase = "won";
        this.banner = "The depot holds.";
        this.bannerT = 8;
        audio.playWin();
        this.finishRun(true);
        useGame.getState().setCine("victory");
      } else {
        this.phase = "prep";
        this.waveName = WAVES[this.wave]?.name ?? "";
        const unlocked = TOWER_ORDER.filter((k) => TOWERS[k].unlockWave === this.wave + 1);
        if (this.wave === 6) useGame.getState().setCine("mid");
        if (unlocked.length) {
          this.banner = `${unlocked.map((k) => TOWERS[k].name).join(" · ")} ready on the line.`;
        } else {
          this.banner = `Wave ${this.wave} clear. Fortify.`;
        }
        this.bannerT = 2.8;
        this.autosave();
      }
      this.flushHud();
    }
  }

  private spawnEnemy(kind: EnemyKind, path: number, s = 0) {
    const def = ENEMIES[kind];
    const id = this.nextId++;
    const sample = samplePath(path, s);
    const lane =
      kind === "boss" ? 0 : kind === "swarm" ? ((id % 5) - 2) * 0.2 : ((id % 3) - 1) * 0.14;
    this.enemies.push({
      id,
      kind,
      hp: def.hp,
      maxHp: def.hp,
      speed: def.speed,
      path,
      s,
      x: sample.x,
      z: sample.z,
      y: 0,
      heading: sample.heading,
      lane,
      gold: def.gold,
      radius: def.radius,
      slowUntil: 0,
      slowMul: 1,
      enraged: false,
      flash: 0,
      bob: Math.random() * Math.PI * 2,
    });
  }

  private updateEnemies(dt: number) {
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i]!;
      if (e.flash > 0) e.flash = Math.max(0, e.flash - dt);
      const slowed = this.time < e.slowUntil ? e.slowMul : 1;
      const enrage = e.enraged ? 1.38 : 1;
      const spd = e.speed * slowed * enrage;
      const gait =
        e.kind === "brute" || e.kind === "bomber"
          ? 3.4
          : e.kind === "boss"
            ? 2.8
            : e.kind === "swarm"
              ? 9.2
              : e.kind === "rider"
                ? 8.4
                : e.kind === "scout"
                  ? 10.2
                  : 6.8;
      e.bob += dt * gait * Math.max(0.4, slowed * enrage);
      e.s += spd * dt;
      const sample = samplePath(e.path, e.s);
      const sideX = Math.cos(sample.heading) * e.lane;
      const sideZ = -Math.sin(sample.heading) * e.lane;
      e.x = sample.x + sideX;
      e.z = sample.z + sideZ;
      e.heading = sample.heading;
      const hop = e.kind === "brute" || e.kind === "boss" ? 0.02 : 0.045;
      e.y = Math.abs(Math.sin(e.bob)) * hop;

      if (sample.done) {
        this.leak(e);
        this.enemies.splice(i, 1);
      }
    }
  }

  private leak(e: Enemy) {
    this.lives = Math.max(0, this.lives - 1);
    this.addTrauma(e.kind === "boss" ? 0.7 : 0.28);
    audio.playLeak();
    this.burst(e.x, 0.4, e.z, 8, 0x8b3a2a, 1.2);
    if (this.lives <= 0) {
      this.phase = "lost";
      this.banner = "The depot is overrun.";
      this.bannerT = 8;
      audio.playLose();
      this.finishRun(false);
      useGame.getState().setCine("defeat");
    } else {
      this.autosave();
    }
    this.flushHud();
  }

  private updateTowers(dt: number) {
    for (const t of this.towers.values()) {
      const def = TOWERS[t.kind];
      const stats = def.stats[t.tier]!;
      t.cooldown = Math.max(0, t.cooldown - dt);
      if (t.kick > 0) t.kick = Math.max(0, t.kick - dt);
      const target = this.pickTarget(t, stats.range);
      t.targetId = target ? target.id : -1;
      if (target) {
        const desired = Math.atan2(target.x - t.x, target.z - t.z);
        t.yaw = dampAngle(t.yaw, desired, 10 * dt);
        if (t.cooldown <= 0) {
          this.fire(t, target);
          t.cooldown = 1 / stats.rate;
        }
      }
    }
  }

  private pickTarget(t: Tower, range: number): Enemy | null {
    const r2 = range * range;
    let best: Enemy | null = null;
    let bestS = -1;
    for (const e of this.enemies) {
      const dx = e.x - t.x;
      const dz = e.z - t.z;
      if (dx * dx + dz * dz > r2) continue;
      if (e.s > bestS) {
        bestS = e.s;
        best = e;
      }
    }
    return best;
  }

  private fire(t: Tower, target: Enemy) {
    const def = TOWERS[t.kind];
    const stats = def.stats[t.tier]!;
    t.kick =
      t.kind === "cannon" || t.kind === "dynamite"
        ? 0.42
        : t.kind === "sniper"
          ? 0.36
          : t.kind === "slow" || t.kind === "oil"
            ? 0.32
            : t.kind === "gatling"
              ? 0.14
              : 0.22;
    const muzzleY = t.kind === "sniper" ? 1.35 : t.kind === "slow" ? 1.6 : 0.55;
    if (t.kind === "sniper") {
      this.hurt(target, stats.damage, t.x, t.z);
      this.beams.push({
        x1: t.x,
        y1: muzzleY,
        z1: t.z,
        x2: target.x,
        y2: 0.45,
        z2: target.z,
        ttl: 0.12,
        max: 0.12,
        kind: "sniper",
      });
      audio.playSniper();
      this.addTrauma(0.08);
      return;
    }
    if (t.kind === "slow") {
      this.aoe(target.x, target.z, stats.splash, stats.damage, stats.slow, stats.slowDuration);
      this.beams.push({
        x1: t.x,
        y1: muzzleY,
        z1: t.z,
        x2: target.x,
        y2: 0.35,
        z2: target.z,
        ttl: 0.16,
        max: 0.16,
        kind: "slow",
      });
      this.pulses.push({
        x: target.x,
        y: 0.08,
        z: target.z,
        ttl: 0.35,
        max: 0.35,
        radius: stats.splash,
        color: 0xc9a227,
      });
      audio.playSlow();
      return;
    }
    if (t.kind === "oil") {
      this.aoe(target.x, target.z, stats.splash, stats.damage, stats.slow, stats.slowDuration);
      this.pulses.push({
        x: target.x,
        y: 0.08,
        z: target.z,
        ttl: 0.55,
        max: 0.55,
        radius: stats.splash,
        color: 0xc45c3a,
      });
      this.beams.push({
        x1: t.x,
        y1: 0.45,
        z1: t.z,
        x2: target.x,
        y2: 0.2,
        z2: target.z,
        ttl: 0.14,
        max: 0.14,
        kind: "oil",
      });
      audio.playCannon();
      return;
    }
    if (t.kind === "cannon" || t.kind === "dynamite") {
      const dist = Math.hypot(target.x - t.x, target.z - t.z);
      const flight = Math.max(0.28, dist / (t.kind === "dynamite" ? 5.4 : 7.2));
      this.projectiles.push({
        id: this.nextId++,
        kind: "shell",
        x: t.x,
        y: 0.55,
        z: t.z,
        vx: (target.x - t.x) / flight,
        vy: 0,
        vz: (target.z - t.z) / flight,
        destX: target.x,
        destY: 0.2,
        destZ: target.z,
        damage: stats.damage,
        splash: stats.splash,
        ttl: flight + 0.05,
        flight: 0,
        flightMax: flight,
        targetId: target.id,
      });
      audio.playCannon();
      this.addTrauma(0.05);
      return;
    }
    const dist = Math.hypot(target.x - t.x, target.z - t.z);
    const flight = Math.max(0.08, dist / 16);
    const lead = 0.12;
    const sample = samplePath(target.path, target.s + target.speed * lead);
    this.projectiles.push({
      id: this.nextId++,
      kind: "bullet",
      x: t.x,
      y: 0.48,
      z: t.z,
      vx: (sample.x - t.x) / flight,
      vy: 0,
      vz: (sample.z - t.z) / flight,
      destX: sample.x,
      destY: 0.35,
      destZ: sample.z,
      damage: stats.damage,
      splash: 0.25,
      ttl: flight + 0.04,
      flight: 0,
      flightMax: flight,
      targetId: target.id,
    });
    audio.playGun();
  }

  private updateProjectiles(dt: number) {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i]!;
      p.flight += dt;
      p.ttl -= dt;
      const t = p.flightMax > 0 ? Math.min(1, p.flight / p.flightMax) : 1;
      p.x += p.vx * dt;
      p.z += p.vz * dt;
      if (p.kind === "shell") {
        p.y = 0.55 + Math.sin(t * Math.PI) * 1.8;
      } else {
        p.y = 0.48;
      }
      if (t >= 1 || p.ttl <= 0) {
        this.impact(p);
        this.projectiles.splice(i, 1);
      }
    }
  }

  private impact(p: Projectile) {
    if (p.kind === "shell") {
      this.aoe(p.destX, p.destZ, p.splash, p.damage, 1, 0);
      this.pulses.push({
        x: p.destX,
        y: 0.1,
        z: p.destZ,
        ttl: 0.28,
        max: 0.28,
        radius: p.splash,
        color: 0xc45c3a,
      });
      this.burst(p.destX, 0.3, p.destZ, 14, 0x8a6239, 1.6);
      this.addTrauma(0.12);
      return;
    }
    const target = this.enemies.find((e) => e.id === p.targetId);
    if (target && Math.hypot(target.x - p.x, target.z - p.z) < 0.7) {
      this.hurt(target, p.damage, p.x, p.z);
    } else {
      this.aoe(p.destX, p.destZ, p.splash, p.damage, 1, 0);
    }
  }

  private aoe(x: number, z: number, radius: number, damage: number, slow: number, slowDur: number) {
    const r2 = radius * radius;
    for (const e of this.enemies) {
      const dx = e.x - x;
      const dz = e.z - z;
      if (dx * dx + dz * dz <= r2) {
        this.hurt(e, damage, x, z);
        if (slow < 1 && slowDur > 0) {
          e.slowMul = Math.min(e.slowMul, slow);
          e.slowUntil = Math.max(e.slowUntil, this.time + slowDur);
        }
      }
    }
  }

  private hurt(e: Enemy, damage: number, fromX: number, fromZ: number) {
    if (e.hp <= 0) return;
    e.hp -= damage;
    e.flash = 0.12;
    this.burst(e.x, 0.4, e.z, 3, 0xc4a574, 0.7);
    if (e.kind === "boss" && !e.enraged && e.hp <= e.maxHp * 0.45) {
      e.enraged = true;
      this.banner = "The Ironclad rams the line.";
      this.bannerT = 2.2;
      this.addTrauma(0.35);
    }
    if (e.hp <= 0) this.kill(e, fromX, fromZ);
  }

  private kill(e: Enemy, _fromX: number, _fromZ: number) {
    this.gold += e.gold;
    this.kills += 1;
    audio.playDeath(e.kind);
    const color = e.kind === "boss" ? 0x3a3a3c : e.kind === "brute" || e.kind === "bomber" ? 0x4a3a32 : 0x6a4a32;
    this.burst(e.x, 0.5, e.z, e.kind === "boss" ? 28 : e.kind === "bomber" ? 18 : 10, color, 2.2);
    this.addTrauma(e.kind === "boss" ? 0.55 : e.kind === "bomber" ? 0.22 : 0.08);
    if (e.kind === "bomber") {
      this.aoe(e.x, e.z, 1.25, 28, 0.75, 0.8);
      this.pulses.push({
        x: e.x,
        y: 0.1,
        z: e.z,
        ttl: 0.4,
        max: 0.4,
        radius: 1.25,
        color: 0xc45c3a,
      });
    }
    if (e.kind === "boss") {
      for (let i = 0; i < 4; i++) this.spawnEnemy("runner", e.path, Math.max(0, e.s - 0.4));
    }
    const idx = this.enemies.indexOf(e);
    if (idx >= 0) this.enemies.splice(idx, 1);
    this.flushHud();
  }

  private burst(x: number, y: number, z: number, n: number, color: number, force: number) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const f = 0.6 + Math.random() * force;
      this.particles.push({
        x,
        y,
        z,
        vx: Math.cos(a) * f,
        vy: 1.2 + Math.random() * 2.4,
        vz: Math.sin(a) * f,
        life: 0.35 + Math.random() * 0.35,
        max: 0.7,
        size: 0.05 + Math.random() * 0.06,
        color,
      });
    }
    if (this.particles.length > 220) this.particles.splice(0, this.particles.length - 220);
  }

  private updateFx(dt: number) {
    for (let i = this.beams.length - 1; i >= 0; i--) {
      this.beams[i]!.ttl -= dt;
      if (this.beams[i]!.ttl <= 0) this.beams.splice(i, 1);
    }
    for (let i = this.pulses.length - 1; i >= 0; i--) {
      this.pulses[i]!.ttl -= dt;
      if (this.pulses[i]!.ttl <= 0) this.pulses.splice(i, 1);
    }
    this.decayFx(dt);
  }

  private decayFx(dt: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i]!;
      p.life -= dt;
      p.vy -= 6 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.z += p.vz * dt;
      if (p.y < 0.02) {
        p.y = 0.02;
        p.vy *= -0.2;
        p.vx *= 0.6;
        p.vz *= 0.6;
      }
      if (p.life <= 0) this.particles.splice(i, 1);
    }
  }

  flushHud() {
    useGame.getState().applyHud({
      phase: this.phase,
      gold: this.gold,
      lives: this.lives,
      maxLives: this.maxLives,
      wave: this.wave,
      totalWaves: TOTAL_WAVES,
      waveName: this.waveName,
      waveActive: this.phase === "combat",
      remaining: this.remainingInWave(),
      kills: this.kills,
      buildRev: this.buildRev,
      banner: this.banner,
    });
  }
}

function dampAngle(current: number, target: number, maxDelta: number): number {
  let diff = target - current;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  const step = Math.max(-maxDelta, Math.min(maxDelta, diff));
  return current + step;
}

export const sim = new Sim();
