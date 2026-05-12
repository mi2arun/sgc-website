import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const TwoColumnBlock: Block = {
  slug: 'two-column',
  imageURL: '/blocks/rich-text.svg',
  labels: { singular: 'Two Column', plural: 'Two Columns' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'left', type: 'richText', required: true, admin: { width: '50%' } },
        { name: 'right', type: 'richText', required: true, admin: { width: '50%' } },
      ],
    },
    {
      name: 'ratio',
      type: 'select',
      defaultValue: '50-50',
      admin: { position: 'sidebar' },
      options: [
        { label: '50 / 50', value: '50-50' },
        { label: '60 / 40 (left wider)', value: '60-40' },
        { label: '40 / 60 (right wider)', value: '40-60' },
        { label: '70 / 30 (left wider)', value: '70-30' },
        { label: '30 / 70 (right wider)', value: '30-70' },
      ],
    },
    {
      name: 'valign',
      type: 'select',
      defaultValue: 'top',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Top', value: 'top' },
        { label: 'Center', value: 'center' },
        { label: 'Bottom', value: 'bottom' },
      ],
    },
    {
      name: 'gap',
      type: 'select',
      defaultValue: 'normal',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Tight', value: 'tight' },
        { label: 'Normal', value: 'normal' },
        { label: 'Wide', value: 'wide' },
      ],
    },
    {
      name: 'reverseOnMobile',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'On mobile, stack right column first' },
    },
    ...sectionFields,
  ],
}
