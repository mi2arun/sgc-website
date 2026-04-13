import type { CollectionConfig, Access, FieldAccess } from 'payload'

const isAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  return (user as any).role === 'super-admin'
}

const isAdminField: FieldAccess = ({ req: { user } }) => {
  if (!user) return false
  return (user as any).role === 'super-admin'
}

const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if ((user as any).role === 'super-admin') return true
  return { id: { equals: user.id } }
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    update: isAdminOrSelf,
    read: () => true,
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
      access: {
        update: isAdminField,
      },
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Content Editor', value: 'content-editor' },
        { label: 'Department Admin', value: 'department-admin' },
        { label: 'View Only', value: 'view-only' },
      ],
    },
  ],
}
