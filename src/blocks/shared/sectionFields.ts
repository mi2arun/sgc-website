import type { Field } from 'payload'

export const sectionFields: Field[] = [
  {
    name: 'sectionSettings',
    type: 'group',
    label: 'Section Design',
    admin: {
      condition: () => true,
    },
    fields: [
      {
        name: 'background',
        type: 'select',
        defaultValue: 'white',
        options: [
          { label: 'White', value: 'white' },
          { label: 'Light (Cream)', value: 'light' },
          { label: 'Dark (Navy)', value: 'dark' },
          { label: 'Primary Gradient', value: 'gradient' },
          { label: 'Transparent', value: 'transparent' },
        ],
      },
      {
        name: 'padding',
        type: 'select',
        defaultValue: 'normal',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Small', value: 'small' },
          { label: 'Normal', value: 'normal' },
          { label: 'Large', value: 'large' },
        ],
      },
      {
        name: 'borderTop',
        type: 'checkbox',
        defaultValue: false,
        label: 'Border Top',
      },
      {
        name: 'borderBottom',
        type: 'checkbox',
        defaultValue: false,
        label: 'Border Bottom',
      },
      {
        name: 'fullWidth',
        type: 'checkbox',
        defaultValue: false,
        label: 'Full Width (no max-width container)',
      },
    ],
  },
]
