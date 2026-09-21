import type { EnemyKind, Phase, SpeedMult, TowerKind, TowerTier } from "./types";
import { ENEMIES, TOWERS, TOTAL_WAVES } from "./config";

export const SAVE_VERSION = 1;
export const SETTINGS_VERSION = 1;
export const MAX_SCORES = 10;
export const DEFAULT_CALLSIGN = "Hand";

const SAVE_KEY = "iron-redoubt:save";
const SAVE_BAK = "iron-redoubt:save.bak";
const SCORES_KEY = "iron-redoubt:scores";
const SETTINGS_KEY = "iron-redoubt:settings";

export interface SavedTower {
  plotId: number;
  kind: TowerKind;
  tier: TowerTier;
  spent: number;
  yaw: number;
  cooldown: number;
}

export interface SavedEnemy {
  id: number;
  kind: EnemyKind;
  hp: number;
  maxHp: number;
  speed: number;
  path: number;
  s: number;
  lane: number;
  gold: number;
  radius: number;
  slowUntil: number;
  slowMul: number;
  enraged: boolean;
  bob: number;
}

export interface SavedSpawn {
  time: number;
  kind: EnemyKind;
  path: number;
}

export interface GameSave {
  version: number;
  savedAt: number;
  phase: "prep" | "combat";
  gold: number;
  lives: number;
  maxLives: number;
  wave: number;
  waveName: string;
  waveTime: number;
  spawning: boolean;
  kills: number;
  time: number;
  nextId: number;
  spawnI: number;
  expectedInWave: number;
  towers: SavedTower[];
  enemies: SavedEnemy[];
  spawnQ: SavedSpawn[];
}

export interface SavePeek {
  savedAt: number;
  phase: "prep" | "combat";
  wave: number;
  gold: number;
  lives: number;
  kills: number;
  towers: number;
}

export interface ScoreRow {
  id: string;
  name: string;
  score: number;
  wave: number;
  kills: number;
  lives: number;
  gold: number;
  won: boolean;
  at: number;
}

export interface LastRun extends ScoreRow {
  rank: number | null;
}

export interface Settings {
  version: number;
  muted: boolean;
  speed: SpeedMult;
  callsign: string;
}

const defaultSettings: Settings = {
  version: SETTINGS_VERSION,
  muted: false,
  speed: 1,
  callsign: "",
};

let saveTimer: ReturnType<typeof setTimeout> | null = null;
let pendingSave: GameSave | null = null;

function canStore(): boolean {
  try {
    return typeof localStorage !== "undefined";
  } catch {
    return false;
  }
}

function readJson<T>(key: string): T | null {
  if (!canStore()) return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): boolean {
  if (!canStore()) return false;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function migrateSave(raw: unknown): GameSave | null {
  if (!raw || typeof raw !== "object") return null;
  const s = raw as Partial<GameSave>;
  const version = typeof s.version === "number" ? s.version : 0;
  if (version > SAVE_VERSION) return null;
  const phase = s.phase === "combat" ? "combat" : s.phase === "prep" ? "prep" : null;
  if (!phase) return null;
  if (typeof s.wave !== "number" || s.wave < 0 || s.wave > TOTAL_WAVES) return null;
  const towers = Array.isArray(s.towers) ? s.towers.filter(validTower) : [];
  const enemies = Array.isArray(s.enemies) ? s.enemies.filter(validEnemy) : [];
  const spawnQ = Array.isArray(s.spawnQ) ? s.spawnQ.filter(validSpawn) : [];
  return {
    version: SAVE_VERSION,
    savedAt: typeof s.savedAt === "number" ? s.savedAt : Date.now(),
    phase,
    gold: num(s.gold, 0),
    lives: num(s.lives, 0),
    maxLives: num(s.maxLives, 20),
    wave: s.wave,
    waveName: typeof s.waveName === "string" ? s.waveName : "",
    waveTime: num(s.waveTime, 0),
    spawning: Boolean(s.spawning),
    kills: num(s.kills, 0),
    time: num(s.time, 0),
    nextId: Math.max(1, num(s.nextId, 1)),
    spawnI: Math.max(0, num(s.spawnI, 0)),
    expectedInWave: num(s.expectedInWave, 0),
    towers,
    enemies,
    spawnQ,
  };
}

function num(v: unknown, d: number): number {
  return typeof v === "number" && Number.isFinite(v) ? v : d;
}

function validTower(t: unknown): t is SavedTower {
  if (!t || typeof t !== "object") return false;
  const x = t as SavedTower;
  return (
    typeof x.plotId === "number" &&
    x.kind in TOWERS &&
    (x.tier === 0 || x.tier === 1 || x.tier === 2) &&
    typeof x.spent === "number"
  );
}

function validEnemy(e: unknown): e is SavedEnemy {
  if (!e || typeof e !== "object") return false;
  const x = e as SavedEnemy;
  return typeof x.id === "number" && x.kind in ENEMIES && typeof x.s === "number" && x.s >= 0;
}

function validSpawn(s: unknown): s is SavedSpawn {
  if (!s || typeof s !== "object") return false;
  const x = s as SavedSpawn;
  return typeof x.time === "number" && x.kind in ENEMIES && (x.path === 0 || x.path === 1);
}

export function readSave(): GameSave | null {
  const primary = migrateSave(readJson<unknown>(SAVE_KEY));
  if (primary) return primary;
  return migrateSave(readJson<unknown>(SAVE_BAK));
}

export function peekSave(): SavePeek | null {
  const s = readSave();
  if (!s) return null;
  return {
    savedAt: s.savedAt,
    phase: s.phase,
    wave: s.wave,
    gold: s.gold,
    lives: s.lives,
    kills: s.kills,
    towers: s.towers.length,
  };
}

export function writeSave(data: GameSave): boolean {
  if (data.phase !== "prep" && data.phase !== "combat") return false;
  const blob: GameSave = { ...data, version: SAVE_VERSION, savedAt: Date.now() };
  if (!canStore()) return false;
  try {
    const prev = localStorage.getItem(SAVE_KEY);
    if (prev) localStorage.setItem(SAVE_BAK, prev);
    localStorage.setItem(SAVE_KEY, JSON.stringify(blob));
    return true;
  } catch {
    return false;
  }
}

export function queueSave(data: GameSave) {
  pendingSave = data;
  if (saveTimer != null) return;
  saveTimer = setTimeout(() => {
    saveTimer = null;
    if (pendingSave) {
      writeSave(pendingSave);
      pendingSave = null;
    }
  }, 900);
}

export function flushSave(data?: GameSave): boolean {
  if (saveTimer != null) {
    clearTimeout(saveTimer);
    saveTimer = null;
  }
  const next = data ?? pendingSave;
  pendingSave = null;
  if (!next) return false;
  return writeSave(next);
}

export function clearSave() {
  if (saveTimer != null) {
    clearTimeout(saveTimer);
    saveTimer = null;
  }
  pendingSave = null;
  if (!canStore()) return;
  try {
    localStorage.removeItem(SAVE_KEY);
    localStorage.removeItem(SAVE_BAK);
  } catch {
    /* private mode */
  }
}

export function computeScore(p: {
  wave: number;
  kills: number;
  lives: number;
  gold: number;
  won: boolean;
}): number {
  return p.kills * 12 + p.wave * 80 + p.lives * 40 + Math.floor(Math.max(0, p.gold) * 0.2) + (p.won ? 600 : 0);
}

export function cleanName(raw: string): string {
  return raw
    .replace(/[^\p{L}\p{N} \-']/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 16);
}

export function readScores(): ScoreRow[] {
  const rows = readJson<unknown>(SCORES_KEY);
  if (!Array.isArray(rows)) return [];
  return rows
    .filter((r): r is ScoreRow => {
      if (!r || typeof r !== "object") return false;
      const x = r as ScoreRow;
      return typeof x.id === "string" && typeof x.score === "number" && typeof x.wave === "number";
    })
    .map((r) => ({
      id: r.id,
      name: cleanName(r.name) || DEFAULT_CALLSIGN,
      score: r.score,
      wave: r.wave,
      kills: r.kills ?? 0,
      lives: r.lives ?? 0,
      gold: r.gold ?? 0,
      won: Boolean(r.won),
      at: typeof r.at === "number" ? r.at : 0,
    }))
    .sort(byScore)
    .slice(0, MAX_SCORES);
}

function byScore(a: ScoreRow, b: ScoreRow) {
  if (b.score !== a.score) return b.score - a.score;
  if (Number(b.won) !== Number(a.won)) return Number(b.won) - Number(a.won);
  return b.at - a.at;
}

export function recordScore(input: Omit<ScoreRow, "id" | "score" | "at"> & { name?: string }): LastRun {
  const name = cleanName(input.name ?? "") || DEFAULT_CALLSIGN;
  const row: ScoreRow = {
    id: `s${Date.now().toString(36)}${Math.floor(Math.random() * 36).toString(36)}`,
    name,
    score: computeScore(input),
    wave: input.wave,
    kills: input.kills,
    lives: input.lives,
    gold: input.gold,
    won: input.won,
    at: Date.now(),
  };
  const board = [...readScores(), row].sort(byScore).slice(0, MAX_SCORES);
  writeJson(SCORES_KEY, board);
  const rankIndex = board.findIndex((r) => r.id === row.id);
  return { ...row, rank: rankIndex >= 0 ? rankIndex + 1 : null };
}

export function renameScore(id: string, name: string): ScoreRow[] {
  const next = cleanName(name) || DEFAULT_CALLSIGN;
  const board = readScores().map((r) => (r.id === id ? { ...r, name: next } : r));
  writeJson(SCORES_KEY, board);
  return board;
}

export function readSettings(): Settings {
  const raw = readJson<Partial<Settings>>(SETTINGS_KEY);
  if (!raw || typeof raw !== "object") return { ...defaultSettings };
  const speed: SpeedMult = raw.speed === 2 || raw.speed === 4 ? raw.speed : 1;
  return {
    version: SETTINGS_VERSION,
    muted: Boolean(raw.muted),
    speed,
    callsign: typeof raw.callsign === "string" ? cleanName(raw.callsign) : "",
  };
}

export function writeSettings(patch: Partial<Settings>): Settings {
  const next = { ...readSettings(), ...patch, version: SETTINGS_VERSION };
  if (typeof next.callsign === "string") next.callsign = cleanName(next.callsign);
  writeJson(SETTINGS_KEY, next);
  return next;
}

export function playable(phase: Phase): phase is "prep" | "combat" {
  return phase === "prep" || phase === "combat";
}

export function formatWhen(at: number): string {
  if (!at) return "";
  try {
    return new Date(at).toLocaleDateString(undefined, { day: "numeric", month: "short" });
  } catch {
    return "";
  }
}

export function saveLabel(peek: SavePeek): string {
  const wave = peek.phase === "combat" ? peek.wave : Math.min(TOTAL_WAVES, peek.wave + 1);
  const guns = peek.towers === 1 ? "1 gun" : `${peek.towers} guns`;
  if (peek.phase === "combat") return `Wave ${wave} incoming · ${guns}`;
  if (peek.wave <= 0) return `Yard ready · ${guns}`;
  return `After wave ${peek.wave} · ${guns} · ${peek.gold} scrip`;
}
