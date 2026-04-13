import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const StatsBlock: Block = {
  slug: 'stats',
  imageURL: '/blocks/stats.svg',
  labels: { singular: 'Stats Section', plural: 'Stats Sections' },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'number', required: true },
        { name: 'suffix', type: 'text', defaultValue: '+' },
      ],
    },
    ...sectionFields,
  ],
}
