FROM node:24-bookworm-slim AS base
COPY --from=oven/bun:1.4.4 /usr/local/bin/bun /usr/local/bin/bun
WORKDIR /app

FROM base AS development-dependencies-env
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --ignore-scripts

FROM base AS production-dependencies-env
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production --ignore-scripts

FROM development-dependencies-env AS build-env
COPY . .
ARG VITE_API_URL=http://localhost:9999
ENV VITE_API_URL=$VITE_API_URL
RUN bun run build

FROM node:24-bookworm-slim
WORKDIR /app
COPY package.json ./
COPY --from=production-dependencies-env /app/node_modules ./node_modules
COPY --from=build-env /app/build ./build
CMD ["npm", "run", "start"]
