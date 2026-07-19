-- YouTube block: add "Latest from channel" source mode (source enum + channel_id
-- + max_videos) to the youtube main tables (pages + departments, published + version).
DO $$
DECLARE n text;
BEGIN
  FOREACH n IN ARRAY ARRAY[
    'enum_pages_blocks_youtube_source','enum__pages_v_blocks_youtube_source',
    'enum_departments_blocks_youtube_source','enum__departments_v_blocks_youtube_source'
  ] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname=n) THEN
      EXECUTE format('CREATE TYPE %I AS ENUM (''manual'',''channel'')', n);
    END IF;
  END LOOP;
END $$;

ALTER TABLE pages_blocks_youtube ADD COLUMN IF NOT EXISTS source enum_pages_blocks_youtube_source DEFAULT 'manual';
ALTER TABLE pages_blocks_youtube ADD COLUMN IF NOT EXISTS channel_id varchar DEFAULT 'UCNQjPAdAN_dpx2jYl7p3KOA';
ALTER TABLE pages_blocks_youtube ADD COLUMN IF NOT EXISTS max_videos numeric DEFAULT 6;

ALTER TABLE departments_blocks_youtube ADD COLUMN IF NOT EXISTS source enum_departments_blocks_youtube_source DEFAULT 'manual';
ALTER TABLE departments_blocks_youtube ADD COLUMN IF NOT EXISTS channel_id varchar DEFAULT 'UCNQjPAdAN_dpx2jYl7p3KOA';
ALTER TABLE departments_blocks_youtube ADD COLUMN IF NOT EXISTS max_videos numeric DEFAULT 6;

ALTER TABLE _pages_v_blocks_youtube ADD COLUMN IF NOT EXISTS source enum__pages_v_blocks_youtube_source DEFAULT 'manual';
ALTER TABLE _pages_v_blocks_youtube ADD COLUMN IF NOT EXISTS channel_id varchar DEFAULT 'UCNQjPAdAN_dpx2jYl7p3KOA';
ALTER TABLE _pages_v_blocks_youtube ADD COLUMN IF NOT EXISTS max_videos numeric DEFAULT 6;

ALTER TABLE _departments_v_blocks_youtube ADD COLUMN IF NOT EXISTS source enum__departments_v_blocks_youtube_source DEFAULT 'manual';
ALTER TABLE _departments_v_blocks_youtube ADD COLUMN IF NOT EXISTS channel_id varchar DEFAULT 'UCNQjPAdAN_dpx2jYl7p3KOA';
ALTER TABLE _departments_v_blocks_youtube ADD COLUMN IF NOT EXISTS max_videos numeric DEFAULT 6;
