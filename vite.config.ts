import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      // path base를 "@"로 통일
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // LAN/터널 접근 허용
    allowedHosts: [
      ".trycloudflare.com", // 모든 trycloudflare 서브도메인 허용
    ],
  },
});
