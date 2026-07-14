import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const QuickAccessBlock: Block = {
  slug: 'quick-access',
  imageURL: '/blocks/quick-access.svg',
  labels: { singular: 'Quick Access', plural: 'Quick Access' },
  fields: [
    {
      name: 'buttons',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'description', type: 'text' },
        { name: 'href', type: 'text', required: true },
        { name: 'icon', type: 'text' },
        { name: 'color', type: 'text', defaultValue: 'primary' },
        {
          name: 'highlight',
          type: 'checkbox',
          defaultValue: false,
          label: 'Highlight this card',
          admin: {
            description: 'Draws attention with an animated glow — e.g. highlight "Apply Online" during admissions or "Exam Results" when results are out.',
          },
        },
        {
          type: 'row',
          admin: { condition: (_, sibling) => Boolean(sibling?.highlight) },
          fields: [
            {
              name: 'highlightStart',
              type: 'date',
              label: 'Highlight from',
              admin: { width: '50%', description: 'Optional — blank starts immediately.', date: { pickerAppearance: 'dayAndTime' } },
            },
            {
              name: 'highlightEnd',
              type: 'date',
              label: 'Highlight until',
              admin: { width: '50%', description: 'Optional — blank never ends. Highlight auto-removes after this time.', date: { pickerAppearance: 'dayAndTime' } },
            },
          ],
        },
        {
          name: 'highlightColor',
          type: 'select',
          defaultValue: 'gold',
          admin: { condition: (_, sibling) => Boolean(sibling?.highlight) },
          options: [
            { label: 'Gold (brand)', value: 'gold' },
            { label: 'Green', value: 'green' },
            { label: 'Red', value: 'red' },
            { label: 'Blue', value: 'blue' },
          ],
        },
        {
          name: 'badgeText',
          type: 'text',
          label: 'Badge text',
          admin: {
            condition: (_, sibling) => Boolean(sibling?.highlight),
            description: 'Optional small label shown while highlighted, e.g. "Results Out!" or "Now Open".',
          },
        },
      ],
    },
    ...sectionFields,
  ],
}
