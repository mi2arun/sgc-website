import { getPayload } from 'payload'
import config from '@payload-config'
import NewsEventsSection from './NewsEventsSection'

type Props = {
  title?: string
  newsLimit?: number
  eventsLimit?: number
}

type NewsDoc = { title: string; date: string; excerpt?: string | null }
type EventDoc = { title: string; date: string; category?: string | null; venue?: string | null }

export default async function NewsEventsServer({ title, newsLimit = 4, eventsLimit = 4 }: Props) {
  const payload = await getPayload({ config })

  const [newsResult, eventsResult] = await Promise.all([
    payload.find({ collection: 'news', sort: '-date', limit: newsLimit }),
    payload.find({ collection: 'events', sort: '-date', limit: eventsLimit }),
  ])

  const news = (newsResult.docs as unknown as NewsDoc[]).map((n) => ({
    title: n.title,
    date: n.date,
    excerpt: n.excerpt || '',
  }))

  const events = (eventsResult.docs as unknown as EventDoc[]).map((e) => ({
    title: e.title,
    date: e.date,
    category: e.category || '',
    description: e.venue || '',
  }))

  return <NewsEventsSection title={title} news={news} events={events} />
}
