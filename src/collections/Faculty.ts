import type { CollectionConfig } from 'payload'

export const Faculty: CollectionConfig = {
  slug: 'faculty',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'designation', 'department'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'designation', type: 'text' },
    { name: 'qualifications', type: 'text' },
    { name: 'department', type: 'relationship', relationTo: 'departments', admin: { position: 'sidebar' } },
    { name: 'specialization', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'text' },
    { name: 'publications', type: 'richText' },
    { name: 'bio', type: 'richText' },
    { name: 'order', type: 'number', admin: { position: 'sidebar' } },
    { name: 'visible', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}
