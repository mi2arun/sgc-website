// Lightweight SQL migration runner.
//
// Applies the numbered *.sql files in db/migrations/ that haven't run yet,
// tracked in a `schema_migrations` table, each inside its own transaction.
// Runs from the Docker entrypoint before the app starts (see Dockerfile).
//
// Deliberately does NOT load the Payload config — it only needs `pg` (already a
// runtime dependency via @payloadcms/db-postgres), so it works in the slim
// standalone runtime where the Payload CLI cannot load the TS config.

import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

const MIGRATIONS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'db', 'migrations')

const { DATABASE_URL } = process.env
if (!DATABASE_URL) {
  console.error('[migrate] DATABASE_URL is not set — cannot run migrations')
  process.exit(1)
}

const client = new pg.Client({ connectionString: DATABASE_URL })

async function run() {
  await client.connect()
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name        text PRIMARY KEY,
      applied_at  timestamptz NOT NULL DEFAULT now()
    )
  `)

  const { rows } = await client.query('SELECT name FROM schema_migrations')
  const applied = new Set(rows.map((r) => r.name))

  const files = readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith('.sql'))
    .sort()

  let ran = 0
  for (const file of files) {
    if (applied.has(file)) continue
    const sql = readFileSync(join(MIGRATIONS_DIR, file), 'utf8')
    process.stdout.write(`[migrate] applying ${file} ... `)
    try {
      await client.query('BEGIN')
      await client.query(sql)
      await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file])
      await client.query('COMMIT')
      console.log('ok')
      ran++
    } catch (err) {
      await client.query('ROLLBACK')
      console.error(`\n[migrate] FAILED on ${file}: ${err.message}`)
      throw err
    }
  }
  console.log(ran ? `[migrate] applied ${ran} migration(s)` : '[migrate] up to date')
}

run()
  .then(() => client.end())
  .catch((err) => {
    console.error('[migrate] error:', err.message)
    client.end().finally(() => process.exit(1))
  })
