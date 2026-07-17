-- Adding the Popups collection also requires a relationship column on Payload's
-- shared document-lock table (Payload adds a <collection>_id rel column per
-- collection). 0005 created the popups tables but missed this shared-table
-- change, which broke the /admin dashboard query. Idempotent.
ALTER TABLE payload_locked_documents_rels ADD COLUMN IF NOT EXISTS popups_id integer;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_popups_fk') THEN
    ALTER TABLE payload_locked_documents_rels ADD CONSTRAINT payload_locked_documents_rels_popups_fk
      FOREIGN KEY (popups_id) REFERENCES popups(id) ON DELETE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_popups_id_idx
  ON payload_locked_documents_rels (popups_id);
