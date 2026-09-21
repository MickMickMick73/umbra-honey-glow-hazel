import { useEffect, useRef } from "react";
import { Hud, beginRun, continueRun, leaveYard, requestStartWave, skipCine, startIntro } from "./Hud";
import { audio } from "./audio";
import { TOWER_ORDER } from "./config";
import { sim } from "./sim";
import { useGame } from "./store";
import { GameView } from "./view";
import { flushSave, peekSave, playable, readSettings, writeSettings } from "./persist";
import type { CineId, SpeedMult, TowerKind } from "./types";

export function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const settings = readSettings();
    useGame.getState().setMuted(settings.muted);
    useGame.getState().setSpeed(settings.speed);
    audio.setMuted(settings.muted);
  }, []);

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
        save: () => boolean;
        load: () => void;
        leave: () => void;
        peek: () => ReturnType<typeof peekSave>;
        wave: (n: number) => void;
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
      save: () => {
        const snap = sim.snapshot();
        if (!snap) return false;
        const ok = flushSave(snap);
        if (ok) useGame.getState().setSavedPulse(Date.now());
        return ok;
      },
      load: () => continueRun(),
      leave: () => leaveYard(),
      peek: () => peekSave(),
      wave: (n) => {
        sim.wave = Math.max(0, Math.min(n, 24));
        sim.flushHud();
      },
    };
    return () => {
      delete w.__iron;
      view.dispose();
    };
  }, []);

  useEffect(() => {
    const persistNow = () => {
      if (!playable(sim.phase)) return;
      const snap = sim.snapshot();
      if (snap) flushSave(snap);
      const state = useGame.getState();
      writeSettings({ muted: state.muted, speed: state.speed });
    };
    const onVis = () => {
      if (document.visibilityState === "hidden") persistNow();
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", persistNow);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", persistNow);
    };
  }, []);

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      const state = useGame.getState();
      if (ev.code === "KeyM") {
        const next = !state.muted;
        state.setMuted(next);
        audio.setMuted(next);
        writeSettings({ muted: next });
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
        if (peekSave()) continueRun();
        else startIntro();
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
      if (ev.code === "KeyS" && (ev.metaKey || ev.ctrlKey)) {
        ev.preventDefault();
        const snap = sim.snapshot();
        if (snap && flushSave(snap)) useGame.getState().setSavedPulse(Date.now());
        return;
      }
      if (ev.code === "Space") {
        ev.preventDefault();
        requestStartWave();
        return;
      }
      if (ev.code.startsWith("Digit") || ev.code === "Minus") {
        const n = ev.code === "Minus" ? 11 : ev.code === "Digit0" ? 10 : Number(ev.code.slice(-1));
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
        const next = cycle[(i + 1) % cycle.length]!;
        state.setSpeed(next);
        writeSettings({ speed: next });
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
