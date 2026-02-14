export type RemoteKey =
  | "UP"
  | "DOWN"
  | "LEFT"
  | "RIGHT"
  | "ENTER"
  | "BACK"
  | "PLAY"
  | "PAUSE"
  | "UNKNOWN";

export function normalizeKey(e: KeyboardEvent): RemoteKey {
  const key = (e.key || "").toLowerCase();
  const keyCode = (e as any).keyCode;

  // Arrows
  if (key === "arrowup" || keyCode === 38) return "UP";
  if (key === "arrowdown" || keyCode === 40) return "DOWN";
  if (key === "arrowleft" || keyCode === 37) return "LEFT";
  if (key === "arrowright" || keyCode === 39) return "RIGHT";

  // Enter / OK
  if (key === "enter" || keyCode === 13) return "ENTER";

  // Back / Return (varies A LOT across TVs)
  if (
    key === "backspace" ||
    key === "escape" ||
    key === "browserback" ||
    keyCode === 8 || // LG
    keyCode === 27 || // browsers
    keyCode === 461 // Samsung Tizen BACK
  ) {
    return "BACK";
  }

  // Media keys (future)
  if (keyCode === 415) return "PLAY";
  if (keyCode === 19) return "PAUSE";

  return "UNKNOWN";
}
