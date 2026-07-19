import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

// Facebook Page Plugin feed — official, free, auto-updating (no API key).
export const FacebookFeedBlock: Block = {
  slug: 'facebook-feed',
  labels: { singular: 'Facebook Feed', plural: 'Facebook Feeds' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Latest from Facebook' },
    {
      name: 'pageUrl',
      type: 'text',
      required: true,
      defaultValue: 'https://www.facebook.com/sgcpdy',
      admin: { description: 'Your Facebook Page URL (the page whose posts to show).' },
    },
    {
      name: 'height',
      type: 'number',
      defaultValue: 640,
      min: 300,
      max: 1200,
      admin: { description: 'Height of the feed in pixels.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'smallHeader', type: 'checkbox', defaultValue: false, label: 'Compact header', admin: { width: '33%' } },
        { name: 'hideCover', type: 'checkbox', defaultValue: false, label: 'Hide cover photo', admin: { width: '33%' } },
        { name: 'showFacepile', type: 'checkbox', defaultValue: true, label: 'Show follower faces', admin: { width: '34%' } },
      ],
    },
    ...sectionFields,
  ],
}
