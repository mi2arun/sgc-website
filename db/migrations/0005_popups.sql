-- Popups collection: startup ad/promo popups targeted by page URL.
-- Creates the enum, main table, and the target_paths array table (with FKs/indexes).
-- Mirrors the schema Payload's dev "push" generates, made idempotent for prod.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_popups_frequency') THEN
    CREATE TYPE enum_popups_frequency AS ENUM ('session', 'daily', 'always');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS popups (
  id            serial PRIMARY KEY,
  name          varchar NOT NULL,
  enabled       boolean DEFAULT true,
  heading       varchar,
  body          varchar,
  image_id      integer,
  cta_label     varchar,
  cta_link      varchar,
  cta_new_tab   boolean,
  start_at      timestamp(3) with time zone,
  end_at        timestamp(3) with time zone,
  frequency     enum_popups_frequency DEFAULT 'session',
  delay_seconds numeric DEFAULT 1,
  priority      numeric DEFAULT 0,
  updated_at    timestamp(3) with time zone NOT NULL DEFAULT now(),
  created_at    timestamp(3) with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS popups_target_paths (
  _order     integer NOT NULL,
  _parent_id integer NOT NULL,
  id         varchar PRIMARY KEY,
  path       varchar NOT NULL
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'popups_image_id_media_id_fk') THEN
    ALTER TABLE popups ADD CONSTRAINT popups_image_id_media_id_fk
      FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE SET NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'popups_target_paths_parent_id_fk') THEN
    ALTER TABLE popups_target_paths ADD CONSTRAINT popups_target_paths_parent_id_fk
      FOREIGN KEY (_parent_id) REFERENCES popups(id) ON DELETE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS popups_image_idx ON popups (image_id);
CREATE INDEX IF NOT EXISTS popups_updated_at_idx ON popups (updated_at);
CREATE INDEX IF NOT EXISTS popups_created_at_idx ON popups (created_at);
CREATE INDEX IF NOT EXISTS popups_target_paths_order_idx ON popups_target_paths (_order);
CREATE INDEX IF NOT EXISTS popups_target_paths_parent_id_idx ON popups_target_paths (_parent_id);
