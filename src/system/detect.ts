export function detectPlatform(): { platform: string; signals: string[] } {
  const w = globalThis as any;
  const ua = (navigator.userAgent || "").toLowerCase();
  const signals: string[] = [];

  // Samsung (Tizen)
  if (w.tizen) {
    signals.push("global:tizen");
    return { platform: "samsung_tizen", signals };
  }
  if (ua.includes("tizen")) {
    signals.push("ua:tizen");
    return { platform: "samsung_tizen", signals };
  }

  // LG (webOS)
  if (w.webOSSystem) {
    signals.push("global:webOSSystem");
    return { platform: "lg_webos", signals };
  }
  if (w.PalmSystem) {
    signals.push("global:PalmSystem");
    return { platform: "lg_webos", signals };
  }
  if (ua.includes("webos")) {
    signals.push("ua:webos");
    return { platform: "lg_webos", signals };
  }

  // Hisense (VIDAA) - UA is often the only easy hint; keep conservative
  if (ua.includes("vidaa")) {
    signals.push("ua:vidaa");
    return { platform: "hisense_vidaa", signals };
  }

  // Xbox / PlayStation - UA varies; keep best-effort
  if (ua.includes("xbox")) {
    signals.push("ua:xbox");
    return { platform: "xbox", signals };
  }
  if (ua.includes("playstation")) {
    signals.push("ua:playstation");
    return { platform: "ps5", signals };
  }

  // Browser fallback
  if (typeof window !== "undefined") {
    signals.push("fallback:browser");
    return { platform: "browser", signals };
  }

  signals.push("fallback:unknown");
  return { platform: "unknown", signals };
}
