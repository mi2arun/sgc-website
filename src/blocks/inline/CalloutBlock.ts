import type { Block } from 'payload'

export const CalloutBlock: Block = {
  slug: 'callout',
  imageURL: '/blocks/announcements.svg',
  labels: { singular: 'Callout', plural: 'Callouts' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Info (blue)', value: 'info' },
        { label: 'Success (green)', value: 'success' },
        { label: 'Warning (amber)', value: 'warning' },
        { label: 'Danger (red)', value: 'danger' },
        { label: 'Note (gray)', value: 'note' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      admin: { description: 'Optional heading for the callout' },
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
    },
  ],
}
