-- Quick Access cards: time-boxed highlight settings (glow/badge during a window,
-- e.g. admissions or results periods). Added to the published and version tables
-- for both pages and departments.
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'pages_blocks_quick_access_buttons', '_pages_v_blocks_quick_access_buttons',
    'departments_blocks_quick_access_buttons', '_departments_v_blocks_quick_access_buttons'
  ]
  LOOP
    EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS highlight boolean DEFAULT false', t);
    EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS highlight_start timestamp(3) with time zone', t);
    EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS highlight_end timestamp(3) with time zone', t);
    EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS highlight_color varchar DEFAULT ''gold''', t);
    EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS badge_text varchar', t);
  END LOOP;
END $$;
