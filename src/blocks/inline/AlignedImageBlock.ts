import type { Block } from 'payload'

export const AlignedImageBlock: Block = {
  slug: 'aligned-image',
  imageURL: '/blocks/gallery-preview.svg',
  labels: { singular: 'Image (aligned)', plural: 'Images (aligned)' },
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
      admin: { description: 'Optional caption shown below the image' },
    },
    {
      name: 'align',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Left (text wraps right)', value: 'left' },
        { label: 'Right (text wraps left)', value: 'right' },
        { label: 'Center', value: 'center' },
        { label: 'Full width', value: 'full' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'widthValue',
          type: 'number',
          label: 'Width',
          defaultValue: 60,
          min: 5,
          max: 2000,
          admin: { width: '50%', description: 'Numeric width (5–2000)' },
        },
        {
          name: 'widthUnit',
          type: 'select',
          label: 'Unit',
          defaultValue: 'percent',
          options: [
            { label: '% of column', value: 'percent' },
            { label: 'pixels (px)', value: 'px' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'marginTop',
          type: 'number',
          label: 'Margin Top',
          defaultValue: 24,
          min: 0,
          max: 200,
          admin: { width: '50%', description: 'Pixels of space above the image' },
        },
        {
          name: 'marginBottom',
          type: 'number',
          label: 'Margin Bottom',
          defaultValue: 24,
          min: 0,
          max: 200,
          admin: { width: '50%', description: 'Pixels of space below the image' },
        },
      ],
    },
    {
      name: 'rounded',
      type: 'checkbox',
      defaultValue: true,
      label: 'Rounded corners',
    },
    {
      name: 'shadow',
      type: 'checkbox',
      defaultValue: false,
      label: 'Drop shadow',
    },
  ],
}
