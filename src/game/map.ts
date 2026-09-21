import type { Plot, Vec2 } from "./types";

export const PATHS: Vec2[][] = [
  [
    { x: -1.4, z: 3.0 },
    { x: 2.6, z: 3.0 },
    { x: 2.6, z: 8.2 },
    { x: 6.8, z: 8.2 },
    { x: 6.8, z: 3.8 },
    { x: 11.2, z: 3.8 },
    { x: 11.2, z: 9.0 },
    { x: 16.5, z: 9.0 },
  ],
  [
    { x: 8.6, z: -1.4 },
    { x: 8.6, z: 3.8 },
    { x: 11.2, z: 3.8 },
    { x: 11.2, z: 9.0 },
    { x: 16.5, z: 9.0 },
  ],
];

export const PLOTS: Plot[] = [
  { id: 1, x: 1.15, z: 1.55 },
  { id: 2, x: 1.15, z: 4.45 },
  { id: 3, x: 4.05, z: 1.55 },
  { id: 4, x: 4.05, z: 4.45 },
  { id: 5, x: 1.15, z: 6.7 },
  { id: 6, x: 1.15, z: 9.65 },
  { id: 7, x: 4.05, z: 6.55 },
  { id: 8, x: 4.05, z: 9.65 },
  { id: 9, x: 5.45, z: 6.55 },
  { id: 10, x: 8.15, z: 6.55 },
  { id: 11, x: 8.15, z: 2.15 },
  { id: 12, x: 9.95, z: 2.15 },
  { id: 13, x: 9.95, z: 5.45 },
  { id: 14, x: 12.7, z: 2.25 },
  { id: 15, x: 12.7, z: 5.55 },
  { id: 16, x: 12.7, z: 7.55 },
  { id: 17, x: 12.7, z: 10.65 },
  { id: 18, x: 14.85, z: 7.2 },
  { id: 19, x: 14.85, z: 10.65 },
];

export const DEPOT = { x: 17.35, z: 9.0 };
export const MAP_CENTER = { x: 8.1, z: 5.4 };

export interface PathSample {
  x: number;
  z: number;
  heading: number;
  done: boolean;
  length: number;
}

interface PathCache {
  pts: Vec2[];
  cum: number[];
  length: number;
}

function buildCache(pts: Vec2[]): PathCache {
  const cum = [0];
  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]!;
    const b = pts[i]!;
    len += Math.hypot(b.x - a.x, b.z - a.z);
    cum.push(len);
  }
  return { pts, cum, length: len };
}

export const PATH_CACHE: PathCache[] = PATHS.map(buildCache);

export function samplePath(pathIndex: number, s: number): PathSample {
  const cache = PATH_CACHE[pathIndex] ?? PATH_CACHE[0]!;
  const length = cache.length;
  if (s >= length) {
    const last = cache.pts[cache.pts.length - 1]!;
    const prev = cache.pts[cache.pts.length - 2] ?? last;
    return {
      x: last.x,
      z: last.z,
      heading: Math.atan2(last.x - prev.x, last.z - prev.z),
      done: true,
      length,
    };
  }
  const clamped = Math.max(0, s);
  const { pts, cum } = cache;
  let i = 1;
  while (i < cum.length && cum[i]! < clamped) i++;
  const a = pts[i - 1]!;
  const b = pts[i]!;
  const segStart = cum[i - 1]!;
  const segLen = Math.max(1e-6, cum[i]! - segStart);
  const t = (clamped - segStart) / segLen;
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  return {
    x: a.x + dx * t,
    z: a.z + dz * t,
    heading: Math.atan2(dx, dz),
    done: false,
    length,
  };
}

export function plotById(id: number): Plot | undefined {
  return PLOTS.find((p) => p.id === id);
}
