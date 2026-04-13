# SGC Website Problem Statement Fixes

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all issues identified in the SGC Web Problem Statement — navigation restructuring, UI improvements, content additions, and logo replacement.

**Architecture:** All changes are to existing homepage components and the shared constants/navigation file. No new pages are created (department homepages and faculty profiles are noted as future work requiring content/design spec). Changes touch `constants.ts` for nav/data, individual section components for UI, and layout components for the logo.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Lucide React, Framer Motion

---

## File Map

| File | Changes |
|------|---------|
| `src/lib/constants.ts` | Restructure NAV_ITEMS (About, Academics, Campus Life, Placements, Examination, Student Support, Scholarship), add chairman data |
| `src/components/sections/ProgrammesSection.tsx` | Remove "View All Programmes" button, add full-card color inversion on hover |
| `src/components/sections/AccreditationStrip.tsx` | Remove this section (duplicate of HeroSection accreditation tags + ComplianceLinks) |
| `src/components/sections/AboutSection.tsx` | Add Chairman name/title/details |
| `src/components/layout/Footer.tsx` | Add Google Maps link with college location |
| `src/components/layout/CollegeBanner.tsx` | Update logo path to new logo |
| `src/components/sections/HeroSection.tsx` | Update logo path to new logo |
| `src/app/page.tsx` | Remove AccreditationStrip import/usage, add id to ScholarshipBanner for nav scroll |
| `src/components/sections/ScholarshipBanner.tsx` | Add `id="scholarships"` anchor for nav link |
| `public/` | New logo file needs to be placed here (user must provide) |

---

### Task 1: Restructure Navigation Menu in constants.ts

**Files:**
- Modify: `src/lib/constants.ts:18-99`

This is the biggest change — restructuring the entire NAV_ITEMS array per the problem statement.

- [ ] **Step 1: Update the About menu — add "Institutional Development Plan"**

In `src/lib/constants.ts`, update the About children array:

```ts
{
  label: "About",
  href: "/about",
  children: [
    { label: "About SGC", href: "/about" },
    { label: "Vision & Mission", href: "/about/vision-mission" },
    { label: "Administration", href: "/about/administration" },
    { label: "Affiliation & Recognition", href: "/about/affiliation" },
    { label: "Annual Reports", href: "/about/annual-reports" },
    { label: "Institutional Development Plan", href: "/about/institutional-development-plan" },
  ],
},
```

- [ ] **Step 2: Update the Academics menu — add missing sub-menus**

Replace the Academics entry:

```ts
{
  label: "Academics",
  href: "/academics",
  children: [
    { label: "Departments", href: "/academics/departments" },
    { label: "UG Programmes", href: "/academics/ug-programmes" },
    { label: "PG Programmes", href: "/academics/pg-programmes" },
    { label: "Add On Course", href: "/academics/add-on-course" },
    { label: "Roles & Responsibility", href: "/academics/roles-responsibility" },
    { label: "Academic Collaboration", href: "/academics/academic-collaboration" },
    { label: "Library", href: "/academics/library" },
    { label: "Academic Calendar", href: "/academics/calendar" },
  ],
},
```

- [ ] **Step 3: Add Examination menu**

Add new nav item after Accreditation:

```ts
{
  label: "Examination",
  href: "/examination",
  children: [
    { label: "Examination Schedules", href: "/examination/schedule" },
    { label: "Results", href: "/examination/results" },
    { label: "Revaluation", href: "/examination/revaluation" },
  ],
},
```

- [ ] **Step 4: Restructure Campus Life — only Amenities sub-menu**

Replace Campus Life entry:

```ts
{
  label: "Campus Life",
  href: "/campus-life",
  children: [
    { label: "Amenities", href: "/campus-life/amenities" },
  ],
},
```

- [ ] **Step 5: Add Student Support as separate top-level menu**

Add new nav item after Campus Life:

```ts
{
  label: "Student Support",
  href: "/student-support",
  children: [
    { label: "Clubs & Centres", href: "/student-support/clubs" },
    { label: "NCC & NSS", href: "/student-support/ncc-nss" },
    { label: "Sports", href: "/student-support/sports" },
  ],
},
```

- [ ] **Step 6: Add sub-menus to Placements**

Replace the Placements entry:

```ts
{
  label: "Placements",
  href: "/placements",
  children: [
    { label: "Overview", href: "/placements" },
    { label: "For Students", href: "/placements/students" },
    { label: "For Recruiters", href: "/placements/recruiters" },
    { label: "Alumni", href: "/placements/alumni" },
  ],
},
```

- [ ] **Step 7: Add Scholarship as nav item**

Add Scholarship menu item that scrolls to the homepage scholarship section:

```ts
{
  label: "Scholarship",
  href: "/#scholarships",
},
```

- [ ] **Step 8: Verify the complete NAV_ITEMS array is correct**

The final NAV_ITEMS order should be:
1. Home
2. About (6 sub-menus)
3. Academics (8 sub-menus)
4. Admissions (4 sub-menus)
5. Research (4 sub-menus)
6. Campus Life (1 sub-menu: Amenities)
7. Student Support (3 sub-menus)
8. Accreditation (5 sub-menus)
9. Examination (3 sub-menus)
10. Placements (4 sub-menus)
11. Scholarship (no sub-menus, scrolls to section)
12. Gallery
13. Contact

Run: `npx next build 2>&1 | head -20` to verify no build errors.

- [ ] **Step 9: Commit**

```bash
git add src/lib/constants.ts
git commit -m "feat: restructure navigation per problem statement

- Add Institutional Development Plan to About
- Add Add On Course, Roles & Responsibility, Academic Collaboration to Academics
- Add Examination menu with schedules, results, revaluation
- Restructure Campus Life (Amenities only)
- Add Student Support as separate top-level menu
- Add sub-menus to Placements (Overview, Students, Recruiters, Alumni)
- Add Scholarship nav item linking to homepage section"
```

---

### Task 2: Remove "View All Programmes" Button & Improve Card Hover

**Files:**
- Modify: `src/components/sections/ProgrammesSection.tsx:53-93`

- [ ] **Step 1: Remove the "View All Programmes" button**

Delete lines 81-89 (the `<div className="text-center mt-10">...</div>` block at the bottom of ProgrammesSection).

- [ ] **Step 2: Add full-card color inversion on hover**

Replace the card's Link element (lines 57-77) with inverted-color hover styling. Change the card from white bg with dark text to primary bg with white text on hover:

```tsx
<Link
  key={dept.name}
  href="/academics"
  className="group bg-white rounded-xl p-6 border border-border/50 hover:bg-primary hover:border-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
>
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors shrink-0">
      <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
    </div>
    <div className="flex-1 min-w-0">
      <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-accent/10 text-accent group-hover:bg-white/20 group-hover:text-white rounded-full mb-2">
        {dept.type}
      </span>
      <h3 className="font-semibold text-foreground text-sm leading-snug mb-1 group-hover:text-white transition-colors">
        {dept.name}
      </h3>
      <p className="text-xs text-muted group-hover:text-white/70 transition-colors">{dept.fees} / semester</p>
    </div>
  </div>
</Link>
```

- [ ] **Step 3: Verify visually**

Run: `npm run dev` and check http://localhost:3000 — scroll to Programmes section. Confirm:
- No "View All Programmes" button at bottom
- Card fully inverts to dark blue background with white text on hover

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/ProgrammesSection.tsx
git commit -m "fix: remove View All button and add full-card color inversion on hover"
```

---

### Task 3: Remove Duplicate Accreditation Section

**Files:**
- Modify: `src/app/page.tsx:1-50`
- No changes to `AccreditationStrip.tsx` (keep file, just remove from homepage)

Accreditations appear in: HeroSection (tags), AccreditationStrip (full section), and ComplianceLinks (NAAC/IQAC/NIRF links). The problem statement says this repetition is not required.

- [ ] **Step 1: Remove AccreditationStrip from homepage**

In `src/app/page.tsx`, remove the import line:
```ts
import AccreditationStrip from "@/components/sections/AccreditationStrip";
```

And remove `<AccreditationStrip />` from the JSX.

- [ ] **Step 2: Verify build**

Run: `npx next build 2>&1 | head -20`

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "fix: remove duplicate AccreditationStrip from homepage"
```

---

### Task 4: Add Chairman Details to About Section

**Files:**
- Modify: `src/components/sections/AboutSection.tsx:55-80`

The AboutSection already has a Chairman card with a quote, photo, and name. The problem statement says "Missing Details of Chairman." We need to add more details like designation, qualifications, and a longer message.

- [ ] **Step 1: Enhance the Chairman card with additional details**

Update the chairman card section in `AboutSection.tsx`. Replace the existing card content (inside the `bg-gradient-to-br` div) with expanded details:

```tsx
<div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 text-white">
  <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full blur-2xl" />
  <div className="relative">
    <p className="text-accent font-medium text-sm mb-4 uppercase tracking-wide">From the Chairman&apos;s Desk</p>
    <blockquote className="text-white/90 italic leading-relaxed text-lg mb-6">
      &ldquo;Education is the most powerful weapon which you can use to change the world.
      At SGC, we are committed to providing an education that transforms lives and
      builds a better tomorrow.&rdquo;
    </blockquote>
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-full overflow-hidden relative ring-2 ring-accent/50 ring-offset-2 ring-offset-primary">
        <Image
          src="/founder.jpg"
          alt="Founder - Shri. Swaminathan G"
          fill
          className="object-cover object-top"
          sizes="64px"
        />
      </div>
      <div>
        <p className="font-semibold">Shri. Swaminathan G</p>
        <p className="text-white/60 text-sm">Founder & Chairman</p>
        <p className="text-white/50 text-xs">Sri Saradha Gangadharan Educational Trust</p>
      </div>
    </div>
  </div>
</div>
```

**Note:** If the user has specific chairman details (qualifications, full bio, correct name/title), those should replace the placeholder text. The current data uses what's already in the codebase.

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/AboutSection.tsx
git commit -m "fix: add more chairman details to About section"
```

---

### Task 5: Add College Location with Google Maps Link

**Files:**
- Modify: `src/lib/constants.ts:1-16` (add map URL to SITE_CONFIG)
- Modify: `src/components/layout/Footer.tsx:53-57` (make address a clickable map link)

- [ ] **Step 1: Add Google Maps URL to SITE_CONFIG**

In `src/lib/constants.ts`, add a `mapUrl` field to SITE_CONFIG:

```ts
export const SITE_CONFIG = {
  name: "Saradha Gangadharan College",
  shortName: "SGC",
  tagline: "An Autonomous Institution Affiliated to Pondicherry University",
  phone: "+91-413-2211800",
  email: "info@sgc.edu.in",
  address: "Lake Road, Velrampet, Puducherry — 605 004, India",
  mapUrl: "https://maps.google.com/?q=Saradha+Gangadharan+College+Puducherry",
  website: "https://sgc.edu.in",
  social: {
    facebook: "https://facebook.com/sgcpdy",
    twitter: "https://twitter.com/sgcpdy",
    instagram: "https://instagram.com/sgcpdy",
    youtube: "https://youtube.com/@sgcpdy",
    linkedin: "https://linkedin.com/school/sgcpdy",
  },
};
```

Also update the `address` field to the full address with street name.

- [ ] **Step 2: Make the footer address a clickable Google Maps link**

In `src/components/layout/Footer.tsx`, replace the static address div (lines 53-56):

```tsx
<a
  href={SITE_CONFIG.mapUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-start gap-2 text-sm text-white/70 hover:text-accent transition-colors"
>
  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
  {SITE_CONFIG.address}
  <ExternalLink className="w-3 h-3 shrink-0 mt-1" />
</a>
```

- [ ] **Step 3: Verify the link works**

Run dev server and click the address in the footer — it should open Google Maps.

- [ ] **Step 4: Commit**

```bash
git add src/lib/constants.ts src/components/layout/Footer.tsx
git commit -m "feat: add clickable Google Maps location link in footer"
```

---

### Task 6: Add Scholarship Section Anchor for Nav Link

**Files:**
- Modify: `src/components/sections/ScholarshipBanner.tsx:7`

- [ ] **Step 1: Add id="scholarships" to the section element**

In `ScholarshipBanner.tsx`, change:
```tsx
<section className="py-16 bg-gradient-to-br from-[#1e3a5f] to-[#15294a] text-white relative overflow-hidden">
```
to:
```tsx
<section id="scholarships" className="py-16 bg-gradient-to-br from-[#1e3a5f] to-[#15294a] text-white relative overflow-hidden">
```

This allows the `/#scholarships` nav link from Task 1 to scroll to this section.

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/ScholarshipBanner.tsx
git commit -m "feat: add scholarships anchor id for nav scroll link"
```

---

### Task 7: Logo Replacement (Requires User Input)

**Files:**
- Modify: `public/logo.png` (replace file)
- No code changes needed — all components already reference `/logo.png`

- [ ] **Step 1: Get new logo from user**

The user needs to provide the new logo file. Once provided, replace `public/logo.png` with the new file.

- [ ] **Step 2: Verify logo renders correctly**

Run dev server and check:
- CollegeBanner (top of page)
- HeroSection (hero area)
- Footer (bottom left)

All three reference `/logo.png` and should show the new logo.

- [ ] **Step 3: Commit**

```bash
git add public/logo.png
git commit -m "fix: replace old college logo with new logo"
```

---

## Out of Scope (Needs Design/Content Spec)

These items from the problem statement require significant content and design decisions before implementation:

1. **Department homepages** — "Required a unique home page for all departments" — needs content, faculty data, department descriptions, and photos for each of the 13 departments
2. **Faculty profile pages** — "Full descriptions of a particular staff" with scroll view — needs faculty database (names, photos, qualifications, publications, etc.)
3. **New logo file** — the problem statement mentions replacing with new logo but the actual image file must be provided by the user

---

## Execution Order

Tasks 1-6 can be executed in this order (some are independent):
- **Task 1** (nav restructure) — foundational, do first
- **Tasks 2, 3, 4, 5, 6** — independent of each other, can be parallelized
- **Task 7** — blocked on user providing the new logo file
