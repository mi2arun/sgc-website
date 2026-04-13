export const dynamic = "force-dynamic"
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News',
}

export default async function NewsPage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'news',
    sort: '-date',
    limit: 20,
  })

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Latest News</h1>
          <p className="text-muted max-w-2xl mx-auto">Stay updated with the latest happenings at SGC.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((item: any) => (
            <Link key={item.id} href={`/news/${item.slug}`}
              className="group bg-white rounded-xl border border-border/50 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
              {item.image && typeof item.image === 'object' && (
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img src={item.image.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
              )}
              <div className="p-5">
                {item.category && <span className="text-xs font-semibold text-accent uppercase">{item.category}</span>}
                <h2 className="text-lg font-semibold text-primary mt-1 group-hover:text-primary-light transition-colors">{item.title}</h2>
                <p className="text-sm text-muted mt-2 line-clamp-2">{item.excerpt}</p>
                <p className="text-xs text-muted mt-3">{new Date(item.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </Link>
          ))}
        </div>
        {docs.length === 0 && <p className="text-center text-muted">No news articles yet.</p>}
      </div>
    </section>
  )
}
