import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "./assets"),
      "@content": resolve(__dirname, "./src/content"),
      "@entities": resolve(__dirname, "./src/entities"),
      "@scenes": resolve(__dirname, "./src/scenes"),
      "@state": resolve(__dirname, "./src/state"),
      "@types": resolve(__dirname, "./src/types"),
      "@ui": resolve(__dirname, "./src/ui"),
      "@constants": resolve(__dirname, "./src/constants"),
      "@features": resolve(__dirname, "./src/features"),
    },
  },
});
