import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const PortalsBlock: Block = {
  slug: 'portals',
  imageURL: '/blocks/quick-access.svg',
  labels: { singular: 'External Portals', plural: 'External Portals' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Quick Links & Portals' },
    { name: 'subtitle', type: 'text' },
    {
      name: 'portals',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'text' },
        { name: 'url', type: 'text', required: true },
        { name: 'icon', type: 'text', defaultValue: 'ExternalLink' },
        { name: 'color', type: 'select', options: ['primary', 'accent', 'dark'], defaultValue: 'primary' },
      ],
    },
    ...sectionFields,
  ],
}
