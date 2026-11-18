import { z } from "zod";

// Keep validation compatible with the nonce-based Content Security Policy.
z.config({ jitless: true });

const envMapping = {
	API_URL: "VITE_API_URL"
} as const;

export const envSchema = z.object({
	API_URL: z
		.url("API_URL must be a valid URL")
		.default("http://localhost:9999")
});

const parseEnv = () => {
	const rawEnv: Record<string, string | undefined> = {};

	for (const [cleanKey, viteKey] of Object.entries(envMapping)) {
		rawEnv[cleanKey] = import.meta.env[viteKey];
	}

	try {
		return envSchema.parse(rawEnv);
	} catch (error) {
		if (error instanceof z.ZodError) {
			const missingVars = error.issues
				.map((err) => {
					const cleanKey = err.path.join(".");
					const viteKey =
						envMapping[cleanKey as keyof typeof envMapping];
					return `${cleanKey} (${viteKey}): ${err.message}`;
				})
				.join("\n");

			throw new Error(
				`❌ Environment validation failed:\n${missingVars}\n\n` +
					`Please check your .env file and ensure all required variables are set.`
			);
		}
		throw error;
	}
};

export const env = parseEnv();
