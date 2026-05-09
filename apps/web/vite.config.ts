import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/health": "http://localhost:8080",
      "/auth": "http://localhost:8080",
      "/devices": "http://localhost:8080",
      "/commands": "http://localhost:8080",
      "/logs": "http://localhost:8080",
      "/diagnostics": "http://localhost:8080",
      "/ws": {
        target: "ws://localhost:8080",
        ws: true,
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
  // Railway serves `vite preview` (or static preview) — allow the deployed host
  // so Vite does not block requests with "This host is not allowed".
  preview: {
    host: true,
    allowedHosts: [
      "ghostycweb-production.up.railway.app",
      ".up.railway.app",
    ],
  },
});
