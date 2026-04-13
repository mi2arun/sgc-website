import { getPayload } from 'payload'
import config from '@payload-config'
import RenderBlocks from '@/components/blocks/RenderBlocks'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'home' },
      status: { equals: 'published' },
    },
    limit: 1,
    depth: 2,
  })

  const page = docs[0]

  if (!page || !page.layout) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-primary">Welcome to SGC</h1>
        <p className="text-muted mt-2">Homepage content is being set up. Please check the admin panel.</p>
      </div>
    )
  }

  return <RenderBlocks blocks={page.layout as any[]} />
}
