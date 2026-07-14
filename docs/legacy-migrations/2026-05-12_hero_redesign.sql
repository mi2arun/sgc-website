BEGIN;
-- Schema migration: bring Neon up to local (additive only)

-- ============ New enum types ============
CREATE TYPE public.enum__departments_v_blocks_hero_alignment AS ENUM ('left', 'center', 'right');
CREATE TYPE public.enum__departments_v_blocks_hero_height AS ENUM ('compact', 'medium', 'large', 'tall', 'fullscreen', 'custom');
CREATE TYPE public.enum__departments_v_blocks_hero_overlay_color AS ENUM ('navy', 'black', 'gradient', 'none');
CREATE TYPE public.enum__departments_v_blocks_hero_variant AS ENUM ('marketing', 'split', 'minimal', 'video');
CREATE TYPE public.enum__pages_v_blocks_hero_alignment AS ENUM ('left', 'center', 'right');
CREATE TYPE public.enum__pages_v_blocks_hero_height AS ENUM ('compact', 'medium', 'large', 'tall', 'fullscreen', 'custom');
CREATE TYPE public.enum__pages_v_blocks_hero_overlay_color AS ENUM ('navy', 'black', 'gradient', 'none');
CREATE TYPE public.enum__pages_v_blocks_hero_variant AS ENUM ('marketing', 'split', 'minimal', 'video');
CREATE TYPE public.enum_departments_blocks_hero_alignment AS ENUM ('left', 'center', 'right');
CREATE TYPE public.enum_departments_blocks_hero_height AS ENUM ('compact', 'medium', 'large', 'tall', 'fullscreen', 'custom');
CREATE TYPE public.enum_departments_blocks_hero_overlay_color AS ENUM ('navy', 'black', 'gradient', 'none');
CREATE TYPE public.enum_departments_blocks_hero_variant AS ENUM ('marketing', 'split', 'minimal', 'video');
CREATE TYPE public.enum_pages_blocks_hero_alignment AS ENUM ('left', 'center', 'right');
CREATE TYPE public.enum_pages_blocks_hero_height AS ENUM ('compact', 'medium', 'large', 'tall', 'fullscreen', 'custom');
CREATE TYPE public.enum_pages_blocks_hero_overlay_color AS ENUM ('navy', 'black', 'gradient', 'none');
CREATE TYPE public.enum_pages_blocks_hero_variant AS ENUM ('marketing', 'split', 'minimal', 'video');

-- ============ New tables ============
\restrict sdxhfmO3AWBEtt0B4FobBHd13GqpZsCWMeUKBeZy5AtKGfzFH8Fa4CHrzOJ6k0e
CREATE TABLE public._departments_v_blocks_hero_badges (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    label character varying,
    _uuid character varying
);
CREATE SEQUENCE public._departments_v_blocks_hero_badges_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._departments_v_blocks_hero_badges_id_seq OWNED BY public._departments_v_blocks_hero_badges.id;
ALTER TABLE ONLY public._departments_v_blocks_hero_badges ALTER COLUMN id SET DEFAULT nextval('public._departments_v_blocks_hero_badges_id_seq'::regclass);
ALTER TABLE ONLY public._departments_v_blocks_hero_badges
    ADD CONSTRAINT _departments_v_blocks_hero_badges_pkey PRIMARY KEY (id);
CREATE INDEX _departments_v_blocks_hero_badges_order_idx ON public._departments_v_blocks_hero_badges USING btree (_order);
CREATE INDEX _departments_v_blocks_hero_badges_parent_id_idx ON public._departments_v_blocks_hero_badges USING btree (_parent_id);
ALTER TABLE ONLY public._departments_v_blocks_hero_badges
    ADD CONSTRAINT _departments_v_blocks_hero_badges_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._departments_v_blocks_hero(id) ON DELETE CASCADE;
\unrestrict sdxhfmO3AWBEtt0B4FobBHd13GqpZsCWMeUKBeZy5AtKGfzFH8Fa4CHrzOJ6k0e
\restrict vkdZQuxHStBNq8In2AY2BgA1AYSKN72oRFr6kTaXK7iH1g50QufIYm8ogY6KgJK
CREATE TABLE public._pages_v_blocks_hero_badges (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    label character varying,
    _uuid character varying
);
CREATE SEQUENCE public._pages_v_blocks_hero_badges_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_hero_badges_id_seq OWNED BY public._pages_v_blocks_hero_badges.id;
ALTER TABLE ONLY public._pages_v_blocks_hero_badges ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_hero_badges_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_hero_badges
    ADD CONSTRAINT _pages_v_blocks_hero_badges_pkey PRIMARY KEY (id);
CREATE INDEX _pages_v_blocks_hero_badges_order_idx ON public._pages_v_blocks_hero_badges USING btree (_order);
CREATE INDEX _pages_v_blocks_hero_badges_parent_id_idx ON public._pages_v_blocks_hero_badges USING btree (_parent_id);
ALTER TABLE ONLY public._pages_v_blocks_hero_badges
    ADD CONSTRAINT _pages_v_blocks_hero_badges_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_hero(id) ON DELETE CASCADE;
\unrestrict vkdZQuxHStBNq8In2AY2BgA1AYSKN72oRFr6kTaXK7iH1g50QufIYm8ogY6KgJK
\restrict Om1Z80OslWIjJ6dzEL1U1eZJHsTi2UZdARiTayTBFSHFqpafpAwAsIDWWw0toh0
CREATE TABLE public.departments_blocks_hero_badges (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    label character varying
);
ALTER TABLE ONLY public.departments_blocks_hero_badges
    ADD CONSTRAINT departments_blocks_hero_badges_pkey PRIMARY KEY (id);
CREATE INDEX departments_blocks_hero_badges_order_idx ON public.departments_blocks_hero_badges USING btree (_order);
CREATE INDEX departments_blocks_hero_badges_parent_id_idx ON public.departments_blocks_hero_badges USING btree (_parent_id);
ALTER TABLE ONLY public.departments_blocks_hero_badges
    ADD CONSTRAINT departments_blocks_hero_badges_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.departments_blocks_hero(id) ON DELETE CASCADE;
\unrestrict Om1Z80OslWIjJ6dzEL1U1eZJHsTi2UZdARiTayTBFSHFqpafpAwAsIDWWw0toh0
\restrict HYs9ABbvhbNeRJbbXX6cP5lIZVfGsdJN2S8TEi932H6fwSEsNBdg5BYXYhLBIOa
CREATE TABLE public.pages_blocks_hero_badges (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    label character varying
);
ALTER TABLE ONLY public.pages_blocks_hero_badges
    ADD CONSTRAINT pages_blocks_hero_badges_pkey PRIMARY KEY (id);
CREATE INDEX pages_blocks_hero_badges_order_idx ON public.pages_blocks_hero_badges USING btree (_order);
CREATE INDEX pages_blocks_hero_badges_parent_id_idx ON public.pages_blocks_hero_badges USING btree (_parent_id);
ALTER TABLE ONLY public.pages_blocks_hero_badges
    ADD CONSTRAINT pages_blocks_hero_badges_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_hero(id) ON DELETE CASCADE;
\unrestrict HYs9ABbvhbNeRJbbXX6cP5lIZVfGsdJN2S8TEi932H6fwSEsNBdg5BYXYhLBIOa

-- ============ Column additions ============
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "variant" public.enum__departments_v_blocks_hero_variant DEFAULT 'marketing'::enum__departments_v_blocks_hero_variant;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "eyebrow" character varying;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "title" character varying;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "title_accent" character varying;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "subtitle" character varying;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "trust_line" character varying;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "show_logo" boolean DEFAULT true;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "logo_override_id" integer;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "video_url" character varying;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "height" public.enum__departments_v_blocks_hero_height DEFAULT 'large'::enum__departments_v_blocks_hero_height;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "custom_height" numeric DEFAULT 75;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "alignment" public.enum__departments_v_blocks_hero_alignment DEFAULT 'left'::enum__departments_v_blocks_hero_alignment;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "show_badges" boolean DEFAULT true;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "show_arrows" boolean DEFAULT true;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "show_indicators" boolean DEFAULT true;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "show_scroll_indicator" boolean DEFAULT false;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "overlay_opacity" numeric DEFAULT 78;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "overlay_color" public.enum__departments_v_blocks_hero_overlay_color DEFAULT 'navy'::enum__departments_v_blocks_hero_overlay_color;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "show_decorative_rings" boolean DEFAULT true;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "show_dot_pattern" boolean DEFAULT true;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "autoplay" boolean DEFAULT true;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "autoplay_speed" numeric DEFAULT 6000;
ALTER TABLE public."_departments_v_blocks_hero" ADD COLUMN IF NOT EXISTS "pause_on_hover" boolean DEFAULT true;
ALTER TABLE public."_departments_v_blocks_hero_slides" ADD COLUMN IF NOT EXISTS "mobile_image_id" integer;
ALTER TABLE public."_departments_v_blocks_hero_slides" ADD COLUMN IF NOT EXISTS "title" character varying;
ALTER TABLE public."_departments_v_blocks_hero_slides" ADD COLUMN IF NOT EXISTS "subtitle" character varying;
ALTER TABLE public."_departments_v_blocks_hero_slides" ADD COLUMN IF NOT EXISTS "secondary_cta_label" character varying;
ALTER TABLE public."_departments_v_blocks_hero_slides" ADD COLUMN IF NOT EXISTS "secondary_cta_link" character varying;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "variant" public.enum__pages_v_blocks_hero_variant DEFAULT 'marketing'::enum__pages_v_blocks_hero_variant;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "eyebrow" character varying;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "title" character varying;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "title_accent" character varying;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "subtitle" character varying;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "trust_line" character varying;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "show_logo" boolean DEFAULT true;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "logo_override_id" integer;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "video_url" character varying;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "height" public.enum__pages_v_blocks_hero_height DEFAULT 'large'::enum__pages_v_blocks_hero_height;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "custom_height" numeric DEFAULT 75;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "alignment" public.enum__pages_v_blocks_hero_alignment DEFAULT 'left'::enum__pages_v_blocks_hero_alignment;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "show_badges" boolean DEFAULT true;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "show_arrows" boolean DEFAULT true;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "show_indicators" boolean DEFAULT true;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "show_scroll_indicator" boolean DEFAULT false;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "overlay_opacity" numeric DEFAULT 78;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "overlay_color" public.enum__pages_v_blocks_hero_overlay_color DEFAULT 'navy'::enum__pages_v_blocks_hero_overlay_color;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "show_decorative_rings" boolean DEFAULT true;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "show_dot_pattern" boolean DEFAULT true;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "autoplay" boolean DEFAULT true;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "autoplay_speed" numeric DEFAULT 6000;
ALTER TABLE public."_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "pause_on_hover" boolean DEFAULT true;
ALTER TABLE public."_pages_v_blocks_hero_slides" ADD COLUMN IF NOT EXISTS "mobile_image_id" integer;
ALTER TABLE public."_pages_v_blocks_hero_slides" ADD COLUMN IF NOT EXISTS "title" character varying;
ALTER TABLE public."_pages_v_blocks_hero_slides" ADD COLUMN IF NOT EXISTS "subtitle" character varying;
ALTER TABLE public."_pages_v_blocks_hero_slides" ADD COLUMN IF NOT EXISTS "secondary_cta_label" character varying;
ALTER TABLE public."_pages_v_blocks_hero_slides" ADD COLUMN IF NOT EXISTS "secondary_cta_link" character varying;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "variant" public.enum_departments_blocks_hero_variant DEFAULT 'marketing'::enum_departments_blocks_hero_variant;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "eyebrow" character varying;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "title" character varying;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "title_accent" character varying;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "subtitle" character varying;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "trust_line" character varying;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "show_logo" boolean DEFAULT true;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "logo_override_id" integer;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "video_url" character varying;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "height" public.enum_departments_blocks_hero_height DEFAULT 'large'::enum_departments_blocks_hero_height;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "custom_height" numeric DEFAULT 75;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "alignment" public.enum_departments_blocks_hero_alignment DEFAULT 'left'::enum_departments_blocks_hero_alignment;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "show_badges" boolean DEFAULT true;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "show_arrows" boolean DEFAULT true;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "show_indicators" boolean DEFAULT true;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "show_scroll_indicator" boolean DEFAULT false;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "overlay_opacity" numeric DEFAULT 78;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "overlay_color" public.enum_departments_blocks_hero_overlay_color DEFAULT 'navy'::enum_departments_blocks_hero_overlay_color;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "show_decorative_rings" boolean DEFAULT true;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "show_dot_pattern" boolean DEFAULT true;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "autoplay" boolean DEFAULT true;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "autoplay_speed" numeric DEFAULT 6000;
ALTER TABLE public."departments_blocks_hero" ADD COLUMN IF NOT EXISTS "pause_on_hover" boolean DEFAULT true;
ALTER TABLE public."departments_blocks_hero_slides" ADD COLUMN IF NOT EXISTS "mobile_image_id" integer;
ALTER TABLE public."departments_blocks_hero_slides" ADD COLUMN IF NOT EXISTS "title" character varying;
ALTER TABLE public."departments_blocks_hero_slides" ADD COLUMN IF NOT EXISTS "subtitle" character varying;
ALTER TABLE public."departments_blocks_hero_slides" ADD COLUMN IF NOT EXISTS "secondary_cta_label" character varying;
ALTER TABLE public."departments_blocks_hero_slides" ADD COLUMN IF NOT EXISTS "secondary_cta_link" character varying;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "variant" public.enum_pages_blocks_hero_variant DEFAULT 'marketing'::enum_pages_blocks_hero_variant;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "eyebrow" character varying;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "title" character varying;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "title_accent" character varying;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "subtitle" character varying;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "trust_line" character varying;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "show_logo" boolean DEFAULT true;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "logo_override_id" integer;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "video_url" character varying;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "height" public.enum_pages_blocks_hero_height DEFAULT 'large'::enum_pages_blocks_hero_height;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "custom_height" numeric DEFAULT 75;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "alignment" public.enum_pages_blocks_hero_alignment DEFAULT 'left'::enum_pages_blocks_hero_alignment;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "show_badges" boolean DEFAULT true;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "show_arrows" boolean DEFAULT true;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "show_indicators" boolean DEFAULT true;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "show_scroll_indicator" boolean DEFAULT false;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "overlay_opacity" numeric DEFAULT 78;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "overlay_color" public.enum_pages_blocks_hero_overlay_color DEFAULT 'navy'::enum_pages_blocks_hero_overlay_color;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "show_decorative_rings" boolean DEFAULT true;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "show_dot_pattern" boolean DEFAULT true;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "autoplay" boolean DEFAULT true;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "autoplay_speed" numeric DEFAULT 6000;
ALTER TABLE public."pages_blocks_hero" ADD COLUMN IF NOT EXISTS "pause_on_hover" boolean DEFAULT true;
ALTER TABLE public."pages_blocks_hero_slides" ADD COLUMN IF NOT EXISTS "mobile_image_id" integer;
ALTER TABLE public."pages_blocks_hero_slides" ADD COLUMN IF NOT EXISTS "title" character varying;
ALTER TABLE public."pages_blocks_hero_slides" ADD COLUMN IF NOT EXISTS "subtitle" character varying;
ALTER TABLE public."pages_blocks_hero_slides" ADD COLUMN IF NOT EXISTS "secondary_cta_label" character varying;
ALTER TABLE public."pages_blocks_hero_slides" ADD COLUMN IF NOT EXISTS "secondary_cta_link" character varying;

COMMIT;
