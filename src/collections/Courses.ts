import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'department', 'fees'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'type', type: 'select', required: true, options: [{ label: 'UG', value: 'UG' }, { label: 'PG', value: 'PG' }, { label: 'Add-on', value: 'Add-on' }], admin: { position: 'sidebar' } },
    { name: 'department', type: 'relationship', relationTo: 'departments', admin: { position: 'sidebar' } },
    { name: 'fees', type: 'text' },
    { name: 'duration', type: 'text' },
    { name: 'eligibility', type: 'text' },
    { name: 'syllabus', type: 'upload', relationTo: 'media' },
    { name: 'icon', type: 'text', defaultValue: 'BookOpen' },
  ],
}
