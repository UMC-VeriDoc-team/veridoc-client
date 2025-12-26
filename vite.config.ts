import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // path base를 "@"로 통일
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
