import type { Block } from 'payload'

export const ProgrammesBlock: Block = {
  slug: 'programmes',
  labels: { singular: 'Programmes Section', plural: 'Programmes Sections' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Academic Excellence Across Disciplines' },
    { name: 'subtitle', type: 'textarea' },
    {
      name: 'departments',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'type', type: 'select', options: ['UG', 'PG'], required: true },
        { name: 'fees', type: 'text' },
        { name: 'icon', type: 'text', defaultValue: 'BookOpen' },
      ],
    },
  ],
}
