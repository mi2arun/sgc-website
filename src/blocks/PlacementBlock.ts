import type { Block } from 'payload'

export const PlacementBlock: Block = {
  slug: 'placements',
  labels: { singular: 'Placement Section', plural: 'Placement Sections' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Placement Highlights' },
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'percentage', type: 'number', required: true },
      ],
    },
  ],
}
