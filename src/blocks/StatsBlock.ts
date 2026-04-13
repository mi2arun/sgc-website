import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'stats',
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
  ],
}
