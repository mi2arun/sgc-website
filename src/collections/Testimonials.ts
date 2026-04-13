import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'batch', 'department'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'batch', type: 'text' },
    { name: 'designation', type: 'text' },
    { name: 'department', type: 'text' },
    { name: 'order', type: 'number', admin: { position: 'sidebar' } },
  ],
}
