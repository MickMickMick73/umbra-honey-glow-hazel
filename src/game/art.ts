import * as THREE from "three";
import type { EnemyKind, TowerKind } from "./types";

const loader = new THREE.TextureLoader();
loader.setCrossOrigin("anonymous");

function tex(url: string, repeat = 1, wrap = true) {
  const t = loader.load(url);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  if (wrap) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat, repeat);
  } else {
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  }
  return t;
}

function sprite(url: string) {
  const t = loader.load(url);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  t.premultiplyAlpha = false;
  return t;
}

function sheet(dir: string, slug: string) {
  return [1, 2, 3, 4].map((i) => sprite(`${dir}/${slug}-${i}.png`));
}

export function loadArt() {
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
    plants: [1, 2, 3, 4].map((i) => sprite(`/art/sprites/sage-${i}.png`)),
    fx: [1, 2, 3, 4].map((i) => sprite(`/art/sprites/fx-${i}.png`)),
    units: {
      runner: sheet("/art/sprites/units", "runner"),
      brute: sheet("/art/sprites/units", "brute"),
      swarm: sheet("/art/sprites/units", "swarm"),
      boss: sheet("/art/sprites/units", "boss"),
      scout: sheet("/art/sprites/units", "scout"),
      rider: sheet("/art/sprites/units", "rider"),
      bomber: sheet("/art/sprites/units", "bomber"),
    } as Record<EnemyKind, THREE.Texture[]>,
    guns: {
      gunner: sheet("/art/sprites/guns", "gunner"),
      cannon: sheet("/art/sprites/guns", "cannon"),
      slow: sheet("/art/sprites/guns", "slow"),
      sniper: sheet("/art/sprites/guns", "sniper"),
      gatling: sheet("/art/sprites/guns", "gatling"),
      dynamite: sheet("/art/sprites/guns", "dynamite"),
      oil: sheet("/art/sprites/guns", "oil"),
    } as Record<TowerKind, THREE.Texture[]>,
  };
}

export type ArtMaps = ReturnType<typeof loadArt>;

export function boostAnisotropy(maps: ArtMaps, n: number) {
  const apply = (t: THREE.Texture) => {
    t.anisotropy = n;
  };
  for (const v of Object.values(maps)) {
    if (Array.isArray(v)) v.forEach(apply);
    else if (v instanceof THREE.Texture) apply(v);
    else for (const arr of Object.values(v)) arr.forEach(apply);
  }
}

export const TOWER_ART: Record<TowerKind, string> = {
  gunner: "/art/sprites/guns/gunner-1.png",
  cannon: "/art/sprites/guns/cannon-1.png",
  slow: "/art/sprites/guns/slow-1.png",
  sniper: "/art/sprites/guns/sniper-1.png",
  gatling: "/art/sprites/guns/gatling-1.png",
  dynamite: "/art/sprites/guns/dynamite-1.png",
  oil: "/art/sprites/guns/oil-1.png",
};
