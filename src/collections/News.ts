import type { CollectionConfig, Access } from 'payload'

const publishedOnly: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}

export const News: CollectionConfig = {
  slug: 'news',
  access: {
    read: publishedOnly,
  },
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', '_status'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'date', type: 'date', required: true, admin: { position: 'sidebar' } },
    { name: 'category', type: 'select', options: ['Academic', 'Event', 'Achievement', 'General'], admin: { position: 'sidebar' } },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea' },
    { name: 'content', type: 'richText', required: true },
  ],
}
