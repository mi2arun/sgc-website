import { getPayload } from 'payload'
import config from '@payload-config'
import TestimonialsSection from './TestimonialsSection'

type Props = {
  title?: string
  limit?: number
}

type TestimonialDoc = {
  name: string
  batch?: string | null
  quote: string
  photo?: { url?: string | null; alt?: string | null } | string | number | null
  order?: number | null
}

export default async function TestimonialsServer({ title, limit = 6 }: Props) {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'testimonials',
    sort: ['order', '-createdAt'],
    limit,
    depth: 1,
  })

  const items = (result.docs as unknown as TestimonialDoc[]).map((t) => ({
    name: t.name,
    batch: t.batch || '',
    quote: t.quote,
    photo: t.photo,
  }))

  return <TestimonialsSection title={title} items={items} />
}
