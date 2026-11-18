import type { Config } from "@react-router/dev/config";

export default {
	// Auth, locale cookies, and CSP nonces must be resolved for each request.
	ssr: true,
	appDirectory: "src/app"
} satisfies Config;
