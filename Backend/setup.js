import { execFileSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

if (!existsSync(".env")) {
	const template = readFileSync(".env.example", "utf8");
	writeFileSync(".env", template.replace(/^JWT_SECRET=.*$/m, `JWT_SECRET=${randomBytes(32).toString("hex")}`));
	process.stdout.write("Created .env with a generated JWT secret.\n");
}

execFileSync("bun", ["run", "migrate"], { stdio: "inherit" });
process.stdout.write("Database is ready. Run bun run dev to start the API.\n");
