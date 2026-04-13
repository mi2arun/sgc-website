# SGC Website — Payload CMS Integration Design Spec

**Goal:** Replace all hardcoded content with a Payload CMS-powered page builder. Admin staff can create pages, manage navigation, edit every component's content, and reorder sections via drag-and-drop — zero developer involvement for content changes.

**Tech Stack:** Next.js 16 + Payload CMS 3.x + PostgreSQL 18 + Tailwind CSS 4 + React 19

**Database:** Local PostgreSQL via Postgres.app, database `sgc_website`, user `arunkumars`

---

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                   Next.js App                    │
│                                                  │
│  ┌──────────────┐         ┌──────────────────┐  │
│  │  Frontend     │         │  Payload CMS     │  │
│  │  /            │  ←───→  │  /admin          │  │
│  │  /[...slug]   │  reads  │  Collections     │  │
│  │  /dept/[slug] │  from   │  Globals         │  │
│  │  /news/[slug] │   DB    │  Media Library   │  │
│  └──────────────┘         └──────────────────┘  │
│                      │                           │
│               ┌──────┴──────┐                    │
│               │  PostgreSQL  │                    │
│               │  sgc_website │                    │
│               └─────────────┘                    │
└─────────────────────────────────────────────────┘
```

Payload CMS runs embedded inside the Next.js app — same server, same deploy. The admin panel at `/admin` provides the full content management UI. Frontend pages fetch data from the database via Payload's local API (no HTTP overhead).

---

## Collections

### 1. Pages

The core collection. Every page on the site is a Pages document with a block-based layout.

| Field | Type | Description |
|-------|------|-------------|
| title | text | Page title |
| slug | text | URL path (auto-generated from title, editable) |
| status | select | `draft` / `published` |
| layout | blocks | Ordered array of block types (drag-and-drop) |
| meta.title | text | SEO title |
| meta.description | textarea | SEO description |
| meta.image | upload (Media) | Open Graph image |

### 2. Departments

Each department has structured data + its own block-based layout for a unique homepage.

| Field | Type | Description |
|-------|------|-------------|
| name | text | Department name (e.g., "B.C.A") |
| slug | text | URL slug |
| shortName | text | Abbreviation |
| description | richText | About the department |
| bannerImage | upload (Media) | Department banner |
| hod | group | HOD name, designation, photo |
| courses | relationship (Courses) | hasMany |
| faculty | relationship (Faculty) | hasMany |
| layout | blocks | Custom block-based homepage layout |
| status | select | `draft` / `published` |

**Frontend route:** `/dept/[slug]`

### 3. Faculty

Full faculty profiles as requested in the problem statement.

| Field | Type | Description |
|-------|------|-------------|
| name | text | Full name |
| slug | text | URL slug |
| photo | upload (Media) | Profile photo |
| designation | text | e.g., "Assistant Professor" |
| qualifications | text | e.g., "M.Sc, M.Phil, Ph.D" |
| department | relationship (Departments) | belongsTo |
| specialization | text | Research area |
| email | email | Contact email |
| phone | text | Contact phone (optional) |
| publications | richText | List of publications |
| bio | richText | Full biography |
| order | number | Sort order within department |
| visible | checkbox | Show/hide on site |

**Frontend route:** `/faculty/[slug]`

### 4. Courses

| Field | Type | Description |
|-------|------|-------------|
| name | text | Full course name |
| type | select | `UG` / `PG` / `Add-on` |
| department | relationship (Departments) | belongsTo |
| fees | text | Fee per semester |
| duration | text | e.g., "3 Years" |
| eligibility | text | Entry requirements |
| syllabus | upload (Media) | Syllabus PDF |
| icon | select | Lucide icon name |

### 5. News

| Field | Type | Description |
|-------|------|-------------|
| title | text | Headline |
| slug | text | URL slug |
| date | date | Publication date |
| content | richText | Full article |
| image | upload (Media) | Featured image |
| category | select | Academic / Event / Achievement / General |
| featured | checkbox | Show on homepage |
| status | select | `draft` / `published` |

**Frontend route:** `/news/[slug]`

### 6. Events

| Field | Type | Description |
|-------|------|-------------|
| title | text | Event name |
| slug | text | URL slug |
| date | date | Event date |
| time | text | Event time |
| venue | text | Location |
| description | richText | Event details |
| images | array of upload (Media) | Event photos |
| category | select | Academic / Cultural / Sports / Service / Festival |
| registrationLink | text | External registration URL (optional) |
| status | select | `draft` / `published` |

**Frontend route:** `/events/[slug]`

### 7. Announcements

| Field | Type | Description |
|-------|------|-------------|
| title | text | Notice title |
| date | date | Date posted |
| category | select | Examination / Fees / Admission / Academic / General |
| attachment | upload (Media) | PDF circular |
| link | text | External link (optional) |
| pinned | checkbox | Pin to top |
| isNew | checkbox | Show "NEW" badge |

### 8. Gallery

| Field | Type | Description |
|-------|------|-------------|
| title | text | Album title |
| slug | text | URL slug |
| category | select | Campus / Events / Sports / Cultural / Academic |
| date | date | Album date |
| description | textarea | Album description |
| images | array of upload (Media) | Album photos |
| videos | array of text | YouTube/video URLs |

**Frontend route:** `/gallery/[slug]`

### 9. Testimonials

| Field | Type | Description |
|-------|------|-------------|
| name | text | Person's name |
| photo | upload (Media) | Profile photo |
| quote | textarea | Testimonial text |
| batch | text | e.g., "2020-2023" |
| department | relationship (Departments) | belongsTo |
| designation | text | Current role/company |
| order | number | Display order |

### 10. Placements

| Field | Type | Description |
|-------|------|-------------|
| company | text | Company name |
| logo | upload (Media) | Company logo |
| role | text | Job role |
| studentsPlaced | number | Count |
| package | text | CTC range |
| year | text | Placement year |
| category | select | IT / Banking / Management / Higher Studies |

### 11. Documents

| Field | Type | Description |
|-------|------|-------------|
| title | text | Document title |
| category | select | NAAC / IQAC / NIRF / AICTE / UGC / ISO / RTI / General |
| file | upload (Media) | PDF file |
| year | text | Year |
| description | textarea | Brief description |
| order | number | Sort order within category |

### 12. Media

Payload's built-in media collection with custom config:

| Field | Type | Description |
|-------|------|-------------|
| alt | text | Alt text for accessibility |
| caption | text | Optional caption |

Config: auto-generate sizes — thumbnail (400x300), card (768x512), hero (1920x1080).

### 13. Users

| Field | Type | Description |
|-------|------|-------------|
| email | email | Login email |
| password | password | Hashed password |
| role | select | `super-admin` / `content-editor` / `department-admin` / `view-only` |
| department | relationship (Departments) | Only for department-admin role |
| name | text | Display name |

Access control enforced per collection based on role.

---

## Globals

### Site Settings

| Field | Type | Description |
|-------|------|-------------|
| collegeName | text | "Saradha Gangadharan College" |
| shortName | text | "SGC" |
| tagline | text | Autonomous tagline |
| logo | upload (Media) | College logo |
| phone | text | Contact phone |
| email | email | Contact email |
| address | textarea | Full address |
| mapUrl | text | Google Maps URL |
| accreditationTags | array | Tags shown in hero (NAAC A+, UGC, etc.) |
| social | group | facebook, twitter, instagram, youtube, linkedin URLs |

### Navigation

| Field | Type | Description |
|-------|------|-------------|
| items | array | Menu items (drag to reorder) |
| items.label | text | Menu label |
| items.link | text | URL or page slug |
| items.openInNewTab | checkbox | External link behavior |
| items.children | array | Sub-menu items (same structure) |

### Footer

| Field | Type | Description |
|-------|------|-------------|
| columns | array | Footer link columns |
| columns.title | text | Column heading |
| columns.links | array | Links (label + href) |
| newsletterHeading | text | Newsletter section title |
| newsletterDescription | text | Newsletter description |
| copyright | text | Copyright text |

---

## Block Types (Page Builder)

Each block maps to a React component. All blocks are available in the Pages and Departments `layout` field.

| Block | Component | Key Fields |
|-------|-----------|------------|
| `hero` | HeroSection | slides[] (image, ctaLabel, ctaLink), collegeName, tagline, tags[] |
| `flash-news` | FlashNews | items[] (text, link) |
| `promo-banner` | PromoBanner | banners[] (title, subtitle, cta, link, color) |
| `quick-access` | QuickAccess | buttons[] (label, link, highlighted) |
| `about` | AboutSection | heading, description, chairmanName, chairmanTitle, chairmanOrg, chairmanPhoto, chairmanQuote |
| `stats` | StatsSection | items[] (label, value, suffix) |
| `programmes` | ProgrammesSection | title, subtitle (auto-pulls from Courses collection) |
| `scholarship` | ScholarshipBanner | title, description, items[] (name, amount, eligibility), ctaLabel, ctaLink |
| `announcements` | AnnouncementsPanel | title (auto-pulls from Announcements collection) |
| `news-events` | NewsEventsSection | title (auto-pulls from News + Events collections) |
| `activity-feed` | ActivityFeed | items[] (title, date, type, department, description) |
| `why-join` | WhyJoinSection | title, reasons[] (icon, heading, description) |
| `placements` | PlacementSection | title, stats[] (label, percentage) (auto-pulls recruiters from Placements) |
| `recruiter-logos` | RecruiterLogos | title (auto-pulls from Placements collection) |
| `testimonials` | TestimonialsSection | title (auto-pulls from Testimonials collection) |
| `compliance-links` | ComplianceLinks | title, links[] (label, href, icon) |
| `cta` | CTASection | heading, description, buttonLabel, buttonLink |
| `rich-text` | RichTextBlock | content (Lexical rich text editor) |
| `gallery-preview` | GalleryPreview | title (auto-pulls from Gallery collection) |
| `faculty-grid` | FacultyGrid | title, department filter (auto-pulls from Faculty collection) |

Blocks that say "auto-pulls" fetch live data from collections. Admin only configures the title/filters — content comes from the collection.

---

## Frontend Routing

| Route | Source | Description |
|-------|--------|-------------|
| `/` | Pages collection (slug: "home") | Homepage |
| `/[...slug]` | Pages collection (slug match) | Any CMS page |
| `/dept/[slug]` | Departments collection | Department homepage |
| `/faculty/[slug]` | Faculty collection | Faculty profile |
| `/news` | News collection (listing) | All news |
| `/news/[slug]` | News collection (detail) | Single news article |
| `/events` | Events collection (listing) | All events |
| `/events/[slug]` | Events collection (detail) | Single event |
| `/gallery` | Gallery collection (listing) | All albums |
| `/gallery/[slug]` | Gallery collection (detail) | Single album |
| `/admin` | Payload CMS | Admin panel |

The catch-all `[...slug]` handles any page the admin creates. Specific routes (`/dept`, `/news`, `/events`, `/gallery`, `/faculty`) have dedicated templates with listing + detail views.

---

## Refactoring Existing Components

Existing components in `src/components/sections/` get refactored from:

```tsx
// Before — imports hardcoded data
import { DEPARTMENTS } from "@/lib/constants";

export default function ProgrammesSection() {
  // uses DEPARTMENTS directly
}
```

To:

```tsx
// After — accepts props from CMS
type Props = {
  title: string;
  subtitle: string;
  departments: Array<{ name: string; type: string; fees: string; icon: string }>;
};

export default function ProgrammesSection({ title, subtitle, departments }: Props) {
  // uses props — data comes from CMS block
}
```

A block renderer maps CMS block data to components:

```tsx
// src/components/blocks/RenderBlocks.tsx
function RenderBlocks({ blocks }) {
  return blocks.map((block) => {
    switch (block.blockType) {
      case "hero": return <HeroSection {...block} />;
      case "about": return <AboutSection {...block} />;
      case "programmes": return <ProgrammesSection {...block} />;
      // ... all block types
    }
  });
}
```

---

## Implementation Phases

### Phase 1 — Foundation
- Install Payload CMS 3.x + `@payloadcms/db-postgres`
- Create PostgreSQL database `sgc_website`
- Configure `payload.config.ts`
- Set up Media + Users collections
- Verify `/admin` panel works with login

**Result:** Admin can log in, upload media.

### Phase 2 — Site Settings & Navigation
- Create Site Settings, Navigation, Footer globals
- Refactor Header component to read nav from CMS
- Refactor Footer component to read from CMS
- Refactor CollegeBanner to read logo/name from CMS
- Seed initial navigation data (with problem statement menu structure)

**Result:** Admin can edit menus, logo, contact info. Site reflects changes.

### Phase 3 — Pages + Blocks (Page Builder)
- Create Pages collection with blocks field
- Implement all 20 block types in Payload config
- Create `RenderBlocks` component
- Refactor all 19 existing section components to accept props
- Create dynamic `[...slug]` catch-all route
- Seed homepage with current section data
- Delete `constants.ts` (data now lives in CMS)

**Result:** Admin can create any page, add/reorder sections, edit all content.

### Phase 4 — Content Collections
- Create News, Events, Announcements, Testimonials, Gallery, Placements, Documents collections
- Build listing pages: `/news`, `/events`, `/gallery`
- Build detail pages: `/news/[slug]`, `/events/[slug]`, `/gallery/[slug]`
- Connect auto-pull blocks (news-events, testimonials, gallery-preview, recruiter-logos) to read from collections
- Seed sample content

**Result:** Admin manages all dynamic content.

### Phase 5 — Departments & Faculty
- Create Departments, Courses, Faculty collections
- Build department listing: `/dept`
- Build department homepage: `/dept/[slug]` with block-based layout
- Build faculty profile: `/faculty/[slug]`
- Create FacultyGrid block
- Connect Programmes block to pull from Courses collection

**Result:** Each department has a unique homepage. Faculty profiles with full details.

### Phase 6 — Polish & Problem Statement Fixes
- Programme card hover — full color inversion
- Remove duplicate accreditation displays
- Google Maps location link in footer
- Scholarship nav scroll anchor
- Logo replacement (via CMS — admin uploads new logo)
- User roles and access control per collection
- SEO meta on all pages

**Result:** All problem statement issues resolved. Production-ready.

---

## Project Structure (Final)

```
sgc-website/
├── src/
│   ├── app/
│   │   ├── (frontend)/
│   │   │   ├── layout.tsx              # Public layout (TopBar, Header, Footer — from CMS)
│   │   │   ├── page.tsx                # Homepage (fetches "home" page from CMS)
│   │   │   ├── [...slug]/page.tsx      # Catch-all CMS pages
│   │   │   ├── dept/[slug]/page.tsx    # Department homepage
│   │   │   ├── faculty/[slug]/page.tsx # Faculty profile
│   │   │   ├── news/
│   │   │   │   ├── page.tsx            # News listing
│   │   │   │   └── [slug]/page.tsx     # News detail
│   │   │   ├── events/
│   │   │   │   ├── page.tsx            # Events listing
│   │   │   │   └── [slug]/page.tsx     # Events detail
│   │   │   └── gallery/
│   │   │       ├── page.tsx            # Gallery listing
│   │   │       └── [slug]/page.tsx     # Gallery detail
│   │   └── (payload)/
│   │       └── admin/
│   │           └── [[...segments]]/page.tsx  # Payload admin panel
│   ├── collections/
│   │   ├── Pages.ts
│   │   ├── Departments.ts
│   │   ├── Faculty.ts
│   │   ├── Courses.ts
│   │   ├── News.ts
│   │   ├── Events.ts
│   │   ├── Announcements.ts
│   │   ├── Gallery.ts
│   │   ├── Testimonials.ts
│   │   ├── Placements.ts
│   │   ├── Documents.ts
│   │   ├── Media.ts
│   │   └── Users.ts
│   ├── globals/
│   │   ├── SiteSettings.ts
│   │   ├── Navigation.ts
│   │   └── Footer.ts
│   ├── blocks/                          # Payload block configs
│   │   ├── Hero.ts
│   │   ├── About.ts
│   │   ├── Programmes.ts
│   │   ├── Stats.ts
│   │   ├── ... (all 20 block types)
│   │   └── index.ts                     # Exports all blocks
│   ├── components/
│   │   ├── layout/                      # Header, Footer, TopBar, CollegeBanner
│   │   ├── sections/                    # Refactored section components (prop-driven)
│   │   └── blocks/
│   │       └── RenderBlocks.tsx         # Maps block data → components
│   └── lib/
│       ├── payload.ts                   # Payload client helper
│       └── utils.ts                     # Utility functions
├── payload.config.ts                    # Payload CMS configuration
├── .env                                 # DATABASE_URL, PAYLOAD_SECRET
└── package.json
```
