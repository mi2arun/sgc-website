import { getPayload } from 'payload'
import config from '@payload-config'
import AnnouncementsPanel from './AnnouncementsPanel'

type Props = {
  title?: string
  limit?: number
}

type AnnouncementDoc = {
  title: string
  date: string
  category?: string | null
  isNew?: boolean | null
  pinned?: boolean | null
  link?: string | null
  attachment?: { url?: string | null } | string | number | null
}

export default async function AnnouncementsServer({ title, limit = 8 }: Props) {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'announcements',
    sort: ['-pinned', '-date'],
    limit,
    depth: 1,
  })

  const items = (result.docs as unknown as AnnouncementDoc[]).map((a) => {
    const fileUrl =
      a.attachment && typeof a.attachment === 'object' ? a.attachment.url || '' : ''
    return {
      title: a.title,
      date: a.date,
      category: a.category || 'General',
      isNew: a.isNew ?? false,
      href: a.link || fileUrl || '#',
    }
  })

  return <AnnouncementsPanel title={title} items={items} />
}
