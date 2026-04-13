import type { Block } from 'payload'

export const RecruiterLogosBlock: Block = {
  slug: 'recruiter-logos',
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
  ],
}
