import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./src/manifest.json";

export default defineConfig({
  base: "./",
  server: {
    port: 3000,
    hmr: {
      port: 3000,
    },
  },
  plugins: [react(), crx({ manifest })],
});
