import { getPayload } from 'payload'
import config from '@payload-config'

// A literal `sitemap.xml` segment — takes precedence over the sibling [...slug]
// catch-all (which was otherwise 404-ing /sitemap.xml).
export const dynamic = 'force-dynamic'

const BASE = (process.env.PAYLOAD_PUBLIC_SERVER_URL || 'https://sgc.edu.in').replace(/\/$/, '')

const xmlEscape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

type Entry = { loc: string; lastmod?: string }

export async function GET() {
  const entries: Entry[] = [{ loc: `${BASE}/` }]

  try {
    const payload = await getPayload({ config })

    const add = async (collection: string, prefix: string) => {
      try {
        const { docs } = await payload.find({
          collection: collection as never,
          limit: 2000,
          depth: 0,
          pagination: false,
          overrideAccess: true,
        })
        for (const d of docs as Array<Record<string, unknown>>) {
          const slug = d.slug as string | undefined
          if (!slug || slug === 'home') continue
          if (d._status && d._status !== 'published') continue // skip drafts
          if (d.visible === false) continue // skip hidden faculty
          entries.push({
            loc: `${BASE}${prefix ? `${prefix}/` : '/'}${slug}`,
            lastmod: d.updatedAt ? new Date(d.updatedAt as string).toISOString() : undefined,
          })
        }
      } catch {
        // collection missing / not queryable — skip, keep the rest
      }
    }

    await add('pages', '') // nested slugs (about/vision-mission) are already full paths
    await add('news', '/news')
    await add('events', '/events')
    await add('departments', '/dept')
    await add('faculty', '/faculty')
    await add('gallery', '/gallery')
  } catch {
    // DB unreachable — still return at least the homepage
  }

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries
      .map(
        (e) =>
          `  <url><loc>${xmlEscape(e.loc)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`,
      )
      .join('\n') +
    `\n</urlset>\n`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
