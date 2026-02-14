import type { SystemApi } from "../system/types";
import { normalizeKey } from "../nav/keys";
import { handleBackPress } from "./back-handler";

function isEditableTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;

  const tag = el.tagName?.toLowerCase();
  return (
    el.isContentEditable ||
    tag === "input" ||
    tag === "textarea" ||
    tag === "select"
  );
}

export function initRemoteManager(system: SystemApi) {
  const shouldLogKeys = import.meta.env.DEV;

  window.addEventListener("keydown", (e) => {
    const key = normalizeKey(e);

    if (shouldLogKeys) {
      system.log("REMOTE_KEY", {
        key,
        rawKey: e.key,
        keyCode: (e as any).keyCode,
      });
    }

    if (key === "BACK") {
      if (isEditableTarget(e.target)) return;

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
