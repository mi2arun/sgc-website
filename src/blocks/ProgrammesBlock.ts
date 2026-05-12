import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const ProgrammesBlock: Block = {
  slug: 'programmes',
  imageURL: '/blocks/programmes.svg',
  labels: { singular: 'Programmes Section', plural: 'Programmes Sections' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Academic Excellence Across Disciplines' },
    { name: 'subtitle', type: 'textarea' },
    {
      name: 'typeFilter',
      type: 'select',
      options: [
        { label: 'All', value: 'all' },
        { label: 'UG only', value: 'UG' },
        { label: 'PG only', value: 'PG' },
        { label: 'Add-on only', value: 'Add-on' },
      ],
      defaultValue: 'all',
      admin: { position: 'sidebar', description: 'Restrict by programme type' },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 24,
      admin: { position: 'sidebar', description: 'Max programmes to show (from Courses collection)' },
    },
    // Deprecated: legacy inline array. Programmes now come from the Courses collection.
    // Kept (hidden) so Payload's schema push does not drop the existing data table.
    {
      name: 'departments',
      type: 'array',
      admin: { hidden: true },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'type', type: 'select', options: ['UG', 'PG'], required: true },
        { name: 'fees', type: 'text' },
        { name: 'icon', type: 'text', defaultValue: 'BookOpen' },
      ],
    },
    ...sectionFields,
  ],
}
