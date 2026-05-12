import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const AnnouncementsBlock: Block = {
  slug: 'announcements',
  imageURL: '/blocks/announcements.svg',
  labels: { singular: 'Announcements Panel', plural: 'Announcements Panels' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Announcements & Notices' },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 8,
      admin: { position: 'sidebar', description: 'How many announcements to show (from Announcements collection)' },
    },
    // Deprecated: legacy inline array. Content now comes from the Announcements collection.
    // Kept (hidden) so Payload's schema push does not drop the existing data table.
    {
      name: 'items',
      type: 'array',
      admin: { hidden: true },
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
