// Student Support cluster — hub + 9 statutory cells. Shared template via factory.

const BASE = 'http://localhost:3000'

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
const btn = (label, link, variant = 'primary', align = 'left', newTab = false) => ({
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

const heroCompact = (eyebrow, title, subtitle) => ({
  blockType: 'hero', enabled: true, variant: 'marketing',
  eyebrow, title, titleAccent: '', subtitle, trustLine: '', badges: [],
  showLogo: false,
  slides: [{ image: 1, ctaLabel: '', ctaLink: '' }],
  height: 'compact', alignment: 'left',
  showBadges: false, showArrows: false, showIndicators: false, showScrollIndicator: false,
  overlayOpacity: 72, overlayColor: 'navy',
  showDecorativeRings: false, showDotPattern: true,
  autoplay: false, autoplaySpeed: 6000, pauseOnHover: true,
})

const cta = (heading, description, label, link, phone = '+91 413 2280156') => ({
  blockType: 'cta', enabled: true,
  heading, description, buttonLabel: label, buttonLink: link, phone,
})

// ──────────────────────────────────────────────────────────────
// Cell page factory — each cell follows the same 5-block template
// ──────────────────────────────────────────────────────────────

function cellPage({ slug, title, eyebrowTitle, subtitle, purposeText, scopeBullets, procedureSteps, calloutNote, contactExtra }) {
  return {
    slug, title,
    layout: [
      heroCompact(eyebrowTitle, title, subtitle),

      {
        blockType: 'rich-text',
        enabled: true,
        eyebrow: 'Purpose & scope',
        heading: `Why this cell exists`,
        subheading: '',
        width: 'narrow', align: 'left',
        content: root(
          para(purposeText),
          ...(scopeBullets ? scopeBullets.map(bullet) : []),
        ),
      },

      {
        blockType: 'rich-text',
        enabled: true,
        eyebrow: 'Committee',
        heading: 'Members',
        subheading: '',
        width: 'narrow', align: 'left',
        content: root(
          para('Committee members are appointed annually. Current composition includes the Principal, a senior faculty member as Convener, faculty representatives, a student representative, and (where mandated by UGC) an external expert.'),
          para('The current list of names and contact details is available at the Principal\'s Office on request, and is also displayed on the official college notice board.'),
        ),
      },

      {
        blockType: 'rich-text',
        enabled: true,
        eyebrow: 'How to file a complaint',
        heading: 'Procedure',
        subheading: '',
        width: 'narrow', align: 'left',
        content: root(
          para('All complaints are treated confidentially. Anyone can approach the cell — students, parents, faculty, or staff.'),
          ...procedureSteps.map((s, i) => para(`${i + 1}. ${s}`)),
        ),
      },

      ...(calloutNote ? [{
        blockType: 'rich-text',
        enabled: true,
        eyebrow: '', heading: '', subheading: '',
        width: 'narrow', align: 'left',
        content: root(callout(calloutNote.variant, calloutNote.title, calloutNote.body)),
      }] : []),

      cta(
        'Need to reach the cell?',
        contactExtra || 'Walk in to the Principal\'s Office during college hours, or use the contact details above.',
        'Contact Office', '/contact',
      ),
    ],
  }
}

// ──────────────────────────────────────────────────────────────
// HUB
// ──────────────────────────────────────────────────────────────

const HUB = {
  slug: 'student-support',
  title: 'Student Support',
  layout: [
    heroCompact('Welfare & Wellbeing', 'Student Support', 'Statutory cells that exist to listen, respond, and protect.'),

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'Why these cells exist',
      heading: 'A formal system to raise concerns',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        para('Every accredited college in India operates a set of statutory support cells. These are not optional — UGC, AICTE, and NAAC require them, with documented composition, meeting minutes, and complaint registers.'),
        para('At SGC, the cells listed below cover the full range of student welfare matters. Each has its own dedicated page with members, procedures, and contact details.'),
      ),
    },

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: 'The cells',
      heading: 'Who to approach for what',
      subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        btn('SC/ST Cell — caste-based grievances', '/student-support/sc-st', 'primary', 'left', false),
        btn('Grievance Redressal Cell — general academic / administrative complaints', '/student-support/grievance', 'primary', 'left', false),
        btn('Anti-Ragging Cell — ragging or hazing', '/student-support/anti-ragging', 'primary', 'left', false),
        btn('Internal Complaints Committee (ICC) — sexual harassment under PoSH Act', '/student-support/icc', 'primary', 'left', false),
        btn('Equal Opportunity Cell — discrimination on any basis', '/student-support/equal-opportunity', 'primary', 'left', false),
        btn('Career Development Cell — placement, internships, skills', '/student-support/career-development', 'primary', 'left', false),
        btn('Health Care — campus health services', '/student-support/health-care', 'primary', 'left', false),
        btn('PwD Facilities — for students with disabilities', '/student-support/pwd', 'primary', 'left', false),
        btn('College Disciplinary Committee — disciplinary matters', '/student-support/disciplinary', 'primary', 'left', false),
      ),
    },

    {
      blockType: 'rich-text',
      enabled: true,
      eyebrow: '', heading: '', subheading: '',
      width: 'narrow', align: 'left',
      content: root(
        callout('info', 'Anonymous reporting',
          'Every cell accepts anonymous reports. You don\'t have to share your name to raise an issue. ' +
          'Confidentiality of complainants is maintained even when identities are known.'),
      ),
    },

    cta('Not sure which cell to approach?', 'When in doubt, write to the Principal\'s Office. We\'ll route your concern to the right cell.', 'Contact Office', '/contact'),
  ],
}

// ──────────────────────────────────────────────────────────────
// 9 cells
// ──────────────────────────────────────────────────────────────

const CELLS = [
  cellPage({
    slug: 'student-support/sc-st',
    title: 'SC/ST Cell',
    eyebrowTitle: 'Statutory Cell',
    subtitle: 'Addressing concerns of Scheduled Caste and Scheduled Tribe students under UGC guidelines.',
    purposeText: 'The SC/ST Cell ensures that students from Scheduled Caste and Scheduled Tribe communities receive equal opportunity, are not subject to caste-based discrimination, and have a confidential channel to raise concerns.',
    scopeBullets: [
      'Monitoring SC/ST admissions, scholarships, and academic support',
      'Investigating caste-based discrimination complaints',
      'Liaising with state and central scholarship bodies',
      'Coordinating with the Equal Opportunity Cell on overlapping matters',
    ],
    procedureSteps: [
      'Submit a written or oral complaint to any cell member (or anonymously via the complaint box outside the Principal\'s Office).',
      'The Convener acknowledges receipt within 3 working days.',
      'The cell investigates with confidentiality — interviewing the complainant, relevant witnesses, and the respondent.',
      'A reasoned decision is communicated to all parties within 30 days.',
      'Appeals can be made to the Principal, and onward to the District SC/ST Welfare Officer.',
    ],
    calloutNote: { variant: 'info', title: 'External recourse', body: 'If the cell\'s response is unsatisfactory, students can approach the Pondicherry State SC/ST Commission or the National Commission for SC/ST directly.' },
  }),

  cellPage({
    slug: 'student-support/grievance',
    title: 'Grievance Redressal Cell',
    eyebrowTitle: 'General Grievances',
    subtitle: 'The default cell for academic, administrative, or examination-related complaints not covered by a specialised cell.',
    purposeText: 'The Grievance Redressal Cell handles general complaints from students — academic disputes, evaluation concerns, fee-related issues, behaviour of staff, administrative delays, hostel matters, or any concern that doesn\'t fall under a specialised cell.',
    scopeBullets: [
      'Academic and examination grievances',
      'Administrative service complaints',
      'Hostel, transport, or facility-related issues',
      'Faculty/staff conduct (other than harassment, which goes to ICC)',
      'Fee disputes',
    ],
    procedureSteps: [
      'Try informally first — speak to the concerned faculty/staff or department head. Many issues resolve at that level.',
      'If unresolved, submit a written complaint to the Grievance Cell Convener with relevant evidence.',
      'The cell acknowledges within 5 working days and may call you for clarification.',
      'A decision is communicated within 30 days. The cell may consult subject experts or external members for complex cases.',
      'Appeals can be made to the Principal, and onward to the University Ombudsperson.',
    ],
    calloutNote: { variant: 'warning', title: 'Time-bar', body: 'Grievances should ideally be raised within 30 days of the incident. Older complaints may still be considered but require justification for the delay.' },
  }),

  cellPage({
    slug: 'student-support/anti-ragging',
    title: 'Anti-Ragging Committee',
    eyebrowTitle: 'Zero Tolerance',
    subtitle: 'Mandated by UGC and the Supreme Court of India. Ragging in any form attracts strict disciplinary action.',
    purposeText: 'SGC operates a zero-tolerance policy on ragging. The Anti-Ragging Committee monitors campus, hostels, and transport routes; investigates complaints; and enforces consequences as per UGC Regulations (Curbing the Menace of Ragging in Higher Educational Institutions), 2009.',
    scopeBullets: [
      'Physical abuse including sexual abuse — covered by ICC as well',
      'Mental harassment, intimidation, or coercion',
      'Forced food, dress, or behaviour modifications',
      'Financial extortion, theft, or property damage',
      'Forced participation in activities causing physical or mental discomfort',
      'Any verbal abuse based on caste, religion, gender, region, or appearance',
    ],
    procedureSteps: [
      'Call the National Anti-Ragging Helpline: 1800-180-5522 (toll-free, 24×7).',
      'Or email helpline@antiragging.in (responded to within 24 hours).',
      'Or report to any Anti-Ragging Squad member on campus — they wear identifiable ID cards.',
      'Or drop a written complaint (anonymous accepted) into the complaint box.',
      'Investigation completed within 7 days. Confirmed offenders face suspension, expulsion, debarment from examinations, fine, and FIR registration as appropriate.',
    ],
    calloutNote: { variant: 'danger', title: 'Punishments under UGC regulations', body: 'Confirmed ragging can lead to: cancellation of admission, suspension from class for varying periods, expulsion, fine up to ₹25,000, debarment from examinations, and police FIR. Hostels can be banned. Scholarships withdrawn.' },
    contactExtra: 'National Helpline 1800-180-5522 (24×7). Campus squad reachable through the Principal\'s Office.',
  }),

  cellPage({
    slug: 'student-support/icc',
    title: 'Internal Complaints Committee (ICC)',
    eyebrowTitle: 'PoSH Act Compliance',
    subtitle: 'For complaints of sexual harassment under the Sexual Harassment of Women at Workplace (Prevention, Prohibition & Redressal) Act, 2013.',
    purposeText: 'The Internal Complaints Committee handles complaints of sexual harassment from female students, faculty, or staff. The Committee is constituted as per the PoSH Act and includes a senior woman faculty member as Presiding Officer, other faculty/staff members, a student representative, and an external member from a women\'s rights NGO.',
    scopeBullets: [
      'Sexual harassment — physical, verbal, written, or digital',
      'Quid pro quo harassment (demands tied to favours or threats)',
      'Hostile work / study environment',
      'Workplace and campus, including off-campus events',
    ],
    procedureSteps: [
      'Submit a written complaint to the ICC Presiding Officer within 3 months of the incident (the timeline can be extended in exceptional circumstances).',
      'Identity is protected throughout. The complainant may request a different location for inquiry meetings.',
      'A formal inquiry is completed within 90 days. Both parties have the right to be heard.',
      'Recommendations may include written apology, transfer, suspension, termination, or referral to police.',
      'Reports are submitted to the Principal for action and to the District Officer annually.',
    ],
    calloutNote: { variant: 'warning', title: 'Confidentiality', body: 'Disclosure of the identity of the complainant, respondent, witnesses, or details of the inquiry to anyone outside the inquiry process is a violation of the PoSH Act and attracts penalty.' },
  }),

  cellPage({
    slug: 'student-support/equal-opportunity',
    title: 'Equal Opportunity Cell',
    eyebrowTitle: 'Anti-Discrimination',
    subtitle: 'Ensures fair access and treatment for students from socially disadvantaged groups — SC, ST, OBC, EWS, minorities, women, and persons with disabilities.',
    purposeText: 'The Equal Opportunity Cell monitors equity in admissions, scholarships, hostel, and academic support across all socio-economically disadvantaged groups. It complements the SC/ST Cell and PwD facilities by handling discrimination concerns that span multiple categories.',
    scopeBullets: [
      'Discrimination based on caste, religion, gender, language, region, or disability',
      'Equal access to scholarships and financial support',
      'Inclusive curriculum and pedagogy',
      'Gender-sensitive policies',
    ],
    procedureSteps: [
      'File a complaint with any cell member, in writing or in person.',
      'Initial assessment within 7 working days to determine the right cell (some complaints route to SC/ST, ICC, or PwD).',
      'Investigation with confidentiality. Both parties heard.',
      'Recommendation issued within 30 days. May include policy changes, accommodations, or disciplinary action.',
    ],
  }),

  cellPage({
    slug: 'student-support/career-development',
    title: 'Career Development Cell',
    eyebrowTitle: 'Placements & Skills',
    subtitle: 'Bridge between students and employers — training, internships, placements, and entrepreneurship.',
    purposeText: 'The Career Development Cell (also referred to as the Placement Cell) coordinates everything related to student employment readiness: aptitude training, soft skills workshops, interview preparation, mock drives, internship placements, and final-year recruitment.',
    scopeBullets: [
      'Aptitude and reasoning training (modules begin in second year)',
      'Soft skills, group discussions, and interview practice',
      'Internship placement coordination',
      'Final-year campus recruitment drives',
      'Industry liaison and recruiter relationship management',
      'Entrepreneurship support via the IIC',
    ],
    procedureSteps: [
      'Register with the cell at the start of your pre-final year — eligibility requires minimum CGPA and attendance.',
      'Attend mandatory training modules — schedule shared at registration.',
      'Apply to companies through the cell\'s portal as drives are announced.',
      'Selected students sign the placement policy and follow exit-procedure rules (one offer accepted, no further drives).',
    ],
    calloutNote: { variant: 'info', title: 'Placement statistics', body: 'See the Placements section for current placement percentages by sector, recruiter list, and alumni success stories.' },
  }),

  cellPage({
    slug: 'student-support/health-care',
    title: 'Health Care',
    eyebrowTitle: 'Wellbeing',
    subtitle: 'First-aid on campus, partnered hospitals, mental wellness support, and health awareness.',
    purposeText: 'Health Care services at SGC include a campus first-aid station, designated medical officer visits, partnerships with nearby hospitals for student medical needs, and on-campus mental health support through counselling.',
    scopeBullets: [
      'First-aid station available during college hours',
      'Designated medical officer on call',
      'Tie-ups with local hospitals for emergency and specialist care',
      'Confidential mental health counselling',
      'Regular health awareness camps and check-ups',
    ],
    procedureSteps: [
      'For minor injuries or illness, visit the first-aid room near the Principal\'s Office.',
      'For emergencies, college staff will arrange transport to the partnered hospital.',
      'For counselling appointments, contact the Health Care Cell Convener — sessions are confidential.',
      'Health camps and check-ups are scheduled each semester — announcements via notice board.',
    ],
  }),

  cellPage({
    slug: 'student-support/pwd',
    title: 'Facilities for PwD Students',
    eyebrowTitle: 'Accessibility',
    subtitle: 'Physical, digital, and academic accommodations for students with disabilities.',
    purposeText: 'SGC complies with the UGC Accessibility Guidelines for Higher Education Institutions. We aim to make campus, classrooms, examinations, and academic resources accessible to students with disabilities — physical, sensory, or learning.',
    scopeBullets: [
      'Ramp access to ground-floor classrooms; accessible washrooms',
      'Reserved seating in classrooms when requested',
      'Extra time and scribe support in examinations',
      'Accessible digital learning materials',
      'One-on-one academic mentorship where needed',
      'Coordination with state disability welfare schemes for scholarships',
    ],
    procedureSteps: [
      'At admission, declare the disability with supporting medical certificate.',
      'Meet the PwD Cell Convener to agree on specific accommodations.',
      'Examination-time concessions (extra time, scribe) are arranged through the Examination Office in coordination with the Cell.',
      'For grievances about access, file a complaint with the Cell or the Equal Opportunity Cell.',
    ],
    calloutNote: { variant: 'info', title: 'Have a specific accommodation in mind?', body: 'Contact the PwD Cell at the start of your semester. Most accommodations can be arranged within 2 weeks. Some — like adapted lab equipment — may need longer.' },
  }),

  cellPage({
    slug: 'student-support/disciplinary',
    title: 'College Disciplinary Committee',
    eyebrowTitle: 'Conduct',
    subtitle: 'Investigates student conduct violations and recommends disciplinary action under the Code of Conduct.',
    purposeText: 'The Disciplinary Committee handles violations of the SGC Code of Conduct — academic dishonesty (cheating, plagiarism), property damage, fighting, repeated absenteeism, violation of dress code or examination rules, and similar matters.',
    scopeBullets: [
      'Academic dishonesty (cheating, plagiarism, impersonation)',
      'Damage to college property',
      'Violation of examination rules',
      'Disorderly conduct on campus or at college events',
      'Repeat violations of attendance, dress, or behaviour norms',
    ],
    procedureSteps: [
      'Incident reported to any faculty member, who refers to the Committee Convener.',
      'The student is notified in writing of the alleged violation within 5 working days.',
      'A hearing is scheduled — the student may bring a parent / guardian / counsel.',
      'Committee deliberates and issues a decision within 14 working days.',
      'Sanctions range from warning, fine, community service, suspension, to expulsion. Severe violations trigger external referral.',
    ],
    calloutNote: { variant: 'note', title: 'Appeals', body: 'Disciplinary decisions can be appealed to the Principal within 7 days. The Principal\'s decision is final at the college level; further appeals lie with the University.' },
  }),
]

const PAGES = [HUB, ...CELLS]

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
  console.log(`✓ logged in. Writing ${PAGES.length} pages.`)
  for (const page of PAGES) {
    try {
      const result = await writePage(token, page)
      console.log(`${result.action.padEnd(11)} ${page.slug.padEnd(40)} (id ${result.id})`)
    } catch (e) {
      console.log(`✗ ${page.slug}: ${e.message.slice(0, 200)}`)
    }
  }
}

main().catch((e) => { console.error('FATAL:', e.message); process.exit(1) })
