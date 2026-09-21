import type { CineId, DepotStage, EnemyDef, EnemyKind, TowerDef, TowerKind, WaveDef } from "./types";

export const START_GOLD = 220;
export const START_LIVES = 22;
export const SELL_RATE = 0.55;
export const HUD_RESERVE_PX = 92;
export const TOTAL_WAVES = 24;
export const FIXED_DT = 1 / 60;

export const TOWERS: Record<TowerKind, TowerDef> = {
  gunner: {
    kind: "gunner",
    name: "Gunner",
    short: "Repeater",
    blurb: "Single-target rifle. Cheap, honest, and always useful.",
    cost: 50,
    unlockWave: 1,
    upgradeCost: [40, 70],
    stats: [
      { damage: 11, rate: 1.45, range: 3.35, splash: 0, slow: 1, slowDuration: 0 },
      { damage: 18, rate: 1.7, range: 3.65, splash: 0, slow: 1, slowDuration: 0 },
      { damage: 26, rate: 2.05, range: 3.95, splash: 0, slow: 1, slowDuration: 0 },
    ],
  },
  cannon: {
    kind: "cannon",
    name: "Cannon",
    short: "Howitzer",
    blurb: "Slow shells. Splashes a pack. Misses the fast ones.",
    cost: 85,
    unlockWave: 2,
    upgradeCost: [65, 105],
    stats: [
      { damage: 36, rate: 0.42, range: 3.05, splash: 1.15, slow: 1, slowDuration: 0 },
      { damage: 52, rate: 0.48, range: 3.25, splash: 1.35, slow: 1, slowDuration: 0 },
      { damage: 74, rate: 0.55, range: 3.55, splash: 1.55, slow: 1, slowDuration: 0 },
    ],
  },
  slow: {
    kind: "slow",
    name: "Telegraph",
    short: "Net post",
    blurb: "Low damage. Holds raiders in the kill box.",
    cost: 65,
    unlockWave: 3,
    upgradeCost: [50, 85],
    stats: [
      { damage: 3, rate: 0.72, range: 3.55, splash: 0.7, slow: 0.62, slowDuration: 2.2 },
      { damage: 4, rate: 0.88, range: 3.95, splash: 0.85, slow: 0.52, slowDuration: 2.6 },
      { damage: 6, rate: 1.05, range: 4.4, splash: 1.0, slow: 0.42, slowDuration: 3.1 },
    ],
  },
  sniper: {
    kind: "sniper",
    name: "Marksman",
    short: "Long gun",
    blurb: "Huge shot, long wait, longest reach. Pick off brutes.",
    cost: 125,
    unlockWave: 4,
    upgradeCost: [90, 145],
    stats: [
      { damage: 85, rate: 0.32, range: 6.6, splash: 0, slow: 1, slowDuration: 0 },
      { damage: 125, rate: 0.38, range: 7.3, splash: 0, slow: 1, slowDuration: 0 },
      { damage: 185, rate: 0.44, range: 8.0, splash: 0, slow: 1, slowDuration: 0 },
    ],
  },
  gatling: {
    kind: "gatling",
    name: "Gatling",
    short: "Rotary",
    blurb: "A cranked storm of lead. Melts scouts and riders.",
    cost: 110,
    unlockWave: 5,
    upgradeCost: [80, 120],
    stats: [
      { damage: 7, rate: 5.2, range: 3.15, splash: 0, slow: 1, slowDuration: 0 },
      { damage: 9, rate: 6.1, range: 3.35, splash: 0, slow: 1, slowDuration: 0 },
      { damage: 12, rate: 7.0, range: 3.55, splash: 0, slow: 1, slowDuration: 0 },
    ],
  },
  dynamite: {
    kind: "dynamite",
    name: "Mortar",
    short: "Powder",
    blurb: "Lobs kegs. Late, loud, and rude to packs.",
    cost: 140,
    unlockWave: 7,
    upgradeCost: [100, 150],
    stats: [
      { damage: 58, rate: 0.28, range: 4.4, splash: 1.55, slow: 1, slowDuration: 0 },
      { damage: 78, rate: 0.32, range: 4.7, splash: 1.75, slow: 1, slowDuration: 0 },
      { damage: 104, rate: 0.36, range: 5.1, splash: 1.95, slow: 1, slowDuration: 0 },
    ],
  },
  oil: {
    kind: "oil",
    name: "Oil",
    short: "Trough",
    blurb: "Lights the ballast. Burns and drags them through it.",
    cost: 95,
    unlockWave: 9,
    upgradeCost: [70, 110],
    stats: [
      { damage: 8, rate: 0.85, range: 3.4, splash: 1.15, slow: 0.7, slowDuration: 1.8 },
      { damage: 11, rate: 0.98, range: 3.7, splash: 1.3, slow: 0.62, slowDuration: 2.2 },
      { damage: 15, rate: 1.12, range: 4.0, splash: 1.45, slow: 0.55, slowDuration: 2.6 },
    ],
  },
  harpoon: {
    kind: "harpoon",
    name: "Harpoon",
    short: "Cable gun",
    blurb: "Hitscan hook. Pins a raider and holds the line.",
    cost: 130,
    unlockWave: 11,
    upgradeCost: [95, 140],
    stats: [
      { damage: 32, rate: 0.68, range: 4.85, splash: 0, slow: 0.52, slowDuration: 1.7 },
      { damage: 44, rate: 0.8, range: 5.25, splash: 0, slow: 0.45, slowDuration: 2.05 },
      { damage: 60, rate: 0.94, range: 5.7, splash: 0, slow: 0.38, slowDuration: 2.45 },
    ],
  },
  beacon: {
    kind: "beacon",
    name: "Beacon",
    short: "Lamp",
    blurb: "No gun. Lights nearby emplacements so they fire faster.",
    cost: 160,
    unlockWave: 13,
    upgradeCost: [110, 160],
    stats: [
      { damage: 5, rate: 0.55, range: 3.45, splash: 3.45, slow: 1, slowDuration: 0 },
      { damage: 7, rate: 0.62, range: 3.85, splash: 3.85, slow: 1, slowDuration: 0 },
      { damage: 9, rate: 0.7, range: 4.3, splash: 4.3, slow: 1, slowDuration: 0 },
    ],
  },
  siege: {
    kind: "siege",
    name: "Siege",
    short: "Rail gun",
    blurb: "A wagon of iron. Slow shells, ugly craters.",
    cost: 185,
    unlockWave: 16,
    upgradeCost: [130, 190],
    stats: [
      { damage: 110, rate: 0.2, range: 5.15, splash: 1.9, slow: 1, slowDuration: 0 },
      { damage: 148, rate: 0.23, range: 5.55, splash: 2.15, slow: 1, slowDuration: 0 },
      { damage: 196, rate: 0.26, range: 6.0, splash: 2.4, slow: 1, slowDuration: 0 },
    ],
  },
  hotchkiss: {
    kind: "hotchkiss",
    name: "Hotchkiss",
    short: "Revolver",
    blurb: "Three-shot bursts. Mean to anything in a lane.",
    cost: 155,
    unlockWave: 19,
    upgradeCost: [115, 170],
    stats: [
      { damage: 15, rate: 1.12, range: 3.4, splash: 0.22, slow: 1, slowDuration: 0 },
      { damage: 19, rate: 1.28, range: 3.6, splash: 0.26, slow: 1, slowDuration: 0 },
      { damage: 24, rate: 1.45, range: 3.85, splash: 0.3, slow: 1, slowDuration: 0 },
    ],
  },
};

export const ENEMIES: Record<EnemyKind, EnemyDef> = {
  runner: { kind: "runner", name: "Raider", hp: 38, speed: 2.18, gold: 8, radius: 0.28 },
  brute: { kind: "brute", name: "Ironhide", hp: 230, speed: 0.86, gold: 22, radius: 0.42 },
  swarm: { kind: "swarm", name: "Coyote", hp: 16, speed: 1.92, gold: 3, radius: 0.2 },
  boss: { kind: "boss", name: "Ironclad", hp: 1550, speed: 1.02, gold: 180, radius: 0.7 },
  scout: { kind: "scout", name: "Scout", hp: 22, speed: 3.05, gold: 6, radius: 0.22 },
  rider: { kind: "rider", name: "Rider", hp: 68, speed: 2.62, gold: 14, radius: 0.34 },
  bomber: { kind: "bomber", name: "Powder", hp: 155, speed: 1.08, gold: 20, radius: 0.36 },
  outlaw: { kind: "outlaw", name: "Outlaw", hp: 92, speed: 2.08, gold: 13, radius: 0.3 },
  sapper: { kind: "sapper", name: "Sapper", hp: 125, speed: 1.28, gold: 17, radius: 0.32 },
  engine: { kind: "engine", name: "Iron Engine", hp: 2100, speed: 0.8, gold: 280, radius: 0.82 },
};

export const WAVES: WaveDef[] = [
  {
    name: "Dust on the horizon",
    groups: [{ kind: "runner", count: 8, interval: 0.75, path: 0, delay: 0 }],
  },
  {
    name: "Scouts on the ridge",
    groups: [
      { kind: "runner", count: 6, interval: 0.55, path: 0, delay: 0 },
      { kind: "scout", count: 8, interval: 0.32, path: 1, delay: 0.6 },
    ],
  },
  {
    name: "Coyote pack",
    groups: [
      { kind: "swarm", count: 6, interval: 0.16, path: 0, delay: 0 },
      { kind: "swarm", count: 6, interval: 0.16, path: 0, delay: 1.35 },
      { kind: "swarm", count: 6, interval: 0.16, path: 1, delay: 0.6 },
      { kind: "swarm", count: 6, interval: 0.16, path: 1, delay: 2.0 },
    ],
  },
  {
    name: "Iron hides",
    groups: [
      { kind: "brute", count: 4, interval: 1.55, path: 0, delay: 0 },
      { kind: "scout", count: 5, interval: 0.4, path: 1, delay: 0.8 },
    ],
  },
  {
    name: "Horse thieves",
    groups: [
      { kind: "rider", count: 5, interval: 0.85, path: 0, delay: 0 },
      { kind: "rider", count: 4, interval: 0.85, path: 1, delay: 0.7 },
      { kind: "runner", count: 6, interval: 0.42, path: 0, delay: 1.2 },
    ],
  },
  {
    name: "Powder kegs",
    groups: [
      { kind: "bomber", count: 4, interval: 1.4, path: 0, delay: 0 },
      { kind: "scout", count: 8, interval: 0.28, path: 1, delay: 0.5 },
      { kind: "runner", count: 6, interval: 0.45, path: 0, delay: 2.2 },
    ],
  },
  {
    name: "Pincer",
    groups: [
      { kind: "runner", count: 8, interval: 0.4, path: 0, delay: 0 },
      { kind: "rider", count: 4, interval: 0.7, path: 1, delay: 0.3 },
      { kind: "swarm", count: 10, interval: 0.14, path: 1, delay: 2.0 },
    ],
  },
  {
    name: "Wagon train",
    groups: [
      { kind: "brute", count: 3, interval: 1.35, path: 0, delay: 0 },
      { kind: "brute", count: 3, interval: 1.35, path: 1, delay: 1.8 },
      { kind: "bomber", count: 3, interval: 1.2, path: 0, delay: 1.0 },
      { kind: "rider", count: 4, interval: 0.65, path: 1, delay: 0.6 },
    ],
  },
  {
    name: "Flash flood",
    groups: [
      { kind: "swarm", count: 8, interval: 0.12, path: 0, delay: 0 },
      { kind: "swarm", count: 8, interval: 0.12, path: 1, delay: 0 },
      { kind: "swarm", count: 8, interval: 0.12, path: 2, delay: 0.4 },
      { kind: "swarm", count: 8, interval: 0.12, path: 0, delay: 1.45 },
      { kind: "scout", count: 8, interval: 0.22, path: 1, delay: 1.6 },
      { kind: "bomber", count: 2, interval: 1.6, path: 0, delay: 2.4 },
    ],
  },
  {
    name: "Hard hats",
    groups: [
      { kind: "brute", count: 6, interval: 1.05, path: 0, delay: 0 },
      { kind: "rider", count: 5, interval: 0.6, path: 1, delay: 0.4 },
      { kind: "bomber", count: 3, interval: 1.2, path: 1, delay: 2.0 },
      { kind: "scout", count: 6, interval: 0.28, path: 2, delay: 0.8 },
    ],
  },
  {
    name: "Last call",
    groups: [
      { kind: "runner", count: 10, interval: 0.28, path: 0, delay: 0 },
      { kind: "brute", count: 5, interval: 0.95, path: 1, delay: 0 },
      { kind: "rider", count: 6, interval: 0.5, path: 0, delay: 2.4 },
      { kind: "swarm", count: 12, interval: 0.11, path: 1, delay: 3.0 },
      { kind: "bomber", count: 3, interval: 1.1, path: 0, delay: 5.0 },
      { kind: "runner", count: 8, interval: 0.32, path: 2, delay: 1.2 },
    ],
  },
  {
    name: "The Ironclad",
    groups: [
      { kind: "brute", count: 4, interval: 1.15, path: 0, delay: 0 },
      { kind: "rider", count: 4, interval: 0.7, path: 1, delay: 0.4 },
      { kind: "boss", count: 1, interval: 1, path: 0, delay: 3.6 },
      { kind: "bomber", count: 3, interval: 1.2, path: 1, delay: 4.5 },
      { kind: "swarm", count: 12, interval: 0.12, path: 0, delay: 7.5 },
      { kind: "scout", count: 8, interval: 0.22, path: 2, delay: 2.0 },
    ],
  },
  {
    name: "Wanted men",
    groups: [
      { kind: "outlaw", count: 6, interval: 0.85, path: 0, delay: 0 },
      { kind: "outlaw", count: 5, interval: 0.85, path: 1, delay: 0.5 },
      { kind: "scout", count: 8, interval: 0.26, path: 2, delay: 0.4 },
      { kind: "runner", count: 6, interval: 0.4, path: 0, delay: 3.2 },
    ],
  },
  {
    name: "Sappers on the ballast",
    groups: [
      { kind: "sapper", count: 4, interval: 1.25, path: 0, delay: 0 },
      { kind: "sapper", count: 3, interval: 1.25, path: 1, delay: 0.8 },
      { kind: "runner", count: 8, interval: 0.35, path: 2, delay: 0.4 },
      { kind: "swarm", count: 12, interval: 0.12, path: 0, delay: 2.4 },
    ],
  },
  {
    name: "Three ways in",
    groups: [
      { kind: "rider", count: 5, interval: 0.7, path: 0, delay: 0 },
      { kind: "brute", count: 4, interval: 1.15, path: 1, delay: 0.3 },
      { kind: "outlaw", count: 6, interval: 0.7, path: 2, delay: 0.5 },
      { kind: "swarm", count: 14, interval: 0.11, path: 1, delay: 2.8 },
    ],
  },
  {
    name: "The second iron",
    groups: [
      { kind: "brute", count: 4, interval: 1.1, path: 0, delay: 0 },
      { kind: "outlaw", count: 5, interval: 0.7, path: 1, delay: 0.4 },
      { kind: "bomber", count: 3, interval: 1.15, path: 2, delay: 1.0 },
      { kind: "boss", count: 1, interval: 1, path: 0, delay: 4.2 },
      { kind: "sapper", count: 3, interval: 1.2, path: 1, delay: 5.0 },
      { kind: "swarm", count: 12, interval: 0.12, path: 2, delay: 6.5 },
    ],
  },
  {
    name: "Flash powder",
    groups: [
      { kind: "bomber", count: 5, interval: 1.05, path: 0, delay: 0 },
      { kind: "bomber", count: 4, interval: 1.05, path: 2, delay: 0.8 },
      { kind: "scout", count: 10, interval: 0.22, path: 1, delay: 0.3 },
      { kind: "swarm", count: 16, interval: 0.1, path: 2, delay: 2.2 },
    ],
  },
  {
    name: "Engine crew",
    groups: [
      { kind: "sapper", count: 5, interval: 1.05, path: 0, delay: 0 },
      { kind: "brute", count: 4, interval: 1.1, path: 1, delay: 0.4 },
      { kind: "rider", count: 6, interval: 0.55, path: 2, delay: 0.6 },
      { kind: "outlaw", count: 6, interval: 0.65, path: 0, delay: 2.8 },
    ],
  },
  {
    name: "Night raid",
    groups: [
      { kind: "scout", count: 12, interval: 0.2, path: 0, delay: 0 },
      { kind: "rider", count: 7, interval: 0.5, path: 1, delay: 0.4 },
      { kind: "outlaw", count: 7, interval: 0.55, path: 2, delay: 0.6 },
      { kind: "swarm", count: 18, interval: 0.1, path: 0, delay: 2.4 },
    ],
  },
  {
    name: "Armored column",
    groups: [
      { kind: "brute", count: 6, interval: 0.95, path: 0, delay: 0 },
      { kind: "brute", count: 5, interval: 0.95, path: 1, delay: 0.8 },
      { kind: "sapper", count: 4, interval: 1.1, path: 2, delay: 0.5 },
      { kind: "bomber", count: 4, interval: 1.05, path: 1, delay: 2.2 },
      { kind: "boss", count: 1, interval: 1, path: 0, delay: 5.5 },
    ],
  },
  {
    name: "Pincer of three",
    groups: [
      { kind: "runner", count: 12, interval: 0.26, path: 0, delay: 0 },
      { kind: "rider", count: 7, interval: 0.48, path: 1, delay: 0.3 },
      { kind: "outlaw", count: 7, interval: 0.5, path: 2, delay: 0.4 },
      { kind: "brute", count: 5, interval: 1.0, path: 0, delay: 3.0 },
      { kind: "swarm", count: 16, interval: 0.1, path: 2, delay: 3.5 },
    ],
  },
  {
    name: "The works",
    groups: [
      { kind: "sapper", count: 5, interval: 0.95, path: 0, delay: 0 },
      { kind: "sapper", count: 4, interval: 0.95, path: 1, delay: 0.5 },
      { kind: "bomber", count: 5, interval: 1.0, path: 2, delay: 0.4 },
      { kind: "brute", count: 5, interval: 1.05, path: 0, delay: 2.2 },
      { kind: "outlaw", count: 8, interval: 0.48, path: 1, delay: 1.6 },
    ],
  },
  {
    name: "Last call west",
    groups: [
      { kind: "runner", count: 12, interval: 0.22, path: 0, delay: 0 },
      { kind: "brute", count: 6, interval: 0.9, path: 1, delay: 0 },
      { kind: "rider", count: 7, interval: 0.45, path: 2, delay: 0.5 },
      { kind: "outlaw", count: 7, interval: 0.48, path: 0, delay: 2.6 },
      { kind: "sapper", count: 4, interval: 1.0, path: 1, delay: 3.2 },
      { kind: "bomber", count: 4, interval: 1.0, path: 2, delay: 3.8 },
      { kind: "swarm", count: 16, interval: 0.1, path: 0, delay: 5.5 },
    ],
  },
  {
    name: "The Iron Engine",
    groups: [
      { kind: "brute", count: 5, interval: 1.05, path: 0, delay: 0 },
      { kind: "outlaw", count: 6, interval: 0.55, path: 1, delay: 0.4 },
      { kind: "sapper", count: 4, interval: 1.1, path: 2, delay: 0.8 },
      { kind: "engine", count: 1, interval: 1, path: 0, delay: 4.0 },
      { kind: "boss", count: 1, interval: 1, path: 1, delay: 7.5 },
      { kind: "bomber", count: 4, interval: 1.05, path: 2, delay: 5.5 },
      { kind: "swarm", count: 16, interval: 0.1, path: 0, delay: 9.0 },
      { kind: "rider", count: 6, interval: 0.5, path: 1, delay: 8.5 },
    ],
  },
];

export const TOWER_ORDER: TowerKind[] = [
  "gunner",
  "cannon",
  "slow",
  "sniper",
  "gatling",
  "dynamite",
  "oil",
  "harpoon",
  "beacon",
  "siege",
  "hotchkiss",
];

export const DEPOT_STAGE_NAME = ["Timber shack", "Expanded depot", "Fortified yard", "Iron fortress"] as const;

export function towerUnlocked(kind: TowerKind, wave: number, waveActive = false) {
  const available = waveActive ? wave : Math.max(1, wave + 1);
  return TOWERS[kind].unlockWave <= available;
}

export function depotStage(wave: number): DepotStage {
  if (wave >= 16) return 3;
  if (wave >= 12) return 2;
  if (wave >= 6) return 1;
  return 0;
}

export function actFor(wave: number): 1 | 2 | 3 {
  const n = Math.max(1, wave);
  if (n >= 17) return 3;
  if (n >= 9) return 2;
  return 1;
}

export function towerHotkey(index: number): string {
  if (index === 10) return "0";
  if (index === 11) return "-";
  return String(index);
}

export const CINE: Record<CineId, { src: string; poster: string; kicker: string; title: string }> = {
  intro: {
    src: "/art/cine/intro.mp4",
    poster: "/art/title.jpg",
    kicker: "The railhead",
    title: "Hold the depot.",
  },
  mid: {
    src: "/art/cine/mid.mp4",
    poster: "/art/cine/mid.jpg",
    kicker: "The line holds",
    title: "Raise the palisade.",
  },
  ironclad: {
    src: "/art/cine/ironclad.mp4",
    poster: "/art/cine/ironclad.jpg",
    kicker: "Heavy iron",
    title: "The Ironclad is coming.",
  },
  victory: {
    src: "/art/cine/victory.mp4",
    poster: "/art/victory.jpg",
    kicker: "All clear",
    title: "The depot holds.",
  },
  defeat: {
    src: "/art/cine/defeat.mp4",
    poster: "/art/defeat.jpg",
    kicker: "Overrun",
    title: "The line broke.",
  },
};
