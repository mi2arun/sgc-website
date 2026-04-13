import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'status'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'date', type: 'date', required: true, admin: { position: 'sidebar' } },
    { name: 'time', type: 'text', admin: { position: 'sidebar' } },
    { name: 'venue', type: 'text' },
    { name: 'status', type: 'select', defaultValue: 'draft', options: [{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }], admin: { position: 'sidebar' } },
    { name: 'category', type: 'select', options: ['Academic', 'Cultural', 'Sports', 'Service', 'Festival'], admin: { position: 'sidebar' } },
    { name: 'images', type: 'array', fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }] },
    { name: 'description', type: 'richText', required: true },
    { name: 'registrationLink', type: 'text' },
  ],
}
