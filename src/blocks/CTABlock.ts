import type { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'cta',
  imageURL: '/blocks/cta.svg',
  labels: { singular: 'Call to Action', plural: 'Call to Actions' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'buttonLabel', type: 'text', defaultValue: 'Apply Now' },
    { name: 'buttonLink', type: 'text', defaultValue: '/admissions/apply' },
    { name: 'phone', type: 'text' },
  ],
}
