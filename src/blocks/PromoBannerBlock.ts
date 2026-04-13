import type { Block } from 'payload'

export const PromoBannerBlock: Block = {
  slug: 'promo-banner',
  labels: { singular: 'Promo Banner', plural: 'Promo Banners' },
  fields: [
    {
      name: 'banners',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'text' },
        { name: 'cta', type: 'text', defaultValue: 'Learn More' },
        { name: 'href', type: 'text', required: true },
        { name: 'color', type: 'select', options: ['primary', 'gold', 'accent'], defaultValue: 'primary' },
      ],
    },
  ],
}
