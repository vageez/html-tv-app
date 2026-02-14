import type { SystemApi } from "../types";

export function createSystem({ signals }: { signals: string[] }): SystemApi {
  const w = globalThis as any;

  return {
    platform: "samsung_tizen",
    signals,

    back() {
      // Prefer app/router handling; this is a fallback
      try {
        w.history?.back?.();
      } catch {}
    },

    exitApp() {
      try {
        w.tizen?.application?.getCurrentApplication?.().exit?.();
        return;
      } catch {}
      try {
        w.close?.();
      } catch {}
    },

    async getDeviceInfo() {
      return {
        ua: navigator.userAgent,
        platform: "samsung_tizen",
        hasTizen: !!w.tizen,
      };
    },

    async getAppInfo() {
      return {};
    },

    storage: {
      async get(key) {
        return localStorage.getItem(key);
      },
      async set(key, value) {
        localStorage.setItem(key, value);
      },
      async remove(key) {
        localStorage.removeItem(key);
      },
    },

    log(message, data) {
      console.log(`[tizen] ${message}`, data ?? "");
    },
  };
}
