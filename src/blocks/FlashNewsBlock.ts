import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const FlashNewsBlock: Block = {
  slug: 'flash-news',
  imageURL: '/blocks/flash-news.svg',
  labels: { singular: 'Flash News', plural: 'Flash News' },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'text', type: 'text', required: true },
        { name: 'link', type: 'text' },
      ],
    },
    ...sectionFields,
  ],
}
