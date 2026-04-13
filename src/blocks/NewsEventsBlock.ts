import type { Block } from 'payload'

export const NewsEventsBlock: Block = {
  slug: 'news-events',
  labels: { singular: 'News & Events', plural: 'News & Events' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Latest News & Events' },
    {
      name: 'events',
      type: 'array',
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
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'date', type: 'date', required: true },
        { name: 'excerpt', type: 'textarea' },
      ],
    },
  ],
}
