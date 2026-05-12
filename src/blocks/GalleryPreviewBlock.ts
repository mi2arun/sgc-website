import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const GalleryPreviewBlock: Block = {
  slug: 'gallery-preview',
  imageURL: '/blocks/gallery-preview.svg',
  labels: { singular: 'Gallery Preview', plural: 'Gallery Previews' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Campus Gallery' },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 8,
      admin: { position: 'sidebar', description: 'How many images to show (from Gallery collection)' },
    },
    // Deprecated: legacy inline array. Images now come from the Gallery collection.
    // Kept (hidden) so Payload's schema push does not drop the existing data table.
    {
      name: 'images',
      type: 'array',
      admin: { hidden: true },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    ...sectionFields,
  ],
}
