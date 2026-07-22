-- Media focal point: enable Payload's draggable focal-point picker on the media
-- collection. Adds focal_x / focal_y (0–100 percentages) to the `media` table.
-- The hero applies these as CSS object-position so the editor-chosen area of a
-- banner image stays in frame at every screen size. Mirrors Payload push output.

ALTER TABLE media ADD COLUMN IF NOT EXISTS focal_x numeric;
ALTER TABLE media ADD COLUMN IF NOT EXISTS focal_y numeric;
