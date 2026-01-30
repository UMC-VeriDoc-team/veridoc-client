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
});
