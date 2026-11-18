# Frontend

Use Node.js 22.22+ (Node.js 24 recommended) and Bun 1.4.4+.

```sh
bun install --frozen-lockfile
bun run dev
```

Open http://localhost:5173. The API defaults to http://localhost:9999; run the
backend separately for ideas, profiles, and authentication. To use another API,
create `.env` from `.env.example` and set `VITE_API_URL` before building. Vite
embeds this public URL in the client and server bundles.

```sh
bun run typecheck
bun run test:unit
bun run build
bun run preview
```

For browser integration tests, install Chromium once with
`bun x playwright install chromium`, then run `bun run test:integration`.

For the full E2E journey, install the backend dependencies first with
`bun install --frozen-lockfile` in `../Backend`, then run `bun run test:e2e`
here. Playwright migrates and seeds a separate `Backend/e2e.db` and starts
both services. The frontend and API ports default to 5173 and 9999; override
them with `PLAYWRIGHT_PORT` and `E2E_API_PORT` if those ports are in use.

Preview serves the production build on port 5173 (or `PORT` if set).
`bun run start` serves the production build on port 3000 by default.
Pages render on the server for each request so authentication, language cookies,
and CSP nonces stay current.

The Docker build uses `bun.lock`. Set the public API URL with
`docker build --build-arg VITE_API_URL=https://api.example.com -t frontend .`.
