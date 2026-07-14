# Database migrations

Lightweight, tracked SQL migrations applied automatically on deploy.

## Why not Payload's migration CLI?

`payload migrate` can't load this project's TS config headlessly (its `tsx`
loader fails on the config's extensionless imports, and the config depends on
Next's env bootstrap). That failure would also crash the production container.
So we use a tiny `pg`-based runner instead — `scripts/migrate.mjs` — which
needs no Payload config, just the `DATABASE_URL`.

## How it works

- Each change is a numbered file here: `0001_*.sql`, `0002_*.sql`, …
- `scripts/migrate.mjs` runs every file not yet recorded in the
  `schema_migrations` table, each in its own transaction, in filename order.
- The Docker entrypoint (`docker-entrypoint.sh`) runs it **before** the app
  starts, so prod schema is always in sync with the deployed code.

## Adding a migration

1. Change a Payload field/collection as usual (dev auto-syncs via `push`).
2. Capture the schema change as SQL in a new file, e.g.
   `db/migrations/0002_add_something.sql`. Prefer idempotent DDL
   (`ADD COLUMN IF NOT EXISTS`, `CREATE TABLE IF NOT EXISTS`) so re-runs and
   already-patched environments are safe.
3. Test locally: `npm run migrate` (uses `DATABASE_URL` from `.env`).
4. Commit + push. The deploy runs it automatically.

To find the exact SQL for a field change, diff the dev DB schema (which `push`
already updated) against prod — see `docs/legacy-migrations/` for the older
manual diff scripts.

## Notes

- Assumes the base schema already exists (it was established via Payload `push`).
  These migrations only carry **incremental** changes.
- If a migration fails, the entrypoint exits non-zero and the container won't
  start — intentional, so a bad schema never serves traffic.
