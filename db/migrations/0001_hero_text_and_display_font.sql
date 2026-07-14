-- Hero block: per-hero text-legibility controls (custom font colour + translucent
-- text panel) and the opt-in serif display-font toggle for the title.
-- Applied to the published and version tables for both pages and departments.
-- Uses ADD COLUMN IF NOT EXISTS so it's a safe no-op where already present
-- (e.g. environments patched by hand before this runner existed).
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'pages_blocks_hero', '_pages_v_blocks_hero',
    'departments_blocks_hero', '_departments_v_blocks_hero'
  ]
  LOOP
    EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS display_font boolean DEFAULT false', t);
    EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS font_color varchar', t);
    EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS text_panel boolean DEFAULT false', t);
    EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS text_panel_color varchar DEFAULT ''#0c1f3d''', t);
    EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS text_panel_opacity numeric DEFAULT 40', t);
  END LOOP;
END $$;
