import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Save, c as DoorOpen, n as Volume2, o as Lock, r as Trophy, s as FastForward, t as VolumeX } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { A as Texture, C as RepeatWrapping, D as SphereGeometry, E as Scene, F as Vector3, M as Timer, N as TubeGeometry, O as Sprite, P as Vector2, S as Raycaster, T as SRGBColorSpace, _ as MeshBasicMaterial, a as CatmullRomCurve3, b as OrthographicCamera, c as ConeGeometry, d as DynamicDrawUsage, f as Fog, g as Mesh, h as InstancedMesh, i as BoxGeometry, j as TextureLoader, k as SpriteMaterial, l as CylinderGeometry, m as HemisphereLight, n as WebGLRenderer, o as ClampToEdgeWrapping, p as Group, r as AmbientLight, s as Color, t as mergeGeometries, u as DirectionalLight, v as MeshStandardMaterial, w as RingGeometry, x as PlaneGeometry, y as Object3D } from "../_libs/three.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dk-JqjAl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,color,border-color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-fg text-bg hover:opacity-90",
			accent: "bg-accent text-accent-fg hover:opacity-90",
			outline: "border border-border bg-surface text-fg hover:bg-surface-2",
			ghost: "text-fg hover:bg-surface-2",
			subtle: "bg-surface-2 text-fg hover:bg-border"
		},
		size: {
			default: "h-11 rounded-[var(--radius-sm)] px-4 text-sm",
			sm: "h-9 rounded-[var(--radius-xs)] px-3 text-xs",
			lg: "h-12 rounded-[var(--radius-md)] px-5 text-base",
			icon: "size-11 rounded-[var(--radius-sm)]",
			"icon-sm": "size-9 rounded-[var(--radius-xs)]"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		ref,
		...props
	});
});
Button.displayName = "Button";
var loader = new TextureLoader();
loader.setCrossOrigin("anonymous");
function tex(url, repeat = 1, wrap = true) {
	const t = loader.load(url);
	t.colorSpace = SRGBColorSpace;
	t.anisotropy = 8;
	if (wrap) {
		t.wrapS = t.wrapT = RepeatWrapping;
		t.repeat.set(repeat, repeat);
	} else t.wrapS = t.wrapT = ClampToEdgeWrapping;
	return t;
}
function sprite(url) {
	const t = loader.load(url);
	t.colorSpace = SRGBColorSpace;
	t.anisotropy = 4;
	t.premultiplyAlpha = false;
	return t;
}
function sheet(dir, slug) {
	return [
		1,
		2,
		3,
		4
	].map((i) => sprite(`${dir}/${slug}-${i}.png`));
}
function loadArt() {
	return {
		sky: tex("/art/sky.jpg", 1, false),
		horizon: tex("/art/horizon.jpg", 1, false),
		wood: tex("/art/tex/wood.jpg", 1.6),
		iron: tex("/art/tex/iron.jpg", 1.8),
		rust: tex("/art/tex/rust.jpg", 1.7),
		dirt: tex("/art/tex/dirt.jpg", 5.5),
		sandbag: tex("/art/tex/sandbag.jpg", 1.2),
		brass: tex("/art/tex/brass.jpg", 1.5),
		leather: tex("/art/tex/leather.jpg", 1.8),
		sage: tex("/art/tex/sage.jpg", 2.2),
		plants: [...[
			1,
			2,
			3,
			4
		].map((i) => sprite(`/art/sprites/sage-${i}.png`)), ...[
			1,
			2,
			3,
			4
		].map((i) => sprite(`/art/sprites/spinifex-${i}.png`))],
		fx: [
			1,
			2,
			3,
			4
		].map((i) => sprite(`/art/sprites/fx-${i}.png`)),
		flag: sheet("/art/sprites", "flag"),
		smoke: sheet("/art/sprites", "smoke"),
		props: {
			wagon: sprite("/art/sprites/props/wagon.png"),
			tent: sprite("/art/sprites/props/tent.png"),
			watertower: sprite("/art/sprites/props/watertower.png"),
			windmill: sprite("/art/sprites/props/windmill.png")
		},
		depot: {
			0: sheet("/art/sprites/depot", "shack"),
			1: sheet("/art/sprites/depot", "expanded"),
			2: sheet("/art/sprites/depot", "fortified"),
			3: sheet("/art/sprites/depot", "fortress")
		},
		units: {
			runner: sheet("/art/sprites/units", "runner"),
			brute: sheet("/art/sprites/units", "brute"),
			swarm: sheet("/art/sprites/units", "swarm"),
			boss: sheet("/art/sprites/units", "boss"),
			scout: sheet("/art/sprites/units", "scout"),
			rider: sheet("/art/sprites/units", "rider"),
			bomber: sheet("/art/sprites/units", "bomber"),
			outlaw: sheet("/art/sprites/units", "outlaw"),
			sapper: sheet("/art/sprites/units", "sapper"),
			engine: sheet("/art/sprites/units", "engine")
		},
		guns: {
			gunner: sheet("/art/sprites/guns", "gunner"),
			cannon: sheet("/art/sprites/guns", "cannon"),
			slow: sheet("/art/sprites/guns", "slow"),
			sniper: sheet("/art/sprites/guns", "sniper"),
			gatling: sheet("/art/sprites/guns", "gatling"),
			dynamite: sheet("/art/sprites/guns", "dynamite"),
			oil: sheet("/art/sprites/guns", "oil"),
			harpoon: sheet("/art/sprites/guns", "harpoon"),
			beacon: sheet("/art/sprites/guns", "beacon"),
			siege: sheet("/art/sprites/guns", "siege"),
			hotchkiss: sheet("/art/sprites/guns", "hotchkiss")
		}
	};
}
function boostAnisotropy(maps, n) {
	const apply = (t) => {
		t.anisotropy = n;
	};
	const walk = (v) => {
		if (Array.isArray(v)) v.forEach(apply);
		else if (v instanceof Texture) apply(v);
		else if (v && typeof v === "object") Object.values(v).forEach(walk);
	};
	walk(maps);
}
var TOWER_ART = {
	gunner: "/art/sprites/guns/gunner-1.png",
	cannon: "/art/sprites/guns/cannon-1.png",
	slow: "/art/sprites/guns/slow-1.png",
	sniper: "/art/sprites/guns/sniper-1.png",
	gatling: "/art/sprites/guns/gatling-1.png",
	dynamite: "/art/sprites/guns/dynamite-1.png",
	oil: "/art/sprites/guns/oil-1.png",
	harpoon: "/art/sprites/guns/harpoon-1.png",
	beacon: "/art/sprites/guns/beacon-1.png",
	siege: "/art/sprites/guns/siege-1.png",
	hotchkiss: "/art/sprites/guns/hotchkiss-1.png"
};
Math.PI * 2;
var GameAudio = class {
	ctx = null;
	master = null;
	sfx = null;
	music = null;
	noise = null;
	ambient = null;
	muted = false;
	unlocked = false;
	unlock() {
		if (!this.ctx) {
			const Ctx = window.AudioContext || window.webkitAudioContext;
			this.ctx = new Ctx({ latencyHint: "interactive" });
			this.master = this.ctx.createGain();
			this.sfx = this.ctx.createGain();
			this.music = this.ctx.createGain();
			this.sfx.gain.value = .7;
			this.music.gain.value = .28;
			this.master.gain.value = this.muted ? 0 : .85;
			this.sfx.connect(this.master);
			this.music.connect(this.master);
			this.master.connect(this.ctx.destination);
			this.noise = this.makeNoise(this.ctx);
		}
		if (this.ctx.state === "suspended") this.ctx.resume();
		this.unlocked = true;
		this.startAmbient();
	}
	setMuted(muted) {
		this.muted = muted;
		if (!this.master || !this.ctx) return;
		this.master.gain.setTargetAtTime(muted ? 0 : .85, this.ctx.currentTime, .04);
	}
	resume() {
		if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
	}
	env() {
		if (!this.ctx || !this.sfx || !this.music) return null;
		return {
			ctx: this.ctx,
			sfx: this.sfx,
			music: this.music,
			t: this.ctx.currentTime
		};
	}
	playGun() {
		const e = this.env();
		if (!e) return;
		this.tone(e, 620 + Math.random() * 80, .045, .09, "square", .18);
		this.tone(e, 180 + Math.random() * 30, .03, .07, "triangle", .22);
	}
	playCannon() {
		const e = this.env();
		if (!e) return;
		this.noiseBurst(e, .16, .35, 400);
		this.tone(e, 90, .08, .28, "sine", .4);
		this.tone(e, 140, .04, .12, "triangle", .2);
	}
	playSniper() {
		const e = this.env();
		if (!e) return;
		this.tone(e, 980, .02, .16, "sawtooth", .12);
		this.tone(e, 240, .03, .18, "triangle", .22);
		this.noiseBurst(e, .05, .18, 1800);
	}
	playSlow() {
		const e = this.env();
		if (!e) return;
		this.tone(e, 420, .01, .12, "sine", .14);
		this.tone(e, 630, .02, .16, "sine", .08);
	}
	playDeath(kind) {
		const e = this.env();
		if (!e) return;
		if (kind === "boss" || kind === "engine") {
			this.noiseBurst(e, .4, .55, 500);
			this.tone(e, 70, .1, .7, "sine", .5);
			this.tone(e, 110, .05, .45, "triangle", .25);
			return;
		}
		const base = kind === "brute" || kind === "bomber" || kind === "sapper" ? 110 : kind === "swarm" ? 240 : kind === "scout" ? 280 : kind === "outlaw" ? 150 : 170;
		this.noiseBurst(e, .07, kind === "brute" || kind === "bomber" || kind === "sapper" ? .28 : .16, 700);
		this.tone(e, base, .02, .14, "triangle", .2);
	}
	playLeak() {
		const e = this.env();
		if (!e) return;
		this.tone(e, 220, .01, .18, "square", .16);
		this.tone(e, 160, .08, .32, "sine", .22);
	}
	playWave() {
		const e = this.env();
		if (!e) return;
		this.tone(e, 330, .01, .22, "triangle", .18);
		this.tone(e, 247, .12, .32, "triangle", .14);
		this.tone(e, 196, .28, .4, "sine", .16);
	}
	playPlace() {
		const e = this.env();
		if (!e) return;
		this.tone(e, 280, .01, .08, "triangle", .16);
		this.tone(e, 420, .04, .1, "sine", .1);
	}
	playUpgrade() {
		const e = this.env();
		if (!e) return;
		this.tone(e, 392, .01, .1, "triangle", .14);
		this.tone(e, 523, .08, .16, "triangle", .12);
	}
	playSell() {
		const e = this.env();
		if (!e) return;
		this.tone(e, 240, .01, .1, "sine", .12);
		this.tone(e, 180, .06, .14, "sine", .1);
	}
	playWin() {
		const e = this.env();
		if (!e) return;
		[
			262,
			330,
			392,
			523
		].forEach((n, i) => this.tone(e, n, .04 + i * .12, .35, "triangle", .18));
	}
	playLose() {
		const e = this.env();
		if (!e) return;
		[
			196,
			165,
			130
		].forEach((n, i) => this.tone(e, n, .02 + i * .18, .4, "triangle", .2));
	}
	playDeny() {
		const e = this.env();
		if (!e) return;
		this.tone(e, 140, .01, .08, "square", .08);
	}
	startAmbient() {
		const e = this.env();
		if (!e || this.ambient) return;
		const { ctx, music } = e;
		const filter = ctx.createBiquadFilter();
		filter.type = "lowpass";
		filter.frequency.value = 240;
		filter.Q.value = .6;
		filter.connect(music);
		const o1 = ctx.createOscillator();
		const o2 = ctx.createOscillator();
		const g1 = ctx.createGain();
		const g2 = ctx.createGain();
		o1.type = "sine";
		o2.type = "sine";
		o1.frequency.value = 55;
		o2.frequency.value = 82.4;
		g1.gain.value = .12;
		g2.gain.value = .07;
		o1.connect(g1).connect(filter);
		o2.connect(g2).connect(filter);
		o1.start();
		o2.start();
		const wind = ctx.createBufferSource();
		const wg = ctx.createGain();
		const wf = ctx.createBiquadFilter();
		if (this.noise) wind.buffer = this.noise;
		wind.loop = true;
		wf.type = "bandpass";
		wf.frequency.value = 900;
		wf.Q.value = .5;
		wg.gain.value = .045;
		wind.connect(wf).connect(wg).connect(music);
		wind.start();
		this.ambient = { stop: () => {
			try {
				o1.stop();
				o2.stop();
				wind.stop();
			} catch {}
		} };
	}
	tone(e, freq, delay, dur, type, gain) {
		const osc = e.ctx.createOscillator();
		const g = e.ctx.createGain();
		osc.type = type;
		osc.frequency.value = freq * (.97 + Math.random() * .06);
		const t0 = e.t + delay;
		g.gain.setValueAtTime(0, t0);
		g.gain.linearRampToValueAtTime(gain, t0 + .008);
		g.gain.exponentialRampToValueAtTime(1e-4, t0 + dur);
		osc.connect(g).connect(e.sfx);
		osc.start(t0);
		osc.stop(t0 + dur + .02);
		osc.onended = () => {
			osc.disconnect();
			g.disconnect();
		};
	}
	noiseBurst(e, dur, gain, cutoff) {
		if (!this.noise) return;
		const src = e.ctx.createBufferSource();
		src.buffer = this.noise;
		const f = e.ctx.createBiquadFilter();
		f.type = "lowpass";
		f.frequency.value = cutoff;
		const g = e.ctx.createGain();
		const t0 = e.t;
		g.gain.setValueAtTime(0, t0);
		g.gain.linearRampToValueAtTime(gain, t0 + .01);
		g.gain.exponentialRampToValueAtTime(1e-4, t0 + dur);
		src.connect(f).connect(g).connect(e.sfx);
		src.start(t0);
		src.stop(t0 + dur + .02);
		src.onended = () => {
			src.disconnect();
			f.disconnect();
			g.disconnect();
		};
	}
	makeNoise(ctx) {
		const buf = ctx.createBuffer(1, ctx.sampleRate * 1.2, ctx.sampleRate);
		const data = buf.getChannelData(0);
		let last = 0;
		for (let i = 0; i < data.length; i++) {
			last = last * .96 + (Math.random() * 2 - 1) * .04;
			data[i] = last + (Math.random() * 2 - 1) * .15;
		}
		return buf;
	}
};
var audio = new GameAudio();
if (typeof document !== "undefined") document.addEventListener("visibilitychange", () => {
	if (document.visibilityState === "visible") audio.resume();
});
var SELL_RATE = .55;
var FIXED_DT = 1 / 60;
var TOWERS = {
	gunner: {
		kind: "gunner",
		name: "Gunner",
		short: "Repeater",
		blurb: "Single-target rifle. Cheap, honest, and always useful.",
		cost: 50,
		unlockWave: 1,
		upgradeCost: [40, 70],
		stats: [
			{
				damage: 11,
				rate: 1.45,
				range: 3.35,
				splash: 0,
				slow: 1,
				slowDuration: 0
			},
			{
				damage: 18,
				rate: 1.7,
				range: 3.65,
				splash: 0,
				slow: 1,
				slowDuration: 0
			},
			{
				damage: 26,
				rate: 2.05,
				range: 3.95,
				splash: 0,
				slow: 1,
				slowDuration: 0
			}
		]
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
			{
				damage: 36,
				rate: .42,
				range: 3.05,
				splash: 1.15,
				slow: 1,
				slowDuration: 0
			},
			{
				damage: 52,
				rate: .48,
				range: 3.25,
				splash: 1.35,
				slow: 1,
				slowDuration: 0
			},
			{
				damage: 74,
				rate: .55,
				range: 3.55,
				splash: 1.55,
				slow: 1,
				slowDuration: 0
			}
		]
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
			{
				damage: 3,
				rate: .72,
				range: 3.55,
				splash: .7,
				slow: .62,
				slowDuration: 2.2
			},
			{
				damage: 4,
				rate: .88,
				range: 3.95,
				splash: .85,
				slow: .52,
				slowDuration: 2.6
			},
			{
				damage: 6,
				rate: 1.05,
				range: 4.4,
				splash: 1,
				slow: .42,
				slowDuration: 3.1
			}
		]
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
			{
				damage: 85,
				rate: .32,
				range: 6.6,
				splash: 0,
				slow: 1,
				slowDuration: 0
			},
			{
				damage: 125,
				rate: .38,
				range: 7.3,
				splash: 0,
				slow: 1,
				slowDuration: 0
			},
			{
				damage: 185,
				rate: .44,
				range: 8,
				splash: 0,
				slow: 1,
				slowDuration: 0
			}
		]
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
			{
				damage: 7,
				rate: 5.2,
				range: 3.15,
				splash: 0,
				slow: 1,
				slowDuration: 0
			},
			{
				damage: 9,
				rate: 6.1,
				range: 3.35,
				splash: 0,
				slow: 1,
				slowDuration: 0
			},
			{
				damage: 12,
				rate: 7,
				range: 3.55,
				splash: 0,
				slow: 1,
				slowDuration: 0
			}
		]
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
			{
				damage: 58,
				rate: .28,
				range: 4.4,
				splash: 1.55,
				slow: 1,
				slowDuration: 0
			},
			{
				damage: 78,
				rate: .32,
				range: 4.7,
				splash: 1.75,
				slow: 1,
				slowDuration: 0
			},
			{
				damage: 104,
				rate: .36,
				range: 5.1,
				splash: 1.95,
				slow: 1,
				slowDuration: 0
			}
		]
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
			{
				damage: 8,
				rate: .85,
				range: 3.4,
				splash: 1.15,
				slow: .7,
				slowDuration: 1.8
			},
			{
				damage: 11,
				rate: .98,
				range: 3.7,
				splash: 1.3,
				slow: .62,
				slowDuration: 2.2
			},
			{
				damage: 15,
				rate: 1.12,
				range: 4,
				splash: 1.45,
				slow: .55,
				slowDuration: 2.6
			}
		]
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
			{
				damage: 32,
				rate: .68,
				range: 4.85,
				splash: 0,
				slow: .52,
				slowDuration: 1.7
			},
			{
				damage: 44,
				rate: .8,
				range: 5.25,
				splash: 0,
				slow: .45,
				slowDuration: 2.05
			},
			{
				damage: 60,
				rate: .94,
				range: 5.7,
				splash: 0,
				slow: .38,
				slowDuration: 2.45
			}
		]
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
			{
				damage: 5,
				rate: .55,
				range: 3.45,
				splash: 3.45,
				slow: 1,
				slowDuration: 0
			},
			{
				damage: 7,
				rate: .62,
				range: 3.85,
				splash: 3.85,
				slow: 1,
				slowDuration: 0
			},
			{
				damage: 9,
				rate: .7,
				range: 4.3,
				splash: 4.3,
				slow: 1,
				slowDuration: 0
			}
		]
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
			{
				damage: 110,
				rate: .2,
				range: 5.15,
				splash: 1.9,
				slow: 1,
				slowDuration: 0
			},
			{
				damage: 148,
				rate: .23,
				range: 5.55,
				splash: 2.15,
				slow: 1,
				slowDuration: 0
			},
			{
				damage: 196,
				rate: .26,
				range: 6,
				splash: 2.4,
				slow: 1,
				slowDuration: 0
			}
		]
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
			{
				damage: 15,
				rate: 1.12,
				range: 3.4,
				splash: .22,
				slow: 1,
				slowDuration: 0
			},
			{
				damage: 19,
				rate: 1.28,
				range: 3.6,
				splash: .26,
				slow: 1,
				slowDuration: 0
			},
			{
				damage: 24,
				rate: 1.45,
				range: 3.85,
				splash: .3,
				slow: 1,
				slowDuration: 0
			}
		]
	}
};
var ENEMIES = {
	runner: {
		kind: "runner",
		name: "Raider",
		hp: 38,
		speed: 2.18,
		gold: 8,
		radius: .28
	},
	brute: {
		kind: "brute",
		name: "Ironhide",
		hp: 230,
		speed: .86,
		gold: 22,
		radius: .42
	},
	swarm: {
		kind: "swarm",
		name: "Coyote",
		hp: 16,
		speed: 1.92,
		gold: 3,
		radius: .2
	},
	boss: {
		kind: "boss",
		name: "Ironclad",
		hp: 1550,
		speed: 1.02,
		gold: 180,
		radius: .7
	},
	scout: {
		kind: "scout",
		name: "Scout",
		hp: 22,
		speed: 3.05,
		gold: 6,
		radius: .22
	},
	rider: {
		kind: "rider",
		name: "Rider",
		hp: 68,
		speed: 2.62,
		gold: 14,
		radius: .34
	},
	bomber: {
		kind: "bomber",
		name: "Powder",
		hp: 155,
		speed: 1.08,
		gold: 20,
		radius: .36
	},
	outlaw: {
		kind: "outlaw",
		name: "Outlaw",
		hp: 92,
		speed: 2.08,
		gold: 13,
		radius: .3
	},
	sapper: {
		kind: "sapper",
		name: "Sapper",
		hp: 125,
		speed: 1.28,
		gold: 17,
		radius: .32
	},
	engine: {
		kind: "engine",
		name: "Iron Engine",
		hp: 2100,
		speed: .8,
		gold: 280,
		radius: .82
	}
};
var WAVES = [
	{
		name: "Dust on the horizon",
		groups: [{
			kind: "runner",
			count: 8,
			interval: .75,
			path: 0,
			delay: 0
		}]
	},
	{
		name: "Scouts on the ridge",
		groups: [{
			kind: "runner",
			count: 6,
			interval: .55,
			path: 0,
			delay: 0
		}, {
			kind: "scout",
			count: 8,
			interval: .32,
			path: 1,
			delay: .6
		}]
	},
	{
		name: "Coyote pack",
		groups: [
			{
				kind: "swarm",
				count: 6,
				interval: .16,
				path: 0,
				delay: 0
			},
			{
				kind: "swarm",
				count: 6,
				interval: .16,
				path: 0,
				delay: 1.35
			},
			{
				kind: "swarm",
				count: 6,
				interval: .16,
				path: 1,
				delay: .6
			},
			{
				kind: "swarm",
				count: 6,
				interval: .16,
				path: 1,
				delay: 2
			}
		]
	},
	{
		name: "Iron hides",
		groups: [{
			kind: "brute",
			count: 4,
			interval: 1.55,
			path: 0,
			delay: 0
		}, {
			kind: "scout",
			count: 5,
			interval: .4,
			path: 1,
			delay: .8
		}]
	},
	{
		name: "Horse thieves",
		groups: [
			{
				kind: "rider",
				count: 5,
				interval: .85,
				path: 0,
				delay: 0
			},
			{
				kind: "rider",
				count: 4,
				interval: .85,
				path: 1,
				delay: .7
			},
			{
				kind: "runner",
				count: 6,
				interval: .42,
				path: 0,
				delay: 1.2
			}
		]
	},
	{
		name: "Powder kegs",
		groups: [
			{
				kind: "bomber",
				count: 4,
				interval: 1.4,
				path: 0,
				delay: 0
			},
			{
				kind: "scout",
				count: 8,
				interval: .28,
				path: 1,
				delay: .5
			},
			{
				kind: "runner",
				count: 6,
				interval: .45,
				path: 0,
				delay: 2.2
			}
		]
	},
	{
		name: "Pincer",
		groups: [
			{
				kind: "runner",
				count: 8,
				interval: .4,
				path: 0,
				delay: 0
			},
			{
				kind: "rider",
				count: 4,
				interval: .7,
				path: 1,
				delay: .3
			},
			{
				kind: "swarm",
				count: 10,
				interval: .14,
				path: 1,
				delay: 2
			}
		]
	},
	{
		name: "Wagon train",
		groups: [
			{
				kind: "brute",
				count: 3,
				interval: 1.35,
				path: 0,
				delay: 0
			},
			{
				kind: "brute",
				count: 3,
				interval: 1.35,
				path: 1,
				delay: 1.8
			},
			{
				kind: "bomber",
				count: 3,
				interval: 1.2,
				path: 0,
				delay: 1
			},
			{
				kind: "rider",
				count: 4,
				interval: .65,
				path: 1,
				delay: .6
			}
		]
	},
	{
		name: "Flash flood",
		groups: [
			{
				kind: "swarm",
				count: 8,
				interval: .12,
				path: 0,
				delay: 0
			},
			{
				kind: "swarm",
				count: 8,
				interval: .12,
				path: 1,
				delay: 0
			},
			{
				kind: "swarm",
				count: 8,
				interval: .12,
				path: 2,
				delay: .4
			},
			{
				kind: "swarm",
				count: 8,
				interval: .12,
				path: 0,
				delay: 1.45
			},
			{
				kind: "scout",
				count: 8,
				interval: .22,
				path: 1,
				delay: 1.6
			},
			{
				kind: "bomber",
				count: 2,
				interval: 1.6,
				path: 0,
				delay: 2.4
			}
		]
	},
	{
		name: "Hard hats",
		groups: [
			{
				kind: "brute",
				count: 6,
				interval: 1.05,
				path: 0,
				delay: 0
			},
			{
				kind: "rider",
				count: 5,
				interval: .6,
				path: 1,
				delay: .4
			},
			{
				kind: "bomber",
				count: 3,
				interval: 1.2,
				path: 1,
				delay: 2
			},
			{
				kind: "scout",
				count: 6,
				interval: .28,
				path: 2,
				delay: .8
			}
		]
	},
	{
		name: "Last call",
		groups: [
			{
				kind: "runner",
				count: 10,
				interval: .28,
				path: 0,
				delay: 0
			},
			{
				kind: "brute",
				count: 5,
				interval: .95,
				path: 1,
				delay: 0
			},
			{
				kind: "rider",
				count: 6,
				interval: .5,
				path: 0,
				delay: 2.4
			},
			{
				kind: "swarm",
				count: 12,
				interval: .11,
				path: 1,
				delay: 3
			},
			{
				kind: "bomber",
				count: 3,
				interval: 1.1,
				path: 0,
				delay: 5
			},
			{
				kind: "runner",
				count: 8,
				interval: .32,
				path: 2,
				delay: 1.2
			}
		]
	},
	{
		name: "The Ironclad",
		groups: [
			{
				kind: "brute",
				count: 4,
				interval: 1.15,
				path: 0,
				delay: 0
			},
			{
				kind: "rider",
				count: 4,
				interval: .7,
				path: 1,
				delay: .4
			},
			{
				kind: "boss",
				count: 1,
				interval: 1,
				path: 0,
				delay: 3.6
			},
			{
				kind: "bomber",
				count: 3,
				interval: 1.2,
				path: 1,
				delay: 4.5
			},
			{
				kind: "swarm",
				count: 12,
				interval: .12,
				path: 0,
				delay: 7.5
			},
			{
				kind: "scout",
				count: 8,
				interval: .22,
				path: 2,
				delay: 2
			}
		]
	},
	{
		name: "Wanted men",
		groups: [
			{
				kind: "outlaw",
				count: 6,
				interval: .85,
				path: 0,
				delay: 0
			},
			{
				kind: "outlaw",
				count: 5,
				interval: .85,
				path: 1,
				delay: .5
			},
			{
				kind: "scout",
				count: 8,
				interval: .26,
				path: 2,
				delay: .4
			},
			{
				kind: "runner",
				count: 6,
				interval: .4,
				path: 0,
				delay: 3.2
			}
		]
	},
	{
		name: "Sappers on the ballast",
		groups: [
			{
				kind: "sapper",
				count: 4,
				interval: 1.25,
				path: 0,
				delay: 0
			},
			{
				kind: "sapper",
				count: 3,
				interval: 1.25,
				path: 1,
				delay: .8
			},
			{
				kind: "runner",
				count: 8,
				interval: .35,
				path: 2,
				delay: .4
			},
			{
				kind: "swarm",
				count: 12,
				interval: .12,
				path: 0,
				delay: 2.4
			}
		]
	},
	{
		name: "Three ways in",
		groups: [
			{
				kind: "rider",
				count: 5,
				interval: .7,
				path: 0,
				delay: 0
			},
			{
				kind: "brute",
				count: 4,
				interval: 1.15,
				path: 1,
				delay: .3
			},
			{
				kind: "outlaw",
				count: 6,
				interval: .7,
				path: 2,
				delay: .5
			},
			{
				kind: "swarm",
				count: 14,
				interval: .11,
				path: 1,
				delay: 2.8
			}
		]
	},
	{
		name: "The second iron",
		groups: [
			{
				kind: "brute",
				count: 4,
				interval: 1.1,
				path: 0,
				delay: 0
			},
			{
				kind: "outlaw",
				count: 5,
				interval: .7,
				path: 1,
				delay: .4
			},
			{
				kind: "bomber",
				count: 3,
				interval: 1.15,
				path: 2,
				delay: 1
			},
			{
				kind: "boss",
				count: 1,
				interval: 1,
				path: 0,
				delay: 4.2
			},
			{
				kind: "sapper",
				count: 3,
				interval: 1.2,
				path: 1,
				delay: 5
			},
			{
				kind: "swarm",
				count: 12,
				interval: .12,
				path: 2,
				delay: 6.5
			}
		]
	},
	{
		name: "Flash powder",
		groups: [
			{
				kind: "bomber",
				count: 5,
				interval: 1.05,
				path: 0,
				delay: 0
			},
			{
				kind: "bomber",
				count: 4,
				interval: 1.05,
				path: 2,
				delay: .8
			},
			{
				kind: "scout",
				count: 10,
				interval: .22,
				path: 1,
				delay: .3
			},
			{
				kind: "swarm",
				count: 16,
				interval: .1,
				path: 2,
				delay: 2.2
			}
		]
	},
	{
		name: "Engine crew",
		groups: [
			{
				kind: "sapper",
				count: 5,
				interval: 1.05,
				path: 0,
				delay: 0
			},
			{
				kind: "brute",
				count: 4,
				interval: 1.1,
				path: 1,
				delay: .4
			},
			{
				kind: "rider",
				count: 6,
				interval: .55,
				path: 2,
				delay: .6
			},
			{
				kind: "outlaw",
				count: 6,
				interval: .65,
				path: 0,
				delay: 2.8
			}
		]
	},
	{
		name: "Night raid",
		groups: [
			{
				kind: "scout",
				count: 12,
				interval: .2,
				path: 0,
				delay: 0
			},
			{
				kind: "rider",
				count: 7,
				interval: .5,
				path: 1,
				delay: .4
			},
			{
				kind: "outlaw",
				count: 7,
				interval: .55,
				path: 2,
				delay: .6
			},
			{
				kind: "swarm",
				count: 18,
				interval: .1,
				path: 0,
				delay: 2.4
			}
		]
	},
	{
		name: "Armored column",
		groups: [
			{
				kind: "brute",
				count: 6,
				interval: .95,
				path: 0,
				delay: 0
			},
			{
				kind: "brute",
				count: 5,
				interval: .95,
				path: 1,
				delay: .8
			},
			{
				kind: "sapper",
				count: 4,
				interval: 1.1,
				path: 2,
				delay: .5
			},
			{
				kind: "bomber",
				count: 4,
				interval: 1.05,
				path: 1,
				delay: 2.2
			},
			{
				kind: "boss",
				count: 1,
				interval: 1,
				path: 0,
				delay: 5.5
			}
		]
	},
	{
		name: "Pincer of three",
		groups: [
			{
				kind: "runner",
				count: 12,
				interval: .26,
				path: 0,
				delay: 0
			},
			{
				kind: "rider",
				count: 7,
				interval: .48,
				path: 1,
				delay: .3
			},
			{
				kind: "outlaw",
				count: 7,
				interval: .5,
				path: 2,
				delay: .4
			},
			{
				kind: "brute",
				count: 5,
				interval: 1,
				path: 0,
				delay: 3
			},
			{
				kind: "swarm",
				count: 16,
				interval: .1,
				path: 2,
				delay: 3.5
			}
		]
	},
	{
		name: "The works",
		groups: [
			{
				kind: "sapper",
				count: 5,
				interval: .95,
				path: 0,
				delay: 0
			},
			{
				kind: "sapper",
				count: 4,
				interval: .95,
				path: 1,
				delay: .5
			},
			{
				kind: "bomber",
				count: 5,
				interval: 1,
				path: 2,
				delay: .4
			},
			{
				kind: "brute",
				count: 5,
				interval: 1.05,
				path: 0,
				delay: 2.2
			},
			{
				kind: "outlaw",
				count: 8,
				interval: .48,
				path: 1,
				delay: 1.6
			}
		]
	},
	{
		name: "Last call west",
		groups: [
			{
				kind: "runner",
				count: 12,
				interval: .22,
				path: 0,
				delay: 0
			},
			{
				kind: "brute",
				count: 6,
				interval: .9,
				path: 1,
				delay: 0
			},
			{
				kind: "rider",
				count: 7,
				interval: .45,
				path: 2,
				delay: .5
			},
			{
				kind: "outlaw",
				count: 7,
				interval: .48,
				path: 0,
				delay: 2.6
			},
			{
				kind: "sapper",
				count: 4,
				interval: 1,
				path: 1,
				delay: 3.2
			},
			{
				kind: "bomber",
				count: 4,
				interval: 1,
				path: 2,
				delay: 3.8
			},
			{
				kind: "swarm",
				count: 16,
				interval: .1,
				path: 0,
				delay: 5.5
			}
		]
	},
	{
		name: "The Iron Engine",
		groups: [
			{
				kind: "brute",
				count: 5,
				interval: 1.05,
				path: 0,
				delay: 0
			},
			{
				kind: "outlaw",
				count: 6,
				interval: .55,
				path: 1,
				delay: .4
			},
			{
				kind: "sapper",
				count: 4,
				interval: 1.1,
				path: 2,
				delay: .8
			},
			{
				kind: "engine",
				count: 1,
				interval: 1,
				path: 0,
				delay: 4
			},
			{
				kind: "boss",
				count: 1,
				interval: 1,
				path: 1,
				delay: 7.5
			},
			{
				kind: "bomber",
				count: 4,
				interval: 1.05,
				path: 2,
				delay: 5.5
			},
			{
				kind: "swarm",
				count: 16,
				interval: .1,
				path: 0,
				delay: 9
			},
			{
				kind: "rider",
				count: 6,
				interval: .5,
				path: 1,
				delay: 8.5
			}
		]
	}
];
var TOWER_ORDER = [
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
	"hotchkiss"
];
var DEPOT_STAGE_NAME = [
	"Timber shack",
	"Expanded depot",
	"Fortified yard",
	"Iron fortress"
];
function towerUnlocked(kind, wave, waveActive = false) {
	const available = waveActive ? wave : Math.max(1, wave + 1);
	return TOWERS[kind].unlockWave <= available;
}
function depotStage(wave) {
	if (wave >= 16) return 3;
	if (wave >= 12) return 2;
	if (wave >= 6) return 1;
	return 0;
}
function actFor(wave) {
	const n = Math.max(1, wave);
	if (n >= 17) return 3;
	if (n >= 9) return 2;
	return 1;
}
function towerHotkey(index) {
	if (index === 10) return "0";
	if (index === 11) return "-";
	return String(index);
}
var CINE = {
	intro: {
		src: "/art/cine/intro.mp4",
		poster: "/art/title.jpg",
		kicker: "The railhead",
		title: "Hold the depot."
	},
	mid: {
		src: "/art/cine/mid.mp4",
		poster: "/art/cine/mid.jpg",
		kicker: "The line holds",
		title: "Raise the palisade."
	},
	ironclad: {
		src: "/art/cine/ironclad.mp4",
		poster: "/art/cine/ironclad.jpg",
		kicker: "Heavy iron",
		title: "The Ironclad is coming."
	},
	victory: {
		src: "/art/cine/victory.mp4",
		poster: "/art/victory.jpg",
		kicker: "All clear",
		title: "The depot holds."
	},
	defeat: {
		src: "/art/cine/defeat.mp4",
		poster: "/art/defeat.jpg",
		kicker: "Overrun",
		title: "The line broke."
	}
};
var cineUnlockAt = 0;
function armCineLock(ms = 320) {
	cineUnlockAt = now() + ms;
}
function cineLocked() {
	return now() < cineUnlockAt;
}
function now() {
	return typeof performance !== "undefined" ? performance.now() : Date.now();
}
var DEFAULT_CALLSIGN = "Hand";
var SAVE_KEY = "iron-redoubt:save";
var SAVE_BAK = "iron-redoubt:save.bak";
var SCORES_KEY = "iron-redoubt:scores";
var SETTINGS_KEY = "iron-redoubt:settings";
var defaultSettings = {
	version: 1,
	muted: false,
	speed: 1,
	callsign: ""
};
var saveTimer = null;
var pendingSave = null;
function canStore() {
	try {
		return typeof localStorage !== "undefined";
	} catch {
		return false;
	}
}
function readJson(key) {
	if (!canStore()) return null;
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
function writeJson(key, value) {
	if (!canStore()) return false;
	try {
		localStorage.setItem(key, JSON.stringify(value));
		return true;
	} catch {
		return false;
	}
}
function migrateSave(raw) {
	if (!raw || typeof raw !== "object") return null;
	const s = raw;
	if ((typeof s.version === "number" ? s.version : 0) > 2) return null;
	const phase = s.phase === "combat" ? "combat" : s.phase === "prep" ? "prep" : null;
	if (!phase) return null;
	if (typeof s.wave !== "number" || s.wave < 0 || s.wave > 24) return null;
	const towers = Array.isArray(s.towers) ? s.towers.filter(validTower) : [];
	const enemies = Array.isArray(s.enemies) ? s.enemies.filter(validEnemy) : [];
	const spawnQ = Array.isArray(s.spawnQ) ? s.spawnQ.filter(validSpawn) : [];
	return {
		version: 2,
		savedAt: typeof s.savedAt === "number" ? s.savedAt : Date.now(),
		phase,
		gold: num(s.gold, 0),
		lives: num(s.lives, 0),
		maxLives: num(s.maxLives, 22),
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
		spawnQ
	};
}
function num(v, d) {
	return typeof v === "number" && Number.isFinite(v) ? v : d;
}
function validTower(t) {
	if (!t || typeof t !== "object") return false;
	const x = t;
	return typeof x.plotId === "number" && x.kind in TOWERS && (x.tier === 0 || x.tier === 1 || x.tier === 2) && typeof x.spent === "number";
}
function validEnemy(e) {
	if (!e || typeof e !== "object") return false;
	const x = e;
	return typeof x.id === "number" && x.kind in ENEMIES && typeof x.s === "number" && x.s >= 0;
}
function validSpawn(s) {
	if (!s || typeof s !== "object") return false;
	const x = s;
	return typeof x.time === "number" && x.kind in ENEMIES && (x.path === 0 || x.path === 1 || x.path === 2);
}
function readSave() {
	const primary = migrateSave(readJson(SAVE_KEY));
	if (primary) return primary;
	return migrateSave(readJson(SAVE_BAK));
}
function peekSave() {
	const s = readSave();
	if (!s) return null;
	return {
		savedAt: s.savedAt,
		phase: s.phase,
		wave: s.wave,
		gold: s.gold,
		lives: s.lives,
		kills: s.kills,
		towers: s.towers.length
	};
}
function writeSave(data) {
	if (data.phase !== "prep" && data.phase !== "combat") return false;
	const blob = {
		...data,
		version: 2,
		savedAt: Date.now()
	};
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
function queueSave(data) {
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
function flushSave(data) {
	if (saveTimer != null) {
		clearTimeout(saveTimer);
		saveTimer = null;
	}
	const next = data ?? pendingSave;
	pendingSave = null;
	if (!next) return false;
	return writeSave(next);
}
function clearSave() {
	if (saveTimer != null) {
		clearTimeout(saveTimer);
		saveTimer = null;
	}
	pendingSave = null;
	if (!canStore()) return;
	try {
		localStorage.removeItem(SAVE_KEY);
		localStorage.removeItem(SAVE_BAK);
	} catch {}
}
function computeScore(p) {
	return p.kills * 12 + p.wave * 80 + p.lives * 40 + Math.floor(Math.max(0, p.gold) * .2) + (p.won ? 600 : 0);
}
function cleanName(raw) {
	return raw.replace(/[^\p{L}\p{N} \-']/gu, "").replace(/\s+/g, " ").trim().slice(0, 16);
}
function readScores() {
	const rows = readJson(SCORES_KEY);
	if (!Array.isArray(rows)) return [];
	return rows.filter((r) => {
		if (!r || typeof r !== "object") return false;
		const x = r;
		return typeof x.id === "string" && typeof x.score === "number" && typeof x.wave === "number";
	}).map((r) => ({
		id: r.id,
		name: cleanName(r.name) || "Hand",
		score: r.score,
		wave: r.wave,
		kills: r.kills ?? 0,
		lives: r.lives ?? 0,
		gold: r.gold ?? 0,
		won: Boolean(r.won),
		at: typeof r.at === "number" ? r.at : 0
	})).sort(byScore).slice(0, 10);
}
function byScore(a, b) {
	if (b.score !== a.score) return b.score - a.score;
	if (Number(b.won) !== Number(a.won)) return Number(b.won) - Number(a.won);
	return b.at - a.at;
}
function recordScore(input) {
	const name = cleanName(input.name ?? "") || "Hand";
	const row = {
		id: `s${Date.now().toString(36)}${Math.floor(Math.random() * 36).toString(36)}`,
		name,
		score: computeScore(input),
		wave: input.wave,
		kills: input.kills,
		lives: input.lives,
		gold: input.gold,
		won: input.won,
		at: Date.now()
	};
	const board = [...readScores(), row].sort(byScore).slice(0, 10);
	writeJson(SCORES_KEY, board);
	const rankIndex = board.findIndex((r) => r.id === row.id);
	return {
		...row,
		rank: rankIndex >= 0 ? rankIndex + 1 : null
	};
}
function renameScore(id, name) {
	const next = cleanName(name) || "Hand";
	const board = readScores().map((r) => r.id === id ? {
		...r,
		name: next
	} : r);
	writeJson(SCORES_KEY, board);
	return board;
}
function readSettings() {
	const raw = readJson(SETTINGS_KEY);
	if (!raw || typeof raw !== "object") return { ...defaultSettings };
	const speed = raw.speed === 2 || raw.speed === 4 ? raw.speed : 1;
	return {
		version: 1,
		muted: Boolean(raw.muted),
		speed,
		callsign: typeof raw.callsign === "string" ? cleanName(raw.callsign) : ""
	};
}
function writeSettings(patch) {
	const next = {
		...readSettings(),
		...patch,
		version: 1
	};
	if (typeof next.callsign === "string") next.callsign = cleanName(next.callsign);
	writeJson(SETTINGS_KEY, next);
	return next;
}
function playable(phase) {
	return phase === "prep" || phase === "combat";
}
function formatWhen(at) {
	if (!at) return "";
	try {
		return new Date(at).toLocaleDateString(void 0, {
			day: "numeric",
			month: "short"
		});
	} catch {
		return "";
	}
}
function saveLabel(peek) {
	const wave = peek.phase === "combat" ? peek.wave : Math.min(24, peek.wave + 1);
	const guns = peek.towers === 1 ? "1 gun" : `${peek.towers} guns`;
	if (peek.phase === "combat") return `Wave ${wave} incoming · ${guns}`;
	if (peek.wave <= 0) return `Yard ready · ${guns}`;
	return `After wave ${peek.wave} · ${guns} · ${peek.gold} scrip`;
}
var PATHS = [
	[
		{
			x: -1.4,
			z: 3
		},
		{
			x: 2.6,
			z: 3
		},
		{
			x: 2.6,
			z: 8.2
		},
		{
			x: 6.8,
			z: 8.2
		},
		{
			x: 6.8,
			z: 3.8
		},
		{
			x: 11.2,
			z: 3.8
		},
		{
			x: 11.2,
			z: 9
		},
		{
			x: 16.5,
			z: 9
		}
	],
	[
		{
			x: 8.6,
			z: -1.4
		},
		{
			x: 8.6,
			z: 3.8
		},
		{
			x: 11.2,
			z: 3.8
		},
		{
			x: 11.2,
			z: 9
		},
		{
			x: 16.5,
			z: 9
		}
	],
	[
		{
			x: 3.2,
			z: 12.85
		},
		{
			x: 3.2,
			z: 10.95
		},
		{
			x: 7.4,
			z: 10.95
		},
		{
			x: 11.2,
			z: 10.95
		},
		{
			x: 11.2,
			z: 9
		},
		{
			x: 16.5,
			z: 9
		}
	]
];
var PLOTS = [
	{
		id: 1,
		x: 1.15,
		z: 1.55
	},
	{
		id: 2,
		x: 1.15,
		z: 4.45
	},
	{
		id: 3,
		x: 4.05,
		z: 1.55
	},
	{
		id: 4,
		x: 4.05,
		z: 4.45
	},
	{
		id: 5,
		x: 1.15,
		z: 6.7
	},
	{
		id: 6,
		x: 1.15,
		z: 9.65
	},
	{
		id: 7,
		x: 4.05,
		z: 6.55
	},
	{
		id: 8,
		x: 4.05,
		z: 9.65
	},
	{
		id: 9,
		x: 5.45,
		z: 6.55
	},
	{
		id: 10,
		x: 8.15,
		z: 6.55
	},
	{
		id: 11,
		x: 8.15,
		z: 2.15
	},
	{
		id: 12,
		x: 9.95,
		z: 2.15
	},
	{
		id: 13,
		x: 9.95,
		z: 5.45
	},
	{
		id: 14,
		x: 12.7,
		z: 2.25
	},
	{
		id: 15,
		x: 12.7,
		z: 5.55
	},
	{
		id: 16,
		x: 12.7,
		z: 7.55
	},
	{
		id: 17,
		x: 12.7,
		z: 10.65
	},
	{
		id: 18,
		x: 14.85,
		z: 7.2
	},
	{
		id: 19,
		x: 14.85,
		z: 10.65
	},
	{
		id: 20,
		x: 2.15,
		z: 11.4
	},
	{
		id: 21,
		x: 5.45,
		z: 12.05
	},
	{
		id: 22,
		x: 8.15,
		z: 12.05
	},
	{
		id: 23,
		x: 9.95,
		z: 7.35
	},
	{
		id: 24,
		x: 5.55,
		z: 5.4
	},
	{
		id: 25,
		x: 14.85,
		z: 4.85
	}
];
var DEPOT = {
	x: 17.35,
	z: 9
};
function buildCache(pts) {
	const cum = [0];
	let len = 0;
	for (let i = 1; i < pts.length; i++) {
		const a = pts[i - 1];
		const b = pts[i];
		len += Math.hypot(b.x - a.x, b.z - a.z);
		cum.push(len);
	}
	return {
		pts,
		cum,
		length: len
	};
}
var PATH_CACHE = PATHS.map(buildCache);
function samplePath(pathIndex, s) {
	const cache = PATH_CACHE[pathIndex] ?? PATH_CACHE[0];
	const length = cache.length;
	if (s >= length) {
		const last = cache.pts[cache.pts.length - 1];
		const prev = cache.pts[cache.pts.length - 2] ?? last;
		return {
			x: last.x,
			z: last.z,
			heading: Math.atan2(last.x - prev.x, last.z - prev.z),
			done: true,
			length
		};
	}
	const clamped = Math.max(0, s);
	const { pts, cum } = cache;
	let i = 1;
	while (i < cum.length && cum[i] < clamped) i++;
	const a = pts[i - 1];
	const b = pts[i];
	const segStart = cum[i - 1];
	const segLen = Math.max(1e-6, cum[i] - segStart);
	const t = (clamped - segStart) / segLen;
	const dx = b.x - a.x;
	const dz = b.z - a.z;
	return {
		x: a.x + dx * t,
		z: a.z + dz * t,
		heading: Math.atan2(dx, dz),
		done: false,
		length
	};
}
function plotById(id) {
	return PLOTS.find((p) => p.id === id);
}
var hudDefaults = {
	phase: "title",
	gold: 0,
	lives: 0,
	maxLives: 22,
	wave: 0,
	totalWaves: 24,
	waveName: "",
	waveActive: false,
	remaining: 0,
	kills: 0,
	buildRev: 0,
	banner: null
};
var useGame = create((set) => ({
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
	applyHud: (snap) => set(snap)
}));
var Sim = class {
	phase = "title";
	gold = 220;
	lives = 22;
	maxLives = 22;
	wave = 0;
	waveName = "";
	waveTime = 0;
	spawning = false;
	kills = 0;
	buildRev = 0;
	time = 0;
	trauma = 0;
	banner = null;
	bannerT = 0;
	towers = /* @__PURE__ */ new Map();
	enemies = [];
	projectiles = [];
	beams = [];
	particles = [];
	pulses = [];
	spawnQ = [];
	spawnI = 0;
	nextId = 1;
	acc = 0;
	hudClock = 0;
	expectedInWave = 0;
	reset() {
		this.phase = "prep";
		this.gold = 220;
		this.lives = 22;
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
	snapshot() {
		if (!playable(this.phase)) return null;
		return {
			version: 2,
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
				cooldown: t.cooldown
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
				bob: e.bob
			})),
			spawnQ: this.spawnQ.map((ev) => ({
				time: ev.time,
				kind: ev.kind,
				path: ev.path
			}))
		};
	}
	hydrate(save) {
		if (save.phase !== "prep" && save.phase !== "combat") return false;
		this.phase = save.phase;
		this.gold = Math.max(0, save.gold);
		this.lives = Math.max(0, save.lives);
		this.maxLives = Math.max(this.lives, save.maxLives || 22);
		this.wave = save.wave;
		this.waveName = save.waveName || WAVES[Math.min(save.wave, 23)]?.name || "";
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
				kick: 0
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
				bob: e.bob
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
	autosave() {
		const snap = this.snapshot();
		if (snap) queueSave(snap);
	}
	finishRun(won) {
		const run = recordScore({
			name: readSettings().callsign,
			wave: this.wave,
			kills: this.kills,
			lives: this.lives,
			gold: this.gold,
			won
		});
		useGame.getState().setLastRun(run);
		clearSave();
	}
	step(dt, speed) {
		if (this.phase === "title" || this.phase === "won" || this.phase === "lost") {
			this.decayFx(dt);
			return;
		}
		const scaled = Math.min(dt, .1) * speed;
		this.acc += scaled;
		let steps = 0;
		while (this.acc >= .016666666666666666 && steps < 10) {
			this.tick(FIXED_DT);
			this.acc -= FIXED_DT;
			steps++;
		}
		this.hudClock += dt;
		if (this.hudClock > .12) {
			this.hudClock = 0;
			this.flushHud();
		}
	}
	startWave() {
		if (this.phase !== "prep") return false;
		if (this.wave >= 24) return false;
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
				this.spawnQ.push({
					time: t,
					kind: g.kind,
					path: g.path
				});
				t += g.interval;
			}
		}
		this.spawnQ.sort((a, b) => a.time - b.time);
		this.expectedInWave = this.spawnQ.length;
		this.banner = `Wave ${this.wave} — ${def.name}`;
		const stage = depotStage(this.wave);
		if (stage > depotStage(this.wave - 1)) {
			this.gold += 20 + stage * 20;
			this.banner = `Wave ${this.wave} — ${def.name}. ${DEPOT_STAGE_NAME[stage]} rising.`;
		}
		this.bannerT = 2.4;
		audio.playWave();
		this.flushHud();
		this.autosave();
		return true;
	}
	place(plotId, kind) {
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
			cooldown: .15,
			targetId: -1,
			yaw: 0,
			spent: def.cost,
			kick: 0
		});
		this.buildRev++;
		audio.playPlace();
		this.flushHud();
		this.autosave();
		return true;
	}
	upgrade(plotId) {
		const t = this.towers.get(plotId);
		if (!t || t.tier >= 2) return false;
		const def = TOWERS[t.kind];
		const cost = t.tier === 0 ? def.upgradeCost[0] : def.upgradeCost[1];
		if (this.gold < cost) {
			audio.playDeny();
			return false;
		}
		this.gold -= cost;
		t.tier = t.tier + 1;
		t.spent += cost;
		this.buildRev++;
		audio.playUpgrade();
		this.flushHud();
		this.autosave();
		return true;
	}
	sell(plotId) {
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
	sellValue(plotId) {
		const t = this.towers.get(plotId);
		if (!t) return 0;
		return Math.floor(t.spent * SELL_RATE);
	}
	remainingInWave() {
		return (this.spawning ? this.spawnQ.length - this.spawnI : 0) + this.enemies.length;
	}
	addTrauma(v) {
		this.trauma = Math.min(1, this.trauma + v);
	}
	tick(dt) {
		this.time += dt;
		if (this.bannerT > 0) {
			this.bannerT -= dt;
			if (this.bannerT <= 0) this.banner = null;
		}
		this.trauma = Math.max(0, this.trauma - 1.7 * dt);
		if (this.phase === "combat") {
			this.waveTime += dt;
			while (this.spawnI < this.spawnQ.length && this.spawnQ[this.spawnI].time <= this.waveTime) {
				const ev = this.spawnQ[this.spawnI++];
				this.spawnEnemy(ev.kind, ev.path);
			}
			if (this.spawnI >= this.spawnQ.length) this.spawning = false;
		}
		this.updateEnemies(dt);
		this.updateTowers(dt);
		this.updateProjectiles(dt);
		this.updateFx(dt);
		if (this.phase === "combat" && !this.spawning && this.enemies.length === 0) {
			if (this.wave >= 24) {
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
				if (this.wave === 6 || this.wave === 16) useGame.getState().setCine("mid");
				if (unlocked.length) this.banner = `${unlocked.map((k) => TOWERS[k].name).join(" · ")} ready on the line.`;
				else this.banner = `Wave ${this.wave} clear. Fortify.`;
				this.bannerT = 2.8;
				this.autosave();
			}
			this.flushHud();
		}
	}
	spawnEnemy(kind, path, s = 0) {
		const def = ENEMIES[kind];
		const id = this.nextId++;
		const sample = samplePath(path, s);
		const scale = 1 + Math.max(0, this.wave - 12) * .065;
		const hp = Math.round(def.hp * scale);
		const gold = Math.round(def.gold * (1 + Math.max(0, this.wave - 12) * .03));
		const lane = kind === "boss" || kind === "engine" ? 0 : kind === "swarm" ? (id % 5 - 2) * .2 : (id % 3 - 1) * .14;
		this.enemies.push({
			id,
			kind,
			hp,
			maxHp: hp,
			speed: def.speed,
			path,
			s,
			x: sample.x,
			z: sample.z,
			y: 0,
			heading: sample.heading,
			lane,
			gold,
			radius: def.radius,
			slowUntil: 0,
			slowMul: 1,
			enraged: false,
			flash: 0,
			bob: Math.random() * Math.PI * 2
		});
	}
	updateEnemies(dt) {
		for (let i = this.enemies.length - 1; i >= 0; i--) {
			const e = this.enemies[i];
			if (e.flash > 0) e.flash = Math.max(0, e.flash - dt);
			const slowed = this.time < e.slowUntil ? e.slowMul : 1;
			const enrage = e.enraged ? 1.38 : 1;
			const spd = e.speed * slowed * enrage;
			const gait = e.kind === "brute" || e.kind === "bomber" || e.kind === "sapper" ? 3.4 : e.kind === "boss" || e.kind === "engine" ? 2.8 : e.kind === "swarm" ? 9.2 : e.kind === "rider" ? 8.4 : e.kind === "scout" ? 10.2 : e.kind === "outlaw" ? 7.2 : 6.8;
			e.bob += dt * gait * Math.max(.4, slowed * enrage);
			e.s += spd * dt;
			const sample = samplePath(e.path, e.s);
			const sideX = Math.cos(sample.heading) * e.lane;
			const sideZ = -Math.sin(sample.heading) * e.lane;
			e.x = sample.x + sideX;
			e.z = sample.z + sideZ;
			e.heading = sample.heading;
			const hop = e.kind === "brute" || e.kind === "boss" || e.kind === "engine" ? .02 : .045;
			e.y = Math.abs(Math.sin(e.bob)) * hop;
			if (sample.done) {
				this.leak(e);
				this.enemies.splice(i, 1);
			}
		}
	}
	leak(e) {
		this.lives = Math.max(0, this.lives - 1);
		this.addTrauma(e.kind === "boss" ? .7 : .28);
		audio.playLeak();
		this.burst(e.x, .4, e.z, 8, 9124394, 1.2);
		if (this.lives <= 0) {
			this.phase = "lost";
			this.banner = "The depot is overrun.";
			this.bannerT = 8;
			audio.playLose();
			this.finishRun(false);
			useGame.getState().setCine("defeat");
		} else this.autosave();
		this.flushHud();
	}
	updateTowers(dt) {
		for (const t of this.towers.values()) {
			const stats = TOWERS[t.kind].stats[t.tier];
			t.cooldown = Math.max(0, t.cooldown - dt);
			if (t.kick > 0) t.kick = Math.max(0, t.kick - dt);
			if (t.kind === "beacon") {
				t.targetId = -1;
				if (t.cooldown <= 0) this.fireBeacon(t, stats.damage, stats.range);
				continue;
			}
			const target = this.pickTarget(t, stats.range);
			t.targetId = target ? target.id : -1;
			if (target) {
				const desired = Math.atan2(target.x - t.x, target.z - t.z);
				t.yaw = dampAngle(t.yaw, desired, 10 * dt);
				if (t.cooldown <= 0) {
					this.fire(t, target);
					t.cooldown = 1 / (stats.rate * this.beaconMul(t.x, t.z));
				}
			}
		}
	}
	beaconMul(x, z) {
		let mul = 1;
		for (const b of this.towers.values()) {
			if (b.kind !== "beacon") continue;
			const r = TOWERS.beacon.stats[b.tier].range;
			const dx = b.x - x;
			const dz = b.z - z;
			if (dx * dx + dz * dz <= r * r) mul *= 1.2 + b.tier * .08;
		}
		return mul;
	}
	fireBeacon(t, damage, range) {
		const stats = TOWERS.beacon.stats[t.tier];
		t.kick = .38;
		t.cooldown = 1 / stats.rate;
		this.aoe(t.x, t.z, range, damage, 1, 0);
		this.pulses.push({
			x: t.x,
			y: .1,
			z: t.z,
			ttl: .55,
			max: .55,
			radius: range,
			color: 13214247
		});
		this.beams.push({
			x1: t.x,
			y1: 1.55,
			z1: t.z,
			x2: t.x,
			y2: .2,
			z2: t.z,
			ttl: .22,
			max: .22,
			kind: "beacon"
		});
		audio.playSlow();
	}
	pickTarget(t, range) {
		const r2 = range * range;
		let best = null;
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
	fire(t, target) {
		const stats = TOWERS[t.kind].stats[t.tier];
		t.kick = t.kind === "cannon" || t.kind === "dynamite" || t.kind === "siege" ? .42 : t.kind === "sniper" || t.kind === "harpoon" ? .36 : t.kind === "slow" || t.kind === "oil" ? .32 : t.kind === "gatling" || t.kind === "hotchkiss" ? .14 : .22;
		const muzzleY = t.kind === "sniper" ? 1.35 : t.kind === "slow" || t.kind === "beacon" ? 1.6 : .55;
		if (t.kind === "sniper" || t.kind === "harpoon") {
			this.hurt(target, stats.damage, t.x, t.z);
			if (t.kind === "harpoon" && stats.slow < 1) {
				target.slowMul = Math.min(target.slowMul, stats.slow);
				target.slowUntil = Math.max(target.slowUntil, this.time + stats.slowDuration);
			}
			this.beams.push({
				x1: t.x,
				y1: muzzleY,
				z1: t.z,
				x2: target.x,
				y2: .45,
				z2: target.z,
				ttl: t.kind === "harpoon" ? .16 : .12,
				max: t.kind === "harpoon" ? .16 : .12,
				kind: t.kind === "harpoon" ? "harpoon" : "sniper"
			});
			if (t.kind === "harpoon") audio.playSlow();
			else audio.playSniper();
			this.addTrauma(t.kind === "harpoon" ? .05 : .08);
			return;
		}
		if (t.kind === "slow") {
			this.aoe(target.x, target.z, stats.splash, stats.damage, stats.slow, stats.slowDuration);
			this.beams.push({
				x1: t.x,
				y1: muzzleY,
				z1: t.z,
				x2: target.x,
				y2: .35,
				z2: target.z,
				ttl: .16,
				max: .16,
				kind: "slow"
			});
			this.pulses.push({
				x: target.x,
				y: .08,
				z: target.z,
				ttl: .35,
				max: .35,
				radius: stats.splash,
				color: 13214247
			});
			audio.playSlow();
			return;
		}
		if (t.kind === "oil") {
			this.aoe(target.x, target.z, stats.splash, stats.damage, stats.slow, stats.slowDuration);
			this.pulses.push({
				x: target.x,
				y: .08,
				z: target.z,
				ttl: .55,
				max: .55,
				radius: stats.splash,
				color: 12868666
			});
			this.beams.push({
				x1: t.x,
				y1: .45,
				z1: t.z,
				x2: target.x,
				y2: .2,
				z2: target.z,
				ttl: .14,
				max: .14,
				kind: "oil"
			});
			audio.playCannon();
			return;
		}
		if (t.kind === "cannon" || t.kind === "dynamite" || t.kind === "siege") {
			const dist = Math.hypot(target.x - t.x, target.z - t.z);
			const speed = t.kind === "siege" ? 4.6 : t.kind === "dynamite" ? 5.4 : 7.2;
			const flight = Math.max(.28, dist / speed);
			this.projectiles.push({
				id: this.nextId++,
				kind: "shell",
				x: t.x,
				y: .55,
				z: t.z,
				vx: (target.x - t.x) / flight,
				vy: 0,
				vz: (target.z - t.z) / flight,
				destX: target.x,
				destY: .2,
				destZ: target.z,
				damage: stats.damage,
				splash: stats.splash,
				ttl: flight + .05,
				flight: 0,
				flightMax: flight,
				targetId: target.id
			});
			audio.playCannon();
			this.addTrauma(.05);
			return;
		}
		if (t.kind === "hotchkiss") {
			for (let i = 0; i < 3; i++) {
				const lead = .08 + i * .07;
				const sample = samplePath(target.path, target.s + target.speed * lead);
				const d = Math.hypot(sample.x - t.x, sample.z - t.z);
				const fl = Math.max(.07, d / 15);
				this.projectiles.push({
					id: this.nextId++,
					kind: "bullet",
					x: t.x,
					y: .5,
					z: t.z,
					vx: (sample.x - t.x) / fl,
					vy: 0,
					vz: (sample.z - t.z) / fl,
					destX: sample.x,
					destY: .35,
					destZ: sample.z,
					damage: stats.damage,
					splash: stats.splash,
					ttl: fl + .04,
					flight: 0,
					flightMax: fl,
					targetId: target.id
				});
			}
			audio.playGun();
			this.addTrauma(.04);
			return;
		}
		const dist = Math.hypot(target.x - t.x, target.z - t.z);
		const flight = Math.max(.08, dist / 16);
		const sample = samplePath(target.path, target.s + target.speed * .12);
		this.projectiles.push({
			id: this.nextId++,
			kind: "bullet",
			x: t.x,
			y: .48,
			z: t.z,
			vx: (sample.x - t.x) / flight,
			vy: 0,
			vz: (sample.z - t.z) / flight,
			destX: sample.x,
			destY: .35,
			destZ: sample.z,
			damage: stats.damage,
			splash: .25,
			ttl: flight + .04,
			flight: 0,
			flightMax: flight,
			targetId: target.id
		});
		audio.playGun();
	}
	updateProjectiles(dt) {
		for (let i = this.projectiles.length - 1; i >= 0; i--) {
			const p = this.projectiles[i];
			p.flight += dt;
			p.ttl -= dt;
			const t = p.flightMax > 0 ? Math.min(1, p.flight / p.flightMax) : 1;
			p.x += p.vx * dt;
			p.z += p.vz * dt;
			if (p.kind === "shell") p.y = .55 + Math.sin(t * Math.PI) * (p.splash > 1.8 ? 2.4 : 1.8);
			else p.y = .48;
			if (t >= 1 || p.ttl <= 0) {
				this.impact(p);
				this.projectiles.splice(i, 1);
			}
		}
	}
	impact(p) {
		if (p.kind === "shell") {
			this.aoe(p.destX, p.destZ, p.splash, p.damage, 1, 0);
			this.pulses.push({
				x: p.destX,
				y: .1,
				z: p.destZ,
				ttl: .28,
				max: .28,
				radius: p.splash,
				color: 12868666
			});
			this.burst(p.destX, .3, p.destZ, 14, 9069113, 1.6);
			this.addTrauma(.12);
			return;
		}
		const target = this.enemies.find((e) => e.id === p.targetId);
		if (target && Math.hypot(target.x - p.x, target.z - p.z) < .7) this.hurt(target, p.damage, p.x, p.z);
		else this.aoe(p.destX, p.destZ, p.splash, p.damage, 1, 0);
	}
	aoe(x, z, radius, damage, slow, slowDur) {
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
	hurt(e, damage, fromX, fromZ) {
		if (e.hp <= 0) return;
		e.hp -= damage;
		e.flash = .12;
		this.burst(e.x, .4, e.z, 3, 12887412, .7);
		if (e.kind === "boss" && !e.enraged && e.hp <= e.maxHp * .45) {
			e.enraged = true;
			this.banner = "The Ironclad rams the line.";
			this.bannerT = 2.2;
			this.addTrauma(.35);
		}
		if (e.kind === "engine" && !e.enraged && e.hp <= e.maxHp * .45) {
			e.enraged = true;
			this.banner = "The Iron Engine stokes the fire.";
			this.bannerT = 2.2;
			this.addTrauma(.4);
		}
		if (e.kind === "outlaw" && !e.enraged && e.hp <= e.maxHp * .4) e.enraged = true;
		if (e.hp <= 0) this.kill(e, fromX, fromZ);
	}
	kill(e, _fromX, _fromZ) {
		this.gold += e.gold;
		this.kills += 1;
		audio.playDeath(e.kind);
		const color = e.kind === "boss" || e.kind === "engine" ? 3815996 : e.kind === "brute" || e.kind === "bomber" || e.kind === "sapper" ? 4864562 : 6965810;
		this.burst(e.x, .5, e.z, e.kind === "boss" || e.kind === "engine" ? 28 : e.kind === "bomber" ? 18 : 10, color, 2.2);
		this.addTrauma(e.kind === "boss" || e.kind === "engine" ? .55 : e.kind === "bomber" ? .22 : .08);
		if (e.kind === "bomber") {
			this.aoe(e.x, e.z, 1.25, 28, .75, .8);
			this.pulses.push({
				x: e.x,
				y: .1,
				z: e.z,
				ttl: .4,
				max: .4,
				radius: 1.25,
				color: 12868666
			});
		}
		if (e.kind === "sapper") {
			for (const o of this.enemies) {
				if (o === e) continue;
				if (Math.hypot(o.x - e.x, o.z - e.z) < 1.7) {
					o.hp = Math.min(o.maxHp, o.hp + 48);
					o.flash = .16;
				}
			}
			this.pulses.push({
				x: e.x,
				y: .1,
				z: e.z,
				ttl: .35,
				max: .35,
				radius: 1.7,
				color: 8032090
			});
		}
		if (e.kind === "boss") for (let i = 0; i < 4; i++) this.spawnEnemy("runner", e.path, Math.max(0, e.s - .4));
		if (e.kind === "engine") {
			for (let i = 0; i < 3; i++) this.spawnEnemy("sapper", e.path, Math.max(0, e.s - .5));
			this.addTrauma(.35);
		}
		const idx = this.enemies.indexOf(e);
		if (idx >= 0) this.enemies.splice(idx, 1);
		this.flushHud();
	}
	burst(x, y, z, n, color, force) {
		for (let i = 0; i < n; i++) {
			const a = Math.random() * Math.PI * 2;
			const f = .6 + Math.random() * force;
			this.particles.push({
				x,
				y,
				z,
				vx: Math.cos(a) * f,
				vy: 1.2 + Math.random() * 2.4,
				vz: Math.sin(a) * f,
				life: .35 + Math.random() * .35,
				max: .7,
				size: .05 + Math.random() * .06,
				color
			});
		}
		if (this.particles.length > 220) this.particles.splice(0, this.particles.length - 220);
	}
	updateFx(dt) {
		for (let i = this.beams.length - 1; i >= 0; i--) {
			this.beams[i].ttl -= dt;
			if (this.beams[i].ttl <= 0) this.beams.splice(i, 1);
		}
		for (let i = this.pulses.length - 1; i >= 0; i--) {
			this.pulses[i].ttl -= dt;
			if (this.pulses[i].ttl <= 0) this.pulses.splice(i, 1);
		}
		this.decayFx(dt);
	}
	decayFx(dt) {
		for (let i = this.particles.length - 1; i >= 0; i--) {
			const p = this.particles[i];
			p.life -= dt;
			p.vy -= 6 * dt;
			p.x += p.vx * dt;
			p.y += p.vy * dt;
			p.z += p.vz * dt;
			if (p.y < .02) {
				p.y = .02;
				p.vy *= -.2;
				p.vx *= .6;
				p.vz *= .6;
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
			totalWaves: 24,
			waveName: this.waveName,
			waveActive: this.phase === "combat",
			remaining: this.remainingInWave(),
			kills: this.kills,
			buildRev: this.buildRev,
			banner: this.banner
		});
	}
};
function dampAngle(current, target, maxDelta) {
	let diff = target - current;
	while (diff > Math.PI) diff -= Math.PI * 2;
	while (diff < -Math.PI) diff += Math.PI * 2;
	return current + Math.max(-maxDelta, Math.min(maxDelta, diff));
}
var sim = new Sim();
function Hud() {
	const cine = useGame((s) => s.cine);
	const phase = useGame((s) => s.phase);
	if (cine) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CineOverlay, { id: cine });
	if (phase === "title") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleScreen, {});
	if (phase === "won" || phase === "lost") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndScreen, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayHud, {});
}
function startIntro() {
	audio.unlock();
	audio.setMuted(useGame.getState().muted);
	useGame.getState().setPlacing(null);
	useGame.getState().setSelected(null);
	useGame.getState().setLastRun(null);
	useGame.getState().setCine("intro");
}
function beginRun() {
	audio.unlock();
	audio.setMuted(useGame.getState().muted);
	useGame.getState().setPlacing(null);
	useGame.getState().setSelected(null);
	useGame.getState().setLastRun(null);
	useGame.getState().setCine(null);
	sim.reset();
}
function continueRun() {
	audio.unlock();
	audio.setMuted(useGame.getState().muted);
	useGame.getState().setPlacing(null);
	useGame.getState().setSelected(null);
	useGame.getState().setCine(null);
	const save = readSave();
	if (!save || !sim.hydrate(save)) sim.reset();
}
function leaveYard() {
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
function skipCine() {
	const id = useGame.getState().cine;
	if (id) finishCine(id);
}
function requestStartWave() {
	if (useGame.getState().cine || cineLocked()) return;
	if (sim.phase !== "prep") return;
	if (sim.wave === 11 || sim.wave === 15 || sim.wave === 23) {
		useGame.getState().setCine("ironclad");
		return;
	}
	sim.startWave();
}
function finishCine(id) {
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
	const [pane, setPane] = (0, import_react.useState)("play");
	const [tick, setTick] = (0, import_react.useState)(0);
	const peek = peekSave();
	if (pane === "ledger") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cinematic, {
		src: "/art/title.jpg",
		align: "center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerCard, {
			onBack: () => setPane("play"),
			onPosted: () => setTick((n) => n + 1)
		})
	});
	if (pane === "confirm") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cinematic, {
		src: "/art/title.jpg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto w-full max-w-sm rounded-[var(--radius-xl)] border border-border bg-bg/92 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.22em] text-muted uppercase",
					children: "New yard"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl tracking-tight text-fg",
					children: "Replace the saved campaign?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: "Your posted marks stay on the ledger. The yard on the line will be overwritten."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "h-12 w-full font-display text-lg tracking-wide",
						onClick: startIntro,
						children: "Start fresh"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "h-11 w-full",
						onClick: () => setPane("play"),
						children: "Keep the save"
					})]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cinematic, {
		src: "/art/title.jpg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-full max-w-lg flex-col items-start",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.22em] text-muted uppercase",
					children: "MiX Mod Forge"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-2 font-display text-5xl leading-[0.9] tracking-tight text-fg sm:text-7xl",
					children: [
						"IRON",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"REDOUBT"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-sm text-sm leading-relaxed text-muted",
					children: "Raiders are coming down the line. Twenty-four waves. The depot grows as you hold it. Plant what you can afford now. Fresh emplacements unlock as the dust thickens."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-5 space-y-1.5 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Place on pads — corners cover more track." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Eleven guns. Later waves open the heavy ones." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The yard autosaves. Marks post to the ledger." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex w-full max-w-sm flex-col gap-2",
					children: [
						peek ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "h-12 w-full rounded-[var(--radius-md)] font-display text-lg tracking-wide",
							onClick: continueRun,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex flex-col items-center leading-tight",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Continue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-sans font-medium tracking-normal opacity-80",
									children: saveLabel(peek)
								})]
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: peek ? "outline" : "default",
							className: "h-12 w-full rounded-[var(--radius-md)] font-display text-lg tracking-wide",
							onClick: () => peek ? setPane("confirm") : startIntro(),
							children: peek ? "New yard" : "Hold the line"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							className: "h-11 w-full",
							onClick: () => setPane("ledger"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4" }), "The ledger"]
						})
					]
				})
			]
		})
	});
}
function EndScreen() {
	const phase = useGame((s) => s.phase);
	const wave = useGame((s) => s.wave);
	const kills = useGame((s) => s.kills);
	const lives = useGame((s) => s.lives);
	const lastRun = useGame((s) => s.lastRun);
	const [name, setName] = (0, import_react.useState)(() => lastRun?.name || readSettings().callsign || "");
	const [board, setBoard] = (0, import_react.useState)(() => readScores());
	const won = phase === "won";
	const commitName = (value) => {
		const next = cleanName(value) || "Hand";
		setName(next);
		writeSettings({ callsign: next });
		if (lastRun) {
			const rows = renameScore(lastRun.id, next);
			setBoard(rows);
			useGame.getState().setLastRun({
				...lastRun,
				name: next
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cinematic, {
		src: won ? "/art/victory.jpg" : "/art/defeat.jpg",
		align: "center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto w-full max-w-md rounded-[var(--radius-xl)] border border-border bg-bg/92 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.22em] text-muted uppercase",
					children: won ? "All clear" : "Overrun"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-4xl tracking-tight text-fg",
					children: won ? "The depot holds." : "The line broke."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-5 grid grid-cols-3 gap-2 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Wave",
							value: `${wave}/24`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Kills",
							value: String(kills)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Depot",
							value: String(lives)
						})
					]
				}),
				lastRun ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-[var(--radius-sm)] bg-surface-2 px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs tracking-[0.16em] text-muted uppercase",
							children: "Mark"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-3xl tabular-nums text-fg",
							children: lastRun.score
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-right text-sm text-muted",
							children: lastRun.rank ? `${ordinal(lastRun.rank)} on the post` : "Off the post"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs tracking-[0.16em] text-muted uppercase",
							children: "Callsign"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							maxLength: 16,
							autoComplete: "off",
							spellCheck: false,
							className: "mt-1 h-11 w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
							onChange: (e) => setName(e.target.value),
							onBlur: (e) => commitName(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter") e.currentTarget.blur();
							}
						})]
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreTable, {
					rows: board,
					highlight: lastRun?.id,
					compact: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-5 h-12 w-full rounded-[var(--radius-md)] font-display text-lg tracking-wide",
					onClick: beginRun,
					children: "Fight again"
				})
			]
		})
	});
}
function LedgerCard({ onBack, onPosted }) {
	const settings = readSettings();
	const [name, setName] = (0, import_react.useState)(settings.callsign);
	const rows = readScores();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-auto w-full max-w-md rounded-[var(--radius-xl)] border border-border bg-bg/92 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.22em] text-muted uppercase",
				children: "The ledger"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-3xl tracking-tight text-fg",
				children: "Marks on the post"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreTable, { rows }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs tracking-[0.16em] text-muted uppercase",
					children: "Your callsign"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: name,
					maxLength: 16,
					autoComplete: "off",
					spellCheck: false,
					placeholder: DEFAULT_CALLSIGN,
					className: "mt-1 h-11 w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
					onChange: (e) => setName(e.target.value),
					onBlur: (e) => writeSettings({ callsign: cleanName(e.target.value) })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				className: "mt-4 h-11 w-full",
				onClick: onBack,
				children: "Back"
			})
		]
	});
}
function ScoreTable({ rows, highlight, compact }) {
	if (!rows.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-4 rounded-[var(--radius-sm)] bg-surface-2 px-3 py-4 text-sm text-muted",
		children: "No marks on the post yet. Hold a wave and your name goes up."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: cn("mt-4 space-y-1", compact && "max-h-40 overflow-y-auto"),
		children: rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: cn("grid grid-cols-[1.5rem_1fr_auto] items-baseline gap-2 rounded-[var(--radius-xs)] px-2 py-1.5 text-sm", r.id === highlight ? "bg-surface-2" : ""),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display tabular-nums text-muted",
					children: i + 1
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 truncate text-fg",
					children: [
						r.name,
						r.won ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-xs text-ok",
							children: "Held"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-2 text-xs text-muted",
							children: ["W", r.wave]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-display tabular-nums text-fg",
					children: [r.score, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 text-xs font-sans text-faint",
						children: formatWhen(r.at)
					})]
				})
			]
		}, r.id))
	});
}
function ordinal(n) {
	const v = n % 100;
	if (v >= 11 && v <= 13) return `${n}th`;
	if (n % 10 === 1) return `${n}st`;
	if (n % 10 === 2) return `${n}nd`;
	if (n % 10 === 3) return `${n}rd`;
	return `${n}th`;
}
function CineOverlay({ id }) {
	const meta = CINE[id];
	const muted = useGame((s) => s.muted);
	const videoRef = (0, import_react.useRef)(null);
	const title = id === "ironclad" && sim.wave >= 23 ? "The Iron Engine is coming." : id === "ironclad" && sim.wave >= 15 ? "The second iron is coming." : meta.title;
	const kicker = id === "ironclad" && sim.wave >= 23 ? "Final wave" : meta.kicker;
	(0, import_react.useEffect)(() => {
		const el = videoRef.current;
		if (!el) return;
		el.muted = muted;
		const play = el.play();
		if (play) play.catch(() => {
			el.muted = true;
			el.play();
		});
	}, [id, muted]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "cine-overlay pointer-events-auto absolute inset-0 z-30 bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				src: meta.src,
				poster: meta.poster,
				autoPlay: true,
				playsInline: true,
				muted,
				className: "absolute inset-0 h-full w-full object-cover",
				onEnded: () => finishCine(id),
				onError: () => finishCine(id)
			}, id),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "cinematic-veil absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-4 right-4 z-10 sm:top-8 sm:right-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => finishCine(id),
					children: "Skip"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 p-4 sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.22em] text-muted uppercase",
					children: kicker
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-3xl tracking-tight text-fg sm:text-5xl",
					children: title
				})]
			})
		]
	});
}
function Cinematic({ src, children, align = "end" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "cinematic-veil absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("absolute inset-0 flex p-4 sm:p-10", align === "center" ? "items-center justify-center" : "items-end justify-start"),
				children
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-sm)] bg-surface-2 px-2 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs tracking-[0.16em] text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 font-display text-2xl tabular-nums text-fg",
			children: value
		})]
	});
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
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		if (!savedPulse) return;
		const t = window.setTimeout(() => setNow(Date.now()), 1800);
		return () => window.clearTimeout(t);
	}, [savedPulse]);
	const showSaved = savedPulse > 0 && now - savedPulse < 1600;
	const upcoming = WAVES[wave];
	const preview = upcoming ? summarize(upcoming) : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-3 right-3 left-3 flex flex-col gap-1.5 sm:top-4 sm:right-4 sm:left-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-auto flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/art/hud/heart.jpg",
								alt: "",
								className: "size-5 rounded-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [lives, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: ["/", maxLives]
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/art/hud/coin.jpg",
									alt: "",
									className: "size-5 rounded-full object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs tracking-[0.14em] text-muted",
									children: "SCRIP"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums",
									children: gold
								})
							] }),
							showSaved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3.5 text-ok" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs tracking-wide text-ok",
								children: "Saved"
							})] }) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-auto flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeedControl, { speed }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "icon-sm",
								"aria-label": "Save yard",
								onClick: manualSave,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "icon-sm",
								"aria-label": "Save and leave",
								onClick: leaveYard,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoorOpen, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "icon-sm",
								"aria-label": muted ? "Unmute" : "Mute",
								onClick: () => {
									const next = !muted;
									useGame.getState().setMuted(next);
									audio.setMuted(next);
									writeSettings({ muted: next });
								},
								children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-none text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-display text-base leading-none tabular-nums text-fg sm:text-lg",
						children: [
							"WAVE ",
							waveActive ? wave : Math.min(totalWaves, wave + 1),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: ["/", totalWaves]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 truncate text-xs tracking-wide text-muted",
						children: [
							"Act ",
							[
								"I",
								"II",
								"III"
							][actFor(waveActive ? wave : wave + 1) - 1],
							" ·",
							" ",
							waveActive ? waveName : upcoming ? `Next — ${upcoming.name}` : waveName
						]
					})]
				})]
			}),
			banner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute top-16 left-1/2 w-[min(90%,28rem)] -translate-x-1/2 text-center sm:top-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "inline-block rounded-[var(--radius-sm)] border border-border bg-bg/80 px-3 py-1.5 text-sm text-fg",
					children: banner
				})
			}) : null,
			selectedPlotId != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-24 left-3 z-10 max-w-xs sm:bottom-24 sm:left-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectedPanel, {
					plotId: selectedPlotId,
					gold
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute right-3 bottom-3 left-3 sm:right-4 sm:bottom-4 sm:left-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto flex items-stretch gap-1.5 rounded-[var(--radius-md)] border border-border bg-bg/88 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex min-w-0 flex-1 items-stretch gap-1 overflow-x-auto",
						children: TOWER_ORDER.map((kind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TowerCard, {
							kind,
							gold,
							wave,
							waveActive,
							active: placing === kind
						}, kind))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "accent",
						className: "h-auto min-h-14 w-24 shrink-0 rounded-[var(--radius-sm)] px-2 font-display tracking-wide sm:w-36",
						disabled: waveActive || !upcoming,
						onClick: () => requestStartWave(),
						children: waveActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex flex-col items-center leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Incoming" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-sans font-medium tracking-normal opacity-80",
								children: [remaining, " on the line"]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex flex-col items-center leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Wave ", wave + 1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "max-w-28 truncate text-xs font-sans font-medium tracking-normal opacity-80",
								children: preview
							})]
						})
					})]
				})
			})
		]
	});
}
function manualSave() {
	const snap = sim.snapshot();
	if (!snap) return;
	if (flushSave(snap)) useGame.getState().setSavedPulse(Date.now());
}
function Chip({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-sm)] border border-border bg-bg/85 px-2.5 text-sm font-medium text-fg",
		children
	});
}
function SpeedControl({ speed }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-9 overflow-hidden rounded-[var(--radius-sm)] border border-border bg-bg/85",
		children: [
			1,
			2,
			4
		].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: cn("flex h-9 min-w-9 items-center justify-center px-2 text-xs font-medium tabular-nums", speed === s ? "bg-fg text-bg" : "text-muted hover:text-fg"),
			onClick: () => {
				useGame.getState().setSpeed(s);
				writeSettings({ speed: s });
			},
			"aria-label": s === 4 ? "Fast forward" : `${s} times speed`,
			children: s === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FastForward, { className: "size-3.5" }) : `${s}×`
		}, s))
	});
}
function TowerCard({ kind, gold, wave, waveActive, active }) {
	const def = TOWERS[kind];
	const unlocked = towerUnlocked(kind, wave, waveActive);
	const can = unlocked && gold >= def.cost;
	const hotkey = towerHotkey(TOWER_ORDER.indexOf(kind) + 1);
	const justUnlocked = !waveActive && unlocked && def.unlockWave === Math.max(1, wave + 1) && def.unlockWave > 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		disabled: !unlocked,
		onClick: () => onPalette(kind),
		title: unlocked ? `${def.name} — ${def.blurb}` : `${def.name} unlocks at wave ${def.unlockWave}`,
		"aria-label": unlocked ? `${def.name}, ${def.cost} scrip` : `${def.name} locked until wave ${def.unlockWave}`,
		className: cn("relative flex h-14 w-12 shrink-0 flex-col items-center justify-end overflow-hidden rounded-[var(--radius-xs)] border transition-[border-color,background-color,opacity] duration-[var(--motion-quick)] sm:h-16 sm:w-14", active ? "border-accent bg-surface-2" : "border-border bg-surface hover:border-muted", unlocked && !can && "opacity-45", !unlocked && "opacity-70"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-0.5 left-1 font-display text-xs leading-none text-faint tabular-nums",
				children: hotkey
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: TOWER_ART[kind],
				alt: "",
				className: "size-9 object-contain sm:size-10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pb-0.5 text-xs leading-none tabular-nums text-muted",
				children: unlocked ? def.cost : `W${def.unlockWave}`
			}),
			!unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute inset-0 flex items-center justify-center bg-bg/65",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5 text-fg" })
			}) : null,
			justUnlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-0.5 right-0.5 rounded-[var(--radius-xs)] bg-accent px-1 font-display text-xs leading-tight text-accent-fg",
				children: "NEW"
			}) : null
		]
	});
}
function SelectedPanel({ plotId, gold }) {
	useGame((s) => s.buildRev);
	const tower = sim.towers.get(plotId);
	if (!tower) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-auto rounded-[var(--radius-md)] border border-border bg-bg/88 px-3 py-2 text-sm text-muted",
		children: "Empty pad. Pick a gun on the dock."
	});
	const def = TOWERS[tower.kind];
	const stats = def.stats[tower.tier];
	const next = tower.tier < 2 ? def.stats[tower.tier + 1] : null;
	const upCost = tower.tier === 0 ? def.upgradeCost[0] : tower.tier === 1 ? def.upgradeCost[1] : 0;
	const refund = Math.floor(tower.spent * SELL_RATE);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-auto rounded-[var(--radius-md)] border border-border bg-bg/90 p-2 shadow-[0_12px_32px_rgba(0,0,0,0.35)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: TOWER_ART[tower.kind],
				alt: "",
				className: "size-10 rounded-[var(--radius-xs)] object-contain bg-surface-2"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "font-display text-base leading-none tracking-wide text-fg",
					children: [def.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-2 text-sm text-muted",
						children: ["Mk ", tower.tier + 1]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted tabular-nums",
					children: [
						stats.damage,
						" dmg · ",
						stats.rate.toFixed(1),
						"/s · r",
						stats.range.toFixed(1)
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex flex-wrap gap-1.5",
			children: [next && upCost ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				disabled: gold < upCost,
				onClick: () => sim.upgrade(plotId),
				children: ["Reinforce ", upCost]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex h-9 items-center px-1 text-xs tracking-wide text-muted uppercase",
				children: "Fitted"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "outline",
				onClick: () => sim.sell(plotId),
				children: ["Salvage ", refund]
			})]
		})]
	});
}
function onPalette(kind) {
	if (cineLocked()) return;
	const state = useGame.getState();
	if (!towerUnlocked(kind, state.wave, state.waveActive)) return;
	const plotId = state.selectedPlotId;
	if (plotId != null && !sim.towers.has(plotId)) {
		if (sim.place(plotId, kind)) return;
	}
	state.setPlacing(state.placing === kind ? null : kind);
}
function summarize(wave) {
	const counts = {};
	for (const g of wave.groups) counts[g.kind] = (counts[g.kind] ?? 0) + g.count;
	return Object.keys(counts).map((k) => `${counts[k]} ${ENEMIES[k].name}`).join(" · ");
}
function makeMaterials(maps) {
	const std = (color, map, extras) => new MeshStandardMaterial({
		color,
		map,
		roughness: .86,
		metalness: 0,
		...extras
	});
	return {
		dust: std(14993824, maps.dirt, { roughness: .96 }),
		dustDark: std(12096874, maps.dirt, { roughness: .95 }),
		packed: std(12886138, maps.dirt, { roughness: .92 }),
		sage: std(12964016, maps.sage, { roughness: .9 }),
		sageDark: std(9083506, maps.sage, { roughness: .9 }),
		wood: std(15255968, maps.wood, { roughness: .84 }),
		woodLight: std(15982018, maps.wood, { roughness: .82 }),
		iron: std(13619410, maps.iron, {
			roughness: .48,
			metalness: .55
		}),
		ironDark: std(9079694, maps.iron, {
			roughness: .42,
			metalness: .62
		}),
		rust: std(15245456, maps.rust, {
			roughness: .72,
			metalness: .22
		}),
		rustBright: std(16756888, maps.rust, {
			roughness: .65,
			metalness: .18
		}),
		brass: std(15782032, maps.brass, {
			roughness: .4,
			metalness: .7
		}),
		cream: new MeshStandardMaterial({
			color: 15259063,
			roughness: .7,
			metalness: 0
		}),
		sandbag: std(15786180, maps.sandbag, { roughness: .92 }),
		rail: std(11580085, maps.iron, {
			roughness: .35,
			metalness: .7
		}),
		tie: std(13148280, maps.wood, { roughness: .88 }),
		runner: std(13938832, maps.leather, { roughness: .86 }),
		runnerDark: std(10516560, maps.leather, { roughness: .86 }),
		brute: std(11579570, maps.iron, {
			roughness: .5,
			metalness: .5
		}),
		bruteRust: std(13668464, maps.rust, {
			roughness: .7,
			metalness: .25
		}),
		swarm: std(13807744, maps.leather, { roughness: .88 }),
		swarmDark: std(10518616, maps.leather, { roughness: .88 }),
		boss: std(10132126, maps.iron, {
			roughness: .45,
			metalness: .6
		}),
		bossRed: std(14708832, maps.rust, {
			roughness: .6,
			metalness: .3
		}),
		hpBack: new MeshBasicMaterial({
			color: 2758672,
			depthTest: false
		}),
		hpFill: new MeshBasicMaterial({
			color: 12868666,
			depthTest: false
		}),
		hpFillOk: new MeshBasicMaterial({
			color: 8032090,
			depthTest: false
		}),
		range: new MeshBasicMaterial({
			color: 12868666,
			transparent: true,
			opacity: .22,
			depthWrite: false,
			side: 2
		}),
		rangeLine: new MeshBasicMaterial({
			color: 15985372,
			transparent: true,
			opacity: .55,
			depthWrite: false,
			side: 2
		}),
		plot: std(12886138, maps.wood, { roughness: .88 }),
		plotHover: std(15782048, maps.wood, { roughness: .88 }),
		plotSel: std(16756880, maps.rust, {
			roughness: .7,
			metalness: .2
		}),
		beamSniper: new MeshBasicMaterial({
			color: 15985372,
			transparent: true,
			opacity: .85,
			depthWrite: false
		}),
		beamSlow: new MeshBasicMaterial({
			color: 13214247,
			transparent: true,
			opacity: .7,
			depthWrite: false
		}),
		beamOil: new MeshBasicMaterial({
			color: 12868666,
			transparent: true,
			opacity: .78,
			depthWrite: false
		}),
		beamHarpoon: new MeshBasicMaterial({
			color: 14196826,
			transparent: true,
			opacity: .82,
			depthWrite: false
		}),
		beamBeacon: new MeshBasicMaterial({
			color: 15777888,
			transparent: true,
			opacity: .55,
			depthWrite: false
		}),
		bullet: std(15985372, maps.brass, {
			roughness: .35,
			metalness: .65
		}),
		shell: std(10132124, maps.iron, {
			roughness: .4,
			metalness: .7
		}),
		unlitWhite: new MeshBasicMaterial({ color: 15985372 }),
		blob: new MeshBasicMaterial({
			color: 3810324,
			transparent: true,
			opacity: .28,
			depthWrite: false
		})
	};
}
function makeGeos() {
	return {
		box: new BoxGeometry(1, 1, 1),
		sphere: new SphereGeometry(1, 8, 6),
		cyl: new CylinderGeometry(1, 1, 1, 8),
		cone: new ConeGeometry(1, 1, 8),
		plane: new PlaneGeometry(1, 1),
		ring: new RingGeometry(.92, 1, 48),
		ringThin: new RingGeometry(.98, 1.04, 48)
	};
}
function addBox(parent, mat, w, h, d, x, y, z, geos, rotY = 0) {
	const m = new Mesh(geos.box, mat);
	m.scale.set(w, h, d);
	m.position.set(x, y, z);
	m.rotation.y = rotY;
	m.castShadow = true;
	m.receiveShadow = true;
	parent.add(m);
	return m;
}
function addCyl(parent, mat, rTop, rBot, h, x, y, z, geos, rotX = 0, rotZ = 0) {
	const geo = rTop === rBot ? geos.cyl : new CylinderGeometry(rTop, rBot, h, 8);
	const m = new Mesh(geo, mat);
	if (rTop === rBot) m.scale.set(rTop, h, rBot);
	m.position.set(x, y, z);
	m.rotation.x = rotX;
	m.rotation.z = rotZ;
	m.castShadow = true;
	m.receiveShadow = true;
	parent.add(m);
	return m;
}
var UNIT_SIZE = {
	runner: {
		w: 1.12,
		h: 1.42
	},
	brute: {
		w: 1.42,
		h: 1.58
	},
	swarm: {
		w: 1.12,
		h: .82
	},
	boss: {
		w: 2.15,
		h: 1.62
	},
	scout: {
		w: 1.02,
		h: 1.32
	},
	rider: {
		w: 1.55,
		h: 1.48
	},
	bomber: {
		w: 1.28,
		h: 1.45
	},
	outlaw: {
		w: 1.18,
		h: 1.5
	},
	sapper: {
		w: 1.22,
		h: 1.42
	},
	engine: {
		w: 2.55,
		h: 1.88
	}
};
var GUN_SIZE = {
	gunner: {
		w: 1.38,
		h: 1.28
	},
	cannon: {
		w: 1.62,
		h: 1.28
	},
	slow: {
		w: 1.12,
		h: 2.25
	},
	sniper: {
		w: 1.28,
		h: 2.18
	},
	gatling: {
		w: 1.48,
		h: 1.32
	},
	dynamite: {
		w: 1.42,
		h: 1.35
	},
	oil: {
		w: 1.45,
		h: 1.18
	},
	harpoon: {
		w: 1.58,
		h: 1.42
	},
	beacon: {
		w: 1.18,
		h: 2.08
	},
	siege: {
		w: 1.88,
		h: 1.48
	},
	hotchkiss: {
		w: 1.52,
		h: 1.36
	}
};
var DEPOT_SIZE = [
	{
		w: 3.55,
		h: 2.95
	},
	{
		w: 4.15,
		h: 3.45
	},
	{
		w: 4.55,
		h: 3.85
	},
	{
		w: 4.95,
		h: 4.25
	}
];
function makeUnitSprite(map, w, h) {
	const mat = new SpriteMaterial({
		map,
		transparent: true,
		alphaTest: .28,
		depthWrite: true
	});
	const spr = new Sprite(mat);
	spr.name = "body";
	spr.center.set(.5, 0);
	spr.scale.set(w, h, 1);
	spr.renderOrder = 3;
	return spr;
}
function addBlob(parent, kit, w, d) {
	const m = new Mesh(kit.geos.plane, kit.mats.blob);
	m.rotation.x = -Math.PI / 2;
	m.position.y = .025;
	m.scale.set(w, d, 1);
	m.renderOrder = 1;
	parent.add(m);
	return m;
}
function buildTerrain(scene, kit) {
	const ground = new Mesh(new PlaneGeometry(88, 72), kit.mats.dust);
	ground.rotation.x = -Math.PI / 2;
	ground.position.set(8, 0, 5.5);
	ground.receiveShadow = true;
	scene.add(ground);
	const packed = new Mesh(new PlaneGeometry(22, 16), kit.mats.packed);
	packed.rotation.x = -Math.PI / 2;
	packed.position.set(8.2, .008, 6.2);
	packed.receiveShadow = true;
	scene.add(packed);
	const creek = new Mesh(new PlaneGeometry(18, 1.6), kit.mats.sageDark);
	creek.rotation.x = -Math.PI / 2;
	creek.position.set(7.5, .012, 13.6);
	creek.receiveShadow = true;
	scene.add(creek);
	const creek2 = new Mesh(new PlaneGeometry(8, 1.1), kit.mats.sage);
	creek2.rotation.x = -Math.PI / 2;
	creek2.position.set(-1.2, .013, 12.4);
	creek2.rotation.z = .4;
	creek2.receiveShadow = true;
	scene.add(creek2);
	const rng = mulberry32(42);
	const rockGeo = kit.geos.box;
	for (let i = 0; i < 38; i++) {
		const x = rng() * 26 - 4;
		const z = rng() * 20 - 3;
		if (nearPath(x, z, 1.55) || nearPlot(x, z, 1.25)) continue;
		const rock = new Mesh(rockGeo, rng() > .45 ? kit.mats.dustDark : kit.mats.iron);
		const s = .26 + rng() * .7;
		rock.scale.set(s, .18 + rng() * .48, s * (.7 + rng() * .5));
		rock.position.set(x, rock.scale.y / 2, z);
		rock.rotation.y = rng() * Math.PI;
		rock.castShadow = true;
		rock.receiveShadow = true;
		scene.add(rock);
	}
	const plantMats = kit.maps.plants.map((t) => new SpriteMaterial({
		map: t,
		transparent: true,
		depthWrite: false,
		alphaTest: .28
	}));
	const plants = [];
	const plantRng = mulberry32(99);
	for (let i = 0; i < 92; i++) {
		const x = plantRng() * 28 - 5;
		const z = plantRng() * 22 - 4;
		if (nearPath(x, z, 1.3) || nearPlot(x, z, 1.1)) continue;
		const mat = plantMats[Math.floor(plantRng() * plantMats.length)];
		const spr = new Sprite(mat);
		const tall = i % 3 === 0;
		const h = (tall ? 1.05 : .72) + plantRng() * .95;
		spr.scale.set(h * (tall ? .78 : .92), h, 1);
		spr.position.set(x, h * .46, z);
		scene.add(spr);
		plants.push(spr);
	}
	placeProp(scene, kit.maps.props.wagon, -1.6, .6, 2.35, 1.55);
	placeProp(scene, kit.maps.props.tent, 15.9, 5.55, 2.15, 1.65);
	placeProp(scene, kit.maps.props.watertower, -3.4, 8.4, 2.05, 3.15);
	placeProp(scene, kit.maps.props.windmill, 21.6, 1.4, 2.55, 3.55);
	placeProp(scene, kit.maps.props.tent, .4, 12.6, 1.85, 1.45);
	placeProp(scene, kit.maps.props.wagon, 19.4, 11.8, 2.15, 1.45);
	for (const [x, z, w, h, d] of [
		[
			-9,
			-6.5,
			6.2,
			2.4,
			4.6
		],
		[
			25,
			-7.5,
			7.2,
			3.1,
			5.2
		],
		[
			27,
			17,
			5.6,
			2,
			5.4
		],
		[
			-8,
			17,
			5.2,
			2.6,
			4.6
		],
		[
			22,
			18.5,
			4.4,
			1.6,
			3.8
		]
	]) {
		addBox(scene, kit.mats.dustDark, w, h, d, x, h / 2, z, kit.geos);
		addBox(scene, kit.mats.rust, w * .9, .16, d * .9, x, h + .05, z, kit.geos);
	}
	return plants;
}
function placeProp(scene, map, x, z, w, h) {
	const spr = new Sprite(new SpriteMaterial({
		map,
		transparent: true,
		alphaTest: .28,
		depthWrite: true
	}));
	spr.center.set(.5, 0);
	spr.scale.set(w, h, 1);
	spr.position.set(x, .02, z);
	spr.renderOrder = 2;
	scene.add(spr);
}
function buildHorizon(scene, kit) {
	const mat = new MeshBasicMaterial({
		map: kit.maps.horizon,
		fog: false,
		depthWrite: false
	});
	for (const [x, y, z] of [
		[
			-18,
			10,
			-22
		],
		[
			-26,
			9.2,
			6
		],
		[
			8,
			11,
			-26
		],
		[
			28,
			10.5,
			-10
		]
	]) {
		const plate = new Mesh(new PlaneGeometry(110, 34), mat);
		plate.position.set(x, y, z);
		plate.lookAt(8.15, 3, 5.7);
		scene.add(plate);
	}
}
function buildRails(scene, kit) {
	const tieGeos = [];
	const dirtGeos = [];
	const tieProto = new BoxGeometry(.72, .07, .16);
	const dirtProto = new BoxGeometry(1.15, .04, .5);
	const seen = /* @__PURE__ */ new Set();
	const walk = (pts) => {
		let dist = 0;
		for (let i = 1; i < pts.length; i++) {
			const a = pts[i - 1];
			const b = pts[i];
			const len = Math.hypot(b.x - a.x, b.z - a.z);
			const heading = Math.atan2(b.x - a.x, b.z - a.z);
			const steps = Math.max(1, Math.floor(len / .42));
			for (let s = 0; s <= steps; s++) {
				const t = s / steps;
				const x = a.x + (b.x - a.x) * t;
				const z = a.z + (b.z - a.z) * t;
				const key = `${x.toFixed(2)}:${z.toFixed(2)}`;
				if (seen.has(key)) continue;
				seen.add(key);
				const tg = tieProto.clone();
				tg.rotateY(heading);
				tg.translate(x, .04, z);
				tieGeos.push(tg);
				const dg = dirtProto.clone();
				dg.rotateY(heading);
				dg.translate(x, .015, z);
				dirtGeos.push(dg);
				dist += .42;
			}
		}
	};
	PATHS.forEach(walk);
	if (dirtGeos.length) {
		const dirt = new Mesh(mergeGeometries(dirtGeos), kit.mats.packed);
		dirt.receiveShadow = true;
		scene.add(dirt);
		dirtGeos.forEach((g) => g.dispose());
	}
	if (tieGeos.length) {
		const ties = new Mesh(mergeGeometries(tieGeos), kit.mats.tie);
		ties.receiveShadow = true;
		ties.castShadow = true;
		scene.add(ties);
		tieGeos.forEach((g) => g.dispose());
	}
	tieProto.dispose();
	dirtProto.dispose();
	for (const pts of PATHS) {
		const vecs = pts.map((p) => new Vector3(p.x, .09, p.z));
		new CatmullRomCurve3(vecs, false, "catmullrom", .05);
		const side = .18;
		for (const sign of [-1, 1]) {
			const offset = pts.map((p, i) => {
				const n = i < pts.length - 1 ? i : i - 1;
				const a = pts[n];
				const b = pts[n + 1] ?? pts[n];
				const heading = Math.atan2(b.x - a.x, b.z - a.z);
				return new Vector3(p.x + Math.cos(heading) * side * sign, .1, p.z - Math.sin(heading) * side * sign);
			});
			const c = new CatmullRomCurve3(offset, false, "catmullrom", .05);
			const tube = new Mesh(new TubeGeometry(c, 80, .035, 5, false), kit.mats.rail);
			tube.castShadow = true;
			scene.add(tube);
		}
	}
}
function buildDepot(kit) {
	const g = new Group();
	addBox(g, kit.mats.woodLight, 3.6, .14, 3, 0, .07, 0, kit.geos);
	addBox(g, kit.mats.wood, 2.4, .55, 1.8, .1, .4, 0, kit.geos);
	addBox(g, kit.mats.iron, .18, .55, 1.1, -1.7, .35, 0, kit.geos);
	addBox(g, kit.mats.woodLight, .4, .32, .4, 1.35, .3, 1.05, kit.geos);
	addBox(g, kit.mats.wood, .32, .28, .32, 1.6, .28, .7, kit.geos);
	const grow1 = new Group();
	grow1.name = "grow1";
	grow1.visible = false;
	addBox(grow1, kit.mats.wood, 4.4, .12, 3.6, .1, .08, .15, kit.geos);
	addBox(grow1, kit.mats.sandbag, .42, .28, 1.6, -2, .28, .6, kit.geos);
	addBox(grow1, kit.mats.sandbag, .42, .28, 1.6, -2, .28, -.7, kit.geos);
	addCyl(grow1, kit.mats.wood, .05, .05, 1.7, -2.35, .85, -1.25, kit.geos);
	addCyl(grow1, kit.mats.rust, .5, .5, .65, -2.35, 1.85, -1.25, kit.geos);
	g.add(grow1);
	const grow2 = new Group();
	grow2.name = "grow2";
	grow2.visible = false;
	for (const z of [-1.7, 1.7]) addBox(grow2, kit.mats.wood, 4.8, .85, .12, .05, .5, z, kit.geos);
	addBox(grow2, kit.mats.ironDark, .14, 1.15, 3.4, -2.45, .7, 0, kit.geos);
	addBox(grow2, kit.mats.sandbag, .5, .38, 2.2, 2.15, .32, .2, kit.geos);
	addCyl(grow2, kit.mats.wood, .08, .08, 2.4, 2.05, 1.25, -1.55, kit.geos);
	addCyl(grow2, kit.mats.wood, .08, .08, 2.4, -2.05, 1.25, 1.55, kit.geos);
	g.add(grow2);
	const grow3 = new Group();
	grow3.name = "grow3";
	grow3.visible = false;
	addBox(grow3, kit.mats.iron, 5.2, .18, 4.1, .05, .16, .1, kit.geos);
	addBox(grow3, kit.mats.rust, .22, 1.6, 4, -2.7, .95, .1, kit.geos);
	addBox(grow3, kit.mats.rustBright, 1.1, .12, 1.4, .2, 2.35, -.1, kit.geos);
	addCyl(grow3, kit.mats.ironDark, .12, .12, 2.8, 2.35, 1.5, 1.7, kit.geos);
	addCyl(grow3, kit.mats.brass, .16, .16, .28, 2.35, 2.95, 1.7, kit.geos);
	g.add(grow3);
	const body = makeUnitSprite(kit.maps.depot[0][0], DEPOT_SIZE[0].w, DEPOT_SIZE[0].h);
	body.name = "depotBody";
	body.position.set(.15, .1, 0);
	body.renderOrder = 2;
	g.add(body);
	const flag = makeUnitSprite(kit.maps.flag[0], .85, 1.55);
	flag.name = "depotFlag";
	flag.position.set(-1.55, 2.05, -.85);
	flag.renderOrder = 5;
	g.add(flag);
	const smoke0 = makeUnitSprite(kit.maps.smoke[0], 1.05, 1.55);
	smoke0.name = "depotSmoke0";
	smoke0.position.set(-1.7, 2.15, -.7);
	smoke0.renderOrder = 6;
	g.add(smoke0);
	const smoke1 = makeUnitSprite(kit.maps.smoke[1], 1.15, 1.7);
	smoke1.name = "depotSmoke1";
	smoke1.position.set(.55, 2.45, .15);
	smoke1.renderOrder = 6;
	smoke1.visible = false;
	g.add(smoke1);
	g.position.set(DEPOT.x, 0, DEPOT.z);
	return g;
}
function buildPlot(kit) {
	const g = new Group();
	const pad = addBox(g, kit.mats.plot, .95, .1, .95, 0, .05, 0, kit.geos);
	pad.name = "pad";
	addBox(g, kit.mats.wood, 1.02, .06, .08, 0, .08, .48, kit.geos);
	addBox(g, kit.mats.wood, 1.02, .06, .08, 0, .08, -.48, kit.geos);
	addBox(g, kit.mats.wood, .08, .06, 1.02, .48, .08, 0, kit.geos);
	addBox(g, kit.mats.wood, .08, .06, 1.02, -.48, .08, 0, kit.geos);
	const hit = new Mesh(kit.geos.box, new MeshBasicMaterial({ visible: false }));
	hit.scale.set(1.15, .5, 1.15);
	hit.position.y = .25;
	g.add(hit);
	return g;
}
function buildTower(kind, tier, kit) {
	const g = new Group();
	const size = GUN_SIZE[kind];
	const grow = 1 + tier * .08;
	addBox(g, kit.mats.wood, .72, .1, .72, 0, .05, 0, kit.geos);
	if (kind === "gunner" || kind === "cannon" || kind === "gatling" || kind === "hotchkiss") {
		addBox(g, kit.mats.sandbag, .26, .14, .16, .22, .16, .2, kit.geos);
		addBox(g, kit.mats.sandbag, .26, .14, .16, -.22, .16, .2, kit.geos);
	}
	addBlob(g, kit, size.w * .42 * grow, size.w * .28 * grow);
	const spr = makeUnitSprite(kit.maps.guns[kind][0], size.w * grow, size.h * grow);
	spr.position.y = .04;
	g.add(spr);
	const mz = new Sprite(new SpriteMaterial({
		map: kit.maps.fx[2],
		transparent: true,
		depthWrite: false
	}));
	mz.name = "muzzle";
	mz.visible = false;
	mz.center.set(.5, .5);
	mz.position.y = size.h * grow * .62;
	mz.scale.set(.7, .7, 1);
	mz.renderOrder = 4;
	g.add(mz);
	const hit = new Mesh(kit.geos.box, new MeshBasicMaterial({ visible: false }));
	hit.scale.set(Math.max(1.1, size.w * .7 * grow), size.h * grow, Math.max(1.1, size.w * .55 * grow));
	hit.position.y = size.h * grow / 2;
	g.add(hit);
	return g;
}
function buildEnemy(kind, kit) {
	const g = new Group();
	const size = UNIT_SIZE[kind];
	addBlob(g, kit, size.w * .38, size.w * .24);
	const spr = makeUnitSprite(kit.maps.units[kind][0], size.w, size.h);
	g.add(spr);
	if (kind === "boss" || kind === "engine") attachHp(g, kit, 1.05, size.h + .18);
	else if (kind === "brute" || kind === "bomber" || kind === "sapper") attachHp(g, kit, .58, size.h + .16);
	else if (kind !== "swarm") attachHp(g, kit, .42, size.h + .14);
	return g;
}
function attachHp(g, kit, width, y) {
	const bar = new Group();
	bar.name = "hp";
	bar.position.y = y;
	const back = new Mesh(kit.geos.plane, kit.mats.hpBack);
	back.scale.set(width, .07, 1);
	back.renderOrder = 10;
	bar.add(back);
	const fill = new Mesh(kit.geos.plane, kit.mats.hpFill);
	fill.name = "hpFill";
	fill.scale.set(width, .05, 1);
	fill.position.z = .01;
	fill.renderOrder = 11;
	bar.add(fill);
	g.add(bar);
}
function nearPath(x, z, r) {
	for (const pts of PATHS) for (let i = 1; i < pts.length; i++) {
		const a = pts[i - 1];
		const b = pts[i];
		if (distToSeg(x, z, a.x, a.z, b.x, b.z) < r) return true;
	}
	return false;
}
function nearPlot(x, z, r) {
	return PLOTS.some((p) => Math.hypot(p.x - x, p.z - z) < r);
}
function distToSeg(px, pz, ax, az, bx, bz) {
	const abx = bx - ax;
	const abz = bz - az;
	const t = Math.max(0, Math.min(1, ((px - ax) * abx + (pz - az) * abz) / (abx * abx + abz * abz || 1)));
	return Math.hypot(px - (ax + abx * t), pz - (az + abz * t));
}
function mulberry32(a) {
	return function() {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
var _v = new Vector3();
var _n = new Vector3();
var _up = new Vector3(0, 1, 0);
var _dir = new Vector3();
function isoFacing(yaw) {
	return Math.sin(yaw) - Math.cos(yaw) >= 0 ? 1 : -1;
}
var GameView = class {
	renderer;
	scene = new Scene();
	camera;
	raycaster = new Raycaster();
	pointer = new Vector2();
	kit;
	canvas;
	ro;
	unsub;
	camBase = new Vector3();
	look = new Vector3(8.15, 0, 5.7);
	clock = new Timer();
	disposed = false;
	reduced = false;
	plotMeshes = /* @__PURE__ */ new Map();
	towerMeshes = /* @__PURE__ */ new Map();
	enemyMeshes = /* @__PURE__ */ new Map();
	protoEnemy;
	pickables = [];
	rangeRing;
	rangeRim;
	projGroup = new Group();
	beamGroup = new Group();
	pulseGroup = new Group();
	particleMesh;
	dummy = new Object3D();
	particleMat;
	projPool = [];
	beamPool = [];
	pulsePool = [];
	burstPool = [];
	burstMats = [];
	plants = [];
	depot = null;
	depotShown = 0;
	lastBuildRev = -1;
	pointerOn = false;
	constructor(canvas) {
		this.canvas = canvas;
		this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		this.renderer = new WebGLRenderer({
			canvas,
			antialias: true,
			alpha: false,
			powerPreference: "high-performance"
		});
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.renderer.setSize(canvas.clientWidth || canvas.parentElement?.clientWidth || 1, canvas.clientHeight || canvas.parentElement?.clientHeight || 1, false);
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = 1;
		this.renderer.outputColorSpace = SRGBColorSpace;
		this.renderer.toneMapping = 4;
		this.renderer.toneMappingExposure = 1.05;
		this.renderer.setClearColor(11565646, 1);
		this.camera = new OrthographicCamera(-12, 12, 10, -10, .1, 120);
		const maps = loadArt();
		boostAnisotropy(maps, Math.min(8, this.renderer.capabilities.getMaxAnisotropy()));
		this.kit = {
			mats: makeMaterials(maps),
			geos: makeGeos(),
			maps
		};
		this.scene.fog = new Fog(12093538, 30, 70);
		this.scene.background = maps.sky;
		const hemi = new HemisphereLight(16176288, 5912612, 1.18);
		this.scene.add(hemi);
		const sun = new DirectionalLight(16760960, 1.5);
		sun.position.set(12, 18, 7);
		sun.castShadow = true;
		sun.shadow.mapSize.set(1024, 1024);
		sun.shadow.camera.near = 2;
		sun.shadow.camera.far = 48;
		sun.shadow.camera.left = -16;
		sun.shadow.camera.right = 16;
		sun.shadow.camera.top = 16;
		sun.shadow.camera.bottom = -16;
		sun.shadow.bias = -.001;
		this.scene.add(sun);
		const fill = new DirectionalLight(6978202, .26);
		fill.position.set(-10, 12, -6);
		this.scene.add(fill);
		this.scene.add(new AmbientLight(16770240, .22));
		this.plants = buildTerrain(this.scene, this.kit);
		buildHorizon(this.scene, this.kit);
		buildRails(this.scene, this.kit);
		this.depot = buildDepot(this.kit);
		this.scene.add(this.depot);
		for (const plot of PLOTS) {
			const mesh = buildPlot(this.kit);
			mesh.position.set(plot.x, 0, plot.z);
			mesh.userData.plotId = plot.id;
			this.scene.add(mesh);
			this.plotMeshes.set(plot.id, mesh);
			this.pickables.push(mesh);
		}
		this.protoEnemy = {
			runner: buildEnemy("runner", this.kit),
			brute: buildEnemy("brute", this.kit),
			swarm: buildEnemy("swarm", this.kit),
			boss: buildEnemy("boss", this.kit),
			scout: buildEnemy("scout", this.kit),
			rider: buildEnemy("rider", this.kit),
			bomber: buildEnemy("bomber", this.kit),
			outlaw: buildEnemy("outlaw", this.kit),
			sapper: buildEnemy("sapper", this.kit),
			engine: buildEnemy("engine", this.kit)
		};
		this.rangeRing = new Mesh(this.kit.geos.ring, this.kit.mats.range);
		this.rangeRing.rotation.x = -Math.PI / 2;
		this.rangeRing.position.y = .07;
		this.rangeRing.visible = false;
		this.scene.add(this.rangeRing);
		this.rangeRim = new Mesh(this.kit.geos.ringThin, this.kit.mats.rangeLine);
		this.rangeRim.rotation.x = -Math.PI / 2;
		this.rangeRim.position.y = .08;
		this.rangeRim.visible = false;
		this.scene.add(this.rangeRim);
		this.scene.add(this.projGroup, this.beamGroup, this.pulseGroup);
		this.burstMats = this.kit.maps.fx.map((t) => new SpriteMaterial({
			map: t,
			transparent: true,
			depthWrite: false
		}));
		this.particleMat = new MeshBasicMaterial({ color: 16777215 });
		this.particleMesh = new InstancedMesh(this.kit.geos.box, this.particleMat, 220);
		this.particleMesh.instanceMatrix.setUsage(DynamicDrawUsage);
		this.particleMesh.castShadow = false;
		this.particleMesh.frustumCulled = false;
		this.scene.add(this.particleMesh);
		this.fitCamera();
		this.camBase.copy(this.camera.position);
		requestAnimationFrame(() => this.fitCamera());
		this.ro = new ResizeObserver(() => this.fitCamera());
		this.ro.observe(this.canvas.parentElement ?? this.canvas);
		this.canvas.addEventListener("pointermove", this.onPointerMove);
		this.canvas.addEventListener("pointerdown", this.onPointerDown);
		this.canvas.addEventListener("pointerleave", this.onPointerLeave);
		this.unsub = useGame.subscribe(() => {
			this.syncTowers();
			this.syncRange();
		});
		this.clock.connect(document);
		this.renderer.setAnimationLoop(this.loop);
		const w = window;
		w.__ironPick = (id) => {
			const plot = plotById(id);
			if (!plot) return null;
			_v.set(plot.x, .2, plot.z).project(this.camera);
			const rect = this.renderer.domElement.getBoundingClientRect();
			return {
				x: (_v.x * .5 + .5) * rect.width + rect.left,
				y: (-_v.y * .5 + .5) * rect.height + rect.top
			};
		};
	}
	dispose() {
		this.disposed = true;
		this.renderer.setAnimationLoop(null);
		this.clock.disconnect();
		this.ro.disconnect();
		this.unsub();
		delete window.__ironPick;
		this.canvas.removeEventListener("pointermove", this.onPointerMove);
		this.canvas.removeEventListener("pointerdown", this.onPointerDown);
		this.canvas.removeEventListener("pointerleave", this.onPointerLeave);
		this.scene.traverse((obj) => {
			if (obj instanceof Mesh || obj instanceof Sprite) {
				if (obj instanceof Mesh) obj.geometry.dispose();
				const m = obj.material;
				if (Array.isArray(m)) m.forEach((x) => x.dispose());
				else m.dispose();
			}
		});
		this.renderer.dispose();
	}
	fitCamera() {
		const w = Math.max(1, this.canvas.clientWidth || this.canvas.parentElement?.clientWidth || 1);
		const h = Math.max(1, this.canvas.clientHeight || this.canvas.parentElement?.clientHeight || 1);
		this.renderer.setSize(w, h, false);
		const aspect = w / h;
		let halfH = 8.55;
		let halfW = halfH * aspect;
		if (halfW < 7.1) {
			halfW = 7.1;
			halfH = halfW / aspect;
		}
		this.camera.left = -halfW;
		this.camera.right = halfW;
		this.camera.top = halfH;
		this.camera.bottom = -halfH;
		this.look.set(8.15, 0, 5.7);
		this.camera.position.set(this.look.x + 13.2, 16.2, this.look.z + 13.2);
		this.camera.lookAt(this.look);
		const hudPx = Math.round(Math.min(h * .16, 92));
		this.camera.setViewOffset(w, h, 0, 0, w, Math.max(1, h - hudPx));
		this.camera.updateProjectionMatrix();
		this.camBase.copy(this.camera.position);
	}
	loop = () => {
		if (this.disposed) return;
		this.clock.update();
		const dt = Math.min(this.clock.getDelta(), .1);
		const { speed, phase, cine } = useGame.getState();
		const simSpeed = cine ? 0 : phase === "combat" || phase === "prep" ? speed : 1;
		if (!cine) sim.step(dt, simSpeed);
		this.syncTowers();
		this.syncEnemies();
		this.syncProjectiles();
		this.syncBeams();
		this.syncPulses();
		this.syncParticles();
		this.syncRange();
		this.syncPlots();
		this.animTowers();
		this.animDepot();
		this.animPlants();
		this.applyShake();
		this.renderer.render(this.scene, this.camera);
	};
	applyShake() {
		if (this.reduced) {
			this.camera.position.copy(this.camBase);
			return;
		}
		const t = sim.trauma * sim.trauma;
		if (t <= 8e-4) {
			this.camera.position.copy(this.camBase);
			return;
		}
		const n = this.clock.getElapsed();
		this.camera.position.set(this.camBase.x + Math.sin(n * 37.1) * t * .28, this.camBase.y + Math.sin(n * 41.7) * t * .12, this.camBase.z + Math.cos(n * 33.3) * t * .28);
	}
	syncTowers() {
		if (this.lastBuildRev === sim.buildRev) return;
		this.lastBuildRev = sim.buildRev;
		for (const [id, mesh] of this.towerMeshes) if (!sim.towers.has(id)) {
			this.scene.remove(mesh);
			this.towerMeshes.delete(id);
			const idx = this.pickables.indexOf(mesh);
			if (idx >= 0) this.pickables.splice(idx, 1);
		}
		for (const t of sim.towers.values()) {
			const existing = this.towerMeshes.get(t.plotId);
			const key = `${t.kind}:${t.tier}`;
			if (existing && existing.userData.key === key) continue;
			if (existing) {
				this.scene.remove(existing);
				const idx = this.pickables.indexOf(existing);
				if (idx >= 0) this.pickables.splice(idx, 1);
			}
			const mesh = buildTower(t.kind, t.tier, this.kit);
			mesh.position.set(t.x, 0, t.z);
			mesh.userData.plotId = t.plotId;
			mesh.userData.tower = true;
			mesh.userData.key = key;
			this.scene.add(mesh);
			this.towerMeshes.set(t.plotId, mesh);
			this.pickables.push(mesh);
		}
		for (const [id, plot] of this.plotMeshes) plot.visible = !sim.towers.has(id);
	}
	syncEnemies() {
		const live = /* @__PURE__ */ new Set();
		const reduced = this.reduced;
		for (const e of sim.enemies) {
			live.add(e.id);
			let mesh = this.enemyMeshes.get(e.id);
			if (!mesh) {
				mesh = this.protoEnemy[e.kind].clone(true);
				mesh.traverse((o) => {
					if (o instanceof Sprite && o.material instanceof SpriteMaterial) o.material = o.material.clone();
				});
				this.scene.add(mesh);
				this.enemyMeshes.set(e.id, mesh);
			}
			mesh.position.set(e.x, e.y, e.z);
			mesh.rotation.y = 0;
			const punch = e.flash > 0 ? 1 + e.flash * .9 : 1;
			this.setSpriteFrame(mesh, this.kit.maps.units[e.kind], reduced ? 0 : Math.floor(e.bob) % 4, isoFacing(e.heading), UNIT_SIZE[e.kind].w * punch, UNIT_SIZE[e.kind].h * (e.flash > 0 ? 1 + e.flash * .35 : 1), e.flash > 0 ? 16765112 : 16777215);
			this.updateHp(mesh, e);
		}
		for (const [id, mesh] of this.enemyMeshes) if (!live.has(id)) {
			this.scene.remove(mesh);
			this.enemyMeshes.delete(id);
		}
	}
	updateHp(mesh, e) {
		const hp = mesh.getObjectByName("hp");
		if (!hp) return;
		hp.quaternion.copy(this.camera.quaternion);
		const fill = hp.getObjectByName("hpFill");
		if (!fill) return;
		const ratio = Math.max(0, e.hp / e.maxHp);
		fill.scale.x = Math.max(.02, ratio) * (e.kind === "boss" || e.kind === "engine" ? 1.05 : e.kind === "brute" || e.kind === "bomber" || e.kind === "sapper" ? .58 : .42);
		fill.position.x = (fill.scale.x - (e.kind === "boss" || e.kind === "engine" ? 1.05 : e.kind === "brute" || e.kind === "bomber" || e.kind === "sapper" ? .58 : .42)) / 2;
		fill.material = ratio < .35 ? this.kit.mats.hpFill : this.kit.mats.hpFillOk;
		hp.visible = e.kind !== "swarm";
	}
	syncProjectiles() {
		while (this.projPool.length < sim.projectiles.length) {
			const m = new Mesh(this.kit.geos.sphere, this.kit.mats.shell);
			this.projGroup.add(m);
			this.projPool.push(m);
		}
		for (let i = 0; i < this.projPool.length; i++) {
			const m = this.projPool[i];
			const p = sim.projectiles[i];
			if (!p) {
				m.visible = false;
				continue;
			}
			m.visible = true;
			m.position.set(p.x, p.y, p.z);
			m.material = p.kind === "shell" ? this.kit.mats.shell : this.kit.mats.bullet;
			const s = p.kind === "shell" ? .14 : .06;
			m.scale.setScalar(s);
		}
	}
	syncBeams() {
		while (this.beamPool.length < sim.beams.length) {
			const m = new Mesh(this.kit.geos.cyl, this.kit.mats.beamSniper);
			this.beamGroup.add(m);
			this.beamPool.push(m);
		}
		for (let i = 0; i < this.beamPool.length; i++) {
			const m = this.beamPool[i];
			const b = sim.beams[i];
			if (!b) {
				m.visible = false;
				continue;
			}
			m.visible = true;
			m.material = b.kind === "sniper" ? this.kit.mats.beamSniper : b.kind === "oil" ? this.kit.mats.beamOil : b.kind === "harpoon" ? this.kit.mats.beamHarpoon : b.kind === "beacon" ? this.kit.mats.beamBeacon : this.kit.mats.beamSlow;
			const start = _v.set(b.x1, b.y1, b.z1);
			const end = _n.set(b.x2, b.y2, b.z2);
			const dist = start.distanceTo(end);
			m.position.copy(start).add(end).multiplyScalar(.5);
			m.scale.set(b.kind === "sniper" ? .03 : .045, dist, b.kind === "sniper" ? .03 : .045);
			_dir.copy(end).sub(start).normalize();
			m.quaternion.setFromUnitVectors(_up, _dir);
			const fade = b.ttl / b.max;
			m.material.opacity = .25 + fade * .65;
		}
	}
	syncPulses() {
		while (this.pulsePool.length < sim.pulses.length) {
			const m = new Mesh(this.kit.geos.ring, this.kit.mats.range.clone());
			m.rotation.x = -Math.PI / 2;
			this.pulseGroup.add(m);
			this.pulsePool.push(m);
		}
		for (let i = 0; i < this.pulsePool.length; i++) {
			const m = this.pulsePool[i];
			const p = sim.pulses[i];
			if (!p) {
				m.visible = false;
				continue;
			}
			m.visible = true;
			const t = 1 - p.ttl / p.max;
			m.position.set(p.x, .08, p.z);
			m.scale.setScalar(p.radius * (.35 + t * 1.1));
			const mat = m.material;
			mat.color.setHex(p.color);
			mat.opacity = (1 - t) * .45;
		}
		while (this.burstPool.length < sim.pulses.length) {
			const spr = new Sprite(this.burstMats[this.burstPool.length % this.burstMats.length]);
			this.pulseGroup.add(spr);
			this.burstPool.push(spr);
		}
		for (let i = 0; i < this.burstPool.length; i++) {
			const spr = this.burstPool[i];
			const p = sim.pulses[i];
			if (!p) {
				spr.visible = false;
				continue;
			}
			spr.visible = true;
			const t = 1 - p.ttl / p.max;
			spr.position.set(p.x, .45 + t * .4, p.z);
			const s = p.radius * (.55 + t * 1.35);
			spr.scale.set(s, s, 1);
			const sm = spr.material;
			sm.opacity = (1 - t) * .95;
		}
	}
	syncParticles() {
		const n = sim.particles.length;
		this.particleMesh.count = n;
		for (let i = 0; i < n; i++) {
			const p = sim.particles[i];
			this.dummy.position.set(p.x, p.y, p.z);
			const s = p.size * (p.life / p.max);
			this.dummy.scale.setScalar(s);
			this.dummy.rotation.set(p.vx, p.life, p.vz);
			this.dummy.updateMatrix();
			this.particleMesh.setMatrixAt(i, this.dummy.matrix);
			this.particleMesh.setColorAt?.(i, this.tmpColor.setHex(p.color));
		}
		this.particleMesh.instanceMatrix.needsUpdate = true;
		if (this.particleMesh.instanceColor) this.particleMesh.instanceColor.needsUpdate = true;
	}
	tmpColor = new Color();
	syncRange() {
		const { placing, selectedPlotId, hoveredPlotId, phase } = useGame.getState();
		if (phase === "title" || phase === "won" || phase === "lost") {
			this.rangeRing.visible = false;
			this.rangeRim.visible = false;
			return;
		}
		let kind = placing;
		let x = 0;
		let z = 0;
		let range = 0;
		const hoverId = hoveredPlotId ?? selectedPlotId;
		if (placing && hoverId != null && !sim.towers.has(hoverId)) {
			const plot = plotById(hoverId);
			if (plot) {
				kind = placing;
				x = plot.x;
				z = plot.z;
				range = TOWERS[placing].stats[0].range;
			}
		} else if (selectedPlotId != null) {
			const t = sim.towers.get(selectedPlotId);
			if (t) {
				kind = t.kind;
				x = t.x;
				z = t.z;
				range = TOWERS[t.kind].stats[t.tier].range;
			}
		}
		if (!kind || range <= 0) {
			this.rangeRing.visible = false;
			this.rangeRim.visible = false;
			return;
		}
		this.rangeRing.visible = true;
		this.rangeRim.visible = true;
		this.rangeRing.position.set(x, .07, z);
		this.rangeRim.position.set(x, .08, z);
		this.rangeRing.scale.setScalar(range);
		this.rangeRim.scale.setScalar(range);
	}
	syncPlots() {
		const { hoveredPlotId, selectedPlotId, placing } = useGame.getState();
		for (const [id, mesh] of this.plotMeshes) {
			const pad = mesh.getObjectByName("pad");
			if (!pad) continue;
			if (selectedPlotId === id) pad.material = this.kit.mats.plotSel;
			else if (hoveredPlotId === id && (placing || !sim.towers.has(id))) pad.material = this.kit.mats.plotHover;
			else pad.material = this.kit.mats.plot;
		}
	}
	animTowers() {
		const t = this.clock.getElapsed();
		for (const tower of sim.towers.values()) {
			const mesh = this.towerMeshes.get(tower.plotId);
			if (!mesh) continue;
			const size = GUN_SIZE[tower.kind];
			const grow = 1 + tower.tier * .08;
			const firing = tower.kick > 0;
			const aiming = tower.targetId >= 0;
			let frame;
			if (this.reduced) frame = 0;
			else if (tower.kind === "gatling" || tower.kind === "hotchkiss") frame = Math.floor(t * (firing ? 16 : aiming ? 10 : 5) + tower.plotId) % 4;
			else if (tower.kind === "slow" || tower.kind === "oil" || tower.kind === "beacon") frame = Math.floor(t * (firing ? 8 : 3.4) + tower.plotId) % 4;
			else if (firing) frame = tower.kick > .16 ? 2 : 3;
			else if (aiming) frame = Math.floor(t * 4.8 + tower.plotId) % 2;
			else frame = Math.floor(t * 2.4 + tower.plotId) % 2;
			const rec = firing ? 1 + tower.kick * .28 : 1;
			this.setSpriteFrame(mesh, this.kit.maps.guns[tower.kind], frame, isoFacing(tower.yaw), size.w * grow * rec, size.h * grow * (firing && tower.kick > .14 ? 1.1 : 1), firing ? 16771280 : 16777215);
			const body = mesh.getObjectByName("body");
			if (body && !this.reduced) {
				const bobHz = tower.kind === "gatling" || tower.kind === "hotchkiss" ? 8.5 : tower.kind === "slow" || tower.kind === "beacon" ? 2.2 : 3.6;
				const amp = firing ? .055 : .028;
				body.position.y = .04 + Math.sin(t * bobHz + tower.plotId) * amp + (firing ? tower.kick * .06 : 0);
			}
			const mz = mesh.getObjectByName("muzzle");
			if (mz) {
				const on = firing && tower.kind !== "slow" && tower.kind !== "beacon";
				mz.visible = on;
				if (on) {
					const s = (tower.kind === "gatling" || tower.kind === "hotchkiss" ? .55 : .42) + tower.kick * 2.4;
					mz.scale.set(s, s * .9, 1);
					mz.position.y = size.h * grow * (tower.kind === "sniper" || tower.kind === "harpoon" ? .72 : .58);
					const mat = mz.material;
					const fx = this.kit.maps.fx[Math.floor(t * 22) % this.kit.maps.fx.length];
					if (mat.map !== fx) {
						mat.map = fx;
						mat.needsUpdate = true;
					}
					mat.opacity = Math.min(1, tower.kick * 7);
				}
			}
		}
	}
	animDepot() {
		const g = this.depot;
		if (!g) return;
		const stage = depotStage(sim.wave);
		const size = DEPOT_SIZE[stage];
		const frames = this.kit.maps.depot[stage];
		const t = this.clock.getElapsed();
		if (stage !== this.depotShown) {
			this.depotShown = stage;
			const grow1 = g.getObjectByName("grow1");
			const grow2 = g.getObjectByName("grow2");
			const grow3 = g.getObjectByName("grow3");
			if (grow1) grow1.visible = stage >= 1;
			if (grow2) grow2.visible = stage >= 2;
			if (grow3) grow3.visible = stage >= 3;
		}
		const body = g.getObjectByName("depotBody");
		if (body) {
			const mat = body.material;
			const map = frames[this.reduced ? 0 : Math.floor(t * 3.2) % 4];
			if (mat.map !== map) {
				mat.map = map;
				mat.needsUpdate = true;
			}
			body.scale.set(size.w, size.h, 1);
			if (!this.reduced) body.position.y = .1 + Math.sin(t * 1.6) * .02;
		}
		const flag = g.getObjectByName("depotFlag");
		if (flag) {
			const mat = flag.material;
			const map = this.kit.maps.flag[this.reduced ? 0 : Math.floor(t * 7) % 4];
			if (mat.map !== map) {
				mat.map = map;
				mat.needsUpdate = true;
			}
			flag.position.set(-1.35 - stage * .12, 1.85 + stage * .35, -.75);
			flag.scale.set(.8 + stage * .08, 1.45 + stage * .18, 1);
			flag.visible = true;
		}
		const s0 = g.getObjectByName("depotSmoke0");
		const s1 = g.getObjectByName("depotSmoke1");
		if (s0) {
			const mat = s0.material;
			const map = this.kit.maps.smoke[this.reduced ? 0 : Math.floor(t * 6) % 4];
			if (mat.map !== map) {
				mat.map = map;
				mat.needsUpdate = true;
			}
			s0.position.set(-1.55, 2.05 + stage * .28, -.65);
			s0.scale.set(1 + stage * .12, 1.5 + stage * .22, 1);
			mat.opacity = .72 + Math.sin(t * 2.2) * .12;
		}
		if (s1) {
			s1.visible = stage >= 2;
			const mat = s1.material;
			const map = this.kit.maps.smoke[this.reduced ? 0 : (Math.floor(t * 5.4) + 2) % 4];
			if (mat.map !== map) {
				mat.map = map;
				mat.needsUpdate = true;
			}
			s1.position.set(.7, 2.55 + stage * .18, .2);
			s1.scale.set(1.15, 1.75, 1);
			mat.opacity = .55 + Math.sin(t * 1.8 + 1) * .1;
		}
	}
	animPlants() {
		if (this.reduced) return;
		const t = this.clock.getElapsed();
		for (const p of this.plants) {
			const mat = p.material;
			mat.rotation = Math.sin(t * 1.35 + p.position.x * .4 + p.position.z * .22) * .08;
		}
	}
	setSpriteFrame(group, frames, frame, facing, w, h, tint) {
		const spr = group.getObjectByName("body");
		if (!spr) return;
		const mat = spr.material;
		const map = frames[(frame % frames.length + frames.length) % frames.length];
		if (mat.map !== map) {
			mat.map = map;
			mat.needsUpdate = true;
		}
		mat.color.setHex(tint);
		spr.scale.set(w * facing, h, 1);
	}
	hitPlot(ev) {
		const rect = this.renderer.domElement.getBoundingClientRect();
		this.pointer.x = (ev.clientX - rect.left) / rect.width * 2 - 1;
		this.pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
		this.raycaster.setFromCamera(this.pointer, this.camera);
		const hits = this.raycaster.intersectObjects(this.pickables, true);
		for (const h of hits) {
			let o = h.object;
			while (o) {
				if (typeof o.userData.plotId === "number") return o.userData.plotId;
				o = o.parent;
			}
		}
		return null;
	}
	onPointerMove = (ev) => {
		this.pointerOn = true;
		const { phase } = useGame.getState();
		if (phase === "title") return;
		const id = this.hitPlot(ev);
		useGame.getState().setHovered(id);
	};
	onPointerLeave = () => {
		this.pointerOn = false;
		useGame.getState().setHovered(null);
	};
	onPointerDown = (ev) => {
		if (ev.button !== 0) return;
		const state = useGame.getState();
		if (state.phase === "title" || state.phase === "won" || state.phase === "lost" || state.cine || cineLocked()) return;
		const id = this.hitPlot(ev);
		if (id == null) {
			state.setSelected(null);
			return;
		}
		if (state.placing && !sim.towers.has(id)) {
			if (sim.place(id, state.placing)) state.setSelected(id);
			return;
		}
		state.setSelected(id);
		state.setPlacing(null);
	};
};
function Game() {
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const settings = readSettings();
		useGame.getState().setMuted(settings.muted);
		useGame.getState().setSpeed(settings.speed);
		audio.setMuted(settings.muted);
	}, []);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const view = new GameView(canvas);
		const w = window;
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
			}
		};
		return () => {
			delete w.__iron;
			view.dispose();
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const persistNow = () => {
			if (!playable(sim.phase)) return;
			const snap = sim.snapshot();
			if (snap) flushSave(snap);
			const state = useGame.getState();
			writeSettings({
				muted: state.muted,
				speed: state.speed
			});
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
	(0, import_react.useEffect)(() => {
		const onKey = (ev) => {
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
						if (plotId != null && !sim.towers.has(plotId)) sim.place(plotId, kind);
						else state.setPlacing(state.placing === kind ? null : kind);
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
				const cycle = [
					1,
					2,
					4
				];
				const next = cycle[(cycle.indexOf(state.speed) + 1) % cycle.length];
				state.setSpeed(next);
				writeSettings({ speed: next });
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-dvh w-full overflow-hidden bg-bg text-fg select-none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "absolute inset-0 h-full w-full touch-none bg-sky"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "h-dvh overflow-hidden bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Game, {})
	});
}
//#endregion
export { Home as component };
