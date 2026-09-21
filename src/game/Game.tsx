import { useEffect, useRef } from "react";
import { Hud, beginRun, requestStartWave, skipCine, startIntro } from "./Hud";
import { audio } from "./audio";
import { TOWER_ORDER } from "./config";
import { sim } from "./sim";
import { useGame } from "./store";
import { GameView } from "./view";
import type { CineId, SpeedMult, TowerKind } from "./types";

export function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const view = new GameView(canvas);
    const w = window as Window & {
      __iron?: {
        place: (id: number, kind: TowerKind) => boolean;
        start: () => boolean;
        upgrade: (id: number) => boolean;
        cine: (id: CineId) => void;
      };
    };
    w.__iron = {
      place: (id, kind) => sim.place(id, kind),
      start: () => {
        requestStartWave();
        return true;
      },
      upgrade: (id) => sim.upgrade(id),
      cine: (id) => useGame.getState().setCine(id),
    };
    return () => {
      delete w.__iron;
      view.dispose();
    };
  }, []);

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      const state = useGame.getState();
      if (ev.code === "KeyM") {
        const next = !state.muted;
        state.setMuted(next);
        audio.setMuted(next);
        return;
      }
      if (state.cine) {
        if (ev.code === "Enter" || ev.code === "Space" || ev.code === "Escape") {
          ev.preventDefault();
          skipCine();
        }
        return;
      }
      if (state.phase === "title" && (ev.code === "Enter" || ev.code === "Space")) {
        ev.preventDefault();
        startIntro();
        return;
      }
      if (state.phase === "won" || state.phase === "lost") {
        if (ev.code === "Enter" || ev.code === "Space") {
          ev.preventDefault();
          beginRun();
        }
        return;
      }
      if (state.phase !== "prep" && state.phase !== "combat") return;
      if (ev.code === "Escape") {
        state.setPlacing(null);
        state.setSelected(null);
        return;
      }
      if (ev.code === "Space") {
        ev.preventDefault();
        requestStartWave();
        return;
      }
      if (ev.code.startsWith("Digit")) {
        const n = Number(ev.code.slice(-1));
        if (n >= 1 && n <= TOWER_ORDER.length) {
          const kind = TOWER_ORDER[n - 1];
          if (kind) {
            const plotId = state.selectedPlotId;
            if (plotId != null && !sim.towers.has(plotId)) {
              sim.place(plotId, kind);
            } else {
              state.setPlacing(state.placing === kind ? null : kind);
            }
          }
        }
        return;
      }
      if (ev.code === "KeyU" && state.selectedPlotId != null) {
        sim.upgrade(state.selectedPlotId);
        return;
      }
      if (ev.code === "KeyX" && state.selectedPlotId != null) {
        sim.sell(state.selectedPlotId);
        return;
      }
      if (ev.code === "KeyF") {
        const cycle: SpeedMult[] = [1, 2, 4];
        const i = cycle.indexOf(state.speed);
        state.setSpeed(cycle[(i + 1) % cycle.length]!);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-bg text-fg select-none">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none bg-sky" />
      <Hud />
    </div>
  );
}
