import { getPayload } from 'payload'
import config from '@payload-config'
import EventsCircularsSection from './EventsCircularsSection'

type Props = {
  eventsTitle?: string
  circularsTitle?: string
  eventsLimit?: number
  circularsLimit?: number
}

export default async function EventsCircularsServer({
  eventsTitle,
  circularsTitle,
  eventsLimit = 5,
  circularsLimit = 6,
}: Props) {
  const payload = await getPayload({ config })

  const [eventsResult, circularsResult] = await Promise.all([
    payload.find({
      collection: 'events',
      where: { status: { equals: 'published' } },
      sort: '-date',
      limit: eventsLimit,
    }),
    payload.find({
      collection: 'announcements',
      sort: '-date',
      limit: circularsLimit,
      depth: 1,
    }),
  ])

  const events = eventsResult.docs.map((e: any) => ({
    id: String(e.id),
    title: e.title,
    slug: e.slug,
    date: e.date,
    category: e.category || undefined,
    venue: e.venue || undefined,
  }))

  const circulars = circularsResult.docs.map((c: any) => ({
    id: String(c.id),
    title: c.title,
    date: c.date,
    category: c.category || undefined,
    isNew: c.isNew || false,
    pinned: c.pinned || false,
    link: c.link || undefined,
    fileUrl: c.attachment && typeof c.attachment === 'object' ? c.attachment.url : undefined,
  }))

  return (
    <EventsCircularsSection
      eventsTitle={eventsTitle}
      circularsTitle={circularsTitle}
      events={events}
      circulars={circulars}
    />
  )
}
