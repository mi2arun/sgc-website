// Accreditation cluster — 8 pages with shared template
// /accreditation (parent), /naac, /iqac, /aicte, /nirf, /ariia, /iso, /ugc

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

const heroCompact = (eyebrow, title, subtitle, imageId = 2, overlay = 72) => ({
  blockType: 'hero', enabled: true, variant: 'marketing',
  eyebrow, title, titleAccent: '', subtitle, trustLine: '', badges: [],
  showLogo: false,
  slides: [{ image: imageId, ctaLabel: '', ctaLink: '' }],
  height: 'compact', alignment: 'left',
  showBadges: false, showArrows: false, showIndicators: false, showScrollIndicator: false,
  overlayOpacity: overlay, overlayColor: 'navy',
  showDecorativeRings: false, showDotPattern: true,
  autoplay: false, autoplaySpeed: 6000, pauseOnHover: true,
})

const cta = (heading, description, label, link, phone = '') => ({
  blockType: 'cta', enabled: true,
  heading, description, buttonLabel: label, buttonLink: link, phone,
})

// ───────────────────────────────────────────────────────────────────
// PARENT — /accreditation
// ───────────────────────────────────────────────────────────────────

const PARENT = {
  slug: 'accreditation',
  title: 'Accreditation & Recognition',
  layout: [
    heroCompact('Quality Assurance', 'Accreditation & Recognition', 'Independently verified at every level — academic, regulatory, and operational.'),

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'What you\'ll find here',
      heading: 'Every recognition, every report — in one place',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('SGC operates under multiple layers of independent oversight. National accreditation bodies, statutory regulators, and international quality standards all examine us periodically. This section gathers every relevant report, certificate, and ranking.'),
        para('Use the links below to dive into a specific body, or browse the full document archive.'),
        btn('NAAC — National Assessment & Accreditation', '/accreditation/naac', 'primary', 'left', false),
        btn('IQAC — Internal Quality Assurance', '/accreditation/iqac', 'primary', 'left', false),
        btn('AICTE — Technical Education', '/accreditation/aicte', 'primary', 'left', false),
        btn('NIRF — National Rankings', '/accreditation/nirf', 'primary', 'left', false),
        btn('ARIIA — Innovation Ranking', '/accreditation/ariia', 'primary', 'left', false),
        btn('ISO 9001:2015 — Quality Management', '/accreditation/iso', 'primary', 'left', false),
        btn('UGC — Guidelines & Compliance', '/accreditation/ugc', 'primary', 'left', false),
      ),
    },

    cta('Looking for a specific document?', 'Annual reports, AQARs, NIRF rankings — most documents have a permanent home in one of the sections above.', 'Contact Office', '/contact'),
  ],
}

// ───────────────────────────────────────────────────────────────────
// /accreditation/naac
// ───────────────────────────────────────────────────────────────────

const NAAC = {
  slug: 'accreditation/naac',
  title: 'NAAC Accreditation',
  layout: [
    heroCompact('NAAC A+ Accredited', 'NAAC Accreditation', 'National Assessment and Accreditation Council — peer-reviewed quality benchmark.'),

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'What it means',
      heading: 'An A+ grade from NAAC',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('NAAC is an autonomous body under UGC that grades higher-education institutions on seven criteria: curriculum, teaching-learning, research, infrastructure, student support, governance, and institutional values.'),
        para('SGC was graded A+ in Cycle II — placing us in the top tier of accredited colleges. The accreditation runs for five years and requires annual reporting (AQAR) plus a fresh peer-team visit at the end of the cycle.'),
      ),
    },

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Documents',
      heading: 'Self-Study Reports & Certificates',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('The complete public document trail from the accreditation process:'),
        btn('IIQA Document', `${DOCS}/IIQA.pdf`, 'primary', 'left', true),
        btn('Self-Study Report — Cycle I', `${DOCS}/SSR.pdf`, 'primary', 'left', true),
        btn('Self-Study Report — Cycle II', '/sgc/naac_cycle_II', 'primary', 'left', true),
        btn('DVV Clarification', `${DOCS}/DVV Clarification.pdf`, 'primary', 'left', true),
        btn('NAAC Certificate — Cycle II', `${DOCS}/NAAC Certificate - 2 cycle.pdf`, 'primary', 'left', true),
        btn('IIQA Declaration', `${DOCS}/Undertaking.pdf`, 'primary', 'left', true),
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
        callout('info', 'AQAR reports',
          'The Annual Quality Assurance Report (AQAR) is filed every year with NAAC. ' +
          'AQAR archives, IQAC minutes, and quality-improvement plans live under the IQAC section.'),
        btn('View IQAC Section →', '/accreditation/iqac', 'outline', 'left', false),
      ),
    },

    cta('Need the original peer-team report?', 'Some documents are not posted publicly. Contact the IQAC office for archival materials.', 'Contact IQAC', '/contact'),
  ],
}

// ───────────────────────────────────────────────────────────────────
// /accreditation/iqac
// ───────────────────────────────────────────────────────────────────

const IQAC = {
  slug: 'accreditation/iqac',
  title: 'Internal Quality Assurance Cell',
  layout: [
    heroCompact('IQAC', 'Internal Quality Assurance Cell', 'The internal body that drives continuous improvement and reports to NAAC.'),

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Role',
      heading: 'Why every accredited college has an IQAC',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('The IQAC is the standing internal body that monitors academic and administrative quality across the institution. It coordinates self-assessment, identifies gaps, prepares Annual Quality Assurance Reports (AQAR) for NAAC, and drives improvement projects between accreditation cycles.'),
        para('Composition is renewed periodically and includes the Principal, senior faculty, external academic experts, alumni, and student representatives.'),
      ),
    },

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Composition',
      heading: 'Members across years',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('IQAC membership lists by year:'),
        btn('Composition 2024-2025', `${DOCS}/IQAC Composition 24-25.pdf`, 'primary', 'left', true),
        btn('Composition 2020-2021', `${DOCS}/3-Composition-2020-2021.pdf`, 'primary', 'left', true),
        btn('Composition 2019-2020', `${DOCS}/2-Composition-2019-2020.pdf`, 'primary', 'left', true),
        btn('Composition 2018-2019', `${DOCS}/1-Composition-2018-2019.pdf`, 'primary', 'left', true),
      ),
    },

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Minutes of Meetings',
      heading: 'Decision trail',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('IQAC meets at least quarterly. Minutes are public for transparency. Older minutes may have been compressed into AQAR summaries.'),
        btn('Minutes — Jul 2022', `${DOCS}/Minutes_July_2022.pdf`, 'primary', 'left', true),
        btn('Minutes — Feb 2022', `${DOCS}/MinutesFeb2022.pdf`, 'primary', 'left', true),
        btn('Minutes — Nov 2021', `${DOCS}/MOM_NOV_2021.pdf`, 'primary', 'left', true),
        btn('Minutes — Jul 2021', `${DOCS}/11-Minutes-july-2021.pdf`, 'primary', 'left', true),
        btn('Minutes — Apr 2021', `${DOCS}/10-Minutes-apr-2021.pdf`, 'primary', 'left', true),
        btn('Minutes — Jan 2021', `${DOCS}/9-Minutes-jan-2021.pdf`, 'primary', 'left', true),
        btn('Minutes — Dec 2019', `${DOCS}/8-Minutes-dec-2019.pdf`, 'primary', 'left', true),
        btn('Minutes — Sep 2019', `${DOCS}/7-Minutes-sep-2019.pdf`, 'primary', 'left', true),
        btn('Minutes — Jun 2019', `${DOCS}/6-Minutes-june-2019.pdf`, 'primary', 'left', true),
        btn('Earlier minutes (2016-2018)', '/contact', 'outline', 'left', false),
      ),
    },

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'AQAR Reports',
      heading: 'Annual Quality Assurance Reports',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('The AQAR is the annual self-assessment filed with NAAC. It documents what we set out to achieve, what we actually did, and where the gaps are.'),
        btn('AQAR 2019-2020', `${DOCS}/aqar19-20.pdf`, 'primary', 'left', true),
        btn('AQAR 2018-2019', `${DOCS}/aqar18-19.pdf`, 'primary', 'left', true),
        btn('AQAR 2017-2018', `${DOCS}/aqar17-18.pdf`, 'primary', 'left', true),
        btn('AQAR 2016-2017', `${DOCS}/aqar16-17.pdf`, 'primary', 'left', true),
      ),
    },

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Special Reports',
      heading: 'Best Practices & Distinctiveness',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('NAAC asks every institution to identify what it does uniquely well. These reports capture SGC\'s answers.'),
        btn('Best Practices — Role of ICT', `${DOCS}/best_practices.pdf`, 'primary', 'left', true),
        btn('Distinctiveness of SGC', `${DOCS}/Distinctiveness_of_SGC..pdf`, 'primary', 'left', true),
        btn('Student Satisfaction Survey', `${DOCS}/Student_Satisfaction_Survey.pdf`, 'primary', 'left', true),
      ),
    },

    cta('Want the latest AQAR?', 'The next AQAR is filed annually in October. Contact IQAC for the most recent version.', 'Contact Office', '/contact'),
  ],
}

// ───────────────────────────────────────────────────────────────────
// /accreditation/aicte
// ───────────────────────────────────────────────────────────────────

const AICTE = {
  slug: 'accreditation/aicte',
  title: 'AICTE Recognition',
  layout: [
    heroCompact('AICTE', 'AICTE Recognition for BBA', 'All India Council for Technical Education — annual approval for management programmes.'),

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Why it matters',
      heading: 'AICTE approves our BBA programme',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('AICTE is the statutory authority for technical and management education in India. Our BBA (Honours) programme is approved by AICTE under its annual Extension of Approval (EOA) and Letter of Approval (LOA) framework.'),
        para('AICTE approval is renewed every academic year after a fresh review of infrastructure, faculty, and programme delivery.'),
      ),
    },

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Documents',
      heading: 'Approval letters & mandatory disclosure',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        btn('EOA 2025-2026', `${DOCS}/EOA_2025-2026.pdf`, 'primary', 'left', true),
        btn('LOA 2024-2025', `${DOCS}/LOA_2024-2025.pdf`, 'primary', 'left', true),
        btn('AICTE Mandatory Disclosure 2025-2026', `${DOCS}/AICTE-MANDATORY.pdf`, 'primary', 'left', true),
      ),
    },

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Feedback',
      heading: 'Give feedback directly to AICTE',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('AICTE runs independent feedback portals for students and faculty. Use these to raise concerns confidentially with the regulator.'),
        btn('Student Feedback Portal', 'https://www.aicte-india.org/feedback/students.php', 'outline', 'left', true),
        btn('Faculty Feedback Portal', 'https://www.aicte-india.org/feedback/faculty.php', 'outline', 'left', true),
      ),
    },

    cta('Concerns about AICTE approval?', 'Contact our administration directly, or use the AICTE feedback portals above.', 'Contact Office', '/contact'),
  ],
}

// ───────────────────────────────────────────────────────────────────
// /accreditation/nirf
// ───────────────────────────────────────────────────────────────────

const NIRF = {
  slug: 'accreditation/nirf',
  title: 'NIRF Rankings',
  layout: [
    heroCompact('National Ranking', 'NIRF Rankings', 'National Institutional Ranking Framework — the official Government of India ranking.'),

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'What NIRF measures',
      heading: 'Five parameters, one ranking',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('NIRF is the Ministry of Education\'s ranking framework. Every participating institution submits data annually under five broad parameters:'),
        bullet('Teaching, Learning & Resources (TLR)'),
        bullet('Research & Professional Practice (RP)'),
        bullet('Graduation Outcomes (GO)'),
        bullet('Outreach & Inclusivity (OI)'),
        bullet('Peer Perception (PR)'),
        para('Submissions are independently verified by the ranking committee before publication.'),
      ),
    },

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Annual reports',
      heading: 'Our NIRF submissions, 2019-2026',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('Eight years of public NIRF data. Each report contains the raw inputs and verified outputs.'),
        btn('NIRF 2026', `${DOCS}/NIRF 2026.pdf`, 'primary', 'left', true),
        btn('NIRF 2025', `${DOCS}/NIRF 2025.pdf`, 'primary', 'left', true),
        btn('NIRF 2024', `${DOCS}/nirf2024.pdf`, 'primary', 'left', true),
        btn('NIRF 2023', `${DOCS}/nirf2023.pdf`, 'primary', 'left', true),
        btn('NIRF 2022', `${DOCS}/nirf2022.pdf`, 'primary', 'left', true),
        btn('NIRF 2021', `${DOCS}/nirf2021.pdf`, 'primary', 'left', true),
        btn('NIRF 2020', `${DOCS}/nirf2020.pdf`, 'primary', 'left', true),
        btn('NIRF 2019', `${DOCS}/nirf2019.pdf`, 'primary', 'left', true),
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
        callout('info', 'Innovation ranking',
          'NIRF measures overall institutional performance. The separate ARIIA ranking focuses specifically on innovation, IPR, and entrepreneurship.'),
        btn('View ARIIA Rankings →', '/accreditation/ariia', 'outline', 'left', false),
      ),
    },

    cta('Want to verify a specific data point?', 'Every NIRF submission includes the raw data behind the score. Open the report to see the math.', 'Contact Office', '/contact'),
  ],
}

// ───────────────────────────────────────────────────────────────────
// /accreditation/ariia
// ───────────────────────────────────────────────────────────────────

const ARIIA = {
  slug: 'accreditation/ariia',
  title: 'ARIIA — Innovation Ranking',
  layout: [
    heroCompact('Innovation', 'ARIIA Rankings', 'Atal Ranking of Institutions on Innovation Achievements.'),

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'What ARIIA measures',
      heading: 'Innovation, IPR, entrepreneurship',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('ARIIA is the Government of India\'s ranking framework specifically for innovation. While NIRF measures overall institutional performance, ARIIA focuses on:'),
        bullet('Patents filed and granted'),
        bullet('Publications in peer-reviewed journals'),
        bullet('Student and faculty start-ups'),
        bullet('Innovation infrastructure (incubators, labs, IPR cells)'),
        bullet('Industry-academia partnerships'),
        para('ARIIA submissions feed into the institution\'s Innovation Council (IIC) activities and the SGC Innovation & Startup Policy.'),
      ),
    },

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Reports',
      heading: 'ARIIA submissions',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        btn('ARIIA 2022 Report', `${DOCS}/ARIIA _ Report_2022.pdf`, 'primary', 'left', true),
        btn('ARIIA 2021 Report', `${DOCS}/ARI-C-6576-Report.pdf`, 'primary', 'left', true),
      ),
    },

    cta('Want to know about our IIC activities?', 'The Institution Innovation Council runs ideation contests, hackathons, and start-up mentoring.', 'Visit IIC Page', '/research/innovation'),
  ],
}

// ───────────────────────────────────────────────────────────────────
// /accreditation/iso
// ───────────────────────────────────────────────────────────────────

const ISO = {
  slug: 'accreditation/iso',
  title: 'ISO 9001:2015 Certification',
  layout: [
    heroCompact('Quality Management', 'ISO 9001:2015 Certified', 'International standard for quality management systems.'),

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'What it means in practice',
      heading: 'Documented processes, internal audits, continuous improvement',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('ISO 9001:2015 is the international standard for quality management. Unlike NAAC (which focuses on academic outcomes) or NIRF (which measures performance), ISO certifies that our administrative processes meet a quality management framework.'),
        para('What this means day-to-day:'),
        bullet('Every major process — admissions, examinations, grievance handling, placements — has documented procedures'),
        bullet('Internal audits are conducted twice a year to verify procedures are being followed'),
        bullet('Non-conformities are logged and resolved with root-cause analysis'),
        bullet('External recertification audit every three years by an accredited body'),
      ),
    },

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Our quality policy',
      heading: 'What SGC commits to',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('SGC is committed to providing quality higher education that nurtures intellectual, ethical, and social development of students through:'),
        bullet('Continuous improvement in academic and administrative processes'),
        bullet('Active participation of faculty, staff, students, and stakeholders'),
        bullet('Compliance with applicable statutory and regulatory requirements'),
        bullet('Setting and reviewing quality objectives at every level'),
        bullet('Promoting a culture of excellence, integrity, and accountability'),
      ),
    },

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Certificate',
      heading: 'View the certificate',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        btn('Download ISO 9001:2015 Certificate', `${DOCS}/ISOcertificate.pdf`, 'primary', 'left', true),
      ),
    },

    cta('Internal audit reports?', 'Audit reports are available on request to accreditation bodies and authorised stakeholders.', 'Contact Office', '/contact'),
  ],
}

// ───────────────────────────────────────────────────────────────────
// /accreditation/ugc
// ───────────────────────────────────────────────────────────────────

const UGC = {
  slug: 'accreditation/ugc',
  title: 'UGC Guidelines & Compliance',
  layout: [
    heroCompact('UGC Compliance', 'UGC Guidelines', 'Following the University Grants Commission\'s framework across institutional development, equity, accessibility, and research.'),

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Why these matter',
      heading: 'UGC sets the standard',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('The University Grants Commission issues binding guidelines that every recognised higher-education institution must follow. SGC publishes its compliance documents below for transparency.'),
        para('The guidelines below are public UGC circulars. Our institutional undertakings affirming compliance are also published.'),
      ),
    },

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Institutional Development',
      heading: 'IDP guidelines',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('Framework for preparing institutional development plans — strategic vision, faculty growth, infrastructure, and quality benchmarks.'),
        btn('UGC IDP Guidelines for HEIs', `${DOCS}/Guidelines for IDP for HEIs.pdf`, 'primary', 'left', true),
      ),
    },

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Equity',
      heading: 'Socioeconomically Disadvantaged Groups',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('Guidelines for ensuring equitable opportunity in admissions, scholarships, and academic support for SEDG students.'),
        btn('Equitable Opportunity for SEDGs', `${DOCS}/Guidelines to provide Equitable opportunity for SEDGs in HEIs.pdf`, 'primary', 'left', true),
      ),
    },

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Accessibility',
      heading: 'For students with disabilities',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('Standards for physical access, digital accessibility, and academic accommodations for students with disabilities.'),
        btn('Accessibility Guidelines for HEIs', `${DOCS}/Accessibility-Guidelines and standards for HEIs.pdf`, 'primary', 'left', true),
      ),
    },

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Research',
      heading: 'R&D Cell establishment',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('Framework for setting up institutional Research & Development cells.'),
        btn('R&D Cell Establishment Guidelines', `${DOCS}/Guidelines for Establishment of Research and Development Cell.pdf`, 'primary', 'left', true),
      ),
    },

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Transparency',
      heading: 'Public self-disclosure',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('Information that every HEI must publish on its website: programmes, fees, faculty credentials, admission criteria, grievance mechanisms.'),
        btn('Public Self-Disclosure Guidelines', `${DOCS}/GUIDELINES-ON-PUBLIC-SELF-DISCLOSURE-BY-HIGHER-EDUCATION-INSTITUTIONS.pdf`, 'primary', 'left', true),
      ),
    },

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Our undertaking',
      heading: 'SGC\'s compliance commitment',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('SGC has submitted a formal undertaking to UGC affirming compliance with the regulations above.'),
        btn('UGC Regulations Undertaking', `${DOCS}/UGC Regulations Undertaking.pdf`, 'primary', 'left', true),
      ),
    },

    cta('Need a specific UGC clarification?', 'For policy questions or specific circulars, contact the office.', 'Contact Office', '/contact'),
  ],
}

// ───────────────────────────────────────────────────────────────────
// Driver
// ───────────────────────────────────────────────────────────────────

const PAGES = [PARENT, NAAC, IQAC, AICTE, NIRF, ARIIA, ISO, UGC]

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
