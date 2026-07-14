BEGIN;
-- Shift existing blocks on pages 2, 5, 6, 7 by +1 so hero can take _order=1.
-- Page 1 keeps its existing layout (hero stays at _order=2).
UPDATE pages_blocks_about SET _order = _order + 1 WHERE _parent_id IN (2,5,6,7);
UPDATE pages_blocks_accreditation SET _order = _order + 1 WHERE _parent_id IN (2,5,6,7);
UPDATE pages_blocks_activity_feed SET _order = _order + 1 WHERE _parent_id IN (2,5,6,7);
UPDATE pages_blocks_announcements SET _order = _order + 1 WHERE _parent_id IN (2,5,6,7);
UPDATE pages_blocks_cta SET _order = _order + 1 WHERE _parent_id IN (2,5,6,7);
UPDATE pages_blocks_events_circulars SET _order = _order + 1 WHERE _parent_id IN (2,5,6,7);
UPDATE pages_blocks_faculty_grid SET _order = _order + 1 WHERE _parent_id IN (2,5,6,7);
UPDATE pages_blocks_gallery_preview SET _order = _order + 1 WHERE _parent_id IN (2,5,6,7);
UPDATE pages_blocks_placements SET _order = _order + 1 WHERE _parent_id IN (2,5,6,7);
UPDATE pages_blocks_programmes SET _order = _order + 1 WHERE _parent_id IN (2,5,6,7);
UPDATE pages_blocks_promo_banner SET _order = _order + 1 WHERE _parent_id IN (2,5,6,7);
UPDATE pages_blocks_quick_access SET _order = _order + 1 WHERE _parent_id IN (2,5,6,7);
UPDATE pages_blocks_recruiter_logos SET _order = _order + 1 WHERE _parent_id IN (2,5,6,7);
UPDATE pages_blocks_rich_text SET _order = _order + 1 WHERE _parent_id IN (2,5,6,7);
UPDATE pages_blocks_scholarship SET _order = _order + 1 WHERE _parent_id IN (2,5,6,7);
UPDATE pages_blocks_single_image SET _order = _order + 1 WHERE _parent_id IN (2,5,6,7);
UPDATE pages_blocks_testimonials SET _order = _order + 1 WHERE _parent_id IN (2,5,6,7);
UPDATE pages_blocks_two_column SET _order = _order + 1 WHERE _parent_id IN (2,5,6,7);
UPDATE pages_blocks_why_join SET _order = _order + 1 WHERE _parent_id IN (2,5,6,7);
-- Push hero content for pages 1, 2, 5, 6, 7 from local to Neon

-- Clear existing hero blocks on these pages
DELETE FROM pages_blocks_hero_slides WHERE _parent_id IN (
  SELECT id FROM pages_blocks_hero WHERE _parent_id IN (1,2,5,6,7)
);
DELETE FROM pages_blocks_hero WHERE _parent_id IN (1,2,5,6,7);

-- Insert new hero blocks (5 rows)
INSERT INTO pages_blocks_hero ("_order", "_parent_id", "_path", "id", "style_bg", "style_pad", "style_bt", "style_bb", "style_fw", "block_name", "enabled", "variant", "eyebrow", "title", "title_accent", "subtitle", "trust_line", "show_logo", "logo_override_id", "video_url", "height", "custom_height", "alignment", "show_badges", "show_arrows", "show_indicators", "show_scroll_indicator", "overlay_opacity", "overlay_color", "show_decorative_rings", "show_dot_pattern", "autoplay", "autoplay_speed", "pause_on_hover") VALUES (2, 1, 'layout', '69dd3235e26a9dcb04d6200e', 'transparent', 'none', FALSE, FALSE, FALSE, NULL, TRUE, 'marketing', 'Admissions Open for 2026-27', 'Saradha Gangadharan', 'College', '', 'An Institution of Sri Saradha Gangadharan Educational Trust', TRUE, NULL, NULL, 'large', 75, 'left', TRUE, TRUE, TRUE, TRUE, 78, 'navy', TRUE, TRUE, TRUE, 7000, TRUE);
INSERT INTO pages_blocks_hero ("_order", "_parent_id", "_path", "id", "style_bg", "style_pad", "style_bt", "style_bb", "style_fw", "block_name", "enabled", "variant", "eyebrow", "title", "title_accent", "subtitle", "trust_line", "show_logo", "logo_override_id", "video_url", "height", "custom_height", "alignment", "show_badges", "show_arrows", "show_indicators", "show_scroll_indicator", "overlay_opacity", "overlay_color", "show_decorative_rings", "show_dot_pattern", "autoplay", "autoplay_speed", "pause_on_hover") VALUES (1, 2, 'layout', '6a02e694ba76a9bd09014c58', 'transparent', 'none', FALSE, FALSE, FALSE, NULL, TRUE, 'marketing', 'Since 2010', 'A College with a Mission', '', 'Excellence in higher education, rooted in tradition, reaching for tomorrow.', '', FALSE, NULL, NULL, 'tall', 75, 'center', FALSE, FALSE, FALSE, FALSE, 65, 'gradient', FALSE, TRUE, FALSE, 6000, TRUE);
INSERT INTO pages_blocks_hero ("_order", "_parent_id", "_path", "id", "style_bg", "style_pad", "style_bt", "style_bb", "style_fw", "block_name", "enabled", "variant", "eyebrow", "title", "title_accent", "subtitle", "trust_line", "show_logo", "logo_override_id", "video_url", "height", "custom_height", "alignment", "show_badges", "show_arrows", "show_indicators", "show_scroll_indicator", "overlay_opacity", "overlay_color", "show_decorative_rings", "show_dot_pattern", "autoplay", "autoplay_speed", "pause_on_hover") VALUES (1, 5, 'layout', '6a02e694ba76a9bd09014c5e', 'transparent', 'none', FALSE, FALSE, FALSE, NULL, TRUE, 'marketing', 'Admissions 2026-27', 'Your Next Step', 'Starts Here', '9 UG programmes. 4 PG programmes. Applications close 30 June 2026.', '', FALSE, NULL, NULL, 'medium', 75, 'center', TRUE, FALSE, FALSE, FALSE, 72, 'navy', TRUE, TRUE, FALSE, 6000, TRUE);
INSERT INTO pages_blocks_hero ("_order", "_parent_id", "_path", "id", "style_bg", "style_pad", "style_bt", "style_bb", "style_fw", "block_name", "enabled", "variant", "eyebrow", "title", "title_accent", "subtitle", "trust_line", "show_logo", "logo_override_id", "video_url", "height", "custom_height", "alignment", "show_badges", "show_arrows", "show_indicators", "show_scroll_indicator", "overlay_opacity", "overlay_color", "show_decorative_rings", "show_dot_pattern", "autoplay", "autoplay_speed", "pause_on_hover") VALUES (1, 6, 'layout', '6a02e694ba76a9bd09014c66', 'transparent', 'none', FALSE, FALSE, FALSE, NULL, TRUE, 'marketing', 'Class of 2025', 'Where Our Students', 'Land', '1,000+ placements across IT, finance, banking, and consulting.', '', FALSE, NULL, NULL, 'medium', 75, 'left', TRUE, FALSE, FALSE, FALSE, 70, 'gradient', TRUE, FALSE, FALSE, 6000, TRUE);
INSERT INTO pages_blocks_hero ("_order", "_parent_id", "_path", "id", "style_bg", "style_pad", "style_bt", "style_bb", "style_fw", "block_name", "enabled", "variant", "eyebrow", "title", "title_accent", "subtitle", "trust_line", "show_logo", "logo_override_id", "video_url", "height", "custom_height", "alignment", "show_badges", "show_arrows", "show_indicators", "show_scroll_indicator", "overlay_opacity", "overlay_color", "show_decorative_rings", "show_dot_pattern", "autoplay", "autoplay_speed", "pause_on_hover") VALUES (1, 7, 'layout', '6a02e694ba76a9bd09014c68', 'transparent', 'none', FALSE, FALSE, FALSE, NULL, TRUE, 'minimal', 'Centre for Research', 'Ideas That Move', 'Knowledge Forward', 'Faculty-led research, student innovation, and partnerships across disciplines.', '', FALSE, NULL, NULL, 'compact', 75, 'left', FALSE, FALSE, FALSE, FALSE, 60, 'gradient', FALSE, FALSE, FALSE, 6000, TRUE);

-- Insert hero slides (6 rows)
INSERT INTO pages_blocks_hero_slides ("_order", "_parent_id", "id", "image_id", "cta_label", "cta_link", "mobile_image_id", "title", "subtitle", "secondary_cta_label", "secondary_cta_link") VALUES (1, '69dd3235e26a9dcb04d6200e', '6a02e693ba76a9bd09014c55', 1, 'Apply Now', '/admissions/apply', NULL, 'Saradha Gangadharan', 'Where ambition meets opportunity. 13 programmes. 79 faculty. 5,000+ alumni.', 'Discover SGC', '/about');
INSERT INTO pages_blocks_hero_slides ("_order", "_parent_id", "id", "image_id", "cta_label", "cta_link", "mobile_image_id", "title", "subtitle", "secondary_cta_label", "secondary_cta_link") VALUES (2, '69dd3235e26a9dcb04d6200e', '6a02e693ba76a9bd09014c56', 2, 'Take a Virtual Tour', '/campus-life', NULL, 'A Campus Built for Learning', 'Modern infrastructure. Open spaces. Curiosity-driven culture.', 'Departments', '/dept');
INSERT INTO pages_blocks_hero_slides ("_order", "_parent_id", "id", "image_id", "cta_label", "cta_link", "mobile_image_id", "title", "subtitle", "secondary_cta_label", "secondary_cta_link") VALUES (1, '6a02e694ba76a9bd09014c58', '6a02e694ba76a9bd09014c57', 2, 'Our Vision & Mission', '/about/vision-mission', NULL, NULL, NULL, 'Administration', '/about/administration');
INSERT INTO pages_blocks_hero_slides ("_order", "_parent_id", "id", "image_id", "cta_label", "cta_link", "mobile_image_id", "title", "subtitle", "secondary_cta_label", "secondary_cta_link") VALUES (1, '6a02e694ba76a9bd09014c5e', '6a02e694ba76a9bd09014c5d', 1, 'Apply Online', '/admissions/apply', NULL, NULL, NULL, 'Download Prospectus', '/admissions/prospectus');
INSERT INTO pages_blocks_hero_slides ("_order", "_parent_id", "id", "image_id", "cta_label", "cta_link", "mobile_image_id", "title", "subtitle", "secondary_cta_label", "secondary_cta_link") VALUES (1, '6a02e694ba76a9bd09014c66', '6a02e694ba76a9bd09014c65', 8, 'For Students', '/placements/students', NULL, NULL, NULL, 'For Recruiters', '/placements/recruiters');
INSERT INTO pages_blocks_hero_slides ("_order", "_parent_id", "id", "image_id", "cta_label", "cta_link", "mobile_image_id", "title", "subtitle", "secondary_cta_label", "secondary_cta_link") VALUES (1, '6a02e694ba76a9bd09014c68', '6a02e694ba76a9bd09014c67', 12, 'Research Fund', '/research/fund', NULL, NULL, NULL, 'Incentive Scheme', '/research/incentive-scheme');

COMMIT;
