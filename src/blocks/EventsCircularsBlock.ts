import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const EventsCircularsBlock: Block = {
  slug: 'events-circulars',
  imageURL: '/blocks/news-events.svg',
  labels: { singular: 'Events & Circulars', plural: 'Events & Circulars' },
  fields: [
    { name: 'eventsTitle', type: 'text', defaultValue: 'Upcoming Events' },
    { name: 'circularsTitle', type: 'text', defaultValue: 'Circulars & Notices' },
    { name: 'eventsLimit', type: 'number', defaultValue: 5, admin: { position: 'sidebar' } },
    { name: 'circularsLimit', type: 'number', defaultValue: 6, admin: { position: 'sidebar' } },
    ...sectionFields,
  ],
}
