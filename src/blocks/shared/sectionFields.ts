import type { Field } from 'payload'

export const sectionFields: Field[] = [
  {
    name: 'style',
    type: 'group',
    label: 'Section Design',
    fields: [
      {
        name: 'bg',
        type: 'select',
        label: 'Background',
        defaultValue: 'transparent',
        options: [
          { label: 'White', value: 'white' },
          { label: 'Light (Cream)', value: 'light' },
          { label: 'Dark (Navy)', value: 'dark' },
          { label: 'Primary Gradient', value: 'gradient' },
          { label: 'Transparent', value: 'transparent' },
        ],
      },
      {
        name: 'pad',
        type: 'select',
        label: 'Padding',
        defaultValue: 'none',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Small', value: 'small' },
          { label: 'Normal', value: 'normal' },
          { label: 'Large', value: 'large' },
        ],
      },
      {
        name: 'bt',
        type: 'checkbox',
        defaultValue: false,
        label: 'Border Top',
      },
      {
        name: 'bb',
        type: 'checkbox',
        defaultValue: false,
        label: 'Border Bottom',
      },
      {
        name: 'fw',
        type: 'checkbox',
        defaultValue: false,
        label: 'Full Width',
      },
    ],
  },
]
