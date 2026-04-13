import type { CollectionConfig } from 'payload'

export const Placements: CollectionConfig = {
  slug: 'placements',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'role', 'year', 'category'],
  },
  fields: [
    { name: 'company', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'role', type: 'text' },
    { name: 'studentsPlaced', type: 'number' },
    { name: 'package', type: 'text' },
    { name: 'year', type: 'text', admin: { position: 'sidebar' } },
    { name: 'category', type: 'select', options: ['IT', 'Banking', 'Management', 'Higher Studies'], admin: { position: 'sidebar' } },
  ],
}
