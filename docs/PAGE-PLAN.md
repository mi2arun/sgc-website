# Page Plan — SGC website content migration

> **Purpose:** every page in the target site, planned individually before any
> migration. We design each page with intent — block sequence, content
> strategy, source material — instead of blanket-scraping the old site.
>
> **How to read each entry:**
>
> - **Slug** — URL path on the new site
> - **State** — `✓ exists` / `✚ new` / `↻ rewrite` (existing but content needs replacement)
> - **Purpose** — who reads it, what they need
> - **Blocks** — proposed block sequence (Hero variant → RichText sections → structural blocks → CTA)
> - **Source** — original sgc.edu.in URL if any (`—` means no direct source)
> - **Content** — `KEEP existing` / `MERGE source` / `DRAFT fresh` / `LINK to PDF only`
> - **Notes** — anything specific
>
> **Conventions:**
>
> - Hero variants: `marketing` (slideshow + CTAs), `split` (text+image), `minimal` (compact), `video`
> - Every page MUST have a hero (any variant) for visual consistency
> - Compliance / regulatory pages may just be a Hero + RichText + a list of PDF download links
> - Department detail pages (`/dept/<slug>`) and Course detail pages are **rendered from collections**, not Page records — they're not in this doc

---

## Status legend

| Marker | Meaning |
|---|---|
| ✓ | Page exists with curated content — keep |
| ↻ | Page exists but content needs rewrite / refinement |
| ✚ | New page to be created |
| 🚧 | Blocked / needs decision |

---

# 1. Home

### `/` — Home  ✓
- **Purpose:** First impression. Drive admissions traffic. Surface news, events, programmes, placements.
- **Blocks:** Hero (marketing, 2 slides) → Flash News → Quick Access → About teaser → Stats → Programmes → Scholarship → Announcements → News & Events → Why Join → Placements → Recruiter Logos → Testimonials → Compliance Links → CTA
- **Source:** sgc.edu.in/sgc/home_page (reference only)
- **Content:** KEEP existing — already curated with proper SGC blocks
- **Notes:** Hero already populated. Verify Announcements collection has fresh entries. Recruiter logos hardcoded — fine for now.

---

# 2. About

### `/about` — About SGC  ✓
- **Purpose:** Institutional overview. History, mission, scale.
- **Blocks:** Hero (marketing, tall, centered) → About block (chairman quote + intro) → Stats → Why Join → CTA
- **Source:** sgc.edu.in/sgc/about_sgc
- **Content:** KEEP existing structure, REFINE copy — source has institutional history worth pulling
- **Notes:** Hero already set ("A College with a Mission")

### `/about/vision-mission` — Vision & Mission  ✓
- **Purpose:** Standalone Vision and Mission statements. Often referenced in accreditation contexts.
- **Blocks:** Hero (minimal) → RichText (Vision heading + body) → RichText (Mission heading + body)
- **Source:** sgc.edu.in/sgc/vision_mission
- **Content:** KEEP existing — was carefully written; don't touch
- **Notes:** This is the one my migration overwrote — now restored

### `/about/administration` — Administration  ✚
- **Purpose:** Profile of Principal + senior leadership.
- **Blocks:** Hero (split: portrait + name) → RichText (bio, qualifications, vision message) → Faculty Grid (filter: leadership designation) → CTA (Contact)
- **Source:** sgc.edu.in/sgc/principal_profile
- **Content:** MERGE source — Dr. S. Babu profile is the core content
- **Notes:** Decide whether senior leadership becomes Faculty records with a "Leadership" designation, or a separate Site Settings group

### `/about/affiliation` — Affiliation & Recognition  ✚
- **Purpose:** Document the official recognitions — Pondicherry University, autonomous status, ISO.
- **Blocks:** Hero (minimal) → RichText (3 sections: PU / Autonomous / ISO with brief explanations) → CTA
- **Source:** sgc.edu.in/sgc/home (Autonomous PDF), assets/docs/Affiliation 2024-25.pdf
- **Content:** DRAFT fresh — write a paragraph each for PU/Autonomous/ISO. LINK to PDFs at bottom.
- **Notes:** Replaces what source treated as 3 separate menu items

### `/about/annual-reports` — Annual Reports  ✚
- **Purpose:** Archive of annual reports for transparency / accreditation.
- **Blocks:** Hero (minimal) → RichText intro → Compliance Links block (list of PDFs by year)
- **Source:** sgc.edu.in (Annual Report 21-22, 22-23, 23-24 PDFs)
- **Content:** LINK to PDF only — short intro then download list
- **Notes:** This page becomes a hub. Future reports land here.

### `/about/institutional-development-plan` — Institutional Development Plan  ✚
- **Purpose:** IDP document required by UGC. Show strategic direction.
- **Blocks:** Hero (minimal) → RichText (executive summary) → Compliance Links (full IDP PDF + UGC guideline PDFs)
- **Source:** sgc.edu.in/sgc/development_plan
- **Content:** DRAFT fresh executive summary, LINK source PDF
- **Notes:** Heavy regulatory content — keep concise on page, route to PDF for detail

---

# 3. Academics

### `/academics` — Academics overview  ✚
- **Purpose:** Landing page for all academic content. Direct users to UG/PG/Departments/Library.
- **Blocks:** Hero (marketing, medium) → RichText intro → Programmes block (UG/PG filter tabs) → Faculty Grid (showcase) → CTA (Apply)
- **Source:** —
- **Content:** DRAFT fresh
- **Notes:** No equivalent source page — we're creating a proper landing

### `/academics/ug-programmes` — UG Programmes  ✚
- **Purpose:** Detail page for all 9 UG programmes with fees, eligibility, duration.
- **Blocks:** Hero (marketing, medium) → RichText intro → Programmes block (filter=UG) → CTA (Apply)
- **Source:** sgc.edu.in/sgc/ug
- **Content:** Programmes block reads from Courses collection — make sure all 9 UG courses have full details (eligibility, fees, duration, syllabus PDF). MERGE source for individual programme paragraphs.
- **Notes:** Anchor IDs on this page back the navigation grandchildren: #ba-english, #bcom, #bba, #bcom-cs, #bsc-math, #bsc-physics, #bsc-cs, #bca, #bsc-it

### `/academics/pg-programmes` — PG Programmes  ✚
- **Purpose:** Same as UG but for 4 PG programmes.
- **Blocks:** Hero (marketing, medium) → RichText intro → Programmes block (filter=PG) → CTA
- **Source:** sgc.edu.in/sgc/pg
- **Content:** Same approach as UG. Anchors: #ma-english, #mcom, #msc-math, #msc-cs

### `/academics/add-on-course` — Add-on Courses  ✚
- **Purpose:** Skill-development courses outside the main degree.
- **Blocks:** Hero (minimal) → RichText (list of courses with descriptions)
- **Source:** sgc.edu.in/sgc/add_on_courses
- **Content:** MERGE source — get the list, format cleanly
- **Notes:** Consider whether each add-on becomes a Course record (type='Add-on') or stays as listed text

### `/academics/calendar` — Academic Calendar  ✚
- **Purpose:** Important dates: semester start/end, exam windows, holidays.
- **Blocks:** Hero (minimal) → RichText intro → Compliance Links (downloadable calendar PDF)
- **Source:** assets/docs/academic_calendar.pdf
- **Content:** LINK to PDF + short intro
- **Notes:** Could later become a structured calendar widget; for now PDF link is fine

### `/academics/library` — Library  ✚
- **Purpose:** Library resources, hours, e-content access.
- **Blocks:** Hero (split: library photo + intro) → RichText (general library + departmental libraries) → Portals block (NDL, N-LIST, E-Content links) → CTA
- **Source:** sgc.edu.in/sgc/general_library
- **Content:** MERGE source — library description; build the Portals block fresh with the 3 external resources
- **Notes:** NDL / N-LIST already linked from main nav too

### `/academics/academic-collaboration` — Academic Collaboration  ✚
- **Purpose:** MoUs with other institutions.
- **Blocks:** Hero (minimal) → RichText (list of MoUs by partner) → Compliance Links (MoU PDFs if any)
- **Source:** sgc.edu.in/sgc/mou
- **Content:** MERGE source — extract MoU partners
- **Notes:** Could become its own MoU collection later if many

### `/academics/roles-responsibility` — Roles & Responsibility  ✚
- **Purpose:** Management responsibility/authority chart (QAD-010).
- **Blocks:** Hero (minimal) → RichText intro → Compliance Links (PDF)
- **Source:** assets/docs/QAD 010 - MANAGEMENT RESPONSIBILITY AUTHORITY.pdf
- **Content:** LINK to PDF + short context
- **Notes:** Niche — likely only accreditors care. Could move to Compliance section.

---

# 4. Admissions

### `/admissions` — Admissions overview  ✓
- **Purpose:** Convince prospects to apply. List eligibility, fees, dates, steps.
- **Blocks:** Hero (marketing, medium, eyebrow="Admissions Open") → RichText (process overview) → Quick Access (Apply / Fees / Prospectus) → Scholarship block → CTA
- **Source:** sgc.edu.in/sgc/admission_guide
- **Content:** REFINE existing — content already there from past curation; tighten copy
- **Notes:** Hero already set

### `/admissions/apply` — Apply Online  ✚
- **Purpose:** Redirect / wrapper for the external application portal.
- **Blocks:** Hero (minimal) → RichText (how-to instructions) → CTA (open external portal)
- **Source:** application.sgc.edu.in (external)
- **Content:** DRAFT fresh — instructions on what to have ready, then big "Open Application Portal" button
- **Notes:** External portal lives off-site; this page is a friendly handoff

### `/admissions/fees` — Fee Structure  ✚
- **Purpose:** Show fees per programme.
- **Blocks:** Hero (minimal) → RichText intro → Programmes block (already shows fees) → CTA (Online Fee Payment)
- **Source:** —
- **Content:** Reuse Programmes block; add explanatory copy
- **Notes:** Online Fee Payment is on external portal too

### `/admissions/prospectus` — Prospectus  ✚
- **Purpose:** Download the current prospectus PDF.
- **Blocks:** Hero (minimal) → RichText (what's inside) → Compliance Links (PDF)
- **Source:** assets/docs/Pros 2024.pdf
- **Content:** LINK to PDF + 2-3 line description
- **Notes:** Update annually

### `/admissions/refund-policy` — Refund Policy  ✚
- **Purpose:** Document UGC-mandated fee refund policy.
- **Blocks:** Hero (minimal) → RichText summary → Compliance Links (UGC policy PDF)
- **Source:** assets/docs/UGC_Guidelines_Fee_Refund_Policy.pdf
- **Content:** DRAFT fresh summary in our own words + LINK to UGC PDF
- **Notes:** Required by UGC

---

# 5. Research

### `/research` — Centre for Research  ✓
- **Purpose:** Research overview, link to incentives/funds/awards.
- **Blocks:** Hero (minimal, scholarly tone) → RichText (intro to CRP) → Quick Access (Fund / Incentive / Excellence Award / Publications) → CTA
- **Source:** sgc.edu.in/sgc/center_for_research_publication
- **Content:** KEEP existing — already has hero. Refine RichText.
- **Notes:** —

### `/research/fund` — Research Fund (SGRF)  ✓
- **Purpose:** Detail the SGRF programme.
- **Blocks:** Hero (minimal) → RichText (eligibility, amount, how to apply) → CTA
- **Source:** sgc.edu.in/sgc/sg_research_fund
- **Content:** KEEP existing structure, refine if needed
- **Notes:** —

### `/research/incentive-scheme` — Research Incentive Scheme (RIS)  ✓
- **Purpose:** Detailed scheme for research incentives (per publication, project, conference, patent etc.).
- **Blocks:** Hero (minimal) → RichText sections for each incentive type → CTA
- **Source:** sgc.edu.in/sgc/research_incentive_scheme
- **Content:** REFINE existing — currently has 9 rich-text blocks; consolidate into one well-organised RichText with eyebrow + heading per section
- **Notes:** Source has anchor links: #about-ris, #incentives-for-publication, #incentives-for-projects, etc. — preserve these

### `/research/publications` — Research Outcome  ✚
- **Purpose:** Showcase faculty publications + book chapters + patents.
- **Blocks:** Hero (minimal) → RichText (overview) → Stats (publications count, citations) → CTA
- **Source:** sgc.edu.in/sgc/research_outcome
- **Content:** MERGE source — publication list. Eventually becomes a Publications collection.
- **Notes:** For now static; later we can build a Publications collection

### `/research/innovation` — Innovation & Startup (IIC + NSIP)  ✚
- **Purpose:** Document IIC activities and SGC Innovation & Startup Policy.
- **Blocks:** Hero (minimal) → RichText (IIC overview + activities) → RichText (Innovation Policy summary + PDF link)
- **Source:** sgc.edu.in/sgc/iic_activities and sgc.edu.in/sgc/nsip
- **Content:** MERGE source — combine the two existing source pages into one
- **Notes:** Reduces nav clutter — was 2 menu items, becomes 1 page with 2 sections

### `/research/excellence-award` — SG Excellence Award for Research  ✚
- **Purpose:** Award programme for outstanding research.
- **Blocks:** Hero (minimal) → RichText (criteria, past winners) → CTA
- **Source:** sgc.edu.in/sgc/sg_excellence_Award_for_research
- **Content:** MERGE source
- **Notes:** Possibly merge into /research/incentive-scheme if content is thin

### `/research/gallery` — Research Gallery  ✚
- **Purpose:** Photos from research events, conferences.
- **Blocks:** Hero (minimal) → Gallery Preview (filter category="Research" if we add it)
- **Source:** sgc.edu.in/sgc/research_gallery
- **Content:** Could use Gallery collection with category filter, OR a Gallery album titled "Research"
- **Notes:** Depends on volume of photos

---

# 6. Student Life

### `/campus-life` — Student Life overview  ✚
- **Purpose:** Landing page for student-facing content. Amenities, sports, clubs, support cells.
- **Blocks:** Hero (marketing, medium, image: students on campus) → RichText intro → Quick Access (Amenities / Clubs / Sports / Support Cells) → Gallery Preview → CTA
- **Source:** —
- **Content:** DRAFT fresh
- **Notes:** Becomes the parent landing for everything under Student Life

### `/campus-life/amenities` — Amenities  ✚
- **Purpose:** Library, canteen, transport, hostel etc. that students need to know about.
- **Blocks:** Hero (minimal) → RichText (sections for each amenity with photos)
- **Source:** sgc.edu.in/sgc/amenities
- **Content:** MERGE source — list and describe each amenity
- **Notes:** Use inline-image aligned blocks inside the RichText

### `/student-support` — Student Support overview  ✚
- **Purpose:** Hub for all support cells.
- **Blocks:** Hero (minimal) → RichText intro → Quick Access (links to each cell) → CTA (Contact Grievance Cell)
- **Source:** sgc.edu.in/sgc/stu_support (anchor-based)
- **Content:** DRAFT fresh — short summary per cell
- **Notes:** Each cell gets its OWN page below — this is just the hub

### `/student-support/sc-st` — SC/ST Cell  ✚
- **Purpose:** Inform students of SC/ST cell, members, procedures, complaint mechanism.
- **Blocks:** Hero (minimal) → RichText (purpose + members + procedure) → CTA (Contact)
- **Source:** sgc.edu.in/sgc/stu_support#sc-st-cell
- **Content:** MERGE source — extract committee members from source page
- **Notes:** All support-cell pages follow this same pattern

### `/student-support/grievance` — Grievance Redressal Cell  ✚
- Same pattern as SC/ST
- **Source:** sgc.edu.in/sgc/stu_support#grc

### `/student-support/anti-ragging` — Anti-Ragging Cell  ✚
- Same pattern
- **Source:** sgc.edu.in/sgc/stu_support#arc

### `/student-support/icc` — Internal Complaints Committee (ICC)  ✚
- Same pattern
- **Source:** sgc.edu.in/sgc/stu_support#icc

### `/student-support/equal-opportunity` — Equal Opportunity Cell  ✚
- Same pattern
- **Source:** sgc.edu.in/sgc/stu_support#eoc

### `/student-support/career-development` — Career Development Cell  ✚
- Same pattern
- **Source:** sgc.edu.in/sgc/stu_support#cdt

### `/student-support/health-care` — Health Care  ✚
- **Purpose:** Campus health services, first-aid, partnered hospitals.
- **Source:** sgc.edu.in/sgc/stu_support#health

### `/student-support/pwd` — Facilities for PwD Students  ✚
- **Purpose:** Accessibility services.
- **Source:** sgc.edu.in/sgc/stu_support#facilities

### `/student-support/clubs` — Centres & Clubs  ✚
- **Purpose:** Student clubs and activity centres.
- **Blocks:** Hero (minimal) → RichText (list of clubs + activities) → Gallery Preview → CTA
- **Source:** sgc.edu.in/sgc/centres_clubs
- **Content:** MERGE source

### `/student-support/sports` — Sports  ✚
- **Purpose:** Sports facilities, teams, achievements.
- **Source:** sgc.edu.in/sgc/sports
- **Notes:** Could pair with Gallery Preview for sports events

### `/student-support/ncc-nss` — NCC & NSS  ✚
- **Purpose:** National Cadet Corps + National Service Scheme activities.
- **Source:** sgc.edu.in/sgc/ncc
- **Notes:** Source has NCC only — NSS may need fresh content

---

# 7. Accreditation

### `/accreditation` — Accreditation overview  ✚
- **Purpose:** Hub linking NAAC/IQAC/NIRF/AICTE/ISO/UGC content.
- **Blocks:** Hero (minimal, eyebrow="Quality Assurance") → Accreditation Strip block → CTA
- **Source:** —
- **Content:** DRAFT fresh
- **Notes:** Compliance Links block lists landing pages of each accreditation

### `/accreditation/naac` — NAAC  ✚
- **Purpose:** Show NAAC A+ grade, SSR cycles, certificates.
- **Blocks:** Hero (minimal) → RichText (NAAC story: SGC accredited A+ in Cycle II) → Compliance Links (5 PDFs: IIQA, SSR, DVV, Certificate, IIQA Declaration)
- **Source:** sgc.edu.in/sgc/naac_cycle_II + PDF links
- **Content:** DRAFT fresh prose; LINK PDFs
- **Notes:** Anchor IDs: #ssr, #aqar, #best-practices (preserve from nav)

### `/accreditation/iqac` — IQAC  ✚
- **Purpose:** Document IQAC composition, meeting minutes, AQAR reports.
- **Blocks:** Hero (minimal) → RichText intro → Compliance Links (Composition by year) → Compliance Links (Minutes by year) → Compliance Links (AQAR by year)
- **Source:** Numerous PDFs (4 compositions + 16 minutes + 7 AQAR-related)
- **Content:** DRAFT short intro; LINK ALL PDFs in organised lists
- **Notes:** Anchor IDs: #composition, #minutes, #aqar — preserve from nav. Lots of PDFs — could later become a Documents collection filter view.

### `/accreditation/aicte` — AICTE  ✚
- **Purpose:** AICTE recognition for BBA programme.
- **Blocks:** Hero (minimal) → RichText (explanation) → Compliance Links (EOA, LOA, Mandatory Disclosure, feedback portal links)
- **Source:** sgc.edu.in AICTE PDFs + aicte-india.org feedback URLs
- **Content:** DRAFT fresh

### `/accreditation/nirf` — NIRF  ✚
- **Purpose:** National Institutional Ranking Framework annual reports.
- **Blocks:** Hero (minimal) → RichText intro → Compliance Links (NIRF reports 2019-2026)
- **Source:** 8 PDFs
- **Content:** Short intro + 8-year archive

### `/accreditation/ariia` — ARIIA  ✚
- **Purpose:** Atal Ranking of Institutions on Innovation Achievements.
- **Blocks:** Hero (minimal) → RichText intro → Compliance Links (ARIIA 2021, 2022 reports)
- **Source:** 2 PDFs
- **Notes:** Could fold into /accreditation/nirf as a section if low volume

### `/accreditation/iso` — ISO 9001:2015  ✚
- **Purpose:** ISO certification.
- **Blocks:** Hero (minimal) → RichText (Quality Policy + certificate context) → Compliance Links (Certificate PDF)
- **Source:** assets/docs/ISOcertificate.pdf, quality-policy.jpg
- **Content:** DRAFT fresh
- **Notes:** Quality Policy is a JPG on source — re-create as text on this page

### `/accreditation/ugc` — UGC Guidelines & Compliance  ✚
- **Purpose:** Documents UGC compliance — guidelines for IDP, SEDG, accessibility, R&D cell, public disclosure.
- **Blocks:** Hero (minimal) → RichText (what each guideline covers) → Compliance Links (6 PDFs from UGC)
- **Source:** 6 PDFs (IDP / SEDG / Accessibility / R&D Cell / Public Self-Disclosure / Undertaking)
- **Content:** DRAFT short intro; LINK PDFs

---

# 8. Examination

### `/examination` — Examination overview  ✚
- **Purpose:** Timetable, results, revaluation.
- **Blocks:** Hero (minimal) → RichText intro → Quick Access (Schedule / Results / Revaluation)
- **Source:** sgc.edu.in/sgc/examination
- **Content:** DRAFT fresh

### `/examination/schedule` — Schedule  ✚
- **Blocks:** Hero → RichText (upcoming exam schedules) or Compliance Links (PDF timetables)
- **Source:** Same as above
- **Notes:** Will update each semester

### `/examination/results` — Results  ✚
- **Purpose:** Wrapper that hands off to external login-protected portal.
- **Blocks:** Hero → RichText (login instructions) → CTA (Open Results Portal)
- **Source:** sgc.edu.in/sgc/examlogin (external)

### `/examination/revaluation` — Revaluation  ✚
- Same pattern as Results
- **Source:** sgc.edu.in/sgc/revaluationlogin

---

# 9. Placements

### `/placements` — Placements overview  ✓
- **Purpose:** Show placement strength. Convince students + recruiters.
- **Blocks:** Hero (marketing, eyebrow="Class of 2025") → Stats → Placements block (by sector %) → Recruiter Logos → Testimonials → CTA
- **Source:** sgc.edu.in/sgc/placement_officer
- **Content:** REFINE existing
- **Notes:** Hero already set

### `/placements/students` — For Students  ✚
- **Purpose:** Placement preparation, training, drives, schedule.
- **Blocks:** Hero (minimal) → RichText (what students should do) → CTA (Career Development Cell)
- **Source:** —
- **Content:** DRAFT fresh

### `/placements/recruiters` — For Recruiters  ✚
- **Purpose:** Pitch for companies wanting to recruit.
- **Blocks:** Hero (minimal) → RichText (campus drive process) → Stats → Recruiter Logos → CTA (Contact Placement Cell)
- **Source:** —
- **Content:** DRAFT fresh

### `/placements/alumni` — Alumni  ✚ 🚧
- **Purpose:** Alumni section. Per your direction, **plan fresh — don't migrate source content** (source is dated).
- **Blocks:** TBD — need scoping session with you
- **Notes:** Decide: 1) Stay under Placements? Or own top-level menu? 2) Just testimonials + association info? Or registration form too?

### `/placements/job-openings` — Job Openings  ✚
- **Purpose:** Current placement openings.
- **Blocks:** Hero (minimal) → Activity Feed (or list)
- **Source:** sgc.edu.in/sgc/job_openings
- **Notes:** If openings churn often, could become its own JobOpenings collection

---

# 10. Contact

### `/contact` — Contact Us  ✓
- **Purpose:** Address, phone, email, map.
- **Blocks:** Hero (minimal) → RichText (contact details) → CTA (Get Directions to map)
- **Source:** sgc.edu.in/sgc/contact
- **Content:** REFINE existing
- **Notes:** Contact details also in Site Settings — could auto-populate

---

# 11. Test / utility (clean up)

### `/staff` ✓
- **Purpose:** Current content unclear — likely placeholder
- **Action:** review and decide: keep, repurpose, or delete

### `/design-demo` ✓
- **Purpose:** RichText feature showcase from earlier in this session
- **Action:** delete from prod when comfortable; keep on local for reference

---

# Migration approach — page-by-page

Per your direction, we will now migrate **one page at a time**, in priority order:

1. **You pick the next page** from this doc (or I propose based on impact)
2. **We discuss** what content goes where, what blocks the page uses
3. **I build it** — either via admin UI walkthrough or via a focused API script for that page only
4. **You review** the rendered result
5. **Mark it ✓ in this doc** and move to the next

## Suggested priority order

1. `/about/affiliation` — needed for accreditation references everywhere
2. `/admissions/apply`, `/admissions/fees`, `/admissions/prospectus`, `/admissions/refund-policy` — admissions cluster (high-traffic)
3. `/accreditation` + 7 sub-pages — bulk of content, all share similar structure (Hero + RichText + Compliance Links)
4. `/academics` cluster — UG / PG / Library / Calendar
5. `/student-support` cluster — 12 pages, mostly similar structure
6. `/research` extras — publications, innovation, excellence award
7. `/examination`, `/placements` sub-pages
8. `/about/administration`, `/about/annual-reports`, `/about/institutional-development-plan`

---

# Open questions for you

| # | Question |
|---|---|
| 1 | Should each Student Support cell get its own page (12 pages) or stay as anchors on one page? |
| 2 | Alumni section design — what's your "entirely new idea"? |
| 3 | PDF archive pages (NIRF / IQAC AQARs etc.) — list them on the parent page, or build a Documents-collection filter view (e.g., `/documents?category=IQAC`)? |
| 4 | Should we add Department-specific pages (`/dept/<slug>`) more content (faculty list, courses, events from that dept)? Currently they're auto-rendered from the Departments collection only. |
| 5 | Are there pages on the source site we should **drop entirely** as no longer relevant? |
