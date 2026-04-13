import type { Block } from 'payload'

export const ComplianceLinksBlock: Block = {
  slug: 'compliance-links',
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
  ],
}
