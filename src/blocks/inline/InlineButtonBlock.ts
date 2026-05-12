import type { Block } from 'payload'

export const InlineButtonBlock: Block = {
  slug: 'inline-button',
  imageURL: '/blocks/cta.svg',
  labels: { singular: 'Button', plural: 'Buttons' },
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'link', type: 'text', required: true },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary (navy)', value: 'primary' },
        { label: 'Accent (gold)', value: 'accent' },
        { label: 'Outline', value: 'outline' },
      ],
    },
    {
      name: 'align',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
  ],
}
