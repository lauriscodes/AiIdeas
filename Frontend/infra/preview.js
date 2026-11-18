import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

process.env.PORT ??= "5173";

const require = createRequire(import.meta.url);
const serverDirectory = dirname(
	require.resolve("@react-router/serve/package.json")
);
process.argv[2] = "./build/server/index.js";
await import(pathToFileURL(resolve(serverDirectory, "bin.cjs")).href);
