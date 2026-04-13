import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Gallery' }

export default async function GalleryPage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'gallery',
    sort: '-date',
    limit: 20,
  })

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Gallery</h1>
          <p className="text-muted max-w-2xl mx-auto">Moments captured at SGC.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((album: any) => {
            const firstImage = album.images?.[0]?.image
            const imageUrl = firstImage && typeof firstImage === 'object' ? firstImage.url : null
            return (
              <Link key={album.id} href={`/gallery/${album.slug}`}
                className="group rounded-xl overflow-hidden border border-border/50 hover:shadow-lg transition-all">
                <div className="h-52 bg-gray-100 overflow-hidden">
                  {imageUrl ? (
                    <img src={imageUrl} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted">No images</div>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-primary group-hover:text-primary-light transition-colors">{album.title}</h2>
                  {album.category && <p className="text-xs text-muted mt-1">{album.category}</p>}
                  <p className="text-xs text-muted mt-1">{album.images?.length || 0} photos</p>
                </div>
              </Link>
            )
          })}
        </div>
        {docs.length === 0 && <p className="text-center text-muted">No gallery albums yet.</p>}
      </div>
    </section>
  )
}
