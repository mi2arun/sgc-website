export const dynamic = "force-dynamic"
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'

type Args = { params: Promise<{ slug: string }> }

export default async function GalleryDetailPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'gallery',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const album = docs[0]
  if (!album) notFound()

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary mb-2">{album.title}</h1>
        {album.description && <p className="text-muted mb-8">{album.description}</p>}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(album.images as any[])?.map((item: any, i: number) => {
            const img = typeof item.image === 'object' ? item.image : null
            if (!img) return null
            return (
              <div key={i} className="rounded-xl overflow-hidden bg-gray-100">
                <img src={img.url} alt={img.alt || album.title} className="w-full h-64 object-cover" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'gallery', where: { slug: { equals: slug } }, limit: 1 })
  const album = docs[0]
  if (!album) return {}
  return { title: album.title }
}
