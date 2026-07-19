import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

// A curated grid of YouTube videos (click-to-play). Free, no API key.
export const YoutubeBlock: Block = {
  slug: 'youtube',
  labels: { singular: 'YouTube Videos', plural: 'YouTube Videos' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'From Our YouTube' },
    { name: 'subheading', type: 'text' },
    {
      name: 'channelUrl',
      type: 'text',
      admin: { description: 'Optional — shows a "Visit our channel" button.' },
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 per row', value: '2' },
        { label: '3 per row', value: '3' },
        { label: '4 per row', value: '4' },
      ],
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'manual',
      label: 'Videos source',
      admin: { description: 'Manual = pick videos yourself. Latest from channel = auto-lists your newest uploads (refresh with the Reindex button).' },
      options: [
        { label: 'Manual (pick videos)', value: 'manual' },
        { label: 'Latest from channel', value: 'channel' },
      ],
    },
    // ---- manual mode ----
    {
      name: 'videos',
      type: 'array',
      labels: { singular: 'Video', plural: 'Videos' },
      admin: {
        condition: (_, s) => s?.source !== 'channel',
        description: 'Add videos in the order you want them shown.',
      },
      fields: [
        { name: 'url', type: 'text', required: true, admin: { description: 'YouTube link or video ID (watch, youtu.be, shorts all work).' } },
        { name: 'title', type: 'text', admin: { description: 'Optional caption shown under the video.' } },
      ],
    },
    // ---- channel mode ----
    {
      type: 'row',
      admin: { condition: (_, s) => s?.source === 'channel' },
      fields: [
        {
          name: 'channelId',
          type: 'text',
          label: 'Channel ID',
          defaultValue: 'UCNQjPAdAN_dpx2jYl7p3KOA',
          admin: { width: '60%', description: 'YouTube channel ID (starts with UC…).' },
        },
        {
          name: 'maxVideos',
          type: 'number',
          defaultValue: 6,
          min: 1,
          max: 12,
          label: 'How many',
          admin: { width: '40%' },
        },
      ],
    },
    {
      name: 'reindex',
      type: 'ui',
      admin: {
        condition: (_, s) => s?.source === 'channel',
        components: { Field: '@/components/admin/YoutubeReindex#default' },
      },
    },
    ...sectionFields,
  ],
}
