import path, { dirname } from "path";
import { fileURLToPath } from "url";

import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env"), quiet: true });

const project = process.argv
	.slice(2)
	.find(
		(arg, index, args) =>
			arg.startsWith("--project=") || args[index - 1] === "--project"
	)
	?.replace("--project=", "");

const frontendPort = process.env.PLAYWRIGHT_PORT ?? "5173";
const apiPort = process.env.E2E_API_PORT ?? "9999";
const baseURL = `http://localhost:${frontendPort}`;
const apiURL = `http://localhost:${apiPort}`;

export default defineConfig({
	testDir: "./testing",
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : 2,
	reporter: "html",
	use: {
		baseURL,
		trace: "on-first-retry"
	},

	projects: [
		{
			name: "integration",
			use: { ...devices["Desktop Chrome"] },
			testDir: "./src",
			testMatch: "**/*.integration.test.ts"
		},
		{
			name: "e2e",
			timeout: 120_000,
			use: { ...devices["Desktop Chrome"] },
			testDir: "./testing/e2e"
		}
	],

	webServer:
		project === "e2e"
			? [
					{
						command: "bun run db:prepare && bun run start",
						url: apiURL,
						cwd: "../Backend",
						reuseExistingServer: false,
						env: {
							NODE_ENV: "test",
							PORT: apiPort,
							LOG_LEVEL: "silent",
							DATABASE_URL: "file:e2e.db",
							CLIENT_URLS: JSON.stringify([baseURL]),
							JWT_SECRET: "local-e2e-test-secret"
						}
					},
					{
						command: "bun run build && bun run preview",
						url: baseURL,
						reuseExistingServer: false,
						env: { PORT: frontendPort, VITE_API_URL: apiURL }
					}
				]
			: {
					command: `bun run build:integration && bun --bun run mocky-balboa-react-router -p ${frontendPort}`,
					url: baseURL,
					reuseExistingServer: !process.env.CI
				}
});
