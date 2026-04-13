import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const FacultyGridBlock: Block = {
  slug: 'faculty-grid',
  imageURL: '/blocks/why-join.svg',
  labels: { singular: 'Faculty Grid', plural: 'Faculty Grids' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Our Faculty' },
    {
      name: 'department',
      type: 'relationship',
      relationTo: 'departments',
      label: 'Filter by Department (leave empty to show all)',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 12,
      admin: { position: 'sidebar' },
    },
    ...sectionFields,
  ],
}
