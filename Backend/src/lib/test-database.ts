import { migrate } from "drizzle-orm/libsql/migrator";

import db from "@/db";
import { ideas, refreshTokens, reviews, users } from "@/db/schema";
import env from "@/env";

export async function resetTestDatabase() {
	if (env.NODE_ENV !== "test" || env.DATABASE_URL !== "file::memory:") {
		throw new Error("Tests require NODE_ENV=test and DATABASE_URL=file::memory:");
	}

	await migrate(db, { migrationsFolder: "./src/db/migrations" });
	await db.delete(refreshTokens);
	await db.delete(reviews);
	await db.delete(ideas);
	await db.delete(users);
}
