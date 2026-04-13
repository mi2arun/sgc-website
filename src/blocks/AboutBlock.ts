import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const AboutBlock: Block = {
  slug: 'about',
  imageURL: '/blocks/about.svg',
  labels: { singular: 'About Section', plural: 'About Sections' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Excellence in Education Since 2010' },
    { name: 'description', type: 'textarea' },
    { name: 'chairmanName', type: 'text', defaultValue: 'Shri. Swaminathan G' },
    { name: 'chairmanTitle', type: 'text', defaultValue: 'Founder & Chairman' },
    { name: 'chairmanOrg', type: 'text', defaultValue: 'Sri Saradha Gangadharan Educational Trust' },
    { name: 'chairmanPhoto', type: 'upload', relationTo: 'media' },
    { name: 'chairmanQuote', type: 'textarea' },
    ...sectionFields,
  ],
}
