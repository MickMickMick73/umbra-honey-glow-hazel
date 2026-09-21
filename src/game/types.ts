export type TowerKind =
  | "gunner"
  | "cannon"
  | "slow"
  | "sniper"
  | "gatling"
  | "dynamite"
  | "oil"
  | "harpoon"
  | "beacon"
  | "siege"
  | "hotchkiss";
export type EnemyKind =
  | "runner"
  | "brute"
  | "swarm"
  | "boss"
  | "scout"
  | "rider"
  | "bomber"
  | "outlaw"
  | "sapper"
  | "engine";
export type Phase = "title" | "prep" | "combat" | "won" | "lost";
export type SpeedMult = 1 | 2 | 4;
export type CineId = "intro" | "mid" | "victory" | "defeat" | "ironclad";
export type DepotStage = 0 | 1 | 2 | 3;

export type Vec2 = { x: number; z: number };

export type TowerTier = 0 | 1 | 2;

export interface TowerDef {
  kind: TowerKind;
  name: string;
  short: string;
  blurb: string;
  cost: number;
  unlockWave: number;
  upgradeCost: [number, number];
  stats: [TowerStats, TowerStats, TowerStats];
}

export interface TowerStats {
  damage: number;
  rate: number;
  range: number;
  splash: number;
  slow: number;
  slowDuration: number;
}

export interface EnemyDef {
  kind: EnemyKind;
  name: string;
  hp: number;
  speed: number;
  gold: number;
  radius: number;
}

export interface WaveGroup {
  kind: EnemyKind;
  count: number;
  interval: number;
  path: number;
  delay: number;
}

export interface WaveDef {
  name: string;
  groups: WaveGroup[];
}

export interface Plot {
  id: number;
  x: number;
  z: number;
}

export interface Tower {
  plotId: number;
  kind: TowerKind;
  tier: TowerTier;
  x: number;
  z: number;
  cooldown: number;
  targetId: number;
  yaw: number;
  spent: number;
  kick: number;
}

export interface Enemy {
  id: number;
  kind: EnemyKind;
  hp: number;
  maxHp: number;
  speed: number;
  path: number;
  s: number;
  x: number;
  z: number;
  y: number;
  heading: number;
  lane: number;
  gold: number;
  radius: number;
  slowUntil: number;
  slowMul: number;
  enraged: boolean;
  flash: number;
  bob: number;
}

export interface Projectile {
  id: number;
  kind: "bullet" | "shell";
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  destX: number;
  destY: number;
  destZ: number;
  damage: number;
  splash: number;
  ttl: number;
  flight: number;
  flightMax: number;
  targetId: number;
}

export interface Beam {
  x1: number;
  y1: number;
  z1: number;
  x2: number;
  y2: number;
  z2: number;
  ttl: number;
  max: number;
  kind: "sniper" | "slow" | "oil" | "harpoon" | "beacon";
}

export interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  max: number;
  size: number;
  color: number;
}

export interface FxPulse {
  x: number;
  y: number;
  z: number;
  ttl: number;
  max: number;
  radius: number;
  color: number;
}
