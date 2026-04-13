import type { Block } from 'payload'

export const GalleryPreviewBlock: Block = {
  slug: 'gallery-preview',
  labels: { singular: 'Gallery Preview', plural: 'Gallery Previews' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Campus Gallery' },
    {
      name: 'images',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
  ],
}
