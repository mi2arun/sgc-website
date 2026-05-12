// Phase 2 — Departments + Faculty mass import.
// 1) Add missing departments (language-studies, library, physical-education)
// 2) Fix computer-application slug
// 3) Scrape each source dept page, create Faculty records linked by dept

const BASE = 'http://localhost:3000'
const RATE_MS = 1000

// (sourceUrl, departmentSlug) — dept slug must match a Department row
const DEPT_SOURCES = [
  ['https://sgc.edu.in/sgc/dept_eng_ug',      'english'],
  ['https://sgc.edu.in/sgc/dept_eng_pg',      'english'],
  ['https://sgc.edu.in/sgc/dept_cs_ug',       'computer-science'],
  ['https://sgc.edu.in/sgc/dept_cs_pg',       'computer-science'],
  ['https://sgc.edu.in/sgc/dept_ca',          'computer-application'],
  ['https://sgc.edu.in/sgc/dept_it',          'information-technology'],
  ['https://sgc.edu.in/sgc/dept_maths_ug',    'mathematics'],
  ['https://sgc.edu.in/sgc/dept_maths_pg',    'mathematics'],
  ['https://sgc.edu.in/sgc/dept_phy',         'physics'],
  ['https://sgc.edu.in/sgc/dept_comm_ug',     'commerce'],
  ['https://sgc.edu.in/sgc/dept_comm_pg',     'commerce'],
  ['https://sgc.edu.in/sgc/dept_corp_secr',   'commerce'],
  ['https://sgc.edu.in/sgc/dept_mgmt_study',  'business-administration'],
  ['https://sgc.edu.in/sgc/dept_language',    'language-studies'],
  ['https://sgc.edu.in/sgc/dept_lib',         'library'],
  ['https://sgc.edu.in/sgc/dept_phy_edu',     'physical-education'],
]

const NEW_DEPTS = [
  { name: 'Department of Language Studies', slug: 'language-studies', shortName: 'LANG' },
  { name: 'Department of Library', slug: 'library', shortName: 'LIB' },
  { name: 'Department of Physical Education', slug: 'physical-education', shortName: 'PE' },
]

async function login() {
  const r = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@sgc.edu.in', password: 'admin123' }),
  })
  return (await r.json()).token
}

async function getDepartmentBySlug(token, slug) {
  const r = await fetch(
    `${BASE}/api/departments?where%5Bslug%5D%5Bequals%5D=${encodeURIComponent(slug)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } },
  )
  const d = await r.json()
  return d.docs?.[0]
}

async function createDepartment(token, dept) {
  const existing = await getDepartmentBySlug(token, dept.slug)
  if (existing) return existing
  const r = await fetch(`${BASE}/api/departments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify({ ...dept, _status: 'published' }),
  })
  if (!r.ok) throw new Error(`dept create failed: ${await r.text()}`)
  const j = await r.json()
  return j.doc || j
}

async function fixCAslug(token) {
  // Source dept slug for CA is broken ("do well do good do better"). Fix it.
  const broken = await getDepartmentBySlug(token, 'do well do good do better')
  if (!broken) return null
  const r = await fetch(`${BASE}/api/departments/${broken.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify({ slug: 'computer-application', name: 'Department of Computer Application', shortName: 'CA' }),
  })
  if (!r.ok) throw new Error(`CA slug fix failed: ${await r.text()}`)
  return (await r.json()).doc
}

function extractFacultyNames(html) {
  // Source pages list faculty with titles like "Dr. NAME", "Mr. NAME", "Mrs. NAME", or "X. NAME"
  // Strategy: strip tags, find lines matching common faculty name patterns
  const stripped = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, '')
    .replace(/<header\b[\s\S]*?<\/header>/gi, '')
    .replace(/<footer\b[\s\S]*?<\/footer>/gi, '')

  // Look for groups of <h*> or strong/b tags that contain a name pattern
  const names = new Set()
  // Names: optional title (Dr.|Mr.|Mrs.|Ms.|Prof.|Shri|Smt) + 1-3 ALL-CAPS or Capitalized words
  // Often in source as "Dr. RAMESH KUMAR" or "M. JOHN JACOB"
  const re = /(?:Dr\.?|Mr\.?|Mrs\.?|Ms\.?|Prof\.?|Smt\.?|Shri)\s+([A-Z][A-Z\s.]{3,40})/g
  let m
  while ((m = re.exec(stripped)) !== null) {
    const candidate = m[0].replace(/\s+/g, ' ').trim()
    if (candidate.length >= 6 && candidate.length <= 60) names.add(candidate)
  }
  // Also try: "X. SOMETHING SOMETHING" — initial. surname (e.g. "D. SARASWATHI")
  const re2 = /(?:^|[\s>])([A-Z]\.\s*[A-Z][A-Z\s]{4,40})/g
  while ((m = re2.exec(stripped)) !== null) {
    const candidate = m[1].replace(/\s+/g, ' ').trim()
    if (candidate.length >= 5 && candidate.length <= 50 && /^[A-Z]\.\s*[A-Z]/.test(candidate)) {
      // Avoid common false positives
      if (!/^[A-Z]\.\s*[A-Z]\s*$/.test(candidate)) names.add(candidate)
    }
  }
  return [...names]
}

function inferDesignation(nameLine, contextHtml) {
  // Look near the name for designation hints
  const ctx = contextHtml.slice(0, 4000).toLowerCase()
  if (ctx.includes('hod') || ctx.includes('head of department') || ctx.includes('& hod')) return 'Associate Professor & HOD'
  if (ctx.includes('associate professor')) return 'Associate Professor'
  if (ctx.includes('lab instructor')) return 'Lab Instructor'
  if (ctx.includes('assistant professor')) return 'Assistant Professor'
  return 'Assistant Professor'
}

function nameToSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

async function getFacultyBySlug(token, slug) {
  const r = await fetch(
    `${BASE}/api/faculty?where%5Bslug%5D%5Bequals%5D=${encodeURIComponent(slug)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } },
  )
  const d = await r.json()
  return d.docs?.[0]
}

async function createFaculty(token, data) {
  const slug = nameToSlug(data.name)
  const existing = await getFacultyBySlug(token, slug)
  if (existing) return { status: 'skip-exists', id: existing.id }
  const r = await fetch(`${BASE}/api/faculty`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify({ ...data, slug, visible: true }),
  })
  if (!r.ok) return { status: 'error', note: await r.text() }
  return { status: 'created' }
}

async function main() {
  const token = await login()
  console.log('✓ logged in')

  // (1) fix computer-application slug if needed
  const fixed = await fixCAslug(token)
  if (fixed) console.log(`  ⟳ fixed Computer Application slug → ${fixed.slug}`)

  // (2) create 3 new departments
  for (const d of NEW_DEPTS) {
    const result = await createDepartment(token, d)
    console.log(`  + ${result.slug} (${result.name})`)
  }

  // (3) scrape and create faculty
  const report = { created: 0, skipped: 0, errors: 0, depts: {} }
  let i = 0
  for (const [url, deptSlug] of DEPT_SOURCES) {
    i++
    try {
      const dept = await getDepartmentBySlug(token, deptSlug)
      if (!dept) {
        console.log(`[${i}/${DEPT_SOURCES.length}] ✗ dept not found: ${deptSlug}`)
        continue
      }
      const r = await fetch(url, { headers: { 'User-Agent': 'sgc-migration-bot/1.0' } })
      if (!r.ok) {
        console.log(`[${i}/${DEPT_SOURCES.length}] ✗ ${url} → ${r.status}`)
        continue
      }
      const html = await r.text()
      const names = extractFacultyNames(html)
      console.log(`[${i}/${DEPT_SOURCES.length}] ${deptSlug.padEnd(28)} ← ${url.split('/').pop().padEnd(20)} (${names.length} names)`)
      report.depts[deptSlug] = report.depts[deptSlug] || { dept: dept.name, count: 0 }
      for (const name of names) {
        const designation = /\bHOD\b/i.test(html.slice(html.indexOf(name) - 80, html.indexOf(name) + 80))
          ? 'Associate Professor & HOD'
          : inferDesignation(name, html)
        const res = await createFaculty(token, {
          name: name.replace(/\s+/g, ' ').trim(),
          designation,
          department: dept.id,
        })
        if (res.status === 'created') report.created++
        else if (res.status === 'skip-exists') report.skipped++
        else { report.errors++; console.log(`    ✗ ${name}: ${res.note?.slice(0, 100)}`) }
        report.depts[deptSlug].count++
      }
    } catch (e) {
      console.log(`[${i}/${DEPT_SOURCES.length}] ✗ ${url}: ${e.message}`)
    }
    await new Promise((r) => setTimeout(r, RATE_MS))
  }

  console.log(`\n─── Faculty Report ───`)
  console.log(`Created: ${report.created}  Skipped (exists): ${report.skipped}  Errors: ${report.errors}`)
}

main().catch((e) => { console.error('FATAL:', e.message); process.exit(1) })
