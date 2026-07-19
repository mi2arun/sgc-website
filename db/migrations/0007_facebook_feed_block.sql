-- Facebook Feed block: tables for the pages + departments layouts (published and
-- version variants), including the shared style enums. Mirrors Payload push output.

-- ---- enum types (per table: style_bg + style_pad) ----
DO $$
DECLARE n text;
BEGIN
  FOREACH n IN ARRAY ARRAY[
    'enum_pages_blocks_facebook_feed_style_bg',
    'enum__pages_v_blocks_facebook_feed_style_bg',
    'enum_departments_blocks_facebook_feed_style_bg',
    'enum__departments_v_blocks_facebook_feed_style_bg'
  ] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = n) THEN
      EXECUTE format('CREATE TYPE %I AS ENUM (''white'',''light'',''dark'',''gradient'',''transparent'')', n);
    END IF;
  END LOOP;
  FOREACH n IN ARRAY ARRAY[
    'enum_pages_blocks_facebook_feed_style_pad',
    'enum__pages_v_blocks_facebook_feed_style_pad',
    'enum_departments_blocks_facebook_feed_style_pad',
    'enum__departments_v_blocks_facebook_feed_style_pad'
  ] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = n) THEN
      EXECUTE format('CREATE TYPE %I AS ENUM (''none'',''small'',''normal'',''large'')', n);
    END IF;
  END LOOP;
END $$;

-- ---- published tables (varchar block id) ----
CREATE TABLE IF NOT EXISTS pages_blocks_facebook_feed (
  _order integer NOT NULL,
  _parent_id integer NOT NULL,
  _path text NOT NULL,
  id varchar PRIMARY KEY,
  heading varchar DEFAULT 'Latest from Facebook',
  page_url varchar DEFAULT 'https://www.facebook.com/sgcpdy',
  height numeric DEFAULT 640,
  small_header boolean DEFAULT false,
  hide_cover boolean DEFAULT false,
  show_facepile boolean DEFAULT true,
  enabled boolean DEFAULT true,
  style_bg enum_pages_blocks_facebook_feed_style_bg DEFAULT 'transparent',
  style_pad enum_pages_blocks_facebook_feed_style_pad DEFAULT 'none',
  style_bt boolean DEFAULT false,
  style_bb boolean DEFAULT false,
  style_fw boolean DEFAULT false,
  block_name varchar
);

CREATE TABLE IF NOT EXISTS departments_blocks_facebook_feed (
  _order integer NOT NULL,
  _parent_id integer NOT NULL,
  _path text NOT NULL,
  id varchar PRIMARY KEY,
  heading varchar DEFAULT 'Latest from Facebook',
  page_url varchar DEFAULT 'https://www.facebook.com/sgcpdy',
  height numeric DEFAULT 640,
  small_header boolean DEFAULT false,
  hide_cover boolean DEFAULT false,
  show_facepile boolean DEFAULT true,
  enabled boolean DEFAULT true,
  style_bg enum_departments_blocks_facebook_feed_style_bg DEFAULT 'transparent',
  style_pad enum_departments_blocks_facebook_feed_style_pad DEFAULT 'none',
  style_bt boolean DEFAULT false,
  style_bb boolean DEFAULT false,
  style_fw boolean DEFAULT false,
  block_name varchar
);

-- ---- version tables (serial block id + _uuid) ----
CREATE TABLE IF NOT EXISTS _pages_v_blocks_facebook_feed (
  _order integer NOT NULL,
  _parent_id integer NOT NULL,
  _path text NOT NULL,
  id serial PRIMARY KEY,
  heading varchar DEFAULT 'Latest from Facebook',
  page_url varchar DEFAULT 'https://www.facebook.com/sgcpdy',
  height numeric DEFAULT 640,
  small_header boolean DEFAULT false,
  hide_cover boolean DEFAULT false,
  show_facepile boolean DEFAULT true,
  enabled boolean DEFAULT true,
  style_bg enum__pages_v_blocks_facebook_feed_style_bg DEFAULT 'transparent',
  style_pad enum__pages_v_blocks_facebook_feed_style_pad DEFAULT 'none',
  style_bt boolean DEFAULT false,
  style_bb boolean DEFAULT false,
  style_fw boolean DEFAULT false,
  _uuid varchar,
  block_name varchar
);

CREATE TABLE IF NOT EXISTS _departments_v_blocks_facebook_feed (
  _order integer NOT NULL,
  _parent_id integer NOT NULL,
  _path text NOT NULL,
  id serial PRIMARY KEY,
  heading varchar DEFAULT 'Latest from Facebook',
  page_url varchar DEFAULT 'https://www.facebook.com/sgcpdy',
  height numeric DEFAULT 640,
  small_header boolean DEFAULT false,
  hide_cover boolean DEFAULT false,
  show_facepile boolean DEFAULT true,
  enabled boolean DEFAULT true,
  style_bg enum__departments_v_blocks_facebook_feed_style_bg DEFAULT 'transparent',
  style_pad enum__departments_v_blocks_facebook_feed_style_pad DEFAULT 'none',
  style_bt boolean DEFAULT false,
  style_bb boolean DEFAULT false,
  style_fw boolean DEFAULT false,
  _uuid varchar,
  block_name varchar
);

-- ---- indexes ----
CREATE INDEX IF NOT EXISTS pages_blocks_facebook_feed_order_idx ON pages_blocks_facebook_feed (_order);
CREATE INDEX IF NOT EXISTS pages_blocks_facebook_feed_parent_id_idx ON pages_blocks_facebook_feed (_parent_id);
CREATE INDEX IF NOT EXISTS pages_blocks_facebook_feed_path_idx ON pages_blocks_facebook_feed (_path);
CREATE INDEX IF NOT EXISTS departments_blocks_facebook_feed_order_idx ON departments_blocks_facebook_feed (_order);
CREATE INDEX IF NOT EXISTS departments_blocks_facebook_feed_parent_id_idx ON departments_blocks_facebook_feed (_parent_id);
CREATE INDEX IF NOT EXISTS departments_blocks_facebook_feed_path_idx ON departments_blocks_facebook_feed (_path);
CREATE INDEX IF NOT EXISTS _pages_v_blocks_facebook_feed_order_idx ON _pages_v_blocks_facebook_feed (_order);
CREATE INDEX IF NOT EXISTS _pages_v_blocks_facebook_feed_parent_id_idx ON _pages_v_blocks_facebook_feed (_parent_id);
CREATE INDEX IF NOT EXISTS _pages_v_blocks_facebook_feed_path_idx ON _pages_v_blocks_facebook_feed (_path);
CREATE INDEX IF NOT EXISTS _departments_v_blocks_facebook_feed_order_idx ON _departments_v_blocks_facebook_feed (_order);
CREATE INDEX IF NOT EXISTS _departments_v_blocks_facebook_feed_parent_id_idx ON _departments_v_blocks_facebook_feed (_parent_id);
CREATE INDEX IF NOT EXISTS _departments_v_blocks_facebook_feed_path_idx ON _departments_v_blocks_facebook_feed (_path);

-- ---- foreign keys to parent layout tables ----
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_facebook_feed_parent_id_fk') THEN
    ALTER TABLE pages_blocks_facebook_feed ADD CONSTRAINT pages_blocks_facebook_feed_parent_id_fk
      FOREIGN KEY (_parent_id) REFERENCES pages(id) ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'departments_blocks_facebook_feed_parent_id_fk') THEN
    ALTER TABLE departments_blocks_facebook_feed ADD CONSTRAINT departments_blocks_facebook_feed_parent_id_fk
      FOREIGN KEY (_parent_id) REFERENCES departments(id) ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_facebook_feed_parent_id_fk') THEN
    ALTER TABLE _pages_v_blocks_facebook_feed ADD CONSTRAINT _pages_v_blocks_facebook_feed_parent_id_fk
      FOREIGN KEY (_parent_id) REFERENCES _pages_v(id) ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_departments_v_blocks_facebook_feed_parent_id_fk') THEN
    ALTER TABLE _departments_v_blocks_facebook_feed ADD CONSTRAINT _departments_v_blocks_facebook_feed_parent_id_fk
      FOREIGN KEY (_parent_id) REFERENCES _departments_v(id) ON DELETE CASCADE;
  END IF;
END $$;
