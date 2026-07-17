import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

const BASE = (process.env.PAYLOAD_PUBLIC_SERVER_URL || 'https://sgc.edu.in').replace(/\/$/, '')

// Regenerate at most hourly rather than on every request.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
  ]

  let payload
  try {
    payload = await getPayload({ config })
  } catch {
    return entries // still return the homepage if the DB is unreachable
  }

  // Pull published, visible docs from a collection and map each slug to a URL.
  const collect = async (collection: string, prefix: string) => {
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
        if (d.visible === false) continue // skip hidden (e.g. faculty)
        const path = prefix ? `${prefix}/${slug}` : `/${slug}`
        entries.push({
          url: `${BASE}${path}`,
          lastModified: d.updatedAt ? new Date(d.updatedAt as string) : now,
          changeFrequency: 'weekly',
        })
      }
    } catch {
      // collection missing or query issue — skip it, keep the rest of the sitemap
    }
  }

  await collect('pages', '') // nested slugs like about/vision-mission are already full paths
  await collect('news', '/news')
  await collect('events', '/events')
  await collect('departments', '/dept')
  await collect('faculty', '/faculty')
  await collect('gallery', '/gallery')

  return entries
}
