import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",

  plugins: [react()],

  build: {
    target: ["es2018"],
    sourcemap: true,
    chunkSizeWarningLimit: 800,

    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",

        manualChunks(id) {
          if (id.includes("/src/system/platforms/")) {
            const match = id.match(
              /\/src\/system\/platforms\/([^/]+)\.(ts|js)$/,
            );
            if (match?.[1]) return `platform-${match[1]}`;
          }

          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
});
