import type { Block } from 'payload'

export const ScholarshipBlock: Block = {
  slug: 'scholarship',
  labels: { singular: 'Scholarship Banner', plural: 'Scholarship Banners' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Scholarships & Financial Aid' },
    { name: 'description', type: 'text' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'amount', type: 'text', required: true },
        { name: 'eligibility', type: 'text' },
      ],
    },
    { name: 'ctaLabel', type: 'text', defaultValue: 'View All Scholarships' },
    { name: 'ctaLink', type: 'text', defaultValue: '/admissions/scholarships' },
  ],
}
