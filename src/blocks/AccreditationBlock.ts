import type { Block } from 'payload'

export const AccreditationBlock: Block = {
  slug: 'accreditation',
  labels: { singular: 'Accreditation Strip', plural: 'Accreditation Strips' },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'grade', type: 'text' },
        { name: 'label', type: 'text' },
        { name: 'description', type: 'text' },
      ],
    },
  ],
}
