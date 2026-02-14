type ActionRow = {
  type: "action";
  key: string;
  value: string;
  target: string;
};

type AttributeRow = {
  type: "attribute";
  key: string;
  value: string;
  target: string;
};

type TableRow = ActionRow | AttributeRow;

function getCenter(rect: DOMRect) {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function pickDirectionalTarget(
  currentEl: HTMLElement,
  direction: "UP" | "DOWN" | "LEFT" | "RIGHT",
): string {
  const currentRect = currentEl.getBoundingClientRect();
  const currentCenter = getCenter(currentRect);

  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>(
      "[data-focusable-item='true'][data-focus-key]",
    ),
  ).filter((el) => el !== currentEl);

  let bestKey = "(none)";
  let bestScore = Number.POSITIVE_INFINITY;

  for (const candidate of candidates) {
    const rect = candidate.getBoundingClientRect();
    const center = getCenter(rect);
    const dx = center.x - currentCenter.x;
    const dy = center.y - currentCenter.y;

    const isDirectionalMatch =
      (direction === "UP" && dy < 0) ||
      (direction === "DOWN" && dy > 0) ||
      (direction === "LEFT" && dx < 0) ||
      (direction === "RIGHT" && dx > 0);

    if (!isDirectionalMatch) continue;

    const primary = direction === "UP" || direction === "DOWN" ? Math.abs(dy) : Math.abs(dx);
    const secondary = direction === "UP" || direction === "DOWN" ? Math.abs(dx) : Math.abs(dy);
    const score = primary * 3 + secondary;

    if (score < bestScore) {
      bestScore = score;
      bestKey = candidate.getAttribute("data-focus-key") || "(none)";
    }
  }

  return bestKey;
}

export function logFocusableDebugTable(el: HTMLElement, focusKey: string) {
  if (!import.meta.env.DEV) return;

  const attributes: AttributeRow[] = Array.from(el.attributes).map((attr) => ({
    type: "attribute",
    key: attr.name,
    value: attr.value,
    target: "",
  }));

  const actions: ActionRow[] = [
    {
      type: "action",
      key: "UP",
      value: "move-focus",
      target: pickDirectionalTarget(el, "UP"),
    },
    {
      type: "action",
      key: "DOWN",
      value: "move-focus",
      target: pickDirectionalTarget(el, "DOWN"),
    },
    {
      type: "action",
      key: "LEFT",
      value: "move-focus",
      target: pickDirectionalTarget(el, "LEFT"),
    },
    {
      type: "action",
      key: "RIGHT",
      value: "move-focus",
      target: pickDirectionalTarget(el, "RIGHT"),
    },
    {
      type: "action",
      key: "ENTER",
      value: "activate-current",
      target: focusKey,
    },
    {
      type: "action",
      key: "BACK",
      value: "app-back-handler",
      target: "(global)",
    },
  ];

  const rows: TableRow[] = [...attributes, ...actions];
  console.groupCollapsed(`[FocusDebug] ${focusKey}`);
  console.table(rows);
  console.groupEnd();
}
