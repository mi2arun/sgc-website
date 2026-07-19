-- Social Connect block (branded 2-column "Stay Connected" + Facebook feed).
-- Tables for the pages + departments layouts (published + version) with style enums.

DO $$
DECLARE n text;
BEGIN
  FOREACH n IN ARRAY ARRAY[
    'enum_pages_blocks_social_connect_style_bg',
    'enum__pages_v_blocks_social_connect_style_bg',
    'enum_departments_blocks_social_connect_style_bg',
    'enum__departments_v_blocks_social_connect_style_bg'
  ] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = n) THEN
      EXECUTE format('CREATE TYPE %I AS ENUM (''white'',''light'',''dark'',''gradient'',''transparent'')', n);
    END IF;
  END LOOP;
  FOREACH n IN ARRAY ARRAY[
    'enum_pages_blocks_social_connect_style_pad',
    'enum__pages_v_blocks_social_connect_style_pad',
    'enum_departments_blocks_social_connect_style_pad',
    'enum__departments_v_blocks_social_connect_style_pad'
  ] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = n) THEN
      EXECUTE format('CREATE TYPE %I AS ENUM (''none'',''small'',''normal'',''large'')', n);
    END IF;
  END LOOP;
END $$;

CREATE TABLE IF NOT EXISTS pages_blocks_social_connect (
  _order integer NOT NULL,
  _parent_id integer NOT NULL,
  _path text NOT NULL,
  id varchar PRIMARY KEY,
  eyebrow varchar DEFAULT 'Stay Connected',
  heading varchar DEFAULT 'Follow Us on Facebook',
  description varchar DEFAULT 'Campus news, events, results and moments — straight from our official page.',
  page_url varchar DEFAULT 'https://www.facebook.com/sgcpdy',
  cta_label varchar DEFAULT 'Follow on Facebook',
  height numeric DEFAULT 620,
  enabled boolean DEFAULT true,
  style_bg enum_pages_blocks_social_connect_style_bg DEFAULT 'transparent',
  style_pad enum_pages_blocks_social_connect_style_pad DEFAULT 'none',
  style_bt boolean DEFAULT false,
  style_bb boolean DEFAULT false,
  style_fw boolean DEFAULT false,
  block_name varchar
);

CREATE TABLE IF NOT EXISTS departments_blocks_social_connect (
  _order integer NOT NULL,
  _parent_id integer NOT NULL,
  _path text NOT NULL,
  id varchar PRIMARY KEY,
  eyebrow varchar DEFAULT 'Stay Connected',
  heading varchar DEFAULT 'Follow Us on Facebook',
  description varchar DEFAULT 'Campus news, events, results and moments — straight from our official page.',
  page_url varchar DEFAULT 'https://www.facebook.com/sgcpdy',
  cta_label varchar DEFAULT 'Follow on Facebook',
  height numeric DEFAULT 620,
  enabled boolean DEFAULT true,
  style_bg enum_departments_blocks_social_connect_style_bg DEFAULT 'transparent',
  style_pad enum_departments_blocks_social_connect_style_pad DEFAULT 'none',
  style_bt boolean DEFAULT false,
  style_bb boolean DEFAULT false,
  style_fw boolean DEFAULT false,
  block_name varchar
);

CREATE TABLE IF NOT EXISTS _pages_v_blocks_social_connect (
  _order integer NOT NULL,
  _parent_id integer NOT NULL,
  _path text NOT NULL,
  id serial PRIMARY KEY,
  eyebrow varchar DEFAULT 'Stay Connected',
  heading varchar DEFAULT 'Follow Us on Facebook',
  description varchar DEFAULT 'Campus news, events, results and moments — straight from our official page.',
  page_url varchar DEFAULT 'https://www.facebook.com/sgcpdy',
  cta_label varchar DEFAULT 'Follow on Facebook',
  height numeric DEFAULT 620,
  enabled boolean DEFAULT true,
  style_bg enum__pages_v_blocks_social_connect_style_bg DEFAULT 'transparent',
  style_pad enum__pages_v_blocks_social_connect_style_pad DEFAULT 'none',
  style_bt boolean DEFAULT false,
  style_bb boolean DEFAULT false,
  style_fw boolean DEFAULT false,
  _uuid varchar,
  block_name varchar
);

CREATE TABLE IF NOT EXISTS _departments_v_blocks_social_connect (
  _order integer NOT NULL,
  _parent_id integer NOT NULL,
  _path text NOT NULL,
  id serial PRIMARY KEY,
  eyebrow varchar DEFAULT 'Stay Connected',
  heading varchar DEFAULT 'Follow Us on Facebook',
  description varchar DEFAULT 'Campus news, events, results and moments — straight from our official page.',
  page_url varchar DEFAULT 'https://www.facebook.com/sgcpdy',
  cta_label varchar DEFAULT 'Follow on Facebook',
  height numeric DEFAULT 620,
  enabled boolean DEFAULT true,
  style_bg enum__departments_v_blocks_social_connect_style_bg DEFAULT 'transparent',
  style_pad enum__departments_v_blocks_social_connect_style_pad DEFAULT 'none',
  style_bt boolean DEFAULT false,
  style_bb boolean DEFAULT false,
  style_fw boolean DEFAULT false,
  _uuid varchar,
  block_name varchar
);

CREATE INDEX IF NOT EXISTS pages_blocks_social_connect_order_idx ON pages_blocks_social_connect (_order);
CREATE INDEX IF NOT EXISTS pages_blocks_social_connect_parent_id_idx ON pages_blocks_social_connect (_parent_id);
CREATE INDEX IF NOT EXISTS pages_blocks_social_connect_path_idx ON pages_blocks_social_connect (_path);
CREATE INDEX IF NOT EXISTS departments_blocks_social_connect_order_idx ON departments_blocks_social_connect (_order);
CREATE INDEX IF NOT EXISTS departments_blocks_social_connect_parent_id_idx ON departments_blocks_social_connect (_parent_id);
CREATE INDEX IF NOT EXISTS departments_blocks_social_connect_path_idx ON departments_blocks_social_connect (_path);
CREATE INDEX IF NOT EXISTS _pages_v_blocks_social_connect_order_idx ON _pages_v_blocks_social_connect (_order);
CREATE INDEX IF NOT EXISTS _pages_v_blocks_social_connect_parent_id_idx ON _pages_v_blocks_social_connect (_parent_id);
CREATE INDEX IF NOT EXISTS _pages_v_blocks_social_connect_path_idx ON _pages_v_blocks_social_connect (_path);
CREATE INDEX IF NOT EXISTS _departments_v_blocks_social_connect_order_idx ON _departments_v_blocks_social_connect (_order);
CREATE INDEX IF NOT EXISTS _departments_v_blocks_social_connect_parent_id_idx ON _departments_v_blocks_social_connect (_parent_id);
CREATE INDEX IF NOT EXISTS _departments_v_blocks_social_connect_path_idx ON _departments_v_blocks_social_connect (_path);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_social_connect_parent_id_fk') THEN
    ALTER TABLE pages_blocks_social_connect ADD CONSTRAINT pages_blocks_social_connect_parent_id_fk
      FOREIGN KEY (_parent_id) REFERENCES pages(id) ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'departments_blocks_social_connect_parent_id_fk') THEN
    ALTER TABLE departments_blocks_social_connect ADD CONSTRAINT departments_blocks_social_connect_parent_id_fk
      FOREIGN KEY (_parent_id) REFERENCES departments(id) ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_social_connect_parent_id_fk') THEN
    ALTER TABLE _pages_v_blocks_social_connect ADD CONSTRAINT _pages_v_blocks_social_connect_parent_id_fk
      FOREIGN KEY (_parent_id) REFERENCES _pages_v(id) ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_departments_v_blocks_social_connect_parent_id_fk') THEN
    ALTER TABLE _departments_v_blocks_social_connect ADD CONSTRAINT _departments_v_blocks_social_connect_parent_id_fk
      FOREIGN KEY (_parent_id) REFERENCES _departments_v(id) ON DELETE CASCADE;
  END IF;
END $$;
