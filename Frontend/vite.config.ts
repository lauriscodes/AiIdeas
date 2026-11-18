/// <reference types="vitest/config" />

import mockyBalboa from "@mocky-balboa/react-router";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const isStorybook = process.env.STORYBOOK === "true";
const isTest = process.env.VITEST === "true";
const enableMocks = process.env.ENABLE_MOCKS === "true";

export default defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		tailwindcss(),
		!isStorybook && !isTest && reactRouter(),
		enableMocks && mockyBalboa()
	],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./testing/test-setup.ts",
		include: ["src/**/*.test.{ts,tsx}"],
		exclude: ["src/**/*.integration.test.{ts,tsx}"],
		coverage: {
			include: ["src/**"]
		}
	}
});
