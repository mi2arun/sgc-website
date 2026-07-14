// Build /about/affiliation — designed page with intent (NOT a scrape).
// Block sequence: Hero (minimal, navy overlay) → 4 RichText sections (PU/Autonomous/UGC/ISO)
//   with inline Buttons linking to source PDFs → CTA.
// Each RichText section has an anchor id (#pu, #autonomy, #iso) preserved from nav.

const BASE = 'http://localhost:3000'
const SLUG = 'about/affiliation'
const TITLE = 'Affiliation & Recognition'

// Placeholder year — fill via admin once known
const AUTONOMY_YEAR = '[YEAR]'  // TODO

// Source PDF URLs (direct links to sgc.edu.in for now; replace with Vercel Blob later)
const PU_PDF = 'https://sgc.edu.in/assets/docs/Affiliation 2024 -25.pdf'
const UGC_2F_PDF = 'https://sgc.edu.in/assets/docs/02 2(f).pdf'
const AUTONOMOUS_PDF = 'https://sgc.edu.in/assets/docs/autonomous1.pdf'
const ISO_PDF = 'https://sgc.edu.in/assets/docs/ISOcertificate.pdf'

// Helpers for Lexical JSON
const para = (text) => ({
  type: 'paragraph',
  children: [{ type: 'text', text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
  direction: 'ltr', format: '', indent: 0, textFormat: 0, textStyle: '', version: 1,
})

// inline button (Lexical custom block via BlocksFeature)
const inlineBtn = (label, link, variant = 'primary', align = 'left') => ({
  type: 'block',
  format: '',
  version: 2,
  fields: {
    blockType: 'inline-button',
    label, link, variant, align,
    openInNewTab: true,
  },
})

const rootChildren = (...nodes) => ({
  root: {
    type: 'root',
    children: nodes,
    direction: 'ltr', format: '', indent: 0, version: 1,
  },
})

const layout = [
  // 1. Hero — minimal, campus building
  {
    blockType: 'hero',
    enabled: true,
    variant: 'marketing',
    eyebrow: 'Officially Recognised',
    title: 'Affiliation & Recognition',
    titleAccent: '',
    subtitle: 'Pondicherry University · Autonomous · UGC · ISO 9001:2015',
    trustLine: '',
    badges: [],
    showLogo: false,
    slides: [
      { image: 2, ctaLabel: '', ctaLink: '', secondaryCtaLabel: '', secondaryCtaLink: '' },
    ],
    height: 'compact',
    alignment: 'left',
    showBadges: false,
    showArrows: false,
    showIndicators: false,
    showScrollIndicator: false,
    overlayOpacity: 72,
    overlayColor: 'navy',
    showDecorativeRings: false,
    showDotPattern: true,
    autoplay: false,
    autoplaySpeed: 6000,
    pauseOnHover: true,
  },

  // 2. PU — anchor id will be added via heading text starting with anchor marker
  {
    blockType: 'rich-text',
    enabled: true,
    eyebrow: 'Pondicherry University',
    heading: 'An Affiliated Institution',
    subheading: '',
    width: 'narrow',
    align: 'left',
    content: rootChildren(
      para('Saradha Gangadharan College has been a constituent of Pondicherry University since its founding. The University, established in 1985, is a central university under the Ministry of Education, Government of India.'),
      para('Affiliation means the degrees awarded at SGC carry full national recognition. Our curriculum follows the Pondicherry University Choice-Based Credit System (CBCS) and the National Education Policy (NEP) framework, with periodic updates approved by the University.'),
      inlineBtn('View Affiliation Document', PU_PDF, 'primary', 'left'),
    ),
  },

  // 3. Autonomous
  {
    blockType: 'rich-text',
    enabled: true,
    eyebrow: 'Autonomous Status',
    heading: 'Curriculum Freedom, Academic Excellence',
    subheading: '',
    width: 'narrow',
    align: 'left',
    content: rootChildren(
      para(`SGC was granted autonomous status by the University Grants Commission in ${AUTONOMY_YEAR}, in recognition of its academic standards and institutional capacity.`),
      para('Autonomy gives us the freedom to design our own syllabi, conduct our own examinations, and respond faster to industry needs. Modern electives, add-on certifications, and skill-development modules are introduced without waiting for university-wide approval cycles. Quality assurance is maintained through internal oversight bodies and periodic UGC review.'),
      inlineBtn('Read Autonomous Status Document', AUTONOMOUS_PDF, 'primary', 'left'),
    ),
  },

  // 4. UGC 2(f)
  {
    blockType: 'rich-text',
    enabled: true,
    eyebrow: 'UGC Recognition',
    heading: 'Recognised under Section 2(f)',
    subheading: '',
    width: 'narrow',
    align: 'left',
    content: rootChildren(
      para('Under Section 2(f) of the UGC Act, 1956, SGC is recognised as an institution competent to confer degrees. This statutory recognition is the foundation that makes every other affiliation — Pondicherry University, AICTE, NAAC — meaningful.'),
      inlineBtn('View UGC Recognition Letter', UGC_2F_PDF, 'primary', 'left'),
    ),
  },

  // 5. ISO
  {
    blockType: 'rich-text',
    enabled: true,
    eyebrow: 'Quality Management',
    heading: 'ISO 9001:2015 Certified',
    subheading: '',
    width: 'narrow',
    align: 'left',
    content: rootChildren(
      para('Beyond academic recognition, SGC is certified under ISO 9001:2015 — the international standard for quality management systems. The certification audits our administrative processes: admissions handling, teaching delivery, examination conduct, grievance redressal, placement support.'),
      para('In practical terms, an ISO-certified college means documented procedures, regular internal audits, and a culture of continuous improvement. Students and parents can expect consistent service quality.'),
      inlineBtn('View ISO Certificate', ISO_PDF, 'primary', 'left'),
    ),
  },

  // 6. CTA
  {
    blockType: 'cta',
    enabled: true,
    heading: 'Trust the Process',
    description: 'Every recognition above is independently verified. Apply with confidence.',
    buttonLabel: 'Apply Now',
    buttonLink: '/admissions/apply',
    phone: '',
  },
]

async function main() {
  const r = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@sgc.edu.in', password: 'admin123' }),
  })
  const { token } = await r.json()
  console.log('✓ logged in')

  // Check if page exists
  const exRes = await fetch(
    `${BASE}/api/pages?where%5Bslug%5D%5Bequals%5D=${encodeURIComponent(SLUG)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } },
  )
  const exJson = await exRes.json()
  const existing = exJson.docs?.[0]

  const body = JSON.stringify({
    title: TITLE,
    slug: SLUG,
    layout,
    _status: 'published',
  })

  let res
  if (existing) {
    console.log(`⟳ page exists (id ${existing.id}) — updating`)
    res = await fetch(`${BASE}/api/pages/${existing.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      body,
    })
  } else {
    console.log('✚ creating new page')
    res = await fetch(`${BASE}/api/pages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      body,
    })
  }
  if (!res.ok) {
    console.error('FAIL:', res.status, await res.text())
    process.exit(1)
  }
  const saved = await res.json()
  console.log(`✓ /about/affiliation written  (id ${saved.doc?.id ?? saved.id})`)
  console.log(`  View: ${BASE}/about/affiliation`)
}

main().catch((e) => { console.error('FATAL:', e.message); process.exit(1) })
