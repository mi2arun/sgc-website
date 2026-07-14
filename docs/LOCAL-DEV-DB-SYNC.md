# Local Dev: Sync Data & Media from Production

The local dev DB and the production DB drift apart (local can hold stale seed
data referencing images that were never uploaded). To make local render exactly
like prod, do two things: **point local dev at the RustFS bucket**, and **copy
the prod database into local**.

## 1. Point local dev at RustFS (one-time)

Media is stored in an S3-compatible RustFS bucket. The `s3Storage` adapter in
`payload.config.ts` only activates when `S3_BUCKET` is set. Add these to your
local `.env` (gitignored) — **use the public endpoint**, not the internal
`http://s3:9000` Docker alias, which your laptop can't reach:

```env
S3_BUCKET=sgc-website
S3_ENDPOINT=https://s3.apps.sgc.edu.in     # public; internal prod value is http://s3:9000
S3_REGION=us-east-1
S3_ACCESS_KEY=<get from prod, see below>
S3_SECRET_KEY=<get from prod, see below>
```

Get the live values from the running prod container (requires SSH access to the
deploy host):

```bash
ssh root@deploy.sgc.edu.in \
  'docker inspect veld-sgc-website-web --format "{{range .Config.Env}}{{println .}}{{end}}" | grep -E "^S3_"'
```

RustFS is exposed through Caddy:
- **S3 API:** `https://s3.apps.sgc.edu.in`  (→ `rustfs:9000`)
- **Console UI:** `https://console.apps.sgc.edu.in`  (→ `rustfs:9001`)

> ⚠️ This targets the **live prod bucket**. Reads are safe, but any media you
> upload from local `/admin` lands in **production**. First load of each image
> is slow (~1s) because dev fetches the original from the remote bucket and
> re-encodes; it's cached (`.next/cache`) after that.

## 2. Sync the prod database into local

Prod DB: database `sgc_website_prod` in the `velcrm-postgres` container on the
deploy host. Local DB: `sgc_website` on `localhost:5432` (Postgres.app).

macOS note: the psql/pg_dump CLIs ship with Postgres.app but aren't on `PATH`:
```bash
export PATH="/Applications/Postgres.app/Contents/Versions/18/bin:$PATH"
```

```bash
LOCAL="postgresql://arunkumars@localhost:5432/sgc_website"

# a) Dump prod (as the pgadmin superuser inside the container — no password needed)
ssh root@deploy.sgc.edu.in \
  'docker exec velcrm-postgres pg_dump -U pgadmin -d sgc_website_prod --no-owner --no-acl --clean --if-exists' \
  | gzip > prod_dump.sql.gz

# b) Back up local first (safety)
pg_dump "$LOCAL" --no-owner --no-acl | gzip > local_backup.sql.gz

# c) Drop the dev server's DB connections so DROP/CREATE don't block on locks
#    (next dev reconnects automatically)
psql "$LOCAL" -tAc \
  "SELECT pg_terminate_backend(pid) FROM pg_stat_activity \
   WHERE datname='sgc_website' AND pid<>pg_backend_pid();"

# d) Restore prod into local
gunzip -c prod_dump.sql.gz | psql "$LOCAL"
```

Restart `next dev` afterward (env is read at startup). Local now mirrors prod;
all media resolves from RustFS.

## Rollback

```bash
gunzip -c local_backup.sql.gz | psql "postgresql://arunkumars@localhost:5432/sgc_website"
```

## Notes / gotchas

- **Prod is Postgres 17, local is 18** — restoring a 17 dump into 18 is fine.
- If `localhost:3000` shows a **stale hydration error that survives restarts**,
  an old service worker may be caching HTML. Clear it in DevTools → Application
  → Service Workers → Unregister + Clear site data. (This repo registers no SW;
  a leftover from another `localhost:3000` project was the culprit once.)
