const TAU = Math.PI * 2;

type SampleName =
  | "gunner"
  | "cannon"
  | "sniper"
  | "death"
  | "boss_death"
  | "leak"
  | "wave"
  | "win"
  | "lose"
  | "wind";

const SAMPLE_FILES: Record<SampleName, string> = {
  gunner: "/sfx/sfx_gunner.wav",
  cannon: "/sfx/sfx_cannon.wav",
  sniper: "/sfx/sfx_sniper.wav",
  death: "/sfx/sfx_death.wav",
  boss_death: "/sfx/sfx_boss_death.wav",
  leak: "/sfx/sfx_leak.wav",
  wave: "/sfx/sfx_wave.wav",
  win: "/sfx/sfx_win.wav",
  lose: "/sfx/sfx_lose.wav",
  wind: "/sfx/bed_dust_wind.wav",
};

export class GameAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private sfx: GainNode | null = null;
  private music: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private ambient: { stop: () => void } | null = null;
  private samples = new Map<SampleName, AudioBuffer>();
  muted = false;
  unlocked = false;

  unlock() {
    if (!this.ctx) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctx({ latencyHint: "interactive" });
      this.master = this.ctx.createGain();
      this.sfx = this.ctx.createGain();
      this.music = this.ctx.createGain();
      this.sfx.gain.value = 0.7;
      this.music.gain.value = 0.28;
      this.master.gain.value = this.muted ? 0 : 0.85;
      this.sfx.connect(this.master);
      this.music.connect(this.master);
      this.master.connect(this.ctx.destination);
      this.noise = this.makeNoise(this.ctx);
      this.preloadSamples(this.ctx);
    }
    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
    this.unlocked = true;
    this.startAmbient();
  }

  private preloadSamples(ctx: AudioContext) {
    for (const name of Object.keys(SAMPLE_FILES) as SampleName[]) {
      fetch(SAMPLE_FILES[name])
        .then((r) => r.arrayBuffer())
        .then((buf) => ctx.decodeAudioData(buf))
        .then((decoded) => {
          this.samples.set(name, decoded);
          if (name === "wind" && this.ambient) this.restartAmbient();
        })
        .catch(() => {
          /* stays on the synthesized sound */
        });
    }
  }

  /** Plays a real sample if it has loaded; returns whether it did, so callers can fall back. */
  private playSample(name: SampleName, gain = 1): boolean {
    const e = this.env();
    const buf = this.samples.get(name);
    if (!e || !buf) return false;
    const src = e.ctx.createBufferSource();
    src.buffer = buf;
    const g = e.ctx.createGain();
    g.gain.value = gain;
    src.connect(g).connect(e.sfx);
    src.start(e.t);
    src.onended = () => {
      src.disconnect();
      g.disconnect();
    };
    return true;
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (!this.master || !this.ctx) return;
    this.master.gain.setTargetAtTime(muted ? 0 : 0.85, this.ctx.currentTime, 0.04);
  }

  resume() {
    if (this.ctx && this.ctx.state === "suspended") void this.ctx.resume();
  }

  private env(): { ctx: AudioContext; sfx: GainNode; music: GainNode; t: number } | null {
    if (!this.ctx || !this.sfx || !this.music) return null;
    return { ctx: this.ctx, sfx: this.sfx, music: this.music, t: this.ctx.currentTime };
  }

  playGun() {
    if (this.playSample("gunner", 0.5)) return;
    const e = this.env();
    if (!e) return;
    this.tone(e, 620 + Math.random() * 80, 0.045, 0.09, "square", 0.18);
    this.tone(e, 180 + Math.random() * 30, 0.03, 0.07, "triangle", 0.22);
  }

  playCannon() {
    if (this.playSample("cannon", 0.6)) return;
    const e = this.env();
    if (!e) return;
    this.noiseBurst(e, 0.16, 0.35, 400);
    this.tone(e, 90, 0.08, 0.28, "sine", 0.4);
    this.tone(e, 140, 0.04, 0.12, "triangle", 0.2);
  }

  playSniper() {
    if (this.playSample("sniper", 0.6)) return;
    const e = this.env();
    if (!e) return;
    this.tone(e, 980, 0.02, 0.16, "sawtooth", 0.12);
    this.tone(e, 240, 0.03, 0.18, "triangle", 0.22);
    this.noiseBurst(e, 0.05, 0.18, 1800);
  }

  playSlow() {
    const e = this.env();
    if (!e) return;
    this.tone(e, 420, 0.01, 0.12, "sine", 0.14);
    this.tone(e, 630, 0.02, 0.16, "sine", 0.08);
  }

  playDeath(kind: string) {
    if (kind === "boss") {
      if (this.playSample("boss_death", 0.7)) return;
      const e = this.env();
      if (!e) return;
      this.noiseBurst(e, 0.4, 0.55, 500);
      this.tone(e, 70, 0.1, 0.7, "sine", 0.5);
      this.tone(e, 110, 0.05, 0.45, "triangle", 0.25);
      return;
    }
    if (this.playSample("death", 0.35)) return;
    const e = this.env();
    if (!e) return;
    const base = kind === "brute" || kind === "bomber" ? 110 : kind === "swarm" ? 240 : kind === "scout" ? 280 : 170;
    this.noiseBurst(e, 0.07, kind === "brute" || kind === "bomber" ? 0.28 : 0.16, 700);
    this.tone(e, base, 0.02, 0.14, "triangle", 0.2);
  }

  playLeak() {
    if (this.playSample("leak", 0.55)) return;
    const e = this.env();
    if (!e) return;
    this.tone(e, 220, 0.01, 0.18, "square", 0.16);
    this.tone(e, 160, 0.08, 0.32, "sine", 0.22);
  }

  playWave() {
    if (this.playSample("wave", 0.6)) return;
    const e = this.env();
    if (!e) return;
    this.tone(e, 330, 0.01, 0.22, "triangle", 0.18);
    this.tone(e, 247, 0.12, 0.32, "triangle", 0.14);
    this.tone(e, 196, 0.28, 0.4, "sine", 0.16);
  }

  playPlace() {
    const e = this.env();
    if (!e) return;
    this.tone(e, 280, 0.01, 0.08, "triangle", 0.16);
    this.tone(e, 420, 0.04, 0.1, "sine", 0.1);
  }

  playUpgrade() {
    const e = this.env();
    if (!e) return;
    this.tone(e, 392, 0.01, 0.1, "triangle", 0.14);
    this.tone(e, 523, 0.08, 0.16, "triangle", 0.12);
  }

  playSell() {
    const e = this.env();
    if (!e) return;
    this.tone(e, 240, 0.01, 0.1, "sine", 0.12);
    this.tone(e, 180, 0.06, 0.14, "sine", 0.1);
  }

  playWin() {
    if (this.playSample("win", 0.7)) return;
    const e = this.env();
    if (!e) return;
    const notes = [262, 330, 392, 523];
    notes.forEach((n, i) => this.tone(e, n, 0.04 + i * 0.12, 0.35, "triangle", 0.18));
  }

  playLose() {
    if (this.playSample("lose", 0.7)) return;
    const e = this.env();
    if (!e) return;
    const notes = [196, 165, 130];
    notes.forEach((n, i) => this.tone(e, n, 0.02 + i * 0.18, 0.4, "triangle", 0.2));
  }

  playDeny() {
    const e = this.env();
    if (!e) return;
    this.tone(e, 140, 0.01, 0.08, "square", 0.08);
  }

  private restartAmbient() {
    if (this.ambient) this.ambient.stop();
    this.ambient = null;
    this.startAmbient();
  }

  private startAmbient() {
    const e = this.env();
    if (!e || this.ambient) return;
    const { ctx, music } = e;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 240;
    filter.Q.value = 0.6;
    filter.connect(music);

    const o1 = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    const g1 = ctx.createGain();
    const g2 = ctx.createGain();
    o1.type = "sine";
    o2.type = "sine";
    o1.frequency.value = 55;
    o2.frequency.value = 82.4;
    g1.gain.value = 0.12;
    g2.gain.value = 0.07;
    o1.connect(g1).connect(filter);
    o2.connect(g2).connect(filter);
    o1.start();
    o2.start();

    const wind = ctx.createBufferSource();
    const wg = ctx.createGain();
    const wf = ctx.createBiquadFilter();
    wind.buffer = this.samples.get("wind") ?? this.noise;
    wind.loop = true;
    wf.type = "bandpass";
    wf.frequency.value = 900;
    wf.Q.value = 0.5;
    wg.gain.value = 0.045;
    wind.connect(wf).connect(wg).connect(music);
    wind.start();

    this.ambient = {
      stop: () => {
        try {
          o1.stop();
          o2.stop();
          wind.stop();
        } catch {
          /* already stopped */
        }
      },
    };
  }

  private tone(
    e: { ctx: AudioContext; sfx: GainNode; t: number },
    freq: number,
    delay: number,
    dur: number,
    type: OscillatorType,
    gain: number,
  ) {
    const osc = e.ctx.createOscillator();
    const g = e.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq * (0.97 + Math.random() * 0.06);
    const t0 = e.t + delay;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(e.sfx);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
    osc.onended = () => {
      osc.disconnect();
      g.disconnect();
    };
  }

  private noiseBurst(
    e: { ctx: AudioContext; sfx: GainNode; t: number },
    dur: number,
    gain: number,
    cutoff: number,
  ) {
    if (!this.noise) return;
    const src = e.ctx.createBufferSource();
    src.buffer = this.noise;
    const f = e.ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = cutoff;
    const g = e.ctx.createGain();
    const t0 = e.t;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f).connect(g).connect(e.sfx);
    src.start(t0);
    src.stop(t0 + dur + 0.02);
    src.onended = () => {
      src.disconnect();
      f.disconnect();
      g.disconnect();
    };
  }

  private makeNoise(ctx: AudioContext): AudioBuffer {
    const buf = ctx.createBuffer(1, ctx.sampleRate * 1.2, ctx.sampleRate);
    const data = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      last = last * 0.96 + (Math.random() * 2 - 1) * 0.04;
      data[i] = last + (Math.random() * 2 - 1) * 0.15;
    }
    return buf;
  }
}

export const audio = new GameAudio();

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") audio.resume();
  });
}

void TAU;
