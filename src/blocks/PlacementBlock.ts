import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const PlacementBlock: Block = {
  slug: 'placements',
  imageURL: '/blocks/placements.svg',
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
    ...sectionFields,
  ],
}
