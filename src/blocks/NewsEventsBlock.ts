import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const NewsEventsBlock: Block = {
  slug: 'news-events',
  imageURL: '/blocks/news-events.svg',
  labels: { singular: 'News & Events', plural: 'News & Events' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Latest News & Events' },
    {
      name: 'newsLimit',
      type: 'number',
      defaultValue: 4,
      admin: { position: 'sidebar', description: 'How many news articles to show (from News collection)' },
    },
    {
      name: 'eventsLimit',
      type: 'number',
      defaultValue: 4,
      admin: { position: 'sidebar', description: 'How many upcoming events to show (from Events collection)' },
    },
    // Deprecated: legacy inline arrays. Content now comes from the News and Events collections.
    // Kept (hidden) so Payload's schema push does not drop the existing data tables.
    {
      name: 'events',
      type: 'array',
      admin: { hidden: true },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'date', type: 'date', required: true },
        { name: 'category', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'news',
      type: 'array',
      admin: { hidden: true },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'date', type: 'date', required: true },
        { name: 'excerpt', type: 'textarea' },
      ],
    },
    ...sectionFields,
  ],
}
