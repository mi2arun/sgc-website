BEGIN;
-- Schema migration: bring Neon up to local (additive only)

-- ============ New enum types ============
CREATE TYPE public.enum__departments_v_blocks_programmes_type_filter AS ENUM ('all', 'UG', 'PG', 'Add-on');
CREATE TYPE public.enum__departments_v_blocks_rich_text_align AS ENUM ('left', 'center', 'right');
CREATE TYPE public.enum__departments_v_blocks_rich_text_width AS ENUM ('narrow', 'wide', 'full');
CREATE TYPE public.enum__departments_v_blocks_single_image_aspect AS ENUM ('natural', 'landscape', 'wide', 'hero', 'square');
CREATE TYPE public.enum__departments_v_blocks_single_image_style_bg AS ENUM ('white', 'light', 'dark', 'gradient', 'transparent');
CREATE TYPE public.enum__departments_v_blocks_single_image_style_pad AS ENUM ('none', 'small', 'normal', 'large');
CREATE TYPE public.enum__departments_v_blocks_single_image_width AS ENUM ('narrow', 'container', 'full');
CREATE TYPE public.enum__departments_v_blocks_two_column_gap AS ENUM ('tight', 'normal', 'wide');
CREATE TYPE public.enum__departments_v_blocks_two_column_ratio AS ENUM ('50-50', '60-40', '40-60', '70-30', '30-70');
CREATE TYPE public.enum__departments_v_blocks_two_column_style_bg AS ENUM ('white', 'light', 'dark', 'gradient', 'transparent');
CREATE TYPE public.enum__departments_v_blocks_two_column_style_pad AS ENUM ('none', 'small', 'normal', 'large');
CREATE TYPE public.enum__departments_v_blocks_two_column_valign AS ENUM ('top', 'center', 'bottom');
CREATE TYPE public.enum__pages_v_blocks_programmes_type_filter AS ENUM ('all', 'UG', 'PG', 'Add-on');
CREATE TYPE public.enum__pages_v_blocks_rich_text_align AS ENUM ('left', 'center', 'right');
CREATE TYPE public.enum__pages_v_blocks_rich_text_width AS ENUM ('narrow', 'wide', 'full');
CREATE TYPE public.enum__pages_v_blocks_single_image_aspect AS ENUM ('natural', 'landscape', 'wide', 'hero', 'square');
CREATE TYPE public.enum__pages_v_blocks_single_image_style_bg AS ENUM ('white', 'light', 'dark', 'gradient', 'transparent');
CREATE TYPE public.enum__pages_v_blocks_single_image_style_pad AS ENUM ('none', 'small', 'normal', 'large');
CREATE TYPE public.enum__pages_v_blocks_single_image_width AS ENUM ('narrow', 'container', 'full');
CREATE TYPE public.enum__pages_v_blocks_two_column_gap AS ENUM ('tight', 'normal', 'wide');
CREATE TYPE public.enum__pages_v_blocks_two_column_ratio AS ENUM ('50-50', '60-40', '40-60', '70-30', '30-70');
CREATE TYPE public.enum__pages_v_blocks_two_column_style_bg AS ENUM ('white', 'light', 'dark', 'gradient', 'transparent');
CREATE TYPE public.enum__pages_v_blocks_two_column_style_pad AS ENUM ('none', 'small', 'normal', 'large');
CREATE TYPE public.enum__pages_v_blocks_two_column_valign AS ENUM ('top', 'center', 'bottom');
CREATE TYPE public.enum_departments_blocks_programmes_type_filter AS ENUM ('all', 'UG', 'PG', 'Add-on');
CREATE TYPE public.enum_departments_blocks_rich_text_align AS ENUM ('left', 'center', 'right');
CREATE TYPE public.enum_departments_blocks_rich_text_width AS ENUM ('narrow', 'wide', 'full');
CREATE TYPE public.enum_departments_blocks_single_image_aspect AS ENUM ('natural', 'landscape', 'wide', 'hero', 'square');
CREATE TYPE public.enum_departments_blocks_single_image_style_bg AS ENUM ('white', 'light', 'dark', 'gradient', 'transparent');
CREATE TYPE public.enum_departments_blocks_single_image_style_pad AS ENUM ('none', 'small', 'normal', 'large');
CREATE TYPE public.enum_departments_blocks_single_image_width AS ENUM ('narrow', 'container', 'full');
CREATE TYPE public.enum_departments_blocks_two_column_gap AS ENUM ('tight', 'normal', 'wide');
CREATE TYPE public.enum_departments_blocks_two_column_ratio AS ENUM ('50-50', '60-40', '40-60', '70-30', '30-70');
CREATE TYPE public.enum_departments_blocks_two_column_style_bg AS ENUM ('white', 'light', 'dark', 'gradient', 'transparent');
CREATE TYPE public.enum_departments_blocks_two_column_style_pad AS ENUM ('none', 'small', 'normal', 'large');
CREATE TYPE public.enum_departments_blocks_two_column_valign AS ENUM ('top', 'center', 'bottom');
CREATE TYPE public.enum_media_category AS ENUM ('hero', 'faculty', 'testimonial', 'gallery', 'department', 'event', 'news', 'logo', 'document', 'other');
CREATE TYPE public.enum_media_media_type AS ENUM ('image', 'document', 'video', 'audio', 'other');
CREATE TYPE public.enum_pages_blocks_programmes_type_filter AS ENUM ('all', 'UG', 'PG', 'Add-on');
CREATE TYPE public.enum_pages_blocks_rich_text_align AS ENUM ('left', 'center', 'right');
CREATE TYPE public.enum_pages_blocks_rich_text_width AS ENUM ('narrow', 'wide', 'full');
CREATE TYPE public.enum_pages_blocks_single_image_aspect AS ENUM ('natural', 'landscape', 'wide', 'hero', 'square');
CREATE TYPE public.enum_pages_blocks_single_image_style_bg AS ENUM ('white', 'light', 'dark', 'gradient', 'transparent');
CREATE TYPE public.enum_pages_blocks_single_image_style_pad AS ENUM ('none', 'small', 'normal', 'large');
CREATE TYPE public.enum_pages_blocks_single_image_width AS ENUM ('narrow', 'container', 'full');
CREATE TYPE public.enum_pages_blocks_two_column_gap AS ENUM ('tight', 'normal', 'wide');
CREATE TYPE public.enum_pages_blocks_two_column_ratio AS ENUM ('50-50', '60-40', '40-60', '70-30', '30-70');
CREATE TYPE public.enum_pages_blocks_two_column_style_bg AS ENUM ('white', 'light', 'dark', 'gradient', 'transparent');
CREATE TYPE public.enum_pages_blocks_two_column_style_pad AS ENUM ('none', 'small', 'normal', 'large');
CREATE TYPE public.enum_pages_blocks_two_column_valign AS ENUM ('top', 'center', 'bottom');

-- ============ New tables ============
\restrict m2fjFIfGFR5gWoI5BJhWtddYGF2wVFwcx3sI3ODwonPryxFn2bvHeau7AdeiU7U
CREATE TABLE public._departments_v_blocks_single_image (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    image_id integer,
    caption character varying,
    alt_override character varying,
    width public.enum__departments_v_blocks_single_image_width DEFAULT 'container'::public.enum__departments_v_blocks_single_image_width,
    aspect public.enum__departments_v_blocks_single_image_aspect DEFAULT 'natural'::public.enum__departments_v_blocks_single_image_aspect,
    link character varying,
    style_bg public.enum__departments_v_blocks_single_image_style_bg DEFAULT 'transparent'::public.enum__departments_v_blocks_single_image_style_bg,
    style_pad public.enum__departments_v_blocks_single_image_style_pad DEFAULT 'none'::public.enum__departments_v_blocks_single_image_style_pad,
    style_bt boolean DEFAULT false,
    style_bb boolean DEFAULT false,
    style_fw boolean DEFAULT false,
    _uuid character varying,
    block_name character varying
);
CREATE SEQUENCE public._departments_v_blocks_single_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._departments_v_blocks_single_image_id_seq OWNED BY public._departments_v_blocks_single_image.id;
ALTER TABLE ONLY public._departments_v_blocks_single_image ALTER COLUMN id SET DEFAULT nextval('public._departments_v_blocks_single_image_id_seq'::regclass);
ALTER TABLE ONLY public._departments_v_blocks_single_image
    ADD CONSTRAINT _departments_v_blocks_single_image_pkey PRIMARY KEY (id);
CREATE INDEX _departments_v_blocks_single_image_image_idx ON public._departments_v_blocks_single_image USING btree (image_id);
CREATE INDEX _departments_v_blocks_single_image_order_idx ON public._departments_v_blocks_single_image USING btree (_order);
CREATE INDEX _departments_v_blocks_single_image_parent_id_idx ON public._departments_v_blocks_single_image USING btree (_parent_id);
CREATE INDEX _departments_v_blocks_single_image_path_idx ON public._departments_v_blocks_single_image USING btree (_path);
ALTER TABLE ONLY public._departments_v_blocks_single_image
    ADD CONSTRAINT _departments_v_blocks_single_image_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;
ALTER TABLE ONLY public._departments_v_blocks_single_image
    ADD CONSTRAINT _departments_v_blocks_single_image_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._departments_v(id) ON DELETE CASCADE;
\unrestrict m2fjFIfGFR5gWoI5BJhWtddYGF2wVFwcx3sI3ODwonPryxFn2bvHeau7AdeiU7U
\restrict Sl0zmTcTcRvPuvqhkjtkpB1x1vsNyTmVI3Q2f0MqJk20pYte0kosxazjcEe8kZe
CREATE TABLE public._departments_v_blocks_two_column (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    "left" jsonb,
    "right" jsonb,
    ratio public.enum__departments_v_blocks_two_column_ratio DEFAULT '50-50'::public.enum__departments_v_blocks_two_column_ratio,
    valign public.enum__departments_v_blocks_two_column_valign DEFAULT 'top'::public.enum__departments_v_blocks_two_column_valign,
    gap public.enum__departments_v_blocks_two_column_gap DEFAULT 'normal'::public.enum__departments_v_blocks_two_column_gap,
    reverse_on_mobile boolean DEFAULT false,
    style_bg public.enum__departments_v_blocks_two_column_style_bg DEFAULT 'transparent'::public.enum__departments_v_blocks_two_column_style_bg,
    style_pad public.enum__departments_v_blocks_two_column_style_pad DEFAULT 'none'::public.enum__departments_v_blocks_two_column_style_pad,
    style_bt boolean DEFAULT false,
    style_bb boolean DEFAULT false,
    style_fw boolean DEFAULT false,
    _uuid character varying,
    block_name character varying
);
CREATE SEQUENCE public._departments_v_blocks_two_column_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._departments_v_blocks_two_column_id_seq OWNED BY public._departments_v_blocks_two_column.id;
ALTER TABLE ONLY public._departments_v_blocks_two_column ALTER COLUMN id SET DEFAULT nextval('public._departments_v_blocks_two_column_id_seq'::regclass);
ALTER TABLE ONLY public._departments_v_blocks_two_column
    ADD CONSTRAINT _departments_v_blocks_two_column_pkey PRIMARY KEY (id);
CREATE INDEX _departments_v_blocks_two_column_order_idx ON public._departments_v_blocks_two_column USING btree (_order);
CREATE INDEX _departments_v_blocks_two_column_parent_id_idx ON public._departments_v_blocks_two_column USING btree (_parent_id);
CREATE INDEX _departments_v_blocks_two_column_path_idx ON public._departments_v_blocks_two_column USING btree (_path);
ALTER TABLE ONLY public._departments_v_blocks_two_column
    ADD CONSTRAINT _departments_v_blocks_two_column_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._departments_v(id) ON DELETE CASCADE;
\unrestrict Sl0zmTcTcRvPuvqhkjtkpB1x1vsNyTmVI3Q2f0MqJk20pYte0kosxazjcEe8kZe
\restrict 1IHMYzThWdaNOoQXOGokncfFz5vaFhpHE4SU40lxc0KtUmo9arHPmtjOXDv9Plm
CREATE TABLE public._pages_v_blocks_single_image (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    image_id integer,
    caption character varying,
    alt_override character varying,
    width public.enum__pages_v_blocks_single_image_width DEFAULT 'container'::public.enum__pages_v_blocks_single_image_width,
    aspect public.enum__pages_v_blocks_single_image_aspect DEFAULT 'natural'::public.enum__pages_v_blocks_single_image_aspect,
    link character varying,
    style_bg public.enum__pages_v_blocks_single_image_style_bg DEFAULT 'transparent'::public.enum__pages_v_blocks_single_image_style_bg,
    style_pad public.enum__pages_v_blocks_single_image_style_pad DEFAULT 'none'::public.enum__pages_v_blocks_single_image_style_pad,
    style_bt boolean DEFAULT false,
    style_bb boolean DEFAULT false,
    style_fw boolean DEFAULT false,
    _uuid character varying,
    block_name character varying
);
CREATE SEQUENCE public._pages_v_blocks_single_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_single_image_id_seq OWNED BY public._pages_v_blocks_single_image.id;
ALTER TABLE ONLY public._pages_v_blocks_single_image ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_single_image_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_single_image
    ADD CONSTRAINT _pages_v_blocks_single_image_pkey PRIMARY KEY (id);
CREATE INDEX _pages_v_blocks_single_image_image_idx ON public._pages_v_blocks_single_image USING btree (image_id);
CREATE INDEX _pages_v_blocks_single_image_order_idx ON public._pages_v_blocks_single_image USING btree (_order);
CREATE INDEX _pages_v_blocks_single_image_parent_id_idx ON public._pages_v_blocks_single_image USING btree (_parent_id);
CREATE INDEX _pages_v_blocks_single_image_path_idx ON public._pages_v_blocks_single_image USING btree (_path);
ALTER TABLE ONLY public._pages_v_blocks_single_image
    ADD CONSTRAINT _pages_v_blocks_single_image_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;
ALTER TABLE ONLY public._pages_v_blocks_single_image
    ADD CONSTRAINT _pages_v_blocks_single_image_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;
\unrestrict 1IHMYzThWdaNOoQXOGokncfFz5vaFhpHE4SU40lxc0KtUmo9arHPmtjOXDv9Plm
\restrict Z2S9vdcEUxEIkh31xs4XEX5PwAzl0HTkMvW2SkIIsrmGDPXfKd3E3z4NwFD2WCd
CREATE TABLE public._pages_v_blocks_two_column (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    "left" jsonb,
    "right" jsonb,
    ratio public.enum__pages_v_blocks_two_column_ratio DEFAULT '50-50'::public.enum__pages_v_blocks_two_column_ratio,
    valign public.enum__pages_v_blocks_two_column_valign DEFAULT 'top'::public.enum__pages_v_blocks_two_column_valign,
    gap public.enum__pages_v_blocks_two_column_gap DEFAULT 'normal'::public.enum__pages_v_blocks_two_column_gap,
    reverse_on_mobile boolean DEFAULT false,
    style_bg public.enum__pages_v_blocks_two_column_style_bg DEFAULT 'transparent'::public.enum__pages_v_blocks_two_column_style_bg,
    style_pad public.enum__pages_v_blocks_two_column_style_pad DEFAULT 'none'::public.enum__pages_v_blocks_two_column_style_pad,
    style_bt boolean DEFAULT false,
    style_bb boolean DEFAULT false,
    style_fw boolean DEFAULT false,
    _uuid character varying,
    block_name character varying
);
CREATE SEQUENCE public._pages_v_blocks_two_column_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_two_column_id_seq OWNED BY public._pages_v_blocks_two_column.id;
ALTER TABLE ONLY public._pages_v_blocks_two_column ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_two_column_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_two_column
    ADD CONSTRAINT _pages_v_blocks_two_column_pkey PRIMARY KEY (id);
CREATE INDEX _pages_v_blocks_two_column_order_idx ON public._pages_v_blocks_two_column USING btree (_order);
CREATE INDEX _pages_v_blocks_two_column_parent_id_idx ON public._pages_v_blocks_two_column USING btree (_parent_id);
CREATE INDEX _pages_v_blocks_two_column_path_idx ON public._pages_v_blocks_two_column USING btree (_path);
ALTER TABLE ONLY public._pages_v_blocks_two_column
    ADD CONSTRAINT _pages_v_blocks_two_column_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;
\unrestrict Z2S9vdcEUxEIkh31xs4XEX5PwAzl0HTkMvW2SkIIsrmGDPXfKd3E3z4NwFD2WCd
\restrict Uwbxp2Mjj5dr6aKxcxgapI0kG6RPczcoVxT0nLIIUubLLk2XMgbP7VXDGcNFjcJ
CREATE TABLE public.departments_blocks_single_image (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    image_id integer,
    caption character varying,
    alt_override character varying,
    width public.enum_departments_blocks_single_image_width DEFAULT 'container'::public.enum_departments_blocks_single_image_width,
    aspect public.enum_departments_blocks_single_image_aspect DEFAULT 'natural'::public.enum_departments_blocks_single_image_aspect,
    link character varying,
    style_bg public.enum_departments_blocks_single_image_style_bg DEFAULT 'transparent'::public.enum_departments_blocks_single_image_style_bg,
    style_pad public.enum_departments_blocks_single_image_style_pad DEFAULT 'none'::public.enum_departments_blocks_single_image_style_pad,
    style_bt boolean DEFAULT false,
    style_bb boolean DEFAULT false,
    style_fw boolean DEFAULT false,
    block_name character varying
);
ALTER TABLE ONLY public.departments_blocks_single_image
    ADD CONSTRAINT departments_blocks_single_image_pkey PRIMARY KEY (id);
CREATE INDEX departments_blocks_single_image_image_idx ON public.departments_blocks_single_image USING btree (image_id);
CREATE INDEX departments_blocks_single_image_order_idx ON public.departments_blocks_single_image USING btree (_order);
CREATE INDEX departments_blocks_single_image_parent_id_idx ON public.departments_blocks_single_image USING btree (_parent_id);
CREATE INDEX departments_blocks_single_image_path_idx ON public.departments_blocks_single_image USING btree (_path);
ALTER TABLE ONLY public.departments_blocks_single_image
    ADD CONSTRAINT departments_blocks_single_image_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;
ALTER TABLE ONLY public.departments_blocks_single_image
    ADD CONSTRAINT departments_blocks_single_image_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.departments(id) ON DELETE CASCADE;
\unrestrict Uwbxp2Mjj5dr6aKxcxgapI0kG6RPczcoVxT0nLIIUubLLk2XMgbP7VXDGcNFjcJ
\restrict k1dr2Rvp7fOUDZwe7pbBI0CBRPbBVr49HGQoJLuF1wKEhhdTsrx8OKU1cv9WHCd
CREATE TABLE public.departments_blocks_two_column (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    "left" jsonb,
    "right" jsonb,
    ratio public.enum_departments_blocks_two_column_ratio DEFAULT '50-50'::public.enum_departments_blocks_two_column_ratio,
    valign public.enum_departments_blocks_two_column_valign DEFAULT 'top'::public.enum_departments_blocks_two_column_valign,
    gap public.enum_departments_blocks_two_column_gap DEFAULT 'normal'::public.enum_departments_blocks_two_column_gap,
    reverse_on_mobile boolean DEFAULT false,
    style_bg public.enum_departments_blocks_two_column_style_bg DEFAULT 'transparent'::public.enum_departments_blocks_two_column_style_bg,
    style_pad public.enum_departments_blocks_two_column_style_pad DEFAULT 'none'::public.enum_departments_blocks_two_column_style_pad,
    style_bt boolean DEFAULT false,
    style_bb boolean DEFAULT false,
    style_fw boolean DEFAULT false,
    block_name character varying
);
ALTER TABLE ONLY public.departments_blocks_two_column
    ADD CONSTRAINT departments_blocks_two_column_pkey PRIMARY KEY (id);
CREATE INDEX departments_blocks_two_column_order_idx ON public.departments_blocks_two_column USING btree (_order);
CREATE INDEX departments_blocks_two_column_parent_id_idx ON public.departments_blocks_two_column USING btree (_parent_id);
CREATE INDEX departments_blocks_two_column_path_idx ON public.departments_blocks_two_column USING btree (_path);
ALTER TABLE ONLY public.departments_blocks_two_column
    ADD CONSTRAINT departments_blocks_two_column_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.departments(id) ON DELETE CASCADE;
\unrestrict k1dr2Rvp7fOUDZwe7pbBI0CBRPbBVr49HGQoJLuF1wKEhhdTsrx8OKU1cv9WHCd
\restrict Tz1ADEbr6aBEYgUqD3i5ZX9AU72dJ1cy51K2jkQ7wHx4ghvrXjQhGihdcYg6vwT
CREATE TABLE public.navigation_items_children_sub_items (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    label character varying NOT NULL,
    link character varying NOT NULL,
    open_in_new_tab boolean DEFAULT false
);
ALTER TABLE ONLY public.navigation_items_children_sub_items
    ADD CONSTRAINT navigation_items_children_sub_items_pkey PRIMARY KEY (id);
CREATE INDEX navigation_items_children_sub_items_order_idx ON public.navigation_items_children_sub_items USING btree (_order);
CREATE INDEX navigation_items_children_sub_items_parent_id_idx ON public.navigation_items_children_sub_items USING btree (_parent_id);
ALTER TABLE ONLY public.navigation_items_children_sub_items
    ADD CONSTRAINT navigation_items_children_sub_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.navigation_items_children(id) ON DELETE CASCADE;
\unrestrict Tz1ADEbr6aBEYgUqD3i5ZX9AU72dJ1cy51K2jkQ7wHx4ghvrXjQhGihdcYg6vwT
\restrict FDLVJoUCGJ8WWN7HKG5Hsg0C8hjaJmgA9D2eykrTVinVzTPA8iYlHJQch44XlyX
CREATE TABLE public.pages_blocks_single_image (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    image_id integer,
    caption character varying,
    alt_override character varying,
    width public.enum_pages_blocks_single_image_width DEFAULT 'container'::public.enum_pages_blocks_single_image_width,
    aspect public.enum_pages_blocks_single_image_aspect DEFAULT 'natural'::public.enum_pages_blocks_single_image_aspect,
    link character varying,
    style_bg public.enum_pages_blocks_single_image_style_bg DEFAULT 'transparent'::public.enum_pages_blocks_single_image_style_bg,
    style_pad public.enum_pages_blocks_single_image_style_pad DEFAULT 'none'::public.enum_pages_blocks_single_image_style_pad,
    style_bt boolean DEFAULT false,
    style_bb boolean DEFAULT false,
    style_fw boolean DEFAULT false,
    block_name character varying
);
ALTER TABLE ONLY public.pages_blocks_single_image
    ADD CONSTRAINT pages_blocks_single_image_pkey PRIMARY KEY (id);
CREATE INDEX pages_blocks_single_image_image_idx ON public.pages_blocks_single_image USING btree (image_id);
CREATE INDEX pages_blocks_single_image_order_idx ON public.pages_blocks_single_image USING btree (_order);
CREATE INDEX pages_blocks_single_image_parent_id_idx ON public.pages_blocks_single_image USING btree (_parent_id);
CREATE INDEX pages_blocks_single_image_path_idx ON public.pages_blocks_single_image USING btree (_path);
ALTER TABLE ONLY public.pages_blocks_single_image
    ADD CONSTRAINT pages_blocks_single_image_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;
ALTER TABLE ONLY public.pages_blocks_single_image
    ADD CONSTRAINT pages_blocks_single_image_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;
\unrestrict FDLVJoUCGJ8WWN7HKG5Hsg0C8hjaJmgA9D2eykrTVinVzTPA8iYlHJQch44XlyX
\restrict nM94zfUoVDVLEBO4nKLY8oa2CoKzNeBcdj8gNGfZy2jIoGxLnaSUSHUA3XcQf61
CREATE TABLE public.pages_blocks_two_column (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    "left" jsonb,
    "right" jsonb,
    ratio public.enum_pages_blocks_two_column_ratio DEFAULT '50-50'::public.enum_pages_blocks_two_column_ratio,
    valign public.enum_pages_blocks_two_column_valign DEFAULT 'top'::public.enum_pages_blocks_two_column_valign,
    gap public.enum_pages_blocks_two_column_gap DEFAULT 'normal'::public.enum_pages_blocks_two_column_gap,
    reverse_on_mobile boolean DEFAULT false,
    style_bg public.enum_pages_blocks_two_column_style_bg DEFAULT 'transparent'::public.enum_pages_blocks_two_column_style_bg,
    style_pad public.enum_pages_blocks_two_column_style_pad DEFAULT 'none'::public.enum_pages_blocks_two_column_style_pad,
    style_bt boolean DEFAULT false,
    style_bb boolean DEFAULT false,
    style_fw boolean DEFAULT false,
    block_name character varying
);
ALTER TABLE ONLY public.pages_blocks_two_column
    ADD CONSTRAINT pages_blocks_two_column_pkey PRIMARY KEY (id);
CREATE INDEX pages_blocks_two_column_order_idx ON public.pages_blocks_two_column USING btree (_order);
CREATE INDEX pages_blocks_two_column_parent_id_idx ON public.pages_blocks_two_column USING btree (_parent_id);
CREATE INDEX pages_blocks_two_column_path_idx ON public.pages_blocks_two_column USING btree (_path);
ALTER TABLE ONLY public.pages_blocks_two_column
    ADD CONSTRAINT pages_blocks_two_column_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;
\unrestrict nM94zfUoVDVLEBO4nKLY8oa2CoKzNeBcdj8gNGfZy2jIoGxLnaSUSHUA3XcQf61

-- ============ Column additions ============
ALTER TABLE public."_departments_v_blocks_announcements" ADD COLUMN IF NOT EXISTS "limit" numeric DEFAULT 8;
ALTER TABLE public."_departments_v_blocks_gallery_preview" ADD COLUMN IF NOT EXISTS "limit" numeric DEFAULT 8;
ALTER TABLE public."_departments_v_blocks_news_events" ADD COLUMN IF NOT EXISTS "news_limit" numeric DEFAULT 4;
ALTER TABLE public."_departments_v_blocks_news_events" ADD COLUMN IF NOT EXISTS "events_limit" numeric DEFAULT 4;
ALTER TABLE public."_departments_v_blocks_programmes" ADD COLUMN IF NOT EXISTS "type_filter" public.enum__departments_v_blocks_programmes_type_filter DEFAULT 'all'::enum__departments_v_blocks_programmes_type_filter;
ALTER TABLE public."_departments_v_blocks_programmes" ADD COLUMN IF NOT EXISTS "limit" numeric DEFAULT 24;
ALTER TABLE public."_departments_v_blocks_rich_text" ADD COLUMN IF NOT EXISTS "eyebrow" character varying;
ALTER TABLE public."_departments_v_blocks_rich_text" ADD COLUMN IF NOT EXISTS "heading" character varying;
ALTER TABLE public."_departments_v_blocks_rich_text" ADD COLUMN IF NOT EXISTS "subheading" character varying;
ALTER TABLE public."_departments_v_blocks_rich_text" ADD COLUMN IF NOT EXISTS "width" public.enum__departments_v_blocks_rich_text_width DEFAULT 'narrow'::enum__departments_v_blocks_rich_text_width;
ALTER TABLE public."_departments_v_blocks_rich_text" ADD COLUMN IF NOT EXISTS "align" public.enum__departments_v_blocks_rich_text_align DEFAULT 'left'::enum__departments_v_blocks_rich_text_align;
ALTER TABLE public."_departments_v_blocks_testimonials" ADD COLUMN IF NOT EXISTS "limit" numeric DEFAULT 6;
ALTER TABLE public."_pages_v_blocks_announcements" ADD COLUMN IF NOT EXISTS "limit" numeric DEFAULT 8;
ALTER TABLE public."_pages_v_blocks_gallery_preview" ADD COLUMN IF NOT EXISTS "limit" numeric DEFAULT 8;
ALTER TABLE public."_pages_v_blocks_news_events" ADD COLUMN IF NOT EXISTS "news_limit" numeric DEFAULT 4;
ALTER TABLE public."_pages_v_blocks_news_events" ADD COLUMN IF NOT EXISTS "events_limit" numeric DEFAULT 4;
ALTER TABLE public."_pages_v_blocks_programmes" ADD COLUMN IF NOT EXISTS "type_filter" public.enum__pages_v_blocks_programmes_type_filter DEFAULT 'all'::enum__pages_v_blocks_programmes_type_filter;
ALTER TABLE public."_pages_v_blocks_programmes" ADD COLUMN IF NOT EXISTS "limit" numeric DEFAULT 24;
ALTER TABLE public."_pages_v_blocks_rich_text" ADD COLUMN IF NOT EXISTS "eyebrow" character varying;
ALTER TABLE public."_pages_v_blocks_rich_text" ADD COLUMN IF NOT EXISTS "heading" character varying;
ALTER TABLE public."_pages_v_blocks_rich_text" ADD COLUMN IF NOT EXISTS "subheading" character varying;
ALTER TABLE public."_pages_v_blocks_rich_text" ADD COLUMN IF NOT EXISTS "width" public.enum__pages_v_blocks_rich_text_width DEFAULT 'narrow'::enum__pages_v_blocks_rich_text_width;
ALTER TABLE public."_pages_v_blocks_rich_text" ADD COLUMN IF NOT EXISTS "align" public.enum__pages_v_blocks_rich_text_align DEFAULT 'left'::enum__pages_v_blocks_rich_text_align;
ALTER TABLE public."_pages_v_blocks_testimonials" ADD COLUMN IF NOT EXISTS "limit" numeric DEFAULT 6;
ALTER TABLE public."departments_blocks_announcements" ADD COLUMN IF NOT EXISTS "limit" numeric DEFAULT 8;
ALTER TABLE public."departments_blocks_gallery_preview" ADD COLUMN IF NOT EXISTS "limit" numeric DEFAULT 8;
ALTER TABLE public."departments_blocks_news_events" ADD COLUMN IF NOT EXISTS "news_limit" numeric DEFAULT 4;
ALTER TABLE public."departments_blocks_news_events" ADD COLUMN IF NOT EXISTS "events_limit" numeric DEFAULT 4;
ALTER TABLE public."departments_blocks_programmes" ADD COLUMN IF NOT EXISTS "type_filter" public.enum_departments_blocks_programmes_type_filter DEFAULT 'all'::enum_departments_blocks_programmes_type_filter;
ALTER TABLE public."departments_blocks_programmes" ADD COLUMN IF NOT EXISTS "limit" numeric DEFAULT 24;
ALTER TABLE public."departments_blocks_rich_text" ADD COLUMN IF NOT EXISTS "eyebrow" character varying;
ALTER TABLE public."departments_blocks_rich_text" ADD COLUMN IF NOT EXISTS "heading" character varying;
ALTER TABLE public."departments_blocks_rich_text" ADD COLUMN IF NOT EXISTS "subheading" character varying;
ALTER TABLE public."departments_blocks_rich_text" ADD COLUMN IF NOT EXISTS "width" public.enum_departments_blocks_rich_text_width DEFAULT 'narrow'::enum_departments_blocks_rich_text_width;
ALTER TABLE public."departments_blocks_rich_text" ADD COLUMN IF NOT EXISTS "align" public.enum_departments_blocks_rich_text_align DEFAULT 'left'::enum_departments_blocks_rich_text_align;
ALTER TABLE public."departments_blocks_testimonials" ADD COLUMN IF NOT EXISTS "limit" numeric DEFAULT 6;
ALTER TABLE public."media" ADD COLUMN IF NOT EXISTS "category" public.enum_media_category;
ALTER TABLE public."media" ADD COLUMN IF NOT EXISTS "media_type" public.enum_media_media_type;
ALTER TABLE public."pages_blocks_announcements" ADD COLUMN IF NOT EXISTS "limit" numeric DEFAULT 8;
ALTER TABLE public."pages_blocks_gallery_preview" ADD COLUMN IF NOT EXISTS "limit" numeric DEFAULT 8;
ALTER TABLE public."pages_blocks_news_events" ADD COLUMN IF NOT EXISTS "news_limit" numeric DEFAULT 4;
ALTER TABLE public."pages_blocks_news_events" ADD COLUMN IF NOT EXISTS "events_limit" numeric DEFAULT 4;
ALTER TABLE public."pages_blocks_programmes" ADD COLUMN IF NOT EXISTS "type_filter" public.enum_pages_blocks_programmes_type_filter DEFAULT 'all'::enum_pages_blocks_programmes_type_filter;
ALTER TABLE public."pages_blocks_programmes" ADD COLUMN IF NOT EXISTS "limit" numeric DEFAULT 24;
ALTER TABLE public."pages_blocks_rich_text" ADD COLUMN IF NOT EXISTS "eyebrow" character varying;
ALTER TABLE public."pages_blocks_rich_text" ADD COLUMN IF NOT EXISTS "heading" character varying;
ALTER TABLE public."pages_blocks_rich_text" ADD COLUMN IF NOT EXISTS "subheading" character varying;
ALTER TABLE public."pages_blocks_rich_text" ADD COLUMN IF NOT EXISTS "width" public.enum_pages_blocks_rich_text_width DEFAULT 'narrow'::enum_pages_blocks_rich_text_width;
ALTER TABLE public."pages_blocks_rich_text" ADD COLUMN IF NOT EXISTS "align" public.enum_pages_blocks_rich_text_align DEFAULT 'left'::enum_pages_blocks_rich_text_align;
ALTER TABLE public."pages_blocks_testimonials" ADD COLUMN IF NOT EXISTS "limit" numeric DEFAULT 6;

COMMIT;
