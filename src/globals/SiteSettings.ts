import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  fields: [
    {
      name: 'collegeName',
      type: 'text',
      required: true,
      defaultValue: 'Saradha Gangadharan College',
    },
    {
      name: 'shortName',
      type: 'text',
      required: true,
      defaultValue: 'SGC',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'An Autonomous Institution Affiliated to Pondicherry University',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'phone',
      type: 'text',
      defaultValue: '+91-413-2211800',
    },
    {
      name: 'email',
      type: 'email',
      defaultValue: 'info@sgc.edu.in',
    },
    {
      name: 'address',
      type: 'textarea',
      defaultValue: 'Lake Road, Velrampet, Puducherry — 605 004, India',
    },
    {
      name: 'mapUrl',
      type: 'text',
      defaultValue: 'https://maps.google.com/?q=Saradha+Gangadharan+College+Puducherry',
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'facebook', type: 'text', defaultValue: 'https://facebook.com/sgcpdy' },
        { name: 'twitter', type: 'text', defaultValue: 'https://twitter.com/sgcpdy' },
        { name: 'instagram', type: 'text', defaultValue: 'https://instagram.com/sgcpdy' },
        { name: 'youtube', type: 'text', defaultValue: 'https://youtube.com/@sgcpdy' },
        { name: 'linkedin', type: 'text', defaultValue: 'https://linkedin.com/school/sgcpdy' },
      ],
    },
  ],
}
