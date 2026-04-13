import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'category', type: 'select', required: true, options: ['NAAC', 'IQAC', 'NIRF', 'AICTE', 'UGC', 'ISO', 'RTI', 'General'], admin: { position: 'sidebar' } },
    { name: 'file', type: 'upload', relationTo: 'media', required: true },
    { name: 'year', type: 'text', admin: { position: 'sidebar' } },
    { name: 'description', type: 'textarea' },
    { name: 'order', type: 'number', admin: { position: 'sidebar' } },
  ],
}
