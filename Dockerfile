# sgc-website — Next.js 16 + Payload CMS 3, built as a standalone server for veld.
# node:22 (Debian/glibc) rather than alpine/musl so sharp's prebuilt binaries load cleanly.
# All frontend pages are `force-dynamic`, so `next build` does NOT touch the DB — no DB
# connectivity is required at build time (the build container isn't on the velcrm network).

# ---- deps: install from a clean lockfile ----
FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ---- build: compile Next standalone bundle ----
FROM node:22-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS=--max-old-space-size=4096
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- runner: minimal standalone runtime ----
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN groupadd -g 1001 nodejs && useradd -u 1001 -g nodejs -m nextjs
# Next standalone output: server.js + traced node_modules (includes sharp + pg), plus static + public.
COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
# DB migration runner — runs from the entrypoint before the app starts. Uses the
# standalone-traced `pg`, so no extra deps are needed.
COPY --from=build /app/scripts/migrate.mjs ./scripts/migrate.mjs
COPY --from=build /app/db ./db
COPY --from=build /app/docker-entrypoint.sh /usr/local/bin/app-entrypoint.sh
RUN chmod +x /usr/local/bin/app-entrypoint.sh
USER nextjs
EXPOSE 3000
ENTRYPOINT ["app-entrypoint.sh"]
CMD ["node", "server.js"]
