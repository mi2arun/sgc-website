import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'What Our Students Say' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'batch', type: 'text' },
        { name: 'quote', type: 'textarea', required: true },
        { name: 'photo', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
