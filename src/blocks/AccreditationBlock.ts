import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const AccreditationBlock: Block = {
  slug: 'accreditation',
  imageURL: '/blocks/accreditation.svg',
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
    ...sectionFields,
  ],
}
