import type { SystemApi } from "../types";

export function createSystem({ signals }: { signals: string[] }): SystemApi {
  return {
    platform: "xbox",
    signals,

    back() {
      try {
        history.back();
      } catch {}
    },

    exitApp() {
      // In many Xbox runtimes you won't be able to close; keep safe
      try {
        window.close();
      } catch {}
    },

    async getDeviceInfo() {
      return {
        ua: navigator.userAgent,
        platform: "xbox",
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
      console.log(`[xbox] ${message}`, data ?? "");
    },
  };
}
