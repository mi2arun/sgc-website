-- Quick Access highlight: animation style per card ('glow' pulsing halo, or
-- 'gradient' moving gradient border). Added to the published and version tables.
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'pages_blocks_quick_access_buttons', '_pages_v_blocks_quick_access_buttons',
    'departments_blocks_quick_access_buttons', '_departments_v_blocks_quick_access_buttons'
  ]
  LOOP
    EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS highlight_style varchar DEFAULT ''glow''', t);
  END LOOP;
END $$;
