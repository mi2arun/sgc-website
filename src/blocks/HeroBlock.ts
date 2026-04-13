import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero Section', plural: 'Hero Sections' },
  fields: [
    {
      name: 'slides',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'ctaLabel', type: 'text', defaultValue: 'Learn More' },
        { name: 'ctaLink', type: 'text', defaultValue: '/' },
      ],
    },
  ],
}
