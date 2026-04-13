import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const QuickAccessBlock: Block = {
  slug: 'quick-access',
  imageURL: '/blocks/quick-access.svg',
  labels: { singular: 'Quick Access', plural: 'Quick Access' },
  fields: [
    {
      name: 'buttons',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'description', type: 'text' },
        { name: 'href', type: 'text', required: true },
        { name: 'icon', type: 'text' },
        { name: 'color', type: 'text', defaultValue: 'primary' },
      ],
    },
    ...sectionFields,
  ],
}
