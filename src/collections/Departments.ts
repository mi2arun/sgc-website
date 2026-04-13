import type { CollectionConfig, Access } from 'payload'
import { blocks } from '../blocks'

const publishedOnly: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}

export const Departments: CollectionConfig = {
  slug: 'departments',
  access: {
    read: publishedOnly,
  },
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'shortName', '_status'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'shortName', type: 'text', admin: { position: 'sidebar' } },
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
      admin: {
        initCollapsed: true,
      },
    },
  ],
}
