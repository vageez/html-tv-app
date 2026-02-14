import type { SystemApi } from "../system/types";

export function mountDebugOverlay(system: SystemApi) {
  const el = document.createElement("div");
  el.style.position = "fixed";
  el.style.left = "10px";
  el.style.bottom = "10px";
  el.style.zIndex = "99999";
  el.style.padding = "10px 12px";
  el.style.borderRadius = "10px";
  el.style.background = "rgba(0,0,0,0.7)";
  el.style.color = "white";
  el.style.font = "12px/1.4 system-ui, -apple-system, Segoe UI, Roboto, Arial";
  el.style.maxWidth = "60vw";
  el.style.whiteSpace = "pre-wrap";

  let lastKey = "";

  function render() {
    el.textContent =
      `platform: ${system.platform}\n` +
      `signals: ${system.signals.join(", ") || "(none)"}\n` +
      `last key: ${lastKey || "(none)"}`;
  }

  render();
  document.body.appendChild(el);

  window.addEventListener("keydown", (e) => {
    lastKey = `${e.key} (code=${e.code}, keyCode=${(e as any).keyCode})`;
    render();
  });

  return () => el.remove();
}
