import type { SystemApi } from "../types";

export function createSystem({ signals }: { signals: string[] }): SystemApi {
  const w = globalThis as any;

  return {
    platform: "lg_webos",
    signals,

    back() {
      try {
        w.history?.back?.();
      } catch {}
    },

    exitApp() {
      // webOS apps usually exit via system mechanisms;
      // keep conservative to avoid crashes across generations.
      try {
        w.close?.();
      } catch {}
    },

    async getDeviceInfo() {
      return {
        ua: navigator.userAgent,
        platform: "lg_webos",
        hasWebOSSystem: !!w.webOSSystem,
        hasPalmSystem: !!w.PalmSystem,
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
      console.log(`[webos] ${message}`, data ?? "");
    },
  };
}
