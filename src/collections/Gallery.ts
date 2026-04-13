import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'category', type: 'select', options: ['Campus', 'Events', 'Sports', 'Cultural', 'Academic'], admin: { position: 'sidebar' } },
    { name: 'date', type: 'date', admin: { position: 'sidebar' } },
    { name: 'description', type: 'textarea' },
    { name: 'images', type: 'array', fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }] },
    { name: 'videos', type: 'array', fields: [{ name: 'url', type: 'text', required: true }] },
  ],
}
