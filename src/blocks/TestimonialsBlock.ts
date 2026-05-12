import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  imageURL: '/blocks/testimonials.svg',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'What Our Students Say' },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      admin: { position: 'sidebar', description: 'How many testimonials to show (from Testimonials collection)' },
    },
    // Deprecated: legacy inline array. Content now comes from the Testimonials collection.
    // Kept (hidden) so Payload's schema push does not drop the existing data table.
    {
      name: 'items',
      type: 'array',
      admin: { hidden: true },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'batch', type: 'text' },
        { name: 'quote', type: 'textarea', required: true },
        { name: 'photo', type: 'upload', relationTo: 'media' },
      ],
    },
    ...sectionFields,
  ],
}
