import type { Block } from 'payload'

export const InlineGalleryBlock: Block = {
  slug: 'inline-gallery',
  imageURL: '/blocks/gallery-preview.svg',
  labels: { singular: 'Image Row', plural: 'Image Rows' },
  fields: [
    {
      name: 'images',
      type: 'array',
      minRows: 2,
      maxRows: 8,
      labels: { singular: 'Image', plural: 'Images' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 columns', value: '2' },
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
      ],
    },
    {
      name: 'aspect',
      type: 'select',
      defaultValue: 'landscape',
      options: [
        { label: 'Square (1:1)', value: 'square' },
        { label: 'Landscape (4:3)', value: 'landscape' },
        { label: 'Wide (16:9)', value: 'wide' },
        { label: 'Natural', value: 'natural' },
      ],
    },
  ],
}
