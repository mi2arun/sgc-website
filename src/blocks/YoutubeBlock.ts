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
      admin: { description: 'Optional — shows a "Visit our channel" button (e.g. https://youtube.com/@sgcpdy).' },
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
      name: 'videos',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Video', plural: 'Videos' },
      admin: { description: 'Add videos in the order you want them shown.' },
      fields: [
        { name: 'url', type: 'text', required: true, admin: { description: 'YouTube link or video ID (watch, youtu.be, shorts all work).' } },
        { name: 'title', type: 'text', admin: { description: 'Optional caption shown under the video.' } },
      ],
    },
    ...sectionFields,
  ],
}
