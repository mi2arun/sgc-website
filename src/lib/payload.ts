import { getPayload } from 'payload'
import config from '@payload-config'

export async function getSettings() {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'site-settings' })
}

export async function getNavigation() {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'navigation' })
}

export async function getFooter() {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'footer' })
}

export async function getActivePopups() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'popups',
    where: { enabled: { equals: true } },
    sort: '-priority',
    depth: 1,
    limit: 20,
  })
  return docs.map((p: any) => ({
    id: String(p.id),
    name: p.name as string,
    heading: (p.heading as string) || null,
    body: (p.body as string) || null,
    imageUrl: p.image && typeof p.image === 'object' ? (p.image.url as string) : null,
    ctaLabel: (p.ctaLabel as string) || null,
    ctaLink: (p.ctaLink as string) || null,
    ctaNewTab: Boolean(p.ctaNewTab),
    targetPaths: ((p.targetPaths as any[]) || []).map((t) => t?.path).filter(Boolean),
    startAt: (p.startAt as string) || null,
    endAt: (p.endAt as string) || null,
    frequency: (p.frequency as string) || 'session',
    delaySeconds: typeof p.delaySeconds === 'number' ? p.delaySeconds : 1,
    priority: typeof p.priority === 'number' ? p.priority : 0,
  }))
}
