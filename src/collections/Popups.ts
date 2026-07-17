import type { CollectionConfig } from 'payload'

// Startup ad / promo popups, targeted by page URL and optionally scheduled.
export const Popups: CollectionConfig = {
  slug: 'popups',
  labels: { singular: 'Popup', plural: 'Popups' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'enabled', 'frequency'],
    description: 'Popups shown on page load, targeted by page URL.',
  },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true, admin: { description: 'Internal name — not shown to visitors.' } },
    { name: 'enabled', type: 'checkbox', defaultValue: true },

    // ---- content ----
    { name: 'heading', type: 'text' },
    { name: 'body', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Optional banner image shown at the top of the popup.' } },
    {
      type: 'row',
      fields: [
        { name: 'ctaLabel', type: 'text', label: 'Button text', admin: { width: '50%' } },
        { name: 'ctaLink', type: 'text', label: 'Button link', admin: { width: '50%', description: 'Internal path (/admissions) or full URL.' } },
      ],
    },
    { name: 'ctaNewTab', type: 'checkbox', label: 'Open button link in a new tab' },

    // ---- targeting ----
    {
      name: 'targetPaths',
      type: 'array',
      label: 'Show on these pages',
      admin: {
        description: 'Page paths, e.g. "/" (home), "/admissions", or "/academics/*" (a whole section). Leave empty to show on ALL pages.',
      },
      fields: [{ name: 'path', type: 'text', required: true }],
    },

    // ---- schedule + behaviour ----
    {
      type: 'row',
      fields: [
        { name: 'startAt', type: 'date', label: 'Show from', admin: { width: '50%', description: 'Optional — blank starts now.', date: { pickerAppearance: 'dayAndTime' } } },
        { name: 'endAt', type: 'date', label: 'Show until', admin: { width: '50%', description: 'Optional — blank never ends.', date: { pickerAppearance: 'dayAndTime' } } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'frequency',
          type: 'select',
          defaultValue: 'session',
          admin: { width: '50%', description: 'How often a visitor sees it.' },
          options: [
            { label: 'Once per browser session', value: 'session' },
            { label: 'Once per day', value: 'daily' },
            { label: 'Every page load', value: 'always' },
          ],
        },
        { name: 'delaySeconds', type: 'number', defaultValue: 1, min: 0, max: 60, label: 'Delay (seconds)', admin: { width: '50%', description: 'Wait this long after load before showing.' } },
      ],
    },
    { name: 'priority', type: 'number', defaultValue: 0, admin: { position: 'sidebar', description: 'If several popups match a page, the highest priority is shown.' } },
  ],
}
