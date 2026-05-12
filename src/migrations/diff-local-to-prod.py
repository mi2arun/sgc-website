#!/usr/bin/env python3
"""
Compute the additive schema delta between local Postgres and Neon, generate SQL.
"""
import subprocess
import sys

LOCAL = "postgresql://arunkumars@localhost:5432/sgc_website"
PSQL = "/Applications/Postgres.app/Contents/Versions/18/bin/psql"

# Read Neon URL from .env.production.local
neon_url = None
with open("/Users/arunkumars/Documents/GitHub/sgc-website/.env.production.local") as f:
    for line in f:
        if line.startswith("DATABASE_URL_UNPOOLED="):
            neon_url = line.split("=", 1)[1].strip().strip('"').strip("'")
            break
if not neon_url:
    print("Neon URL not found"); sys.exit(1)

def q(url, sql):
    r = subprocess.run([PSQL, url, "-t", "-A", "-F", "|", "-c", sql],
                       capture_output=True, text=True, check=True)
    return [line for line in r.stdout.strip().split("\n") if line]

# 1. Tables in local but not Neon
local_tables = set(q(LOCAL, "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'"))
neon_tables = set(q(neon_url, "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'"))
new_tables = sorted(local_tables - neon_tables)
print(f"-- New tables ({len(new_tables)}):", file=sys.stderr)
for t in new_tables: print(f"--   {t}", file=sys.stderr)

# 2. Enum types in local but not Neon
local_types = set(q(LOCAL, "SELECT typname FROM pg_type WHERE typtype='e' AND typnamespace=(SELECT oid FROM pg_namespace WHERE nspname='public')"))
neon_types = set(q(neon_url, "SELECT typname FROM pg_type WHERE typtype='e' AND typnamespace=(SELECT oid FROM pg_namespace WHERE nspname='public')"))
new_types = sorted(local_types - neon_types)
print(f"-- New enum types ({len(new_types)}):", file=sys.stderr)
for t in new_types: print(f"--   {t}", file=sys.stderr)

# 3. For tables in both, columns missing on Neon
shared_tables = sorted(local_tables & neon_tables)
column_additions = []  # (table, col, type, nullable, default)
for tbl in shared_tables:
    local_cols = q(LOCAL, f"""
SELECT column_name, data_type, udt_name, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema='public' AND table_name='{tbl}'
ORDER BY ordinal_position
""")
    neon_cols = q(neon_url, f"""
SELECT column_name FROM information_schema.columns
WHERE table_schema='public' AND table_name='{tbl}'
""")
    neon_set = set(neon_cols)
    for row in local_cols:
        parts = row.split("|")
        cname = parts[0]
        if cname not in neon_set:
            column_additions.append((tbl, parts[0], parts[1], parts[2], parts[3], parts[4]))

print(f"-- Column additions ({len(column_additions)}):", file=sys.stderr)
for c in column_additions[:30]: print(f"--   {c[0]}.{c[1]} ({c[2]}/{c[3]})", file=sys.stderr)

# 4. For enum types in both, missing values
shared_types = sorted(local_types & neon_types)
enum_value_additions = []  # (typname, value)
for t in shared_types:
    local_vals = q(LOCAL, f"SELECT enumlabel FROM pg_enum WHERE enumtypid='{t}'::regtype ORDER BY enumsortorder")
    neon_vals = q(neon_url, f"SELECT enumlabel FROM pg_enum WHERE enumtypid='{t}'::regtype ORDER BY enumsortorder")
    neon_set = set(neon_vals)
    for v in local_vals:
        if v not in neon_set:
            enum_value_additions.append((t, v))
print(f"-- Enum value additions ({len(enum_value_additions)}):", file=sys.stderr)
for e in enum_value_additions: print(f"--   {e[0]} += '{e[1]}'", file=sys.stderr)

# 5. Build SQL output
print("BEGIN;")
print("-- Schema migration: bring Neon up to local (additive only)")
print()

# 5a. New enum types — dump from local using pg_dump
if new_types:
    print("-- ============ New enum types ============")
    for tname in new_types:
        vals = q(LOCAL, f"SELECT enumlabel FROM pg_enum WHERE enumtypid='public.{tname}'::regtype ORDER BY enumsortorder")
        vals_sql = ", ".join(f"'{v}'" for v in vals)
        print(f"CREATE TYPE public.{tname} AS ENUM ({vals_sql});")
    print()

# 5b. New tables — dump via pg_dump --table for each
if new_tables:
    print("-- ============ New tables ============")
    for tbl in new_tables:
        # Use pg_dump for accurate DDL with constraints/indexes
        r = subprocess.run(["/Applications/Postgres.app/Contents/Versions/18/bin/pg_dump",
                            LOCAL, "--schema-only", "--no-owner", "--no-privileges",
                            "-t", f"public.{tbl}"],
                           capture_output=True, text=True, check=True)
        # Strip pg_dump preamble (SET statements etc.) and keep the meaningful DDL
        lines = []
        skip_set = True
        for line in r.stdout.split("\n"):
            if line.startswith("SET ") or line.startswith("SELECT pg_catalog") or line.startswith("--") or not line.strip():
                continue
            lines.append(line)
        print("\n".join(lines))
    print()

# 5c. Column additions
if column_additions:
    print("-- ============ Column additions ============")
    for tbl, col, dtype, udt, nullable, default in column_additions:
        # Build the type
        if dtype == "USER-DEFINED":
            type_clause = f"public.{udt}"
        elif dtype in ("character varying", "varchar"):
            type_clause = "character varying"
        elif dtype == "timestamp with time zone":
            type_clause = "timestamp with time zone"
        elif dtype == "ARRAY":
            type_clause = f"{udt}[]"
        else:
            type_clause = dtype
        nullclause = "" if nullable == "YES" else " NOT NULL"
        defclause = f" DEFAULT {default}" if default else ""
        print(f'ALTER TABLE public."{tbl}" ADD COLUMN IF NOT EXISTS "{col}" {type_clause}{defclause}{nullclause};')
    print()

# 5d. Enum value additions
if enum_value_additions:
    print("-- ============ Enum value additions ============")
    for tname, val in enum_value_additions:
        # ALTER TYPE ADD VALUE doesn't support IF NOT EXISTS in older PG, but does in PG 12+
        print(f"ALTER TYPE public.{tname} ADD VALUE IF NOT EXISTS '{val}';")
    print()

print("COMMIT;")
