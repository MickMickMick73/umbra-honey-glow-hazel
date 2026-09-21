import { create } from "zustand";
import type { CineId, Phase, SpeedMult, TowerKind } from "./types";
import { TOTAL_WAVES } from "./config";
import type { LastRun } from "./persist";

export interface HudSnapshot {
  phase: Phase;
  gold: number;
  lives: number;
  maxLives: number;
  wave: number;
  totalWaves: number;
  waveName: string;
  waveActive: boolean;
  remaining: number;
  kills: number;
  buildRev: number;
  banner: string | null;
}

interface GameStore extends HudSnapshot {
  speed: SpeedMult;
  muted: boolean;
  placing: TowerKind | null;
  selectedPlotId: number | null;
  hoveredPlotId: number | null;
  cine: CineId | null;
  lastRun: LastRun | null;
  savedPulse: number;
  setSpeed: (s: SpeedMult) => void;
  setMuted: (m: boolean) => void;
  setPlacing: (k: TowerKind | null) => void;
  setSelected: (id: number | null) => void;
  setHovered: (id: number | null) => void;
  setCine: (c: CineId | null) => void;
  setLastRun: (run: LastRun | null) => void;
  setSavedPulse: (t: number) => void;
  applyHud: (snap: Partial<HudSnapshot>) => void;
}

const hudDefaults: HudSnapshot = {
  phase: "title",
  gold: 0,
  lives: 0,
  maxLives: 20,
  wave: 0,
  totalWaves: TOTAL_WAVES,
  waveName: "",
  waveActive: false,
  remaining: 0,
  kills: 0,
  buildRev: 0,
  banner: null,
};

export const useGame = create<GameStore>((set) => ({
  ...hudDefaults,
  speed: 1,
  muted: false,
  placing: null,
  selectedPlotId: null,
  hoveredPlotId: null,
  cine: null,
  lastRun: null,
  savedPulse: 0,
  setSpeed: (speed) => set({ speed }),
  setMuted: (muted) => set({ muted }),
  setPlacing: (placing) => set({ placing }),
  setSelected: (selectedPlotId) => set({ selectedPlotId }),
  setHovered: (hoveredPlotId) => set({ hoveredPlotId }),
  setCine: (cine) => set({ cine }),
  setLastRun: (lastRun) => set({ lastRun }),
  setSavedPulse: (savedPulse) => set({ savedPulse }),
  applyHud: (snap) => set(snap),
}));
