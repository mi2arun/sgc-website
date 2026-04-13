import type { Block } from 'payload'

export const ActivityFeedBlock: Block = {
  slug: 'activity-feed',
  imageURL: '/blocks/activity-feed.svg',
  labels: { singular: 'Activity Feed', plural: 'Activity Feeds' },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'date', type: 'date', required: true },
        { name: 'type', type: 'text' },
        { name: 'department', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
