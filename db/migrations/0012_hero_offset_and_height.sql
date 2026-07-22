-- Hero: per-slide image offset (object-position) + a pixel banner-height override.
--   * image_pos_x / image_pos_y (0–100 %) on each hero `slides` array table
--   * height_px on each hero block table (overrides the height preset; used to
--     extend the banner taller)
-- The hero block lives in both the pages and departments layouts, each with a
-- published table and a versioned (_..._v) table. Mirrors Payload push output.

DO $$
DECLARE t text;
BEGIN
  -- height_px on the hero block tables
  FOREACH t IN ARRAY ARRAY[
    'pages_blocks_hero','_pages_v_blocks_hero',
    'departments_blocks_hero','_departments_v_blocks_hero'
  ] LOOP
    IF to_regclass(t) IS NOT NULL THEN
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS height_px numeric', t);
    END IF;
  END LOOP;

  -- image_pos_x / image_pos_y on the hero slides array tables
  FOREACH t IN ARRAY ARRAY[
    'pages_blocks_hero_slides','_pages_v_blocks_hero_slides',
    'departments_blocks_hero_slides','_departments_v_blocks_hero_slides'
  ] LOOP
    IF to_regclass(t) IS NOT NULL THEN
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS image_pos_x numeric', t);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS image_pos_y numeric', t);
    END IF;
  END LOOP;
END $$;
