import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const RichTextBlock: Block = {
  slug: 'rich-text',
  imageURL: '/blocks/rich-text.svg',
  labels: { singular: 'Rich Text', plural: 'Rich Text' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      admin: { description: 'Optional small uppercase label above the heading' },
    },
    {
      name: 'heading',
      type: 'text',
      admin: { description: 'Optional section heading rendered above the content' },
    },
    {
      name: 'subheading',
      type: 'text',
      admin: { description: 'Optional intro line below the heading' },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Content',
    },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'narrow',
      admin: { position: 'sidebar', description: 'Container width for text + heading' },
      options: [
        { label: 'Narrow (best for reading)', value: 'narrow' },
        { label: 'Wide', value: 'wide' },
        { label: 'Full', value: 'full' },
      ],
    },
    {
      name: 'align',
      type: 'select',
      defaultValue: 'left',
      admin: { position: 'sidebar', description: 'Horizontal alignment of heading + intro' },
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    ...sectionFields,
  ],
}
