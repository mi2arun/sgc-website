import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const RichTextBlock: Block = {
  slug: 'rich-text',
  imageURL: '/blocks/rich-text.svg',
  labels: { singular: 'Rich Text', plural: 'Rich Text' },
  fields: [
    { name: 'content', type: 'richText', required: true },
    ...sectionFields,
  ],
}
