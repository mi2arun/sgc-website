// Phase 1a — scrape ~10 priority pages from source, create Page records with rich-text content.
// HTML → simple Lexical JSON via tag-aware text extraction.
// Idempotent: skips pages whose slug already exists.

const BASE = 'http://localhost:3000'
const RATE_MS = 1000 // 1s between source requests

// (sourceUrl, newSlug, newTitle) — order = priority
const PAGES = [
  ['https://sgc.edu.in/sgc/about_sgc', 'about',                          'About SGC'],
  ['https://sgc.edu.in/sgc/vision_mission', 'about/vision-mission',       'Vision & Mission'],
  ['https://sgc.edu.in/sgc/development_plan', 'about/institutional-development-plan', 'Institutional Development Plan'],
  ['https://sgc.edu.in/sgc/principal_profile', 'about/administration',    'Administration'],
  ['https://sgc.edu.in/sgc/admission_guide', 'admissions',                'Admissions'],
  ['https://sgc.edu.in/sgc/amenities', 'campus-life/amenities',           'Amenities'],
  ['https://sgc.edu.in/sgc/stu_support', 'student-support',               'Student Support'],
  ['https://sgc.edu.in/sgc/centres_clubs', 'student-support/clubs',       'Centres & Clubs'],
  ['https://sgc.edu.in/sgc/sports', 'student-support/sports',             'Sports'],
  ['https://sgc.edu.in/sgc/ncc', 'student-support/ncc-nss',               'NCC & NSS'],
  ['https://sgc.edu.in/sgc/examination', 'examination',                   'Examination'],
  ['https://sgc.edu.in/sgc/contact', 'contact',                           'Contact Us'],
  ['https://sgc.edu.in/sgc/placement_officer', 'placements',              'Placements'],
  ['https://sgc.edu.in/sgc/job_openings', 'placements/job-openings',      'Job Openings'],
  ['https://sgc.edu.in/sgc/center_for_research_publication', 'research',  'Centre for Research'],
  ['https://sgc.edu.in/sgc/sg_research_fund', 'research/fund',            'SG Research Fund'],
  ['https://sgc.edu.in/sgc/research_outcome', 'research/publications',    'Research Outcome'],
  ['https://sgc.edu.in/sgc/iic_activities', 'research/innovation',        'IIC Activities & Innovation'],
  ['https://sgc.edu.in/sgc/research_gallery', 'research/gallery',         'Research Gallery'],
  ['https://sgc.edu.in/sgc/mou', 'academics/academic-collaboration',      'Academic Collaboration'],
  ['https://sgc.edu.in/sgc/general_library', 'academics/library',         'Library'],
  ['https://sgc.edu.in/sgc/ug', 'academics/ug-programmes',                'UG Programmes'],
  ['https://sgc.edu.in/sgc/pg', 'academics/pg-programmes',                'PG Programmes'],
  ['https://sgc.edu.in/sgc/add_on_courses', 'academics/add-on-course',    'Add-on Courses'],
]

// ─── HTML → Lexical JSON converter (lightweight, regex-based) ───

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rdquo;/g, '”')
    .replace(/&ldquo;/g, '“')
    .replace(/&hellip;/g, '…')
    .replace(/&[a-z]+;/g, ' ') // any leftover named entity
}

function stripTags(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractMainContent(html) {
  // Try to find a content area; fall back to whole body
  let body = html
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  if (bodyMatch) body = bodyMatch[1]

  // Strip nav, header, footer, sidebar
  body = body.replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/gi, '')
  body = body.replace(/<header\b[^>]*>[\s\S]*?<\/header>/gi, '')
  body = body.replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi, '')
  body = body.replace(/<aside\b[^>]*>[\s\S]*?<\/aside>/gi, '')
  // CodeIgniter / Bootstrap-ish nav classes
  body = body.replace(/<div[^>]*class=["'][^"']*\bnavbar\b[^"']*["'][\s\S]*?<\/div>/gi, '')
  // scripts/styles
  body = body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  body = body.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
  return body
}

function blockify(htmlFragment) {
  // Walks HTML fragment producing an array of Lexical block-level nodes
  const out = []
  const tagRe = /<(h[1-6]|p|ul|ol|li|blockquote|table|tr|br|div)\b([^>]*)>([\s\S]*?)<\/\1>/gi
  let m
  // Simpler: split on these top-level tags and decide per tag
  // We'll use a state-machine-lite approach by scanning sequentially
  // Actually let's just split paragraphs by <p>...</p> first
  const paraRe = /<(h[1-6]|p|li|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/gi
  while ((m = paraRe.exec(htmlFragment)) !== null) {
    const tag = m[1].toLowerCase()
    const inner = m[2]
    const text = decodeEntities(stripTags(inner))
    if (!text) continue
    if (tag.startsWith('h')) {
      out.push({
        type: 'heading',
        tag,
        children: [{ type: 'text', text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
        direction: 'ltr', format: '', indent: 0, version: 1,
      })
    } else if (tag === 'li') {
      // Coalesce into a list; simplest: render as paragraphs prefixed with •
      out.push({
        type: 'paragraph',
        children: [{ type: 'text', text: '• ' + text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
        direction: 'ltr', format: '', indent: 0, textFormat: 0, textStyle: '', version: 1,
      })
    } else {
      out.push({
        type: 'paragraph',
        children: [{ type: 'text', text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
        direction: 'ltr', format: '', indent: 0, textFormat: 0, textStyle: '', version: 1,
      })
    }
  }
  return out
}

async function fetchHtml(url) {
  const r = await fetch(url, {
    headers: { 'User-Agent': 'sgc-migration-bot/1.0' },
    redirect: 'follow',
  })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.text()
}

async function login() {
  const r = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@sgc.edu.in', password: 'admin123' }),
  })
  if (!r.ok) throw new Error('login failed')
  return (await r.json()).token
}

async function pageExists(token, slug) {
  const r = await fetch(
    `${BASE}/api/pages?where%5Bslug%5D%5Bequals%5D=${encodeURIComponent(slug)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } },
  )
  const d = await r.json()
  return (d.docs || []).length > 0
}

async function getPageId(token, slug) {
  const r = await fetch(
    `${BASE}/api/pages?where%5Bslug%5D%5Bequals%5D=${encodeURIComponent(slug)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } },
  )
  const d = await r.json()
  return d.docs?.[0]?.id
}

async function main() {
  const token = await login()
  console.log('✓ logged in')

  const report = []
  let i = 0
  for (const [url, slug, title] of PAGES) {
    i++
    try {
      console.log(`[${i}/${PAGES.length}] ${slug}  ←  ${url}`)
      const html = await fetchHtml(url)
      const main = extractMainContent(html)
      const blocks = blockify(main)
      if (blocks.length === 0) {
        report.push({ slug, status: 'empty', note: 'No blocks extracted from source' })
        continue
      }

      const layout = [
        {
          blockType: 'rich-text',
          enabled: true,
          heading: title,
          width: 'narrow',
          align: 'left',
          content: {
            root: {
              type: 'root',
              children: blocks,
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
        },
      ]

      const exists = await pageExists(token, slug)
      const body = JSON.stringify({ title, slug, layout, _status: 'published' })
      let res
      if (exists) {
        const id = await getPageId(token, slug)
        res = await fetch(`${BASE}/api/pages/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
          body,
        })
      } else {
        res = await fetch(`${BASE}/api/pages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
          body,
        })
      }
      if (!res.ok) {
        const txt = await res.text()
        report.push({ slug, status: 'error', note: `${res.status}: ${txt.slice(0, 200)}` })
        continue
      }
      const saved = await res.json()
      report.push({
        slug,
        status: exists ? 'updated' : 'created',
        blocks: blocks.length,
        textLen: blocks.reduce((a, b) => a + (b.children?.[0]?.text?.length || 0), 0),
      })
    } catch (e) {
      report.push({ slug, status: 'failed', note: e.message })
    }
    await new Promise((r) => setTimeout(r, RATE_MS))
  }

  console.log('\n─── Report ───')
  for (const r of report) {
    const tag = r.status === 'created' ? '✓ created' : r.status === 'updated' ? '⟳ updated' : r.status === 'empty' ? '∅ empty' : '✗ ' + r.status
    console.log(`  ${tag.padEnd(12)} ${r.slug.padEnd(40)} ${r.blocks ? `(${r.blocks} blocks, ${r.textLen} chars)` : (r.note || '')}`)
  }
  const ok = report.filter((r) => r.status === 'created' || r.status === 'updated').length
  console.log(`\n${ok}/${PAGES.length} pages successfully written.`)
}

main().catch((e) => { console.error('FATAL:', e.message); process.exit(1) })
