import app from "./app";
import env from "./env";

const port = env.PORT;
const server = Bun.serve({
	fetch: app.fetch,
	port
});

process.stdout.write(`Server is running at ${server.url}\n`);
