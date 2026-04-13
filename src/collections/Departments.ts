import type { CollectionConfig } from 'payload'
import { blocks } from '../blocks'

export const Departments: CollectionConfig = {
  slug: 'departments',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'shortName', 'status'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'shortName', type: 'text', admin: { position: 'sidebar' } },
    { name: 'status', type: 'select', defaultValue: 'draft', options: [{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }], admin: { position: 'sidebar' } },
    { name: 'description', type: 'richText' },
    { name: 'bannerImage', type: 'upload', relationTo: 'media' },
    {
      name: 'hod',
      type: 'group',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'designation', type: 'text' },
        { name: 'photo', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: blocks,
    },
  ],
}
