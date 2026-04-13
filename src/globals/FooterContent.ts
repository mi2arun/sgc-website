import type { GlobalConfig } from 'payload'

export const FooterContent: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Link Columns',
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'newsletterHeading',
      type: 'text',
      defaultValue: 'Stay Updated',
    },
    {
      name: 'newsletterDescription',
      type: 'text',
      defaultValue: 'Subscribe to receive news, events, and admission updates.',
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '\u00a9 {year} Saradha Gangadharan College. All rights reserved.',
    },
  ],
}
