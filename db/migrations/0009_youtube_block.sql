-- YouTube block: curated video grid. Main table + `videos` array, for the pages
-- and departments layouts (published + version). Mirrors Payload push output.

-- ---- enums ----
DO $$
DECLARE n text;
BEGIN
  FOREACH n IN ARRAY ARRAY[
    'enum_pages_blocks_youtube_columns','enum__pages_v_blocks_youtube_columns',
    'enum_departments_blocks_youtube_columns','enum__departments_v_blocks_youtube_columns'
  ] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname=n) THEN
      EXECUTE format('CREATE TYPE %I AS ENUM (''2'',''3'',''4'')', n);
    END IF;
  END LOOP;
  FOREACH n IN ARRAY ARRAY[
    'enum_pages_blocks_youtube_style_bg','enum__pages_v_blocks_youtube_style_bg',
    'enum_departments_blocks_youtube_style_bg','enum__departments_v_blocks_youtube_style_bg'
  ] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname=n) THEN
      EXECUTE format('CREATE TYPE %I AS ENUM (''white'',''light'',''dark'',''gradient'',''transparent'')', n);
    END IF;
  END LOOP;
  FOREACH n IN ARRAY ARRAY[
    'enum_pages_blocks_youtube_style_pad','enum__pages_v_blocks_youtube_style_pad',
    'enum_departments_blocks_youtube_style_pad','enum__departments_v_blocks_youtube_style_pad'
  ] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname=n) THEN
      EXECUTE format('CREATE TYPE %I AS ENUM (''none'',''small'',''normal'',''large'')', n);
    END IF;
  END LOOP;
END $$;

-- ---- main tables (published: varchar id ; version: serial id + _uuid) ----
CREATE TABLE IF NOT EXISTS pages_blocks_youtube (
  _order integer NOT NULL, _parent_id integer NOT NULL, _path text NOT NULL, id varchar PRIMARY KEY,
  heading varchar DEFAULT 'From Our YouTube', subheading varchar, channel_url varchar,
  columns enum_pages_blocks_youtube_columns DEFAULT '3', enabled boolean DEFAULT true,
  style_bg enum_pages_blocks_youtube_style_bg DEFAULT 'transparent',
  style_pad enum_pages_blocks_youtube_style_pad DEFAULT 'none',
  style_bt boolean DEFAULT false, style_bb boolean DEFAULT false, style_fw boolean DEFAULT false, block_name varchar
);
CREATE TABLE IF NOT EXISTS departments_blocks_youtube (
  _order integer NOT NULL, _parent_id integer NOT NULL, _path text NOT NULL, id varchar PRIMARY KEY,
  heading varchar DEFAULT 'From Our YouTube', subheading varchar, channel_url varchar,
  columns enum_departments_blocks_youtube_columns DEFAULT '3', enabled boolean DEFAULT true,
  style_bg enum_departments_blocks_youtube_style_bg DEFAULT 'transparent',
  style_pad enum_departments_blocks_youtube_style_pad DEFAULT 'none',
  style_bt boolean DEFAULT false, style_bb boolean DEFAULT false, style_fw boolean DEFAULT false, block_name varchar
);
CREATE TABLE IF NOT EXISTS _pages_v_blocks_youtube (
  _order integer NOT NULL, _parent_id integer NOT NULL, _path text NOT NULL, id serial PRIMARY KEY,
  heading varchar DEFAULT 'From Our YouTube', subheading varchar, channel_url varchar,
  columns enum__pages_v_blocks_youtube_columns DEFAULT '3', enabled boolean DEFAULT true,
  style_bg enum__pages_v_blocks_youtube_style_bg DEFAULT 'transparent',
  style_pad enum__pages_v_blocks_youtube_style_pad DEFAULT 'none',
  style_bt boolean DEFAULT false, style_bb boolean DEFAULT false, style_fw boolean DEFAULT false, _uuid varchar, block_name varchar
);
CREATE TABLE IF NOT EXISTS _departments_v_blocks_youtube (
  _order integer NOT NULL, _parent_id integer NOT NULL, _path text NOT NULL, id serial PRIMARY KEY,
  heading varchar DEFAULT 'From Our YouTube', subheading varchar, channel_url varchar,
  columns enum__departments_v_blocks_youtube_columns DEFAULT '3', enabled boolean DEFAULT true,
  style_bg enum__departments_v_blocks_youtube_style_bg DEFAULT 'transparent',
  style_pad enum__departments_v_blocks_youtube_style_pad DEFAULT 'none',
  style_bt boolean DEFAULT false, style_bb boolean DEFAULT false, style_fw boolean DEFAULT false, _uuid varchar, block_name varchar
);

-- ---- videos array (published: varchar parent+id ; version: integer parent + serial id + _uuid) ----
CREATE TABLE IF NOT EXISTS pages_blocks_youtube_videos (
  _order integer NOT NULL, _parent_id varchar NOT NULL, id varchar PRIMARY KEY, url varchar, title varchar
);
CREATE TABLE IF NOT EXISTS departments_blocks_youtube_videos (
  _order integer NOT NULL, _parent_id varchar NOT NULL, id varchar PRIMARY KEY, url varchar, title varchar
);
CREATE TABLE IF NOT EXISTS _pages_v_blocks_youtube_videos (
  _order integer NOT NULL, _parent_id integer NOT NULL, id serial PRIMARY KEY, url varchar, title varchar, _uuid varchar
);
CREATE TABLE IF NOT EXISTS _departments_v_blocks_youtube_videos (
  _order integer NOT NULL, _parent_id integer NOT NULL, id serial PRIMARY KEY, url varchar, title varchar, _uuid varchar
);

-- ---- indexes ----
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['pages_blocks_youtube','departments_blocks_youtube','_pages_v_blocks_youtube','_departments_v_blocks_youtube'] LOOP
    EXECUTE format('CREATE INDEX IF NOT EXISTS %I ON %I (_order)', t||'_order_idx', t);
    EXECUTE format('CREATE INDEX IF NOT EXISTS %I ON %I (_parent_id)', t||'_parent_id_idx', t);
    EXECUTE format('CREATE INDEX IF NOT EXISTS %I ON %I (_path)', t||'_path_idx', t);
  END LOOP;
  FOREACH t IN ARRAY ARRAY['pages_blocks_youtube_videos','departments_blocks_youtube_videos','_pages_v_blocks_youtube_videos','_departments_v_blocks_youtube_videos'] LOOP
    EXECUTE format('CREATE INDEX IF NOT EXISTS %I ON %I (_order)', t||'_order_idx', t);
    EXECUTE format('CREATE INDEX IF NOT EXISTS %I ON %I (_parent_id)', t||'_parent_id_idx', t);
  END LOOP;
END $$;

-- ---- foreign keys ----
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='pages_blocks_youtube_parent_id_fk') THEN
    ALTER TABLE pages_blocks_youtube ADD CONSTRAINT pages_blocks_youtube_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES pages(id) ON DELETE CASCADE; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='departments_blocks_youtube_parent_id_fk') THEN
    ALTER TABLE departments_blocks_youtube ADD CONSTRAINT departments_blocks_youtube_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES departments(id) ON DELETE CASCADE; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='_pages_v_blocks_youtube_parent_id_fk') THEN
    ALTER TABLE _pages_v_blocks_youtube ADD CONSTRAINT _pages_v_blocks_youtube_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES _pages_v(id) ON DELETE CASCADE; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='_departments_v_blocks_youtube_parent_id_fk') THEN
    ALTER TABLE _departments_v_blocks_youtube ADD CONSTRAINT _departments_v_blocks_youtube_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES _departments_v(id) ON DELETE CASCADE; END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='pages_blocks_youtube_videos_parent_id_fk') THEN
    ALTER TABLE pages_blocks_youtube_videos ADD CONSTRAINT pages_blocks_youtube_videos_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES pages_blocks_youtube(id) ON DELETE CASCADE; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='departments_blocks_youtube_videos_parent_id_fk') THEN
    ALTER TABLE departments_blocks_youtube_videos ADD CONSTRAINT departments_blocks_youtube_videos_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES departments_blocks_youtube(id) ON DELETE CASCADE; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='_pages_v_blocks_youtube_videos_parent_id_fk') THEN
    ALTER TABLE _pages_v_blocks_youtube_videos ADD CONSTRAINT _pages_v_blocks_youtube_videos_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES _pages_v_blocks_youtube(id) ON DELETE CASCADE; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='_departments_v_blocks_youtube_videos_parent_id_fk') THEN
    ALTER TABLE _departments_v_blocks_youtube_videos ADD CONSTRAINT _departments_v_blocks_youtube_videos_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES _departments_v_blocks_youtube(id) ON DELETE CASCADE; END IF;
END $$;
