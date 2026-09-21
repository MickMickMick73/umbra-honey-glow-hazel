import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as FastForward, i as Lock, n as Volume2, t as VolumeX } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { A as Texture, C as RepeatWrapping, D as SphereGeometry, E as Scene, F as Vector3, M as Timer, N as TubeGeometry, O as Sprite, P as Vector2, S as Raycaster, T as SRGBColorSpace, _ as MeshBasicMaterial, a as CatmullRomCurve3, b as OrthographicCamera, c as ConeGeometry, d as DynamicDrawUsage, f as Fog, g as Mesh, h as InstancedMesh, i as BoxGeometry, j as TextureLoader, k as SpriteMaterial, l as CylinderGeometry, m as HemisphereLight, n as WebGLRenderer, o as ClampToEdgeWrapping, p as Group, r as AmbientLight, s as Color, t as mergeGeometries, u as DirectionalLight, v as MeshStandardMaterial, w as RingGeometry, x as PlaneGeometry, y as Object3D } from "../_libs/three.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BL5DA_xB.js
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
		dirt: tex("/art/tex/dirt.jpg", 18),
		sandbag: tex("/art/tex/sandbag.jpg", 1.2),
		brass: tex("/art/tex/brass.jpg", 1.5),
		leather: tex("/art/tex/leather.jpg", 1.8),
		sage: tex("/art/tex/sage.jpg", 2.2),
		plants: [
			1,
			2,
			3,
			4
		].map((i) => sprite(`/art/sprites/sage-${i}.png`)),
		fx: [
			1,
			2,
			3,
			4
		].map((i) => sprite(`/art/sprites/fx-${i}.png`)),
		units: {
			runner: sheet("/art/sprites/units", "runner"),
			brute: sheet("/art/sprites/units", "brute"),
			swarm: sheet("/art/sprites/units", "swarm"),
			boss: sheet("/art/sprites/units", "boss"),
			scout: sheet("/art/sprites/units", "scout"),
			rider: sheet("/art/sprites/units", "rider"),
			bomber: sheet("/art/sprites/units", "bomber")
		},
		guns: {
			gunner: sheet("/art/sprites/guns", "gunner"),
			cannon: sheet("/art/sprites/guns", "cannon"),
			slow: sheet("/art/sprites/guns", "slow"),
			sniper: sheet("/art/sprites/guns", "sniper"),
			gatling: sheet("/art/sprites/guns", "gatling"),
			dynamite: sheet("/art/sprites/guns", "dynamite"),
			oil: sheet("/art/sprites/guns", "oil")
		}
	};
}
function boostAnisotropy(maps, n) {
	const apply = (t) => {
		t.anisotropy = n;
	};
	for (const v of Object.values(maps)) if (Array.isArray(v)) v.forEach(apply);
	else if (v instanceof Texture) apply(v);
	else for (const arr of Object.values(v)) arr.forEach(apply);
}
var TOWER_ART = {
	gunner: "/art/sprites/guns/gunner-1.png",
	cannon: "/art/sprites/guns/cannon-1.png",
	slow: "/art/sprites/guns/slow-1.png",
	sniper: "/art/sprites/guns/sniper-1.png",
	gatling: "/art/sprites/guns/gatling-1.png",
	dynamite: "/art/sprites/guns/dynamite-1.png",
	oil: "/art/sprites/guns/oil-1.png"
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
		if (kind === "boss") {
			this.noiseBurst(e, .4, .55, 500);
			this.tone(e, 70, .1, .7, "sine", .5);
			this.tone(e, 110, .05, .45, "triangle", .25);
			return;
		}
		const base = kind === "brute" || kind === "bomber" ? 110 : kind === "swarm" ? 240 : kind === "scout" ? 280 : 170;
		this.noiseBurst(e, .07, kind === "brute" || kind === "bomber" ? .28 : .16, 700);
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
	"oil"
];
function towerUnlocked(kind, wave, waveActive = false) {
	const available = waveActive ? wave : Math.max(1, wave + 1);
	return TOWERS[kind].unlockWave <= available;
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
		kicker: "Halfway",
		title: "The line still holds."
	},
	ironclad: {
		src: "/art/cine/ironclad.mp4",
		poster: "/art/cine/ironclad.jpg",
		kicker: "Last wave",
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
var PATHS = [[
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
], [
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
]];
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
	maxLives: 20,
	wave: 0,
	totalWaves: 12,
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
	setSpeed: (speed) => set({ speed }),
	setMuted: (muted) => set({ muted }),
	setPlacing: (placing) => set({ placing }),
	setSelected: (selectedPlotId) => set({ selectedPlotId }),
	setHovered: (hoveredPlotId) => set({ hoveredPlotId }),
	setCine: (cine) => set({ cine }),
	applyHud: (snap) => set(snap)
}));
var Sim = class {
	phase = "title";
	gold = 200;
	lives = 20;
	maxLives = 20;
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
		this.gold = 200;
		this.lives = 20;
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
		this.banner = "Place emplacements. Start the wave when ready.";
		this.bannerT = 3.2;
		this.flushHud();
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
		if (this.wave >= 12) return false;
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
		this.bannerT = 2.4;
		audio.playWave();
		this.flushHud();
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
			if (this.wave >= 12) {
				this.phase = "won";
				this.banner = "The depot holds.";
				this.bannerT = 8;
				audio.playWin();
				useGame.getState().setCine("victory");
			} else {
				this.phase = "prep";
				this.waveName = WAVES[this.wave]?.name ?? "";
				const unlocked = TOWER_ORDER.filter((k) => TOWERS[k].unlockWave === this.wave + 1);
				if (this.wave === 6) useGame.getState().setCine("mid");
				if (unlocked.length) this.banner = `${unlocked.map((k) => TOWERS[k].name).join(" · ")} ready on the line.`;
				else this.banner = `Wave ${this.wave} clear. Fortify.`;
				this.bannerT = 2.8;
			}
			this.flushHud();
		}
	}
	spawnEnemy(kind, path, s = 0) {
		const def = ENEMIES[kind];
		const id = this.nextId++;
		const sample = samplePath(path, s);
		const lane = kind === "boss" ? 0 : kind === "swarm" ? (id % 5 - 2) * .2 : (id % 3 - 1) * .14;
		this.enemies.push({
			id,
			kind,
			hp: def.hp,
			maxHp: def.hp,
			speed: def.speed,
			path,
			s,
			x: sample.x,
			z: sample.z,
			y: 0,
			heading: sample.heading,
			lane,
			gold: def.gold,
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
			const gait = e.kind === "brute" || e.kind === "bomber" ? 3.4 : e.kind === "boss" ? 2.8 : e.kind === "swarm" ? 9.2 : e.kind === "rider" ? 8.4 : e.kind === "scout" ? 10.2 : 6.8;
			e.bob += dt * gait * Math.max(.4, slowed * enrage);
			e.s += spd * dt;
			const sample = samplePath(e.path, e.s);
			const sideX = Math.cos(sample.heading) * e.lane;
			const sideZ = -Math.sin(sample.heading) * e.lane;
			e.x = sample.x + sideX;
			e.z = sample.z + sideZ;
			e.heading = sample.heading;
			const hop = e.kind === "brute" || e.kind === "boss" ? .02 : .045;
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
			useGame.getState().setCine("defeat");
		}
		this.flushHud();
	}
	updateTowers(dt) {
		for (const t of this.towers.values()) {
			const stats = TOWERS[t.kind].stats[t.tier];
			t.cooldown = Math.max(0, t.cooldown - dt);
			if (t.kick > 0) t.kick = Math.max(0, t.kick - dt);
			const target = this.pickTarget(t, stats.range);
			t.targetId = target ? target.id : -1;
			if (target) {
				const desired = Math.atan2(target.x - t.x, target.z - t.z);
				t.yaw = dampAngle(t.yaw, desired, 10 * dt);
				if (t.cooldown <= 0) {
					this.fire(t, target);
					t.cooldown = 1 / stats.rate;
				}
			}
		}
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
		t.kick = t.kind === "cannon" || t.kind === "dynamite" ? .42 : t.kind === "sniper" ? .36 : t.kind === "slow" || t.kind === "oil" ? .32 : t.kind === "gatling" ? .14 : .22;
		const muzzleY = t.kind === "sniper" ? 1.35 : t.kind === "slow" ? 1.6 : .55;
		if (t.kind === "sniper") {
			this.hurt(target, stats.damage, t.x, t.z);
			this.beams.push({
				x1: t.x,
				y1: muzzleY,
				z1: t.z,
				x2: target.x,
				y2: .45,
				z2: target.z,
				ttl: .12,
				max: .12,
				kind: "sniper"
			});
			audio.playSniper();
			this.addTrauma(.08);
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
		if (t.kind === "cannon" || t.kind === "dynamite") {
			const dist = Math.hypot(target.x - t.x, target.z - t.z);
			const flight = Math.max(.28, dist / (t.kind === "dynamite" ? 5.4 : 7.2));
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
			if (p.kind === "shell") p.y = .55 + Math.sin(t * Math.PI) * 1.8;
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
		if (e.hp <= 0) this.kill(e, fromX, fromZ);
	}
	kill(e, _fromX, _fromZ) {
		this.gold += e.gold;
		this.kills += 1;
		audio.playDeath(e.kind);
		const color = e.kind === "boss" ? 3815996 : e.kind === "brute" || e.kind === "bomber" ? 4864562 : 6965810;
		this.burst(e.x, .5, e.z, e.kind === "boss" ? 28 : e.kind === "bomber" ? 18 : 10, color, 2.2);
		this.addTrauma(e.kind === "boss" ? .55 : e.kind === "bomber" ? .22 : .08);
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
		if (e.kind === "boss") for (let i = 0; i < 4; i++) this.spawnEnemy("runner", e.path, Math.max(0, e.s - .4));
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
			totalWaves: 12,
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
	useGame.getState().setCine("intro");
}
function beginRun() {
	audio.unlock();
	audio.setMuted(useGame.getState().muted);
	useGame.getState().setPlacing(null);
	useGame.getState().setSelected(null);
	useGame.getState().setCine(null);
	sim.reset();
}
function skipCine() {
	const id = useGame.getState().cine;
	if (id) finishCine(id);
}
function requestStartWave() {
	if (useGame.getState().cine || cineLocked()) return;
	if (sim.phase !== "prep") return;
	if (sim.wave === 11) {
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
					children: "Raiders are coming down the line. Plant what you can afford now. Fresh emplacements unlock as the dust thickens. Hold the depot."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-5 space-y-1.5 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Place on pads — corners cover more track." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Seven guns. Later waves open the heavy ones." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Splash the packs. Slow the ironhides. Snipe the wagon." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6 h-12 w-full max-w-sm rounded-[var(--radius-md)] font-display text-lg tracking-wide",
					onClick: startIntro,
					children: "Hold the line"
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
	const won = phase === "won";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cinematic, {
		src: won ? "/art/victory.jpg" : "/art/defeat.jpg",
		align: "center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto w-full max-w-sm rounded-[var(--radius-xl)] border border-border bg-bg/92 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]",
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
							value: `${wave}/12`
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6 h-12 w-full rounded-[var(--radius-md)] font-display text-lg tracking-wide",
					onClick: beginRun,
					children: "Fight again"
				})
			]
		})
	});
}
function CineOverlay({ id }) {
	const meta = CINE[id];
	const muted = useGame((s) => s.muted);
	const videoRef = (0, import_react.useRef)(null);
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
					children: meta.kicker
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-3xl tracking-tight text-fg sm:text-5xl",
					children: meta.title
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/art/hud/heart.jpg",
							alt: "",
							className: "size-5 rounded-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [lives, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: ["/", maxLives]
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: [
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
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-auto flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeedControl, { speed }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon-sm",
							"aria-label": muted ? "Unmute" : "Mute",
							onClick: () => {
								const next = !muted;
								useGame.getState().setMuted(next);
								audio.setMuted(next);
							},
							children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
						})]
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 truncate text-xs tracking-wide text-muted",
						children: waveActive ? waveName : upcoming ? `Next — ${upcoming.name}` : waveName
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
			onClick: () => useGame.getState().setSpeed(s),
			"aria-label": s === 4 ? "Fast forward" : `${s} times speed`,
			children: s === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FastForward, { className: "size-3.5" }) : `${s}×`
		}, s))
	});
}
function TowerCard({ kind, gold, wave, waveActive, active }) {
	const def = TOWERS[kind];
	const unlocked = towerUnlocked(kind, wave, waveActive);
	const can = unlocked && gold >= def.cost;
	const idx = TOWER_ORDER.indexOf(kind) + 1;
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
				children: idx
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
	}
};
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
	const ground = new Mesh(new PlaneGeometry(80, 64), kit.mats.dust);
	ground.rotation.x = -Math.PI / 2;
	ground.position.set(8, 0, 5);
	ground.receiveShadow = true;
	scene.add(ground);
	const rng = mulberry32(42);
	const rockGeo = kit.geos.box;
	for (let i = 0; i < 22; i++) {
		const x = rng() * 22 - 2;
		const z = rng() * 16 - 2;
		if (nearPath(x, z, 1.6) || nearPlot(x, z, 1.3)) continue;
		const rock = new Mesh(rockGeo, rng() > .45 ? kit.mats.dustDark : kit.mats.iron);
		const s = .28 + rng() * .6;
		rock.scale.set(s, .2 + rng() * .4, s * (.7 + rng() * .5));
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
	for (let i = 0; i < 56; i++) {
		const x = plantRng() * 26 - 4;
		const z = plantRng() * 20 - 4;
		if (nearPath(x, z, 1.35) || nearPlot(x, z, 1.15)) continue;
		const mat = plantMats[Math.floor(plantRng() * plantMats.length)];
		const spr = new Sprite(mat);
		const h = .75 + plantRng() * .85;
		spr.scale.set(h * .92, h, 1);
		spr.position.set(x, h * .46, z);
		scene.add(spr);
		plants.push(spr);
	}
	for (const [x, z, w, h, d] of [
		[
			-8,
			-6,
			5.5,
			2.2,
			4.2
		],
		[
			24,
			-7,
			6.5,
			2.8,
			4.8
		],
		[
			26,
			16,
			5.2,
			1.8,
			5
		],
		[
			-7,
			16,
			4.6,
			2.4,
			4.2
		]
	]) {
		addBox(scene, kit.mats.dustDark, w, h, d, x, h / 2, z, kit.geos);
		addBox(scene, kit.mats.rust, w * .9, .16, d * .9, x, h + .05, z, kit.geos);
	}
	return plants;
}
function buildHorizon(scene, kit) {
	const mat = new MeshBasicMaterial({
		map: kit.maps.horizon,
		fog: false,
		depthWrite: false
	});
	const plate = new Mesh(new PlaneGeometry(88, 28), mat);
	plate.position.set(-16, 9, -18);
	plate.lookAt(8.15, 3, 5.7);
	scene.add(plate);
	const plate2 = plate.clone();
	plate2.position.set(-22, 8.5, 8);
	plate2.lookAt(8.15, 3, 5.7);
	scene.add(plate2);
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
	addBox(g, kit.mats.woodLight, 3.2, .14, 2.6, 0, .07, 0, kit.geos);
	addBox(g, kit.mats.wood, 2.2, 1.3, 1.6, .15, .78, 0, kit.geos);
	addBox(g, kit.mats.rust, 2.5, .12, 1.9, .15, 1.5, 0, kit.geos);
	const roof = new Mesh(kit.geos.box, kit.mats.rustBright);
	roof.scale.set(2.6, .08, 2);
	roof.position.set(.15, 1.72, 0);
	roof.rotation.z = .08;
	roof.castShadow = true;
	g.add(roof);
	addBox(g, kit.mats.woodLight, .08, .9, .5, -.9, .7, .82, kit.geos);
	addBox(g, kit.mats.ironDark, .35, .55, .08, .9, .9, .84, kit.geos);
	addCyl(g, kit.mats.wood, .05, .05, 1.6, -1.5, .8, -1.1, kit.geos);
	addCyl(g, kit.mats.wood, .05, .05, 1.6, -2.1, .8, -1.1, kit.geos);
	addCyl(g, kit.mats.wood, .05, .05, 1.6, -1.5, .8, -.55, kit.geos);
	addCyl(g, kit.mats.wood, .05, .05, 1.6, -2.1, .8, -.55, kit.geos);
	addCyl(g, kit.mats.rust, .55, .55, .7, -1.8, 1.85, -.82, kit.geos);
	addCyl(g, kit.mats.rustBright, .08, .08, .35, -1.8, 2.35, -.82, kit.geos);
	addBox(g, kit.mats.woodLight, .4, .32, .4, 1.3, .3, 1, kit.geos);
	addBox(g, kit.mats.wood, .32, .28, .32, 1.55, .28, .65, kit.geos);
	addBox(g, kit.mats.iron, .18, .55, 1.1, -1.55, .35, 0, kit.geos);
	addBox(g, kit.mats.brass, .12, .12, .12, .15, 1.15, .85, kit.geos);
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
	if (kind === "gunner" || kind === "cannon" || kind === "gatling") {
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
	if (kind === "boss") attachHp(g, kit, 1.05, size.h + .18);
	else if (kind === "brute" || kind === "bomber") attachHp(g, kit, .58, size.h + .16);
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
		this.renderer.setClearColor(12888194, 1);
		this.camera = new OrthographicCamera(-12, 12, 10, -10, .1, 120);
		const maps = loadArt();
		boostAnisotropy(maps, Math.min(8, this.renderer.capabilities.getMaxAnisotropy()));
		this.kit = {
			mats: makeMaterials(maps),
			geos: makeGeos(),
			maps
		};
		this.scene.fog = new Fog(12888194, 38, 78);
		this.scene.background = maps.sky;
		const hemi = new HemisphereLight(15983816, 8018490, 1.12);
		this.scene.add(hemi);
		const sun = new DirectionalLight(16769200, 1.55);
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
		const fill = new DirectionalLight(12109016, .28);
		fill.position.set(-10, 12, -6);
		this.scene.add(fill);
		this.scene.add(new AmbientLight(16773596, .2));
		this.plants = buildTerrain(this.scene, this.kit);
		buildHorizon(this.scene, this.kit);
		buildRails(this.scene, this.kit);
		this.scene.add(buildDepot(this.kit));
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
			bomber: buildEnemy("bomber", this.kit)
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
		fill.scale.x = Math.max(.02, ratio) * (e.kind === "boss" ? 1.05 : e.kind === "brute" || e.kind === "bomber" ? .58 : .42);
		fill.position.x = (fill.scale.x - (e.kind === "boss" ? 1.05 : e.kind === "brute" || e.kind === "bomber" ? .58 : .42)) / 2;
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
			m.material = b.kind === "sniper" ? this.kit.mats.beamSniper : b.kind === "oil" ? this.kit.mats.beamOil : this.kit.mats.beamSlow;
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
			else if (tower.kind === "gatling") frame = Math.floor(t * (firing ? 16 : aiming ? 10 : 5) + tower.plotId) % 4;
			else if (tower.kind === "slow" || tower.kind === "oil") frame = Math.floor(t * (firing ? 8 : 3.4) + tower.plotId) % 4;
			else if (firing) frame = tower.kick > .16 ? 2 : 3;
			else if (aiming) frame = Math.floor(t * 4.8 + tower.plotId) % 2;
			else frame = Math.floor(t * 2.4 + tower.plotId) % 2;
			const rec = firing ? 1 + tower.kick * .28 : 1;
			this.setSpriteFrame(mesh, this.kit.maps.guns[tower.kind], frame, isoFacing(tower.yaw), size.w * grow * rec, size.h * grow * (firing && tower.kick > .14 ? 1.1 : 1), firing ? 16771280 : 16777215);
			const body = mesh.getObjectByName("body");
			if (body && !this.reduced) {
				const bobHz = tower.kind === "gatling" ? 8.5 : tower.kind === "slow" ? 2.2 : 3.6;
				const amp = firing ? .055 : .028;
				body.position.y = .04 + Math.sin(t * bobHz + tower.plotId) * amp + (firing ? tower.kick * .06 : 0);
			}
			const mz = mesh.getObjectByName("muzzle");
			if (mz) {
				const on = firing && tower.kind !== "slow";
				mz.visible = on;
				if (on) {
					const s = (tower.kind === "gatling" ? .55 : .42) + tower.kick * 2.4;
					mz.scale.set(s, s * .9, 1);
					mz.position.y = size.h * grow * (tower.kind === "sniper" ? .72 : .58);
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
			cine: (id) => useGame.getState().setCine(id)
		};
		return () => {
			delete w.__iron;
			view.dispose();
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (ev) => {
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
				const i = cycle.indexOf(state.speed);
				state.setSpeed(cycle[(i + 1) % cycle.length]);
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
