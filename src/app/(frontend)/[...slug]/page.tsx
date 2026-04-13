export const dynamic = "force-dynamic"
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import RenderBlocks from '@/components/blocks/RenderBlocks'
import type { Metadata } from 'next'

type Args = {
  params: Promise<{ slug: string[] }>
}

export default async function DynamicPage({ params }: Args) {
  const { slug } = await params
  const slugString = slug.join('/')

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slugString },
    },
    limit: 1,
    depth: 2,
  })

  const page = docs[0]
  if (!page) notFound()

  return <RenderBlocks blocks={(page.layout as any[]) || []} />
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const slugString = slug.join('/')

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slugString },
    },
    limit: 1,
    depth: 2,
  })

  const page = docs[0]
  if (!page) return {}

  const meta = page.meta as any
  return {
    title: meta?.title || page.title,
    description: meta?.description,
  }
}
