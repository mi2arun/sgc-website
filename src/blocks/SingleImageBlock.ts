import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const SingleImageBlock: Block = {
  slug: 'single-image',
  imageURL: '/blocks/gallery-preview.svg',
  labels: { singular: 'Single Image', plural: 'Single Images' },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'altOverride',
      type: 'text',
      admin: { description: "Override the asset's alt text (optional)" },
    },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'container',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Narrow', value: 'narrow' },
        { label: 'Container', value: 'container' },
        { label: 'Full bleed (edge-to-edge)', value: 'full' },
      ],
    },
    {
      name: 'aspect',
      type: 'select',
      defaultValue: 'natural',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Natural', value: 'natural' },
        { label: 'Landscape (4:3)', value: 'landscape' },
        { label: 'Wide (16:9)', value: 'wide' },
        { label: 'Hero (21:9)', value: 'hero' },
        { label: 'Square (1:1)', value: 'square' },
      ],
    },
    {
      name: 'link',
      type: 'text',
      admin: { description: 'Optional URL the image links to' },
    },
    ...sectionFields,
  ],
}
