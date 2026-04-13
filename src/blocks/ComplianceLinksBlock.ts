import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const ComplianceLinksBlock: Block = {
  slug: 'compliance-links',
  imageURL: '/blocks/compliance-links.svg',
  labels: { singular: 'Compliance Links', plural: 'Compliance Links' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Important Links & Compliance' },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        { name: 'icon', type: 'text', defaultValue: 'FileText' },
      ],
    },
    ...sectionFields,
  ],
}
