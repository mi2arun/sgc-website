export const dynamic = "force-dynamic"
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'
import RichText from '@/components/RichText'

type Args = { params: Promise<{ slug: string }> }

export default async function EventDetailPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
  })

  const event = docs[0]
  if (!event) notFound()

  return (
    <article className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {event.category && <span className="text-xs font-semibold text-accent uppercase tracking-wider">{event.category as string}</span>}
        <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">{event.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-muted mb-8">
          <span>{new Date(event.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          {event.time && <span>{event.time}</span>}
          {event.venue && <span>{event.venue}</span>}
        </div>
        <div className="prose prose-lg max-w-none">
          <RichText content={event.description} />
        </div>
        {event.registrationLink && (
          <div className="mt-8">
            <a href={event.registrationLink as string} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-primary-dark font-semibold px-6 py-3 rounded-lg hover:bg-accent-light transition-colors text-sm">
              Register Now
            </a>
          </div>
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
  })
  const event = docs[0]
  if (!event) return {}
  return { title: event.title }
}
