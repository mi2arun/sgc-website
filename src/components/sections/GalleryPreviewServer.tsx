import { getPayload } from 'payload'
import config from '@payload-config'
import GalleryPreviewSection from './GalleryPreviewSection'

type Props = {
  title?: string
  limit?: number
}

type GalleryDoc = {
  date?: string | null
  images?: { image?: { url?: string | null; alt?: string | null } | string | number | null }[] | null
}

export default async function GalleryPreviewServer({ title, limit = 8 }: Props) {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'gallery',
    sort: '-date',
    limit: 12,
    depth: 1,
  })

  const flat: { image: { url?: string | null; alt?: string | null } | string | number | null }[] = []
  for (const album of result.docs as unknown as GalleryDoc[]) {
    for (const item of album.images || []) {
      if (!item?.image) continue
      flat.push({ image: item.image })
      if (flat.length >= limit) break
    }
    if (flat.length >= limit) break
  }

  return <GalleryPreviewSection title={title} images={flat} />
}
