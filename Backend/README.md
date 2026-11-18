# Backend

Requires Bun. From this directory:

```sh
bun install --frozen-lockfile
bun run setup
bun run dev
```

Setup creates `.env` from `.env.example` with a generated JWT secret if `.env` does not exist, then applies database migrations. Existing environment settings and data are preserved.

The API runs at http://localhost:9999 by default. Interactive API documentation is available at `/reference`, with the OpenAPI document at `/doc`.

```sh
bun run build
bun dist/index.js
```

Use `bun run lint --max-warnings 0`, `bun run typecheck`, and `bun run test` to verify changes. Tests use an in-memory database and apply the same migrations as the application.

Run `bun run generate` after changing the database schema and `bun run migrate` to apply migrations. `bun run seed` replaces existing users, ideas, and reviews with sample data.
