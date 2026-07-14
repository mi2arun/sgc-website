#!/usr/bin/env python3
"""
Extract hero block + slide rows from local for pages 1,2,5,6,7
and emit SQL that deletes any existing hero on those pages, then inserts
the new rows. Designed to be idempotent: re-runnable.
"""
import subprocess
import json

LOCAL = "postgresql://arunkumars@localhost:5432/sgc_website"
PSQL = "/Applications/Postgres.app/Contents/Versions/18/bin/psql"
PAGE_IDS = [1, 2, 5, 6, 7]

def fetch_json_rows(table):
    """Return rows as JSON for a table filtered to PAGE_IDS."""
    if table == 'pages_blocks_hero':
        where = f"_parent_id IN ({','.join(map(str, PAGE_IDS))})"
    else:
        # slides — filter by parent block
        where = f"""_parent_id IN (
            SELECT id FROM pages_blocks_hero WHERE _parent_id IN ({','.join(map(str, PAGE_IDS))})
        )"""
    r = subprocess.run(
        [PSQL, LOCAL, "-t", "-A", "-c",
         f"SELECT row_to_json(t) FROM (SELECT * FROM {table} WHERE {where} ORDER BY _parent_id) t"],
        capture_output=True, text=True, check=True,
    )
    return [json.loads(line) for line in r.stdout.strip().split("\n") if line]

def fetch_columns(table):
    r = subprocess.run(
        [PSQL, LOCAL, "-t", "-A", "-c",
         f"SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='{table}' ORDER BY ordinal_position"],
        capture_output=True, text=True, check=True,
    )
    return [line for line in r.stdout.strip().split("\n") if line]

def sql_value(v):
    if v is None:
        return 'NULL'
    if isinstance(v, bool):
        return 'TRUE' if v else 'FALSE'
    if isinstance(v, (int, float)):
        return str(v)
    if isinstance(v, (list, dict)):
        s = json.dumps(v).replace("'", "''")
        return f"'{s}'::jsonb"
    # string
    s = str(v).replace("'", "''")
    return f"'{s}'"

hero_cols = fetch_columns('pages_blocks_hero')
slide_cols = fetch_columns('pages_blocks_hero_slides')
hero_rows = fetch_json_rows('pages_blocks_hero')
slide_rows = fetch_json_rows('pages_blocks_hero_slides')

print("BEGIN;")
print("-- Push hero content for pages 1, 2, 5, 6, 7 from local to Neon")
print()

# Delete existing heroes (cascade should clear slides, but be defensive)
print(f"-- Clear existing hero blocks on these pages")
print(f"DELETE FROM pages_blocks_hero_slides WHERE _parent_id IN (")
print(f"  SELECT id FROM pages_blocks_hero WHERE _parent_id IN ({','.join(map(str, PAGE_IDS))})")
print(f");")
print(f"DELETE FROM pages_blocks_hero WHERE _parent_id IN ({','.join(map(str, PAGE_IDS))});")
print()

# Insert hero rows
print(f"-- Insert new hero blocks ({len(hero_rows)} rows)")
for row in hero_rows:
    cols = list(row.keys())
    vals = [sql_value(row[c]) for c in cols]
    print(f"INSERT INTO pages_blocks_hero ({', '.join(f'\"{c}\"' for c in cols)}) VALUES ({', '.join(vals)});")
print()

# Insert slide rows
print(f"-- Insert hero slides ({len(slide_rows)} rows)")
for row in slide_rows:
    cols = list(row.keys())
    vals = [sql_value(row[c]) for c in cols]
    print(f"INSERT INTO pages_blocks_hero_slides ({', '.join(f'\"{c}\"' for c in cols)}) VALUES ({', '.join(vals)});")
print()

print("COMMIT;")
