import { useEffect, useRef, useState, type ReactNode } from "react";
import { DoorOpen, FastForward, Lock, Save, Trophy, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TOWER_ART } from "./art";
import { audio } from "./audio";
import { CINE, ENEMIES, SELL_RATE, TOTAL_WAVES, TOWER_ORDER, TOWERS, WAVES, towerUnlocked } from "./config";
import { armCineLock, cineLocked } from "./cineLock";
import {
  DEFAULT_CALLSIGN,
  cleanName,
  flushSave,
  formatWhen,
  peekSave,
  readSave,
  readScores,
  readSettings,
  renameScore,
  saveLabel,
  writeSettings,
  type ScoreRow,
} from "./persist";
import { sim } from "./sim";
import { useGame } from "./store";
import type { CineId, SpeedMult, TowerKind } from "./types";

export function Hud() {
  const cine = useGame((s) => s.cine);
  const phase = useGame((s) => s.phase);
  if (cine) return <CineOverlay id={cine} />;
  if (phase === "title") return <TitleScreen />;
  if (phase === "won" || phase === "lost") return <EndScreen />;
  return <PlayHud />;
}

export function startIntro() {
  audio.unlock();
  audio.setMuted(useGame.getState().muted);
  useGame.getState().setPlacing(null);
  useGame.getState().setSelected(null);
  useGame.getState().setLastRun(null);
  useGame.getState().setCine("intro");
}

export function beginRun() {
  audio.unlock();
  audio.setMuted(useGame.getState().muted);
  useGame.getState().setPlacing(null);
  useGame.getState().setSelected(null);
  useGame.getState().setLastRun(null);
  useGame.getState().setCine(null);
  sim.reset();
}

export function continueRun() {
  audio.unlock();
  audio.setMuted(useGame.getState().muted);
  useGame.getState().setPlacing(null);
  useGame.getState().setSelected(null);
  useGame.getState().setCine(null);
  const save = readSave();
  if (!save || !sim.hydrate(save)) {
    sim.reset();
  }
}

export function leaveYard() {
  const snap = sim.snapshot();
  if (snap) {
    flushSave(snap);
    useGame.getState().setSavedPulse(Date.now());
  }
  useGame.getState().setPlacing(null);
  useGame.getState().setSelected(null);
  useGame.getState().setCine(null);
  sim.parkToTitle();
}

export function skipCine() {
  const id = useGame.getState().cine;
  if (id) finishCine(id);
}

export function requestStartWave() {
  if (useGame.getState().cine || cineLocked()) return;
  if (sim.phase !== "prep") return;
  if (sim.wave === TOTAL_WAVES - 1) {
    useGame.getState().setCine("ironclad");
    return;
  }
  sim.startWave();
}

function finishCine(id: CineId) {
  if (useGame.getState().cine !== id) return;
  const { setCine } = useGame.getState();
  armCineLock();
  if (id === "intro") {
    setCine(null);
    sim.reset();
    return;
  }
  if (id === "ironclad") {
    setCine(null);
    sim.startWave();
    return;
  }
  setCine(null);
}

function TitleScreen() {
  const [pane, setPane] = useState<"play" | "ledger" | "confirm">("play");
  const [tick, setTick] = useState(0);
  const peek = peekSave();
  void tick;

  if (pane === "ledger") {
    return (
      <Cinematic src="/art/title.jpg" align="center">
        <LedgerCard
          onBack={() => setPane("play")}
          onPosted={() => setTick((n) => n + 1)}
        />
      </Cinematic>
    );
  }

  if (pane === "confirm") {
    return (
      <Cinematic src="/art/title.jpg">
        <div className="pointer-events-auto w-full max-w-sm rounded-[var(--radius-xl)] border border-border bg-bg/92 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">New yard</p>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-fg">Replace the saved campaign?</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Your posted marks stay on the ledger. The yard on the line will be overwritten.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Button className="h-12 w-full font-display text-lg tracking-wide" onClick={startIntro}>
              Start fresh
            </Button>
            <Button variant="outline" className="h-11 w-full" onClick={() => setPane("play")}>
              Keep the save
            </Button>
          </div>
        </div>
      </Cinematic>
    );
  }

  return (
    <Cinematic src="/art/title.jpg">
      <div className="flex w-full max-w-lg flex-col items-start">
        <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">MiX Mod Forge</p>
        <h1 className="mt-2 font-display text-5xl leading-[0.9] tracking-tight text-fg sm:text-7xl">
          IRON
          <br />
          REDOUBT
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
          Raiders are coming down the line. Plant what you can afford now. Fresh
          emplacements unlock as the dust thickens. Hold the depot.
        </p>
        <ul className="mt-5 space-y-1.5 text-sm text-muted">
          <li>Place on pads — corners cover more track.</li>
          <li>Seven guns. Later waves open the heavy ones.</li>
          <li>The yard autosaves. Marks post to the ledger.</li>
        </ul>
        <div className="mt-6 flex w-full max-w-sm flex-col gap-2">
          {peek ? (
            <Button
              className="h-12 w-full rounded-[var(--radius-md)] font-display text-lg tracking-wide"
              onClick={continueRun}
            >
              <span className="flex flex-col items-center leading-tight">
                <span>Continue</span>
                <span className="text-xs font-sans font-medium tracking-normal opacity-80">
                  {saveLabel(peek)}
                </span>
              </span>
            </Button>
          ) : null}
          <Button
            variant={peek ? "outline" : "default"}
            className="h-12 w-full rounded-[var(--radius-md)] font-display text-lg tracking-wide"
            onClick={() => (peek ? setPane("confirm") : startIntro())}
          >
            {peek ? "New yard" : "Hold the line"}
          </Button>
          <Button variant="ghost" className="h-11 w-full" onClick={() => setPane("ledger")}>
            <Trophy className="size-4" />
            The ledger
          </Button>
        </div>
      </div>
    </Cinematic>
  );
}

function EndScreen() {
  const phase = useGame((s) => s.phase);
  const wave = useGame((s) => s.wave);
  const kills = useGame((s) => s.kills);
  const lives = useGame((s) => s.lives);
  const lastRun = useGame((s) => s.lastRun);
  const [name, setName] = useState(() => lastRun?.name || readSettings().callsign || "");
  const [board, setBoard] = useState<ScoreRow[]>(() => readScores());
  const won = phase === "won";

  const commitName = (value: string) => {
    const next = cleanName(value) || DEFAULT_CALLSIGN;
    setName(next);
    writeSettings({ callsign: next });
    if (lastRun) {
      const rows = renameScore(lastRun.id, next);
      setBoard(rows);
      useGame.getState().setLastRun({ ...lastRun, name: next });
    }
  };

  return (
    <Cinematic src={won ? "/art/victory.jpg" : "/art/defeat.jpg"} align="center">
      <div className="pointer-events-auto w-full max-w-md rounded-[var(--radius-xl)] border border-border bg-bg/92 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
          {won ? "All clear" : "Overrun"}
        </p>
        <h2 className="mt-2 font-display text-4xl tracking-tight text-fg">
          {won ? "The depot holds." : "The line broke."}
        </h2>
        <dl className="mt-5 grid grid-cols-3 gap-2 text-center">
          <Stat label="Wave" value={`${wave}/12`} />
          <Stat label="Kills" value={String(kills)} />
          <Stat label="Depot" value={String(lives)} />
        </dl>
        {lastRun ? (
          <div className="mt-4 rounded-[var(--radius-sm)] bg-surface-2 px-3 py-3">
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="text-xs tracking-[0.16em] text-muted uppercase">Mark</div>
                <div className="font-display text-3xl tabular-nums text-fg">{lastRun.score}</div>
              </div>
              <div className="text-right text-sm text-muted">
                {lastRun.rank ? `${ordinal(lastRun.rank)} on the post` : "Off the post"}
              </div>
            </div>
            <label className="mt-3 block">
              <span className="text-xs tracking-[0.16em] text-muted uppercase">Callsign</span>
              <input
                value={name}
                maxLength={16}
                autoComplete="off"
                spellCheck={false}
                className="mt-1 h-11 w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                onChange={(e) => setName(e.target.value)}
                onBlur={(e) => commitName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.currentTarget.blur();
                  }
                }}
              />
            </label>
          </div>
        ) : null}
        <ScoreTable rows={board} highlight={lastRun?.id} compact />
        <Button
          className="mt-5 h-12 w-full rounded-[var(--radius-md)] font-display text-lg tracking-wide"
          onClick={beginRun}
        >
          Fight again
        </Button>
      </div>
    </Cinematic>
  );
}

function LedgerCard({ onBack, onPosted }: { onBack: () => void; onPosted?: () => void }) {
  const settings = readSettings();
  const [name, setName] = useState(settings.callsign);
  const rows = readScores();
  void onPosted;
  return (
    <div className="pointer-events-auto w-full max-w-md rounded-[var(--radius-xl)] border border-border bg-bg/92 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
      <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">The ledger</p>
      <h2 className="mt-2 font-display text-3xl tracking-tight text-fg">Marks on the post</h2>
      <ScoreTable rows={rows} />
      <label className="mt-4 block">
        <span className="text-xs tracking-[0.16em] text-muted uppercase">Your callsign</span>
        <input
          value={name}
          maxLength={16}
          autoComplete="off"
          spellCheck={false}
          placeholder={DEFAULT_CALLSIGN}
          className="mt-1 h-11 w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          onChange={(e) => setName(e.target.value)}
          onBlur={(e) => writeSettings({ callsign: cleanName(e.target.value) })}
        />
      </label>
      <Button variant="outline" className="mt-4 h-11 w-full" onClick={onBack}>
        Back
      </Button>
    </div>
  );
}

function ScoreTable({
  rows,
  highlight,
  compact,
}: {
  rows: ScoreRow[];
  highlight?: string;
  compact?: boolean;
}) {
  if (!rows.length) {
    return (
      <p className="mt-4 rounded-[var(--radius-sm)] bg-surface-2 px-3 py-4 text-sm text-muted">
        No marks on the post yet. Hold a wave and your name goes up.
      </p>
    );
  }
  return (
    <ol className={cn("mt-4 space-y-1", compact && "max-h-40 overflow-y-auto")}>
      {rows.map((r, i) => (
        <li
          key={r.id}
          className={cn(
            "grid grid-cols-[1.5rem_1fr_auto] items-baseline gap-2 rounded-[var(--radius-xs)] px-2 py-1.5 text-sm",
            r.id === highlight ? "bg-surface-2" : "",
          )}
        >
          <span className="font-display tabular-nums text-muted">{i + 1}</span>
          <span className="min-w-0 truncate text-fg">
            {r.name}
            {r.won ? <span className="ml-2 text-xs text-ok">Held</span> : null}
            <span className="ml-2 text-xs text-muted">W{r.wave}</span>
          </span>
          <span className="font-display tabular-nums text-fg">
            {r.score}
            <span className="ml-2 text-xs font-sans text-faint">{formatWhen(r.at)}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

function ordinal(n: number): string {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  if (n % 10 === 1) return `${n}st`;
  if (n % 10 === 2) return `${n}nd`;
  if (n % 10 === 3) return `${n}rd`;
  return `${n}th`;
}

function CineOverlay({ id }: { id: CineId }) {
  const meta = CINE[id];
  const muted = useGame((s) => s.muted);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = muted;
    const play = el.play();
    if (play) {
      play.catch(() => {
        el.muted = true;
        void el.play();
      });
    }
  }, [id, muted]);

  return (
    <div className="cine-overlay pointer-events-auto absolute inset-0 z-30 bg-bg">
      <video
        key={id}
        ref={videoRef}
        src={meta.src}
        poster={meta.poster}
        autoPlay
        playsInline
        muted={muted}
        className="absolute inset-0 h-full w-full object-cover"
        onEnded={() => finishCine(id)}
        onError={() => finishCine(id)}
      />
      <div className="cinematic-veil absolute inset-0" />
      <div className="absolute top-4 right-4 z-10 sm:top-8 sm:right-8">
        <Button variant="outline" onClick={() => finishCine(id)}>
          Skip
        </Button>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8">
        <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">{meta.kicker}</p>
        <h2 className="mt-1 font-display text-3xl tracking-tight text-fg sm:text-5xl">{meta.title}</h2>
      </div>
    </div>
  );
}

function Cinematic({
  src,
  children,
  align = "end",
}: {
  src: string;
  children: ReactNode;
  align?: "end" | "center";
}) {
  return (
    <div className="absolute inset-0 z-20">
      <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="cinematic-veil absolute inset-0" />
      <div
        className={cn(
          "absolute inset-0 flex p-4 sm:p-10",
          align === "center" ? "items-center justify-center" : "items-end justify-start",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-sm)] bg-surface-2 px-2 py-3">
      <div className="text-xs tracking-[0.16em] text-muted uppercase">{label}</div>
      <div className="mt-1 font-display text-2xl tabular-nums text-fg">{value}</div>
    </div>
  );
}

function PlayHud() {
  const gold = useGame((s) => s.gold);
  const lives = useGame((s) => s.lives);
  const maxLives = useGame((s) => s.maxLives);
  const wave = useGame((s) => s.wave);
  const totalWaves = useGame((s) => s.totalWaves);
  const waveName = useGame((s) => s.waveName);
  const waveActive = useGame((s) => s.waveActive);
  const remaining = useGame((s) => s.remaining);
  const banner = useGame((s) => s.banner);
  const speed = useGame((s) => s.speed);
  const muted = useGame((s) => s.muted);
  const placing = useGame((s) => s.placing);
  const selectedPlotId = useGame((s) => s.selectedPlotId);
  const savedPulse = useGame((s) => s.savedPulse);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!savedPulse) return;
    const t = window.setTimeout(() => setNow(Date.now()), 1800);
    return () => window.clearTimeout(t);
  }, [savedPulse]);

  const showSaved = savedPulse > 0 && now - savedPulse < 1600;
  const upcoming = WAVES[wave];
  const preview = upcoming ? summarize(upcoming) : "";

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute top-3 right-3 left-3 flex flex-col gap-1.5 sm:top-4 sm:right-4 sm:left-4">
        <div className="flex items-start justify-between gap-2">
          <div className="pointer-events-auto flex flex-wrap gap-2">
            <Chip>
              <img src="/art/hud/heart.jpg" alt="" className="size-5 rounded-full object-cover" />
              <span className="tabular-nums">
                {lives}
                <span className="text-muted">/{maxLives}</span>
              </span>
            </Chip>
            <Chip>
              <img src="/art/hud/coin.jpg" alt="" className="size-5 rounded-full object-cover" />
              <span className="text-xs tracking-[0.14em] text-muted">SCRIP</span>
              <span className="tabular-nums">{gold}</span>
            </Chip>
            {showSaved ? (
              <Chip>
                <Save className="size-3.5 text-ok" />
                <span className="text-xs tracking-wide text-ok">Saved</span>
              </Chip>
            ) : null}
          </div>
          <div className="pointer-events-auto flex gap-2">
            <SpeedControl speed={speed} />
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Save yard"
              onClick={manualSave}
            >
              <Save className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Save and leave"
              onClick={leaveYard}
            >
              <DoorOpen className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={() => {
                const next = !muted;
                useGame.getState().setMuted(next);
                audio.setMuted(next);
                writeSettings({ muted: next });
              }}
            >
              {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </Button>
          </div>
        </div>
        <div className="pointer-events-none text-center">
          <div className="font-display text-base leading-none tabular-nums text-fg sm:text-lg">
            WAVE {waveActive ? wave : Math.min(totalWaves, wave + 1)}
            <span className="text-muted">/{totalWaves}</span>
          </div>
          <div className="mt-1 truncate text-xs tracking-wide text-muted">
            {waveActive ? waveName : upcoming ? `Next — ${upcoming.name}` : waveName}
          </div>
        </div>
      </div>

      {banner ? (
        <div className="pointer-events-none absolute top-16 left-1/2 w-[min(90%,28rem)] -translate-x-1/2 text-center sm:top-20">
          <div className="inline-block rounded-[var(--radius-sm)] border border-border bg-bg/80 px-3 py-1.5 text-sm text-fg">
            {banner}
          </div>
        </div>
      ) : null}

      {selectedPlotId != null ? (
        <div className="absolute bottom-24 left-3 z-10 max-w-xs sm:bottom-24 sm:left-4">
          <SelectedPanel plotId={selectedPlotId} gold={gold} />
        </div>
      ) : null}

      <div className="absolute right-3 bottom-3 left-3 sm:right-4 sm:bottom-4 sm:left-4">
        <div className="pointer-events-auto flex items-stretch gap-1.5 rounded-[var(--radius-md)] border border-border bg-bg/88 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
          <div className="flex min-w-0 flex-1 items-stretch gap-1 overflow-x-auto">
            {TOWER_ORDER.map((kind) => (
              <TowerCard
                key={kind}
                kind={kind}
                gold={gold}
                wave={wave}
                waveActive={waveActive}
                active={placing === kind}
              />
            ))}
          </div>
          <Button
            variant="accent"
            className="h-auto min-h-14 w-24 shrink-0 rounded-[var(--radius-sm)] px-2 font-display tracking-wide sm:w-36"
            disabled={waveActive || !upcoming}
            onClick={() => requestStartWave()}
          >
            {waveActive ? (
              <span className="flex flex-col items-center leading-tight">
                <span>Incoming</span>
                <span className="text-xs font-sans font-medium tracking-normal opacity-80">
                  {remaining} on the line
                </span>
              </span>
            ) : (
              <span className="flex flex-col items-center leading-tight">
                <span>Wave {wave + 1}</span>
                <span className="max-w-28 truncate text-xs font-sans font-medium tracking-normal opacity-80">
                  {preview}
                </span>
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function manualSave() {
  const snap = sim.snapshot();
  if (!snap) return;
  if (flushSave(snap)) useGame.getState().setSavedPulse(Date.now());
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-sm)] border border-border bg-bg/85 px-2.5 text-sm font-medium text-fg">
      {children}
    </div>
  );
}

function SpeedControl({ speed }: { speed: SpeedMult }) {
  const opts: SpeedMult[] = [1, 2, 4];
  return (
    <div className="flex h-9 overflow-hidden rounded-[var(--radius-sm)] border border-border bg-bg/85">
      {opts.map((s) => (
        <button
          key={s}
          type="button"
          className={cn(
            "flex h-9 min-w-9 items-center justify-center px-2 text-xs font-medium tabular-nums",
            speed === s ? "bg-fg text-bg" : "text-muted hover:text-fg",
          )}
          onClick={() => {
            useGame.getState().setSpeed(s);
            writeSettings({ speed: s });
          }}
          aria-label={s === 4 ? "Fast forward" : `${s} times speed`}
        >
          {s === 4 ? <FastForward className="size-3.5" /> : `${s}×`}
        </button>
      ))}
    </div>
  );
}

function TowerCard({
  kind,
  gold,
  wave,
  waveActive,
  active,
}: {
  kind: TowerKind;
  gold: number;
  wave: number;
  waveActive: boolean;
  active: boolean;
}) {
  const def = TOWERS[kind];
  const unlocked = towerUnlocked(kind, wave, waveActive);
  const can = unlocked && gold >= def.cost;
  const idx = TOWER_ORDER.indexOf(kind) + 1;
  const justUnlocked = !waveActive && unlocked && def.unlockWave === Math.max(1, wave + 1) && def.unlockWave > 1;
  return (
    <button
      type="button"
      disabled={!unlocked}
      onClick={() => onPalette(kind)}
      title={
        unlocked
          ? `${def.name} — ${def.blurb}`
          : `${def.name} unlocks at wave ${def.unlockWave}`
      }
      aria-label={unlocked ? `${def.name}, ${def.cost} scrip` : `${def.name} locked until wave ${def.unlockWave}`}
      className={cn(
        "relative flex h-14 w-12 shrink-0 flex-col items-center justify-end overflow-hidden rounded-[var(--radius-xs)] border transition-[border-color,background-color,opacity] duration-[var(--motion-quick)] sm:h-16 sm:w-14",
        active ? "border-accent bg-surface-2" : "border-border bg-surface hover:border-muted",
        unlocked && !can && "opacity-45",
        !unlocked && "opacity-70",
      )}
    >
      <span className="absolute top-0.5 left-1 font-display text-xs leading-none text-faint tabular-nums">{idx}</span>
      <img src={TOWER_ART[kind]} alt="" className="size-9 object-contain sm:size-10" />
      <span className="pb-0.5 text-xs leading-none tabular-nums text-muted">
        {unlocked ? def.cost : `W${def.unlockWave}`}
      </span>
      {!unlocked ? (
        <span className="absolute inset-0 flex items-center justify-center bg-bg/65">
          <Lock className="size-3.5 text-fg" />
        </span>
      ) : null}
      {justUnlocked ? (
        <span className="absolute top-0.5 right-0.5 rounded-[var(--radius-xs)] bg-accent px-1 font-display text-xs leading-tight text-accent-fg">
          NEW
        </span>
      ) : null}
    </button>
  );
}

function SelectedPanel({ plotId, gold }: { plotId: number; gold: number }) {
  const buildRev = useGame((s) => s.buildRev);
  void buildRev;
  const tower = sim.towers.get(plotId);
  if (!tower) {
    return (
      <div className="pointer-events-auto rounded-[var(--radius-md)] border border-border bg-bg/88 px-3 py-2 text-sm text-muted">
        Empty pad. Pick a gun on the dock.
      </div>
    );
  }
  const def = TOWERS[tower.kind];
  const stats = def.stats[tower.tier]!;
  const next = tower.tier < 2 ? def.stats[tower.tier + 1] : null;
  const upCost = tower.tier === 0 ? def.upgradeCost[0] : tower.tier === 1 ? def.upgradeCost[1] : 0;
  const refund = Math.floor(tower.spent * SELL_RATE);
  return (
    <div className="pointer-events-auto rounded-[var(--radius-md)] border border-border bg-bg/90 p-2 shadow-[0_12px_32px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-2">
        <img
          src={TOWER_ART[tower.kind]}
          alt=""
          className="size-10 rounded-[var(--radius-xs)] object-contain bg-surface-2"
        />
        <div className="min-w-0 flex-1">
          <div className="font-display text-base leading-none tracking-wide text-fg">
            {def.name}
            <span className="ml-2 text-sm text-muted">Mk {tower.tier + 1}</span>
          </div>
          <p className="mt-1 text-xs text-muted tabular-nums">
            {stats.damage} dmg · {stats.rate.toFixed(1)}/s · r{stats.range.toFixed(1)}
          </p>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {next && upCost ? (
          <Button size="sm" disabled={gold < upCost} onClick={() => sim.upgrade(plotId)}>
            Reinforce {upCost}
          </Button>
        ) : (
          <span className="flex h-9 items-center px-1 text-xs tracking-wide text-muted uppercase">Fitted</span>
        )}
        <Button size="sm" variant="outline" onClick={() => sim.sell(plotId)}>
          Salvage {refund}
        </Button>
      </div>
    </div>
  );
}

function onPalette(kind: TowerKind) {
  if (cineLocked()) return;
  const state = useGame.getState();
  if (!towerUnlocked(kind, state.wave, state.waveActive)) return;
  const plotId = state.selectedPlotId;
  if (plotId != null && !sim.towers.has(plotId)) {
    if (sim.place(plotId, kind)) return;
  }
  state.setPlacing(state.placing === kind ? null : kind);
}

function summarize(wave: (typeof WAVES)[number]): string {
  const counts: Partial<Record<keyof typeof ENEMIES, number>> = {};
  for (const g of wave.groups) {
    counts[g.kind] = (counts[g.kind] ?? 0) + g.count;
  }
  return (Object.keys(counts) as Array<keyof typeof ENEMIES>)
    .map((k) => `${counts[k]} ${ENEMIES[k].name}`)
    .join(" · ");
}
