import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const RecruiterLogosBlock: Block = {
  slug: 'recruiter-logos',
  imageURL: '/blocks/recruiter-logos.svg',
  labels: { singular: 'Recruiter Logos', plural: 'Recruiter Logos' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Our Recruiters' },
    {
      name: 'companies',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
      ],
    },
    ...sectionFields,
  ],
}
