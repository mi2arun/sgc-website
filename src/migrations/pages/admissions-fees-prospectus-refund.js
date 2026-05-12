// Admissions cluster: /admissions/fees, /admissions/prospectus, /admissions/refund-policy
// All share Hero (compact) + targeted RichText + inline button to PDF/portal + CTA

const BASE = 'http://localhost:3000'

const FEE_PAYMENT_PORTAL = 'https://application.sgc.edu.in/SGCOnlineFeePayment/student/login.jsp'
const PROSPECTUS_PDF = 'https://sgc.edu.in/assets/docs/Pros 2024.pdf'
const REFUND_POLICY_PDF = 'https://sgc.edu.in/assets/docs/UGC_Guidelines_Fee_Refund_Policy.pdf'

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

const heroCompact = (eyebrow, title, subtitle, imageId = 1) => ({
  blockType: 'hero',
  enabled: true,
  variant: 'marketing',
  eyebrow,
  title,
  titleAccent: '',
  subtitle,
  trustLine: '',
  badges: [],
  showLogo: false,
  slides: [{ image: imageId, ctaLabel: '', ctaLink: '' }],
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
})

// ───────────────────────────────────────────────────────────────────
// /admissions/fees
// ───────────────────────────────────────────────────────────────────

const FEES_PAGE = {
  slug: 'admissions/fees',
  title: 'Fee Structure',
  layout: [
    heroCompact('Fees 2026-27', 'Fee Structure', 'Honest pricing. No hidden charges. Online payments.'),

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'How fees work',
      heading: 'Annual fees per programme',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('All fees below are per semester. SGC charges no admission fee separately — what you see is what you pay.'),
        para('Fees are payable online through the SGC student portal at the start of each semester. Late payment carries a small surcharge per UGC guidelines.'),
        btn('Open Online Fee Payment Portal', FEE_PAYMENT_PORTAL, 'primary', 'left', true),
      ),
    },

    // Programmes block (reads from Courses collection — shows current fees automatically)
    {
      blockType: 'programmes',
      enabled: true,
      title: 'Programme Fees',
      subtitle: 'Filter by UG / PG to narrow the list.',
      typeFilter: 'all',
      limit: 24,
    },

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: '',
      heading: '',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        callout('info', 'Other charges to budget for',
          'Examination fee is collected separately per semester (typically ₹500–₹1000 depending on the programme). ' +
          'Library / lab security deposits are one-time, refundable on graduation. ' +
          'Optional services like hostel and transport have their own fee schedules.'),
      ),
    },

    {
      blockType: 'cta',
      enabled: true,
      heading: 'Have a question about fees?',
      description: 'Our Admissions Office can walk you through the fee structure and payment timelines.',
      buttonLabel: 'Contact Admissions',
      buttonLink: '/contact',
      phone: '+91 413 2280156',
    },
  ],
}

// ───────────────────────────────────────────────────────────────────
// /admissions/prospectus
// ───────────────────────────────────────────────────────────────────

const PROSPECTUS_PAGE = {
  slug: 'admissions/prospectus',
  title: 'Prospectus',
  layout: [
    heroCompact('Prospectus 2026-27', 'The SGC Prospectus', "Everything about us — in one document."),

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'What\'s inside',
      heading: 'A 40-page introduction to SGC',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('The annual prospectus is the most comprehensive single-document overview of the college. Download it as a PDF, read at your own pace, share with your parents.'),
        bullet('Founder\'s message and institutional history'),
        bullet('Programmes offered with detailed curriculum overview'),
        bullet('Faculty profiles and academic credentials'),
        bullet('Campus facilities — labs, library, hostel, sports, transport'),
        bullet('Admission process step-by-step'),
        bullet('Fee structure for all programmes (including hostel and transport)'),
        bullet('Scholarship and financial assistance options'),
        bullet('Examination and evaluation policy'),
        bullet('Placement statistics and recruiters'),
        bullet('Code of conduct and disciplinary policy'),
        bullet('Contact information and how to reach campus'),
        btn('Download Prospectus 2026 (PDF)', PROSPECTUS_PDF, 'primary', 'left', true),
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
        callout('note', 'Updated annually',
          'The prospectus is refreshed every February for the upcoming academic year. ' +
          'Curriculum changes, new programmes, and updated fees are reflected in each edition.'),
      ),
    },

    {
      blockType: 'cta',
      enabled: true,
      heading: 'Ready to apply?',
      description: 'Once you\'ve read the prospectus, the application form takes about 10 minutes.',
      buttonLabel: 'Apply Online',
      buttonLink: '/admissions/apply',
      phone: '',
    },
  ],
}

// ───────────────────────────────────────────────────────────────────
// /admissions/refund-policy
// ───────────────────────────────────────────────────────────────────

const REFUND_PAGE = {
  slug: 'admissions/refund-policy',
  title: 'Refund Policy',
  layout: [
    heroCompact('Important Information', 'Fee Refund Policy', 'UGC-mandated. Transparent. Time-bound.'),

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'In plain language',
      heading: 'What happens if you withdraw',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('SGC follows the UGC fee refund policy in full. If you pay fees and then decide to withdraw — for any reason — here\'s what to expect.'),
        para('The amount refunded depends on when you withdraw, relative to the start of the academic year.'),
        bullet('15 days or more before the start of session: 100% refund (minus a small processing charge)'),
        bullet('Less than 15 days before the start: 90% refund'),
        bullet('Within 15 days after the start of session: 80% refund'),
        bullet('Between 16 and 30 days after the start: 50% refund'),
        bullet('More than 30 days after the start: no refund'),
        para('Refunds are processed within 30 days of receiving the written withdrawal request and supporting documents.'),
        btn('View Full UGC Refund Policy (PDF)', REFUND_POLICY_PDF, 'primary', 'left', true),
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
        callout('warning', 'How to request a refund',
          'Submit a written application (or email) addressed to the Principal stating the reason for withdrawal. ' +
          'Include your original fee receipt and a copy of your ID. ' +
          'Submit at the Admissions Office in person, by post, or by email to admissions@sgc.edu.in.'),
      ),
    },

    {
      blockType: 'cta',
      enabled: true,
      heading: 'Questions about refunds?',
      description: 'We understand circumstances change. The Admissions Office can clarify your specific situation.',
      buttonLabel: 'Contact Admissions',
      buttonLink: '/contact',
      phone: '+91 413 2280156',
    },
  ],
}

// ───────────────────────────────────────────────────────────────────
// Driver
// ───────────────────────────────────────────────────────────────────

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
  const opts = {
    method: existing ? 'PATCH' : 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body,
  }
  const url = existing ? `${BASE}/api/pages/${existing.id}` : `${BASE}/api/pages`
  const r = await fetch(url, opts)
  if (!r.ok) throw new Error(`${page.slug}: ${r.status} ${await r.text()}`)
  const saved = await r.json()
  return { action: existing ? '⟳ updated' : '✚ created', id: saved.doc?.id ?? saved.id }
}

async function main() {
  const token = await login()
  console.log('✓ logged in')
  for (const page of [FEES_PAGE, PROSPECTUS_PAGE, REFUND_PAGE]) {
    const result = await writePage(token, page)
    console.log(`${result.action.padEnd(11)} ${page.slug.padEnd(28)} (id ${result.id})`)
  }
}

main().catch((e) => { console.error('FATAL:', e.message); process.exit(1) })
