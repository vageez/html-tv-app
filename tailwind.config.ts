import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        tv720: "1280px",
        tv1080: "1920px",
        tv4k: "2560px",
      },
      fontSize: {
        "tv-caption": ["1rem", { lineHeight: "1.35", letterSpacing: "0.01em" }],
        "tv-body": ["1.125rem", { lineHeight: "1.45", letterSpacing: "0.01em" }],
        "tv-body-lg": ["1.25rem", { lineHeight: "1.45", letterSpacing: "0.01em" }],
        "tv-title": ["2rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "tv-display": ["2.75rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
    },
  },
} satisfies Config;
