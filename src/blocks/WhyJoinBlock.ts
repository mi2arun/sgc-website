import type { Block } from 'payload'

export const WhyJoinBlock: Block = {
  slug: 'why-join',
  imageURL: '/blocks/why-join.svg',
  labels: { singular: 'Why Join SGC', plural: 'Why Join SGC' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Why Choose SGC?' },
    {
      name: 'reasons',
      type: 'array',
      fields: [
        { name: 'icon', type: 'text' },
        { name: 'heading', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
