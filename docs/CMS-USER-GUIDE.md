# SGC Website — CMS User Guide

## Getting Started

### Accessing the Admin Panel

1. Open your browser and go to: **https://sgc-website-kappa.vercel.app/admin**
2. Log in with your email and password
3. You'll see the **Dashboard** with all collections listed in the sidebar

### Admin Panel Layout

```
┌─────────────────────────────────────────────────┐
│  Sidebar (left)          │  Main Content (right) │
│                          │                       │
│  Collections:            │  Edit forms, lists,   │
│  - Users                 │  page builder          │
│  - Media                 │                       │
│  - Pages                 │                       │
│  - News                  │                       │
│  - Events                │                       │
│  - Announcements         │                       │
│  - Testimonials          │                       │
│  - Galleries             │                       │
│  - Placements            │                       │
│  - Documents             │                       │
│  - Departments           │                       │
│  - Courses               │                       │
│  - Faculties             │                       │
│                          │                       │
│  Globals:                │                       │
│  - Site Settings         │                       │
│  - Navigation            │                       │
│  - Footer                │                       │
└─────────────────────────────────────────────────┘
```

---

## Managing Site Settings

Go to **Globals → Site Settings** in the sidebar.

### What You Can Edit:

| Field | Description | Example |
|-------|-------------|---------|
| College Name | Full institution name | Saradha Gangadharan College |
| Short Name | Abbreviation | SGC |
| Tagline | Subtitle shown below name | An Autonomous Institution... |
| Logo | Upload college logo (PNG/JPG) | Click "Upload" to change |
| Phone | Contact number | +91-413-2211800 |
| Email | Contact email | info@sgc.edu.in |
| Address | Full address | Lake Road, Velrampet... |
| Map URL | Google Maps link | https://maps.google.com/... |
| Social Media | Facebook, Twitter, Instagram, YouTube, LinkedIn URLs | Full profile URLs |

**After editing:** Click **Save** at the bottom. Changes reflect on the website immediately.

---

## Managing Navigation Menus

Go to **Globals → Navigation** in the sidebar.

### Adding a Menu Item

1. Click **Add Menu Item** at the bottom of the items list
2. Fill in:
   - **Label** — Text shown in the menu (e.g., "About")
   - **Link** — URL path (e.g., "/about")
   - **Open in New Tab** — Check for external links
3. Click **Save**

### Adding Sub-menu Items

1. Click on an existing menu item to expand it
2. Under **Sub-menu Items**, click **Add Sub-menu Item**
3. Fill in Label and Link
4. Click **Save**

### Reordering Menus

- **Drag and drop** menu items using the handle (≡) on the left side
- Sub-menu items can also be reordered within their parent

### Current Menu Structure (from Problem Statement)

```
Home
About → About SGC, Vision & Mission, Administration, Affiliation, Annual Reports, IDP
Academics → Departments, UG/PG Programmes, Add On Course, Roles, Collaboration, Library, Calendar
Admissions → Guidelines, Apply Online, Fee Structure, Prospectus
Research → Centre, Fund, Publications, Innovation
Campus Life → Amenities
Student Support → Clubs, NCC & NSS, Sports
Accreditation → NAAC, IQAC, AICTE, NIRF, ISO
Examination → Schedules, Results, Revaluation
Placements → Overview, Students, Recruiters, Alumni
Scholarship (links to /#scholarships)
Gallery
Contact
```

---

## Managing Footer

Go to **Globals → Footer** in the sidebar.

### What You Can Edit:

- **Link Columns** — Up to 4 columns of links (Quick Links, Academics, Resources, etc.)
  - Each column has a **Title** and a list of **Links** (label + URL)
- **Newsletter Heading** — Title above the subscribe form
- **Newsletter Description** — Subtitle text
- **Copyright** — Copyright text (use `{year}` for auto year)

---

## Creating & Editing Pages (Page Builder)

Go to **Collections → Pages** in the sidebar.

### Creating a New Page

1. Click **Create New**
2. Fill in:
   - **Title** — Page title (e.g., "About SGC")
   - **Slug** — URL path (e.g., "about") — appears in the sidebar
   - The page will be at `https://yoursite.com/about`
3. In the **Layout** section, click **Add Block**
4. Choose a section type from the picker (with preview thumbnails)
5. Fill in the block's content
6. Add more blocks as needed
7. **Drag blocks up/down** to reorder
8. Click **Publish** to make the page live (or **Save Draft** to save without publishing)

### Available Block Types (24 sections)

| Block | What It Does |
|-------|-------------|
| **Hero Section** | Full-width hero with image carousel, college name, CTA buttons |
| **Flash News** | Scrolling news ticker bar |
| **Promo Banner** | Promotional banner cards with CTAs |
| **Quick Access** | Action buttons (Apply, Pay Fees, Prospectus, Results) |
| **About Section** | About text + Chairman's message card with photo |
| **Stats Section** | Animated number counters (Courses: 13+, Faculty: 79+, etc.) |
| **Programmes** | Course cards with UG/PG filter toggle |
| **Scholarship Banner** | Scholarship info cards on dark background |
| **Announcements** | Notice list with NEW badges and category tags |
| **News & Events** | Two-column layout with events and news |
| **Activity Feed** | Campus activity timeline |
| **Why Join SGC** | Feature cards grid (NAAC, Faculty, Placements, etc.) |
| **Placements** | Placement stats with animated progress bars |
| **Recruiter Logos** | Company name grid |
| **Testimonials** | Student quote cards |
| **Compliance Links** | Regulatory link grid (NAAC, IQAC, NIRF, RTI, etc.) |
| **CTA (Call to Action)** | Centered heading + button + phone number |
| **Rich Text** | Free-form content with headings, lists, tables, images |
| **Accreditation Strip** | Accreditation badge cards |
| **Gallery Preview** | Image grid from uploaded media |
| **External Portals** | Portal link cards for external systems |
| **Events & Circulars** | Two-column: events with dates + circulars with filters (auto-pulls from collections) |
| **Faculty Grid** | Faculty cards with photos (auto-pulls from Faculty collection) |

### Section Design Controls

Every block has a **Section Design** panel at the bottom with:

| Control | Options |
|---------|---------|
| Background | White, Light (Cream), Dark (Navy), Gradient, Transparent |
| Padding | None, Small, Normal, Large |
| Border Top | On/Off |
| Border Bottom | On/Off |
| Full Width | On/Off |

Use these to adjust spacing and colors when reordering blocks.

### Publishing Pages

- **Save Draft** — Saves the page but it's NOT visible on the website
- **Publish** — Makes the page live and visible to visitors
- You can **unpublish** a page to take it offline temporarily
- **Version history** is tracked — you can view and restore previous versions

### Multi-level Pages (Nested URLs)

For nested pages like `/about/vision-mission`:
- Set the **Slug** to `about/vision-mission`
- The page will be accessible at `https://yoursite.com/about/vision-mission`

---

## Using the Rich Text Editor

The Rich Text block provides a full content editor:

### Toolbar Features

| Tool | What It Does |
|------|-------------|
| **B** | Bold text |
| **I** | Italic text |
| **U** | Underline |
| **S** | Strikethrough |
| **H1-H4** | Heading levels |
| **""** | Blockquote |
| **•** | Bullet list |
| **1.** | Numbered list |
| **✓** | Checklist |
| **<>** | Inline code |
| **—** | Horizontal rule |
| **🔗** | Insert link |
| **📎** | Upload/embed image from Media library |
| **📊** | Insert table |

### Inserting Images

1. Place cursor where you want the image
2. Click the **Upload** button (📎) in the toolbar
3. Choose an existing image from Media library, or upload a new one
4. The image appears inline in the content

### Inserting Tables

1. Click the **Table** button in the toolbar
2. Choose rows and columns
3. Click cells to edit content
4. Right-click for table options (add/remove rows/columns)

---

## Managing Media (Images & Files)

Go to **Collections → Media** in the sidebar.

### Uploading Media

1. Click **Create New**
2. Click **Upload File** or drag & drop
3. Fill in **Alt Text** (required — describes the image for accessibility)
4. Optionally add a **Caption**
5. Click **Save**

### Supported File Types

- Images: JPG, PNG, GIF, SVG, WebP
- Documents: PDF

### Auto-Generated Sizes

When you upload an image, the system automatically creates:
- **Thumbnail** (400×300) — for small previews
- **Card** (768×512) — for cards and listings
- **Hero** (1920×1080) — for full-width sections

---

## Managing News

Go to **Collections → News** in the sidebar.

### Creating a News Article

1. Click **Create New**
2. Fill in:
   - **Title** — Article headline
   - **Slug** — URL path (auto-suggested from title)
   - **Date** — Publication date
   - **Category** — Academic, Event, Achievement, General
   - **Featured** — Check to highlight on homepage
   - **Image** — Upload a featured image
   - **Excerpt** — Short summary (shown in listings)
   - **Content** — Full article using rich text editor
3. Click **Publish**

The article appears at `https://yoursite.com/news/[slug]` and in the news listing at `/news`.

---

## Managing Events

Go to **Collections → Events** in the sidebar.

### Creating an Event

1. Click **Create New**
2. Fill in:
   - **Title** — Event name
   - **Slug** — URL path
   - **Date** — Event date
   - **Time** — Event time (e.g., "10:00 AM - 4:00 PM")
   - **Venue** — Location
   - **Category** — Academic, Cultural, Sports, Service, Festival
   - **Images** — Upload event photos
   - **Description** — Event details (rich text)
   - **Registration Link** — External URL for registration (optional)
3. Click **Publish**

---

## Managing Announcements / Circulars

Go to **Collections → Announcements** in the sidebar.

### Creating an Announcement

1. Click **Create New**
2. Fill in:
   - **Title** — Notice title
   - **Date** — Date posted
   - **Category** — Examination, Fees, Admission, Academic, General
   - **Attachment** — Upload PDF circular (optional)
   - **Link** — External link (optional)
   - **Pinned** — Check to pin to top of lists
   - **Is New** — Check to show "NEW" badge
3. Click **Save**

Announcements appear in the **Events & Circulars** block on any page.

---

## Managing Departments

Go to **Collections → Departments** in the sidebar.

### Creating a Department

1. Click **Create New**
2. Fill in:
   - **Name** — Full department name (e.g., "Department of Computer Science")
   - **Slug** — URL path (e.g., "computer-science")
   - **Short Name** — Abbreviation (e.g., "CS")
   - **Banner Image** — Department page banner
   - **HOD** — Head of Department (name, designation, photo)
   - **Description** — About the department (rich text)
   - **Layout** — Add blocks for a custom department homepage
3. Click **Publish**

The department page appears at `https://yoursite.com/dept/[slug]` with:
- Hero banner with department name and HOD
- Description content
- Courses offered (auto-pulled from Courses collection)
- Faculty members (auto-pulled from Faculty collection)
- Custom blocks you added

---

## Managing Faculty

Go to **Collections → Faculties** in the sidebar.

### Creating a Faculty Profile

1. Click **Create New**
2. Fill in:
   - **Name** — Full name
   - **Slug** — URL path (e.g., "ramesh-kumar")
   - **Photo** — Upload profile photo
   - **Designation** — e.g., "Associate Professor & HOD"
   - **Qualifications** — e.g., "M.Sc, M.Phil, Ph.D"
   - **Department** — Select the department (relationship)
   - **Specialization** — Research area
   - **Email** — Contact email
   - **Phone** — Contact phone (optional)
   - **Publications** — List of publications (rich text)
   - **Bio** — Full biography (rich text)
   - **Order** — Sort order within department (1, 2, 3...)
   - **Visible** — Uncheck to hide from website
3. Click **Save**

The faculty profile appears at `https://yoursite.com/faculty/[slug]` and on the department page.

---

## Managing Courses

Go to **Collections → Courses** in the sidebar.

### Creating a Course

1. Click **Create New**
2. Fill in:
   - **Name** — Full course name (e.g., "B.Sc Computer Science (Honours)")
   - **Type** — UG, PG, or Add-on
   - **Department** — Select the department
   - **Fees** — Fee per semester (e.g., "₹24,000")
   - **Duration** — e.g., "3 Years"
   - **Eligibility** — Entry requirements
   - **Syllabus** — Upload syllabus PDF (optional)
3. Click **Save**

Courses appear on their department's page automatically.

---

## Managing Gallery

Go to **Collections → Galleries** in the sidebar.

### Creating a Gallery Album

1. Click **Create New**
2. Fill in:
   - **Title** — Album name (e.g., "Annual Day 2026")
   - **Slug** — URL path
   - **Category** — Campus, Events, Sports, Cultural, Academic
   - **Date** — Album date
   - **Description** — Album description
   - **Images** — Click **Add Image** to upload photos (add multiple)
   - **Videos** — Add YouTube URLs (optional)
3. Click **Save**

The album appears at `/gallery/[slug]` and in the gallery listing at `/gallery`.

---

## Managing Documents (Downloads)

Go to **Collections → Documents** in the sidebar.

### Uploading a Document

1. Click **Create New**
2. Fill in:
   - **Title** — Document name
   - **Category** — NAAC, IQAC, NIRF, AICTE, UGC, ISO, RTI, General
   - **File** — Upload PDF
   - **Year** — e.g., "2025-26"
   - **Description** — Brief description
   - **Order** — Sort order within category
3. Click **Save**

Documents appear on the Downloads page (`/downloads`) grouped by category.

---

## Managing Testimonials

Go to **Collections → Testimonials** in the sidebar.

### Adding a Testimonial

1. Click **Create New**
2. Fill in:
   - **Name** — Student/alumni name
   - **Photo** — Upload their photo
   - **Quote** — Their testimonial text
   - **Batch** — e.g., "2020-2023"
   - **Designation** — Current role (e.g., "Software Engineer at TCS")
   - **Department** — Their department
   - **Order** — Display order
3. Click **Save**

---

## Managing Placements

Go to **Collections → Placements** in the sidebar.

### Adding a Placement Record

1. Click **Create New**
2. Fill in:
   - **Company** — Company name
   - **Logo** — Upload company logo
   - **Role** — Job role offered
   - **Students Placed** — Number of students
   - **Package** — CTC range (e.g., "3.5 - 6 LPA")
   - **Year** — Placement year
   - **Category** — IT, Banking, Management, Higher Studies
3. Click **Save**

---

## Draft & Publish Workflow

### How It Works

1. **Content Editors** create content and click **Save Draft**
   - Draft content is NOT visible on the website
   - Only visible in the admin panel

2. **Super Admins** review and click **Publish**
   - Published content becomes visible on the website
   - Version history is maintained

3. To **unpublish** — edit the page and change status back to Draft

### Version History

- Every save creates a new version
- Click **Versions** tab on any page/document to see history
- Click any version to preview it
- Click **Restore** to revert to a previous version

---

## User Roles

| Role | Can Do |
|------|--------|
| **Super Admin** | Everything — create users, publish content, edit settings |
| **Content Editor** | Create and edit content, save drafts (cannot publish or manage users) |
| **Department Admin** | Edit their own department's content |
| **View Only** | View admin panel but cannot edit anything |

### Creating a New User

1. Go to **Collections → Users**
2. Click **Create New**
3. Fill in email, password, name, and role
4. Click **Save**

---

## Quick Reference: Page URLs

| Page | URL |
|------|-----|
| Homepage | `/` |
| About | `/about` |
| Vision & Mission | `/about/vision-mission` |
| Contact | `/contact` |
| Admissions | `/admissions` |
| Placements | `/placements` |
| Research | `/research` |
| Research Incentive Scheme | `/research/incentive-scheme` |
| Research Fund | `/research/fund` |
| Departments listing | `/dept` |
| Department page | `/dept/[slug]` |
| Faculty profile | `/faculty/[slug]` |
| News listing | `/news` |
| News article | `/news/[slug]` |
| Events listing | `/events` |
| Event detail | `/events/[slug]` |
| Gallery | `/gallery` |
| Gallery album | `/gallery/[slug]` |
| Downloads | `/downloads` |
| Admin Panel | `/admin` |

---

## Tips

- **Always fill in Alt Text** when uploading images — it's required and helps accessibility
- **Use descriptive slugs** — `annual-day-2026` is better than `ad26`
- **Preview before publishing** — open the page URL in a new tab to check how it looks
- **Pin important announcements** — check the "Pinned" checkbox to keep them at the top
- **Use the rich text editor** for content-heavy pages (research, policies, guidelines)
- **Drag to reorder** blocks on any page to change the layout
- **Upload PDFs** via Documents collection — they'll appear on the Downloads page automatically
