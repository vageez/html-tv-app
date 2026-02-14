import type { SystemApi } from "../types";

export function createSystem({ signals }: { signals: string[] }): SystemApi {
  return {
    platform: "hisense_vidaa",
    signals,

    back() {
      try {
        history.back();
      } catch {}
    },

    exitApp() {
      try {
        window.close();
      } catch {}
    },

    async getDeviceInfo() {
      return {
        ua: navigator.userAgent,
        platform: "hisense_vidaa",
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
      console.log(`[vidaa] ${message}`, data ?? "");
    },
  };
}
