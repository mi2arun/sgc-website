// Academics cluster — 5 pages
// /academics (parent), /academics/ug-programmes, /pg-programmes, /library, /calendar

const BASE = 'http://localhost:3000'
const DOCS = 'https://sgc.edu.in/assets/docs'

const para = (text) => ({
  type: 'paragraph',
  children: [{ type: 'text', text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
  direction: 'ltr', format: '', indent: 0, textFormat: 0, textStyle: '', version: 1,
})
const bullet = (text) => ({
  type: 'paragraph',
  children: [{ type: 'text', text: '• ' + text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
  direction: 'ltr', format: '', indent: 0, textFormat: 0, textStyle: '', version: 1,
})
const btn = (label, link, variant = 'primary', align = 'left', newTab = true) => ({
  type: 'block', format: '', version: 2,
  fields: { blockType: 'inline-button', label, link, variant, align, openInNewTab: newTab },
})
const callout = (variant, title, body) => ({
  type: 'block', format: '', version: 2,
  fields: { blockType: 'callout', variant, title, body },
})
const root = (...children) => ({
  root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 },
})

const heroCompact = (eyebrow, title, subtitle, imageId = 12) => ({
  blockType: 'hero', enabled: true, variant: 'marketing',
  eyebrow, title, titleAccent: '', subtitle, trustLine: '', badges: [],
  showLogo: false,
  slides: [{ image: imageId, ctaLabel: '', ctaLink: '' }],
  height: 'compact', alignment: 'left',
  showBadges: false, showArrows: false, showIndicators: false, showScrollIndicator: false,
  overlayOpacity: 72, overlayColor: 'navy',
  showDecorativeRings: false, showDotPattern: true,
  autoplay: false, autoplaySpeed: 6000, pauseOnHover: true,
})
const heroMedium = (eyebrow, title, subtitle, imageId = 1) => ({ ...heroCompact(eyebrow, title, subtitle, imageId), height: 'medium' })

const cta = (heading, description, label, link) => ({
  blockType: 'cta', enabled: true,
  heading, description, buttonLabel: label, buttonLink: link, phone: '',
})

// ─── /academics (parent) ───
const ACADEMICS = {
  slug: 'academics',
  title: 'Academics',
  layout: [
    heroMedium('Programmes · Faculty · Library', 'Academic Excellence', '13 programmes across Arts, Science, Commerce, Management — taught by 79 faculty.'),
    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'What we teach',
      heading: 'A curriculum that updates with the world',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('SGC offers undergraduate and postgraduate programmes in English, Mathematics, Physics, Computer Science, IT, Computer Applications, Commerce, Corporate Secretaryship, and Business Administration.'),
        para('Our autonomous status gives us freedom to design syllabi, introduce electives, and respond to industry needs without waiting for university-wide cycles. Add-on certifications and skill-development modules run alongside the main degree programmes.'),
      ),
    },
    { blockType: 'programmes', enabled: true, title: 'All Programmes', subtitle: 'Filter to see UG-only or PG-only', typeFilter: 'all', limit: 24 },
    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Resources',
      heading: 'Beyond the classroom',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('Library access (general + departmental), digital learning portals (NDL, N-LIST), and structured academic collaborations support every programme.'),
        btn('Library & Resources', '/academics/library', 'primary', 'left', false),
        btn('Academic Calendar', '/academics/calendar', 'outline', 'left', false),
      ),
    },
    cta('Ready to apply?', 'Admissions for 2026-27 are open. The application takes about 10 minutes.', 'Apply Now', '/admissions/apply'),
  ],
}

// ─── /academics/ug-programmes ───
const UG = {
  slug: 'academics/ug-programmes',
  title: 'UG Programmes',
  layout: [
    heroMedium('Undergraduate', 'UG Programmes', '9 undergraduate programmes. Three-year degrees with Honours.'),
    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'What to expect',
      heading: 'Three years. Strong fundamentals. Industry exposure.',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('Every UG programme at SGC follows the CBCS framework with NEP alignment. The first year builds foundational concepts; the second adds depth; the third focuses on specialisation, internships, and industry-readiness.'),
        para('Eligibility for most UG programmes is 10+2 with 50% aggregate (45% for SC/ST/OBC). Programme-specific requirements are listed under each course.'),
      ),
    },
    { blockType: 'programmes', enabled: true, title: 'UG Programmes Offered', subtitle: '', typeFilter: 'UG', limit: 24 },
    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: '',
      heading: '',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        callout('info', 'Fees structure',
          'All fees are per semester. Pay online via the student portal. See the Admissions section for the full breakdown including hostel and transport.'),
        btn('View Fee Structure', '/admissions/fees', 'outline', 'left', false),
      ),
    },
    cta('Begin your application', 'Three years of focused undergraduate study starts here.', 'Apply Online', '/admissions/apply'),
  ],
}

// ─── /academics/pg-programmes ───
const PG = {
  slug: 'academics/pg-programmes',
  title: 'PG Programmes',
  layout: [
    heroMedium('Postgraduate', 'PG Programmes', '4 postgraduate programmes. Research orientation, advanced specialisations.'),
    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'What to expect',
      heading: 'Two years. Deeper. More autonomous.',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('PG programmes at SGC are designed for graduates who want to specialise — through coursework, research projects, dissertations, and internships with industry or academic partners.'),
        para('Eligibility varies by programme: M.A and M.Com require a 50% UG, while M.Sc programmes require 55%. Specific UG disciplines may be required (e.g., M.Sc Computer Science needs a Computer Science / Applications UG).'),
      ),
    },
    { blockType: 'programmes', enabled: true, title: 'PG Programmes Offered', subtitle: '', typeFilter: 'PG', limit: 24 },
    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Research opportunities',
      heading: 'PG → research pathway',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('PG students at SGC have access to the Centre for Research & Publication, faculty-led projects, the SG Research Fund, and the Research Incentive Scheme for publications, conferences, and patents.'),
        btn('Centre for Research', '/research', 'outline', 'left', false),
        btn('SG Research Fund', '/research/fund', 'outline', 'left', false),
      ),
    },
    cta('Take your study further', 'Postgraduate study at SGC is a step into specialised, research-oriented work.', 'Apply Online', '/admissions/apply'),
  ],
}

// ─── /academics/library ───
const LIBRARY = {
  slug: 'academics/library',
  title: 'Library',
  layout: [
    heroCompact('Resources', 'Library', 'General library, departmental libraries, and digital learning portals.'),
    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'On campus',
      heading: 'A library built for study',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('The SGC central library holds books, journals, and reference materials across every programme we offer. Quiet study spaces, group-discussion rooms, and a reading area are open during college hours.'),
        para('Each department also maintains a focused departmental library — closer to the classroom, stocked with course-specific reference texts that students can borrow without queueing at the central counter.'),
      ),
    },
    {
      blockType: 'portals',
      enabled: true,
      title: 'Digital Learning Portals',
      subtitle: 'Externally hosted resources, free for SGC students',
      portals: [
        { name: 'National Digital Library (NDL)', description: 'Government of India\'s open digital library — millions of books, journals, theses.', url: 'https://ndl.iitkgp.ac.in', icon: 'BookOpen', color: 'primary' },
        { name: 'N-LIST', description: 'INFLIBNET\'s e-resources for colleges — journals, e-books, databases.', url: 'https://nlist.inflibnet.ac.in', icon: 'Library', color: 'primary' },
        { name: 'SGC E-Content', description: 'Internally curated e-resources, lecture notes, and study material.', url: '#', icon: 'FileText', color: 'accent' },
      ],
    },
    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: '',
      heading: '',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        callout('info', 'Library timings',
          'Monday–Saturday: 9:00 AM – 5:00 PM. Closed on second Saturdays and college holidays. ' +
          'Library cards are issued at the start of each semester — bring your ID card to the central library counter.'),
      ),
    },
    cta('Need a specific book?', 'The librarian can help you locate titles, request inter-library loans, or recommend reading lists.', 'Contact Office', '/contact'),
  ],
}

// ─── /academics/calendar ───
const CALENDAR = {
  slug: 'academics/calendar',
  title: 'Academic Calendar',
  layout: [
    heroCompact('Plan ahead', 'Academic Calendar', 'Semester dates, exam windows, holidays, and important academic deadlines.'),
    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'For 2026-27',
      heading: 'Important dates in one document',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('The Academic Calendar is the authoritative source for every important date in the academic year: semester start and end, internal and final examinations, vacations, public holidays, and college events.'),
        para('Students, parents, and faculty should refer to the calendar before scheduling personal commitments around the academic year.'),
        btn('Download Academic Calendar (PDF)', `${DOCS}/academic_calendar.pdf`, 'primary', 'left', true),
      ),
    },
    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: '',
      heading: '',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        callout('warning', 'When dates change',
          'Occasionally exam dates or holidays are revised by the University or institution. ' +
          'Revisions are announced via the Announcements section and the student notice board. ' +
          'Always check the latest calendar revision before making plans.'),
      ),
    },
    cta('Specific date you can\'t find?', 'The Examination Office and Principal\'s Office can help clarify any scheduling question.', 'Contact Office', '/contact'),
  ],
}

const PAGES = [ACADEMICS, UG, PG, LIBRARY, CALENDAR]

async function login() {
  const r = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@sgc.edu.in', password: 'admin123' }),
  })
  const j = await r.json()
  if (!j.token) throw new Error('login failed: ' + JSON.stringify(j))
  return j.token
}

async function writePage(token, page) {
  const exRes = await fetch(
    `${BASE}/api/pages?where%5Bslug%5D%5Bequals%5D=${encodeURIComponent(page.slug)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } },
  )
  const existing = (await exRes.json()).docs?.[0]
  const body = JSON.stringify({ title: page.title, slug: page.slug, layout: page.layout, _status: 'published' })
  const url = existing ? `${BASE}/api/pages/${existing.id}` : `${BASE}/api/pages`
  const r = await fetch(url, {
    method: existing ? 'PATCH' : 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body,
  })
  if (!r.ok) throw new Error(`${page.slug}: ${r.status} ${await r.text()}`)
  const saved = await r.json()
  return { action: existing ? '⟳ updated' : '✚ created', id: saved.doc?.id ?? saved.id }
}

async function main() {
  const token = await login()
  console.log('✓ logged in')
  for (const page of PAGES) {
    try {
      const result = await writePage(token, page)
      console.log(`${result.action.padEnd(11)} ${page.slug.padEnd(28)} (id ${result.id})`)
    } catch (e) {
      console.log(`✗ ${page.slug}: ${e.message.slice(0, 200)}`)
    }
  }
}

main().catch((e) => { console.error('FATAL:', e.message); process.exit(1) })
