import type { SystemApi } from "../system/types";
import { mountDebugOverlay } from "../ui/debugOverlay";
import { normalizeKey } from "../nav/keys";

export async function startApp({ system }: { system: SystemApi }) {
  // Debug overlay (you can gate this by env var)
  mountDebugOverlay(system);

  // Very small starter “app”
  const root = document.getElementById("app") ?? document.body;
  const title = document.createElement("h1");
  title.textContent = "TV App Starter";
  root.appendChild(title);

  const info = document.createElement("pre");
  info.textContent = JSON.stringify(await system.getDeviceInfo(), null, 2);
  root.appendChild(info);

  window.addEventListener("keydown", (e) => {
    const k = normalizeKey(e);

    if (k === "BACK") {
      // first let app handle it; fallback to system
      system.back();
      e.preventDefault();
    }
  });
}
