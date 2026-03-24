# SGC Website — Project Documentation

## Saradha Gangadharan College (SGC) — New Website with Full CMS

**Project Goal:** Build a modern, fully CMS-managed university website to replace the existing site at [sgc.edu.in](https://sgc.edu.in).

---

## 1. Existing Website Analysis (sgc.edu.in)

### Institution Profile

- **Name:** Saradha Gangadharan College (SGC)
- **Type:** Autonomous institution affiliated with Pondicherry University
- **Certifications:** ISO 9001:2015, NAAC Accredited
- **Stats:** 13 courses | 79 faculty | 1,245 students | 1,000+ placements
- **Current Site:** Built ~2021 by seshkool.com, outdated design and functionality

### Current Navigation Structure (15+ Primary Menus)

| Menu Item | Sub-sections |
|-----------|-------------|
| **Home** | Landing page with carousel, flash news, events, stats, videos |
| **About** | About SGC, Vision & Mission, PU Affiliation, Recognition, Annual Reports, Institutional Development Plan |
| **Autonomous** | Autonomy documentation (PDF) |
| **Administration** | Principal's profile, leadership |
| **Academics** | 15+ departments, UG/PG courses, library (NDL, N-LIST, E-Content), academic calendar, MoUs |
| **Admission** | Guidelines, application form (external portal), prospectus, online fee payment, refund policy |
| **Student Support** | 10 cells/committees: SC/ST, Grievance, Disciplinary, Anti-Ragging, Equal Opportunity, ICC, Career Dev, Health, PwD, SWAYAM + NCC, Centres & Clubs, Sports |
| **Campus Life** | Amenities |
| **UGC Guidelines** | 5 guideline documents + 1 undertaking |
| **NAAC** | IIQA, SSR Cycle I & II, DVV Clarification, Certificate, Declaration |
| **IQAC** | Compositions (4 years), Minutes of Meeting (16 docs), AQAR Reports (7 years), Best Practices, Distinctiveness, Student Satisfaction Survey |
| **AICTE** | EOA, LOA, Feedback portals, Mandatory Disclosure |
| **NIRF / ARIIA** | NIRF reports 2019–2026, ARIIA 2021–2022 |
| **Placement** | Placement Officer, Placement Report, Job Openings |
| **Research** | Centre for Research, SG Research Fund, Research Incentive Scheme (7 sub-sections), SG Excellence Award, Research Outcome, IIC Activities, Innovation & Startup Policy, Research Gallery |
| **Alumni** | Association, Testimonials, Registration |
| **ISO** | Quality Policy, ISO 9001:2015 Certificate |
| **Gallery** | Photo gallery (50+ photos) |
| **Examination** | Timetable, Exam Results (login), Revaluation Results (login) |
| **Contact** | Contact page |

### Academic Programs

**UG Programs (9 courses):**

| Course | Fees/Semester |
|--------|--------------|
| B.A English (Honours) | ₹16,000 |
| B.Com (Honours) | ₹28,000 |
| B.B.A (Honours) | ₹28,000 |
| B.Com Corporate Secretaryship (Honours) | ₹28,000 |
| B.Sc Physics (Honours) | ₹16,000 |
| B.Sc Mathematics (Honours) | ₹16,000 |
| B.Sc Computer Science (Honours) | ₹24,000 |
| B.C.A (Honours) | ₹24,000 |
| B.Sc IT (Honours) | ₹24,000 |

**PG Programs (4 courses):**

| Course | Fees/Semester | Eligibility |
|--------|--------------|-------------|
| M.A English | ₹16,000 | 50% in UG |
| M.Com | ₹22,000 | 50% in UG |
| M.Sc Mathematics | ₹16,000 | 55% in UG |
| M.Sc Computer Science | ₹22,000 | 55% in UG |

**Other Departments:** Language Studies, Library, Physical Education

### Current Homepage Layout (Top to Bottom)

1. Top banner — logo, institution name, contact info
2. Mega-menu navigation bar
3. Image carousel/slider
4. Flash news ticker
5. Chairman's message + quick access buttons (Prospectus, Application, Payment)
6. Latest circulars section
7. Current events (card grid)
8. SGC highlights (statistics counters)
9. News section (scrollable)
10. "Why Join SGC" promotional section
11. Placement statistics (animated percentage bars)
12. Video gallery
13. Footer — contact info, quick links, social media, copyright

### External Integrations

- **Application Portal:** `application.sgc.edu.in` (student applications)
- **Fee Payment Portal:** `application.sgc.edu.in` (online fee payment with login)
- **Exam Results Portal:** Login-based result checking system
- **External Resources:** Pondicherry University syllabus, NPTEL, NDL, N-LIST, AICTE feedback

### Content Characteristics

- **60+ PDF documents** linked across the site (NAAC, IQAC, NIRF, UGC, etc.)
- Department pages include faculty listings with photos and profile links
- Heavy emphasis on regulatory compliance documentation
- Multiple audience segments: prospective students, current students, faculty, regulatory bodies

---

## 2. New Website — Tech Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| **Framework** | Next.js 15 (App Router) | SSR/SSG, great DX, SEO-friendly |
| **CMS** | Payload CMS 3.x | Embedded in Next.js, full admin panel, self-hosted |
| **Styling** | Tailwind CSS 4 + shadcn/ui | Utility-first, accessible components |
| **Database** | PostgreSQL | Reliable, Payload-native support |
| **Media** | Payload built-in media management | Upload, resize, serve images and PDFs |
| **Auth** | Payload built-in auth | Admin panel access, role-based permissions |
| **Deployment** | Vercel / Docker | Flexible hosting options |

### Why Payload CMS?

- Embedded directly inside Next.js — no separate backend server
- Full admin panel out of the box — non-technical staff can manage content
- Rich text editor (Lexical) for pages, news, events
- Built-in media library for photos, PDFs, documents
- Role-based access control — different permissions per department
- API-first architecture — REST + GraphQL included
- TypeScript-native with auto-generated types

---

## 3. CMS Collections (Content Types)

### Core Collections

| Collection | Purpose | Key Fields |
|-----------|---------|------------|
| **Pages** | Generic content pages (About, Vision, etc.) | Title, slug, rich content, layout blocks, SEO meta |
| **Departments** | Academic departments | Name, HOD, description, faculty (relation), courses (relation), image |
| **Courses** | UG/PG/Add-on courses | Name, type (UG/PG), department (relation), fees, eligibility, duration, syllabus PDF |
| **Faculty** | Faculty members | Name, photo, designation, qualifications, department (relation), publications, profile |
| **News** | News articles | Title, date, content, images, category, featured flag |
| **Events** | Campus events | Title, date, time, venue, description, images, registration link |
| **Circulars** | Notices and circulars | Title, date, PDF attachment, category, pinned flag |
| **Gallery** | Photo/video albums | Title, category, media items (images/videos), date |
| **Documents** | Compliance/accreditation PDFs | Title, category (NAAC/IQAC/NIRF/UGC/AICTE/ISO), file, year |
| **Placements** | Placement data | Company, role, students placed, year, report PDF |
| **Job Openings** | Placement job listings | Company, role, eligibility, deadline, apply link |
| **Testimonials** | Alumni/student testimonials | Name, batch, photo, quote, department |
| **Committees** | Student support cells | Name, type, chairperson, members, description |
| **Research** | Research projects/publications | Title, researchers (relation), abstract, category, year, document |

### Global Settings (Singletons)

| Global | Purpose | Key Fields |
|--------|---------|------------|
| **Site Settings** | Sitewide config | Logo, institution name, contact info, social links, highlight stats |
| **Navigation** | Menu structure | Mega-menu items with nested links, editable by admin |
| **Homepage** | Homepage layout | Carousel slides, chairman message, quick links, featured sections |
| **Footer** | Footer content | Contact details, quick links columns, copyright text |
| **Admission Settings** | Admission config | Application portal URL, fee payment URL, prospectus PDF, guidelines |

---

## 4. Page Structure — New Website

### Homepage

```
┌─────────────────────────────────────────────┐
│  Top Bar (contact, email, social links)      │
├─────────────────────────────────────────────┤
│  Header (logo, institution name, nav)        │
├─────────────────────────────────────────────┤
│  Mega Menu Navigation                        │
├─────────────────────────────────────────────┤
│  Hero Carousel / Slider                      │
├─────────────────────────────────────────────┤
│  Flash News / Announcements Ticker           │
├─────────────────────────────────────────────┤
│  Quick Access (Apply | Pay Fees | Prospectus)│
├─────────────────────────────────────────────┤
│  About Section (brief + chairman message)    │
├─────────────────────────────────────────────┤
│  Programs Overview (UG / PG cards)           │
├─────────────────────────────────────────────┤
│  Why SGC? (highlights + stats counters)      │
├─────────────────────────────────────────────┤
│  Latest News & Events (2-column grid)        │
├─────────────────────────────────────────────┤
│  Circulars / Notices                         │
├─────────────────────────────────────────────┤
│  Placement Statistics (animated bars)        │
├─────────────────────────────────────────────┤
│  Testimonials Carousel                       │
├─────────────────────────────────────────────┤
│  Photo/Video Gallery Preview                 │
├─────────────────────────────────────────────┤
│  Footer (contact, links, map, social)        │
└─────────────────────────────────────────────┘
```

### Key Inner Pages

- `/about` — About, Vision & Mission, History
- `/administration` — Principal, Management
- `/academics` — All departments listing
- `/academics/[department-slug]` — Individual department page
- `/courses` — All courses (filterable UG/PG)
- `/courses/[course-slug]` — Individual course detail
- `/faculty` — Full faculty directory (searchable, filterable)
- `/faculty/[slug]` — Individual faculty profile
- `/admissions` — Guidelines, links to external portals
- `/news` — All news (paginated)
- `/news/[slug]` — Individual news article
- `/events` — Events calendar/list
- `/events/[slug]` — Individual event
- `/circulars` — Notices and circulars list
- `/placements` — Stats, reports, job openings
- `/research` — Research centre, publications, incentives
- `/student-support` — All committees and cells
- `/gallery` — Photo and video gallery
- `/naac` — NAAC documentation
- `/iqac` — IQAC documentation
- `/documents/[category]` — AICTE, NIRF, UGC, ISO documents
- `/alumni` — Alumni association, registration
- `/examination` — Timetable, links to results portal
- `/contact` — Contact form, map, details

---

## 5. User Roles (CMS Admin Panel)

| Role | Permissions |
|------|------------|
| **Super Admin** | Full access — all collections, settings, users |
| **Content Editor** | Create/edit/publish news, events, circulars, pages, gallery |
| **Department Admin** | Edit own department page, faculty, courses |
| **Placement Officer** | Manage placement data, job openings |
| **Exam Cell** | Manage examination timetables, circulars |
| **View Only** | Read-only access to admin panel |

---

## 6. SEO & Performance Goals

- **Lighthouse Score:** 90+ on all metrics
- **Core Web Vitals:** Pass all thresholds
- **SSG/ISR:** Static generation for most pages, incremental revalidation for dynamic content
- **Sitemap:** Auto-generated XML sitemap
- **Structured Data:** JSON-LD for organization, courses, events, faculty
- **Open Graph:** Meta tags for social sharing on all pages
- **Responsive:** Mobile-first design, works on all devices

---

## 7. Project Directory Structure (Planned)

```
sgc-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (frontend)/         # Public-facing pages
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── about/
│   │   │   ├── academics/
│   │   │   ├── admissions/
│   │   │   ├── news/
│   │   │   ├── events/
│   │   │   ├── gallery/
│   │   │   ├── contact/
│   │   │   └── ...
│   │   └── (payload)/          # Payload admin routes
│   │       └── admin/
│   ├── collections/            # Payload CMS collection configs
│   │   ├── Pages.ts
│   │   ├── Departments.ts
│   │   ├── Courses.ts
│   │   ├── Faculty.ts
│   │   ├── News.ts
│   │   ├── Events.ts
│   │   ├── Circulars.ts
│   │   ├── Gallery.ts
│   │   ├── Documents.ts
│   │   ├── Placements.ts
│   │   ├── Testimonials.ts
│   │   ├── Committees.ts
│   │   ├── Research.ts
│   │   ├── Media.ts
│   │   └── Users.ts
│   ├── globals/                # Payload global configs
│   │   ├── SiteSettings.ts
│   │   ├── Navigation.ts
│   │   ├── Homepage.ts
│   │   └── Footer.ts
│   ├── components/             # React components
│   │   ├── layout/             # Header, Footer, Navigation
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── blocks/             # CMS layout blocks
│   │   └── sections/           # Homepage sections
│   ├── lib/                    # Utilities, API helpers
│   └── styles/                 # Global styles
├── public/                     # Static assets
├── payload.config.ts           # Payload CMS configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json
├── package.json
├── docker-compose.yml          # PostgreSQL + app
├── .env.example
└── PROJECT.md                  # This file
```

---

## 8. Development Phases

### Phase 1 — Foundation
- [ ] Project setup (Next.js + Payload CMS + PostgreSQL)
- [ ] Database schema and CMS collections
- [ ] Admin panel configuration with user roles
- [ ] Base layout (header, mega-menu, footer)

### Phase 2 — Core Pages
- [ ] Homepage with all sections
- [ ] About / Administration pages
- [ ] Academics — departments and courses
- [ ] Faculty directory and profiles
- [ ] Contact page with form

### Phase 3 — Dynamic Content
- [ ] News & Events (CRUD + listing + detail pages)
- [ ] Circulars / Notices
- [ ] Photo & Video Gallery
- [ ] Testimonials

### Phase 4 — Compliance & Specialized
- [ ] NAAC / IQAC / NIRF / AICTE / UGC / ISO document pages
- [ ] Research section
- [ ] Placement section
- [ ] Student Support (committees and cells)
- [ ] Alumni section

### Phase 5 — Integrations & Polish
- [ ] External portal links (application, fee payment, exam results)
- [ ] SEO optimization (sitemap, structured data, meta tags)
- [ ] Performance optimization (image optimization, caching)
- [ ] Mobile responsiveness polish
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Deployment setup (Vercel / Docker)

---

## 9. External Systems (Links Only — Not Rebuilt)

These existing systems will be linked from the new website, not rebuilt:

- **Application Portal:** `application.sgc.edu.in`
- **Fee Payment Portal:** `application.sgc.edu.in`
- **Exam Results Portal:** Existing login-based system
- **NDL / N-LIST:** External library resources
- **NPTEL / SWAYAM:** External learning platforms
