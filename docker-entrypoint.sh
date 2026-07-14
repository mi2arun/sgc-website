#!/bin/sh
set -e

# Apply pending DB migrations before starting the app. Production ships a Next
# standalone bundle in which the Payload CLI can't load the TS config, so we use
# a lightweight pg-based runner (scripts/migrate.mjs) instead.
if [ -n "$DATABASE_URL" ]; then
  echo "[entrypoint] running database migrations..."
  node scripts/migrate.mjs
else
  echo "[entrypoint] DATABASE_URL not set — skipping migrations"
fi

exec "$@"
