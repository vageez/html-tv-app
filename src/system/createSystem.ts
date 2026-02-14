import type { SystemApi } from "./types";
import { detectPlatform } from "./detect";

export async function createSystem(): Promise<SystemApi> {
  const { platform, signals } = detectPlatform();

  switch (platform) {
    case "samsung_tizen": {
      const mod = await import("./platforms/samsung_tizen");
      return mod.createSystem({ signals });
    }
    case "lg_webos": {
      const mod = await import("./platforms/lg_webos");
      return mod.createSystem({ signals });
    }
    case "hisense_vidaa": {
      const mod = await import("./platforms/hisense_vidaa");
      return mod.createSystem({ signals });
    }
    case "xbox": {
      const mod = await import("./platforms/xbox");
      return mod.createSystem({ signals });
    }
    case "ps5": {
      const mod = await import("./platforms/ps5");
      return mod.createSystem({ signals });
    }
    case "browser":
    default: {
      const mod = await import("./platforms/browser");
      return mod.createSystem({ signals });
    }
  }
}
