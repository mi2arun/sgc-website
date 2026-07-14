-- Departments HOD: free-text group -> relationship to the Faculty collection.
-- Drops the old hod_name / hod_designation / hod_photo_id group columns and adds
-- a hod_id relationship column (FK -> faculty), on the published and version tables.
-- No data is carried over: the old free-text HOD names did not match any faculty
-- record, so HODs are re-selected from the picker in admin.
DO $$
BEGIN
  -- published table
  ALTER TABLE departments ADD COLUMN IF NOT EXISTS hod_id integer;
  ALTER TABLE departments DROP COLUMN IF EXISTS hod_name;
  ALTER TABLE departments DROP COLUMN IF EXISTS hod_designation;
  ALTER TABLE departments DROP COLUMN IF EXISTS hod_photo_id;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'departments_hod_id_faculty_id_fk') THEN
    ALTER TABLE departments ADD CONSTRAINT departments_hod_id_faculty_id_fk
      FOREIGN KEY (hod_id) REFERENCES faculty(id) ON DELETE SET NULL;
  END IF;
  CREATE INDEX IF NOT EXISTS departments_hod_idx ON departments (hod_id);

  -- version / drafts table
  ALTER TABLE _departments_v ADD COLUMN IF NOT EXISTS version_hod_id integer;
  ALTER TABLE _departments_v DROP COLUMN IF EXISTS version_hod_name;
  ALTER TABLE _departments_v DROP COLUMN IF EXISTS version_hod_designation;
  ALTER TABLE _departments_v DROP COLUMN IF EXISTS version_hod_photo_id;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_departments_v_version_hod_id_faculty_id_fk') THEN
    ALTER TABLE _departments_v ADD CONSTRAINT _departments_v_version_hod_id_faculty_id_fk
      FOREIGN KEY (version_hod_id) REFERENCES faculty(id) ON DELETE SET NULL;
  END IF;
  CREATE INDEX IF NOT EXISTS _departments_v_version_hod_idx ON _departments_v (version_hod_id);
END $$;
