import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'content-editor',
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Content Editor', value: 'content-editor' },
        { label: 'Department Admin', value: 'department-admin' },
        { label: 'View Only', value: 'view-only' },
      ],
    },
  ],
}
