import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const AnnouncementsBlock: Block = {
  slug: 'announcements',
  imageURL: '/blocks/announcements.svg',
  labels: { singular: 'Announcements Panel', plural: 'Announcements Panels' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Announcements & Notices' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'date', type: 'date', required: true },
        { name: 'category', type: 'text' },
        { name: 'href', type: 'text' },
        { name: 'isNew', type: 'checkbox', defaultValue: false },
      ],
    },
    ...sectionFields,
  ],
}
