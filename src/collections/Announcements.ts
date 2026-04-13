import type { CollectionConfig } from 'payload'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'pinned'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'date', type: 'date', required: true, admin: { position: 'sidebar' } },
    { name: 'category', type: 'select', options: ['Examination', 'Fees', 'Admission', 'Academic', 'General'], admin: { position: 'sidebar' } },
    { name: 'attachment', type: 'upload', relationTo: 'media' },
    { name: 'link', type: 'text' },
    { name: 'pinned', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'isNew', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}
