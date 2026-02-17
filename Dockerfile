# ---------- BASE ----------
FROM node:20-alpine AS base

WORKDIR /app
RUN corepack enable

# ---------- DEPENDENCIES ----------
FROM base AS deps

COPY package.json pnpm-lock.yaml ./
COPY apps/api/package.json apps/api/package.json

RUN pnpm install --frozen-lockfile

# ---------- BUILD ----------
FROM base AS build

COPY . .
COPY --from=deps /app/node_modules ./node_modules

WORKDIR /app/apps/api
RUN pnpm build

# ---------- RUNNER ----------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

RUN corepack enable

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/api/dist ./dist
COPY apps/api/package.json ./

EXPOSE 8000

CMD ["node", "dist/main.js"]