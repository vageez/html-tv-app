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

type SpatialNavigationKeyMap = {
  left: Array<number | string>;
  right: Array<number | string>;
  up: Array<number | string>;
  down: Array<number | string>;
  enter: Array<number | string>;
};

const KEY_GROUPS = {
  LEFT: {
    keys: ["arrowleft", "left"],
    codes: ["arrowleft"],
    keyCodes: [37],
  },
  RIGHT: {
    keys: ["arrowright", "right"],
    codes: ["arrowright"],
    keyCodes: [39],
  },
  UP: {
    keys: ["arrowup", "up"],
    codes: ["arrowup"],
    keyCodes: [38],
  },
  DOWN: {
    keys: ["arrowdown", "down"],
    codes: ["arrowdown"],
    keyCodes: [40],
  },
  ENTER: {
    keys: ["enter", "select", "ok"],
    codes: ["enter", "numpadenter"],
    keyCodes: [13, 195, 29443],
  },
  BACK: {
    keys: ["backspace", "escape", "browserback", "back"],
    codes: ["browserback", "escape", "backspace"],
    // 461/10009: common Samsung/LG return keys, 166: browser back
    keyCodes: [8, 27, 166, 461, 10009],
  },
  PLAY: {
    keys: ["mediaplay", "mediaplaypause"],
    codes: ["mediaplaypause"],
    keyCodes: [415, 179],
  },
  PAUSE: {
    keys: ["mediapause", "mediaplaypause"],
    codes: ["mediaplaypause"],
    keyCodes: [19, 179],
  },
} as const;

export const SPATIAL_NAV_KEY_MAP: SpatialNavigationKeyMap = {
  left: [...KEY_GROUPS.LEFT.keyCodes, "ArrowLeft", "Left"],
  right: [...KEY_GROUPS.RIGHT.keyCodes, "ArrowRight", "Right"],
  up: [...KEY_GROUPS.UP.keyCodes, "ArrowUp", "Up"],
  down: [...KEY_GROUPS.DOWN.keyCodes, "ArrowDown", "Down"],
  enter: [...KEY_GROUPS.ENTER.keyCodes, "Enter", "NumpadEnter", "Select"],
};

function isMatch(
  e: KeyboardEvent,
  group: { keys: readonly string[]; codes: readonly string[]; keyCodes: readonly number[] },
): boolean {
  const key = (e.key || "").toLowerCase();
  const code = (e.code || "").toLowerCase();
  const keyCode = (e as any).keyCode;

  return (
    group.keys.includes(key) ||
    group.codes.includes(code) ||
    group.keyCodes.includes(keyCode)
  );
}

export function normalizeKey(e: KeyboardEvent): RemoteKey {
  if (isMatch(e, KEY_GROUPS.UP)) return "UP";
  if (isMatch(e, KEY_GROUPS.DOWN)) return "DOWN";
  if (isMatch(e, KEY_GROUPS.LEFT)) return "LEFT";
  if (isMatch(e, KEY_GROUPS.RIGHT)) return "RIGHT";
  if (isMatch(e, KEY_GROUPS.ENTER)) return "ENTER";
  if (isMatch(e, KEY_GROUPS.BACK)) return "BACK";
  if (isMatch(e, KEY_GROUPS.PLAY)) return "PLAY";
  if (isMatch(e, KEY_GROUPS.PAUSE)) return "PAUSE";

  return "UNKNOWN";
}
