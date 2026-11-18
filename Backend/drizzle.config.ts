import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({
	path: process.env.NODE_ENV === "test"
		? ".env.test"
		: ".env"
});

const url = process.env.DATABASE_URL;

if (!url) {
	throw new Error("DATABASE_URL is required to run Drizzle Kit");
}

export default defineConfig({
	schema: "./src/db/schema.ts",
	out: "./src/db/migrations",
	dialect: "turso",
	casing: "camelCase",
	dbCredentials: {
		url,
		authToken: process.env.DATABASE_AUTH_TOKEN
	}
});
