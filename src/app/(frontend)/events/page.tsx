import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Events' }

export default async function EventsPage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'events',
    sort: '-date',
    limit: 20,
  })

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Events</h1>
          <p className="text-muted max-w-2xl mx-auto">Explore campus events and activities.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((event: any) => (
            <Link key={event.id} href={`/events/${event.slug}`}
              className="group bg-white rounded-xl border border-border/50 p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary/5 rounded-lg flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs text-accent font-semibold">{new Date(event.date).toLocaleDateString('en-IN', { month: 'short' }).toUpperCase()}</span>
                  <span className="text-lg font-bold text-primary">{new Date(event.date).getDate()}</span>
                </div>
                <div>
                  {event.category && <span className="text-xs font-semibold text-accent uppercase">{event.category}</span>}
                  <h2 className="text-base font-semibold text-primary group-hover:text-primary-light transition-colors">{event.title}</h2>
                  {event.venue && <p className="text-xs text-muted mt-1">{event.venue}</p>}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {docs.length === 0 && <p className="text-center text-muted">No events yet.</p>}
      </div>
    </section>
  )
}
