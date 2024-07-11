// vite.config.ts
import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { UserConfig } from "vitest/config";

const config: UserConfig = {
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],

    testTransformMode: {
      web: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    },
  },
  resolve: {
    alias: {
      "@tire-test/zustand-store": path.resolve(
        __dirname,
        "../../libs/zustand-store/src"
      ),
      "@tire-test/example-game": path.resolve(
        __dirname,
        "../../games/example-game/src"
      ),
    },
  },
};

export default defineConfig(config);
