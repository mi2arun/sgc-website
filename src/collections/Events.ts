import type { CollectionConfig, Access } from 'payload'

const publishedOnly: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}

export const Events: CollectionConfig = {
  slug: 'events',
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
    { name: 'time', type: 'text', admin: { position: 'sidebar' } },
    { name: 'venue', type: 'text' },
    { name: 'category', type: 'select', options: ['Academic', 'Cultural', 'Sports', 'Service', 'Festival'], admin: { position: 'sidebar' } },
    { name: 'images', type: 'array', fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }] },
    { name: 'description', type: 'richText', required: true },
    { name: 'registrationLink', type: 'text' },
  ],
}
