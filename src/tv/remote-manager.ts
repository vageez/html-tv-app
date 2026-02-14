import type { SystemApi } from "../system/types";
import { normalizeKey } from "../nav/keys";
import { handleBackPress } from "./back-handler";

export function initRemoteManager(system: SystemApi) {
  window.addEventListener("keydown", (e) => {
    const key = normalizeKey(e);

    // Log EVERYTHING while developing
    system.log("REMOTE_KEY", {
      key,
      rawKey: e.key,
      keyCode: (e as any).keyCode,
    });

    if (key === "BACK") {
      e.preventDefault();
      e.stopPropagation();

      // 1) Give app a chance to handle
      const handled = handleBackPress();

      // 2) Otherwise exit app
      if (!handled) {
        system.exitApp();
      }
    }
  });
}
