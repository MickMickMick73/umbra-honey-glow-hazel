let cineUnlockAt = 0;

export function armCineLock(ms = 320) {
  cineUnlockAt = now() + ms;
}

export function cineLocked() {
  return now() < cineUnlockAt;
}

function now() {
  return typeof performance !== "undefined" ? performance.now() : Date.now();
}
