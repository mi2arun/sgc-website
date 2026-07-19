import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

// Branded two-column "Stay Connected" section: a brand panel (blurb + CTA + social
// icons, pulled from Site Settings) next to the live Facebook feed.
export const SocialConnectBlock: Block = {
  slug: 'social-connect',
  labels: { singular: 'Social Connect', plural: 'Social Connect' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Stay Connected' },
    { name: 'heading', type: 'text', defaultValue: 'Follow Us on Facebook' },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Campus news, events, results and moments — straight from our official page.',
    },
    {
      name: 'pageUrl',
      type: 'text',
      required: true,
      defaultValue: 'https://www.facebook.com/sgcpdy',
      admin: { description: 'Facebook Page URL shown in the feed and the Follow button.' },
    },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Follow on Facebook' },
    {
      name: 'height',
      type: 'number',
      defaultValue: 620,
      min: 400,
      max: 1000,
      admin: { description: 'Height of the feed column in pixels.' },
    },
    ...sectionFields,
  ],
}
