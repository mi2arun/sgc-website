export const dynamic = "force-dynamic"
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'
import RichText from '@/components/RichText'

type Args = { params: Promise<{ slug: string }> }

export default async function NewsDetailPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'news',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
  })

  const article = docs[0]
  if (!article) notFound()

  return (
    <article className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {article.category && <span className="text-xs font-semibold text-accent uppercase tracking-wider">{article.category as string}</span>}
        <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">{article.title}</h1>
        <p className="text-sm text-muted mb-8">{new Date(article.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        {article.image && typeof article.image === 'object' && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img src={(article.image as any).url} alt={article.title} className="w-full" />
          </div>
        )}
        <div className="prose prose-lg max-w-none">
          <RichText content={article.content} />
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'news',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
  })
  const article = docs[0]
  if (!article) return {}
  return { title: article.title, description: article.excerpt as string }
}
