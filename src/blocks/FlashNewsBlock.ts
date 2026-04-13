import type { Block } from 'payload'

export const FlashNewsBlock: Block = {
  slug: 'flash-news',
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
  ],
}
