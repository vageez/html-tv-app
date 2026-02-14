import type { SystemApi } from "../types";

export function createSystem({ signals }: { signals: string[] }): SystemApi {
  return {
    platform: "browser",
    signals,

    back() {
      history.back();
    },

    exitApp() {
      // Browsers may block close(); keep as no-op fallback
      try {
        window.close();
      } catch {}
    },

    async getDeviceInfo() {
      return {
        ua: navigator.userAgent,
        language: navigator.language,
        platform: "browser",
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
      console.log(`[browser] ${message}`, data ?? "");
    },
  };
}
