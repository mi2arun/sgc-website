// /admissions/apply — friendly handoff to external application portal.
// Block sequence: Hero (compact) → RichText "what to have ready" → RichText "5 steps" → Callout → CTA

const BASE = 'http://localhost:3000'
const SLUG = 'admissions/apply'
const TITLE = 'Apply Online'

const EXTERNAL_PORTAL = 'https://application.sgc.edu.in/SGCApplicationForm/application.html'

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

const inlineBtn = (label, link, variant = 'primary', align = 'left', newTab = true) => ({
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

const layout = [
  // 1. Hero
  {
    blockType: 'hero',
    enabled: true,
    variant: 'marketing',
    eyebrow: 'Admissions 2026-27',
    title: 'Apply Online',
    titleAccent: '',
    subtitle: 'A few minutes to fill out the form. A few documents to upload. We handle the rest.',
    trustLine: '',
    badges: [],
    showLogo: false,
    slides: [{ image: 1, ctaLabel: '', ctaLink: '' }],
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

  // 2. What to have ready
  {
    blockType: 'rich-text',
    enabled: true,
    eyebrow: 'Before You Begin',
    heading: 'What to have ready',
    subheading: 'A 10-minute application is easier when these are sitting next to you.',
    width: 'narrow',
    align: 'left',
    content: root(
      para('Scan or photograph the following before you open the application form. You will upload them during the process.'),
      bullet('SSLC / 10th standard mark sheet'),
      bullet('HSC / 12th standard mark sheet (or expected if results pending)'),
      bullet('Transfer Certificate from your previous school or college'),
      bullet('Conduct Certificate'),
      bullet('Community Certificate (if claiming SC/ST/OBC/EWS reservation)'),
      bullet('Aadhaar card or other government-issued photo ID'),
      bullet('Two passport-sized photographs (JPG)'),
      bullet('Income certificate (only if applying for need-based scholarship)'),
      para('All uploads should be clear, readable, and under 2 MB each. PDF or JPG accepted.'),
    ),
  },

  // 3. The 5-step process
  {
    blockType: 'rich-text',
    enabled: true,
    eyebrow: 'How It Works',
    heading: 'Five steps to your offer letter',
    subheading: '',
    width: 'narrow',
    align: 'left',
    content: root(
      para('Step 1 — Register on the application portal with your email and phone number. You will receive an OTP for verification.'),
      para('Step 2 — Fill in personal details, academic history, and programme preferences (you can choose up to three).'),
      para('Step 3 — Upload the documents from the checklist above.'),
      para('Step 4 — Pay the application fee online (₹500, refundable per UGC policy if your application is rejected).'),
      para('Step 5 — Submit. You will receive an acknowledgement email immediately. The Admissions Office reviews applications in the order received and contacts you within 7 working days.'),
    ),
  },

  // 4. Callout: help
  {
    blockType: 'rich-text',
    enabled: true,
    eyebrow: '',
    heading: '',
    subheading: '',
    width: 'narrow',
    align: 'left',
    content: root(
      callout('info', 'Need help with the application?',
        'Admissions Office is open 9 AM–4 PM, Monday to Saturday. ' +
        'Call +91 413 2280156 or email admissions@sgc.edu.in. ' +
        'You can also walk in to the campus — Lake Road, Velrampet, Puducherry 605 004.'),
    ),
  },

  // 5. CTA
  {
    blockType: 'cta',
    enabled: true,
    heading: 'Ready when you are',
    description: 'The application opens in a new tab. You can save your progress and return to it later.',
    buttonLabel: 'Open Application Portal →',
    buttonLink: EXTERNAL_PORTAL,
    phone: '+91 413 2280156',
  },
]

async function main() {
  const r = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@sgc.edu.in', password: 'admin123' }),
  })
  const { token } = await r.json()
  if (!token) { console.error('login failed'); process.exit(1) }
  console.log('✓ logged in')

  const exRes = await fetch(
    `${BASE}/api/pages?where%5Bslug%5D%5Bequals%5D=${encodeURIComponent(SLUG)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } },
  )
  const existing = (await exRes.json()).docs?.[0]

  const body = JSON.stringify({ title: TITLE, slug: SLUG, layout, _status: 'published' })
  let res
  if (existing) {
    console.log(`⟳ updating page id ${existing.id}`)
    res = await fetch(`${BASE}/api/pages/${existing.id}`, {
      method: 'PATCH', body,
      headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    })
  } else {
    console.log('✚ creating new page')
    res = await fetch(`${BASE}/api/pages`, {
      method: 'POST', body,
      headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    })
  }
  if (!res.ok) {
    console.error('FAIL:', res.status, await res.text())
    process.exit(1)
  }
  const saved = await res.json()
  console.log(`✓ ${SLUG} written  (id ${saved.doc?.id ?? saved.id})`)
}

main().catch((e) => { console.error('FATAL:', e.message); process.exit(1) })
