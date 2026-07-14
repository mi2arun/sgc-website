# Schema migrations

This directory holds ad-hoc SQL migrations for production schema changes that
were applied outside Payload's normal `payload migrate` workflow.

## Why these exist

Local dev uses Drizzle's `push` mode (default in Payload's postgres adapter when
`NODE_ENV !== 'production'`), which keeps the local DB schema in sync with the
code on every dev start. Production (Neon) runs with `push: false`, so its
schema does **not** auto-update on deploy.

When the gap between local and prod accumulates, we generate a one-shot SQL
patch and apply it to Neon manually.

## Files

- `diff-local-to-prod.py` — generates SQL that adds, to a target DB, any
  schema items (tables, columns, enum types, enum values) that exist locally
  but not on the target. Reads `DATABASE_URL_UNPOOLED` from
  `.env.production.local` for the target.
- `YYYY-MM-DD_*.sql` — generated migration files applied to production.

## Workflow

1. Make schema changes in code locally → dev restart auto-pushes to local DB.
2. Before deploying to prod, run:
   ```
   python3 src/migrations/diff-local-to-prod.py > src/migrations/$(date +%Y-%m-%d)_session.sql
   ```
3. Dry-run on Neon (replace `COMMIT;` with `ROLLBACK;` in the file or via sed).
4. Apply for real:
   ```
   psql "$DATABASE_URL_UNPOOLED" --set ON_ERROR_STOP=on -f <file>.sql
   ```
5. Commit the SQL file as a record of what was applied.

## Long-term

Replace this ad-hoc workflow with Payload's official migrate CLI
(`npx payload migrate:create` + `npx payload migrate`) once the project
stabilises. The official workflow integrates with `payload.config.ts`'s
`db.prodMigrations`.
