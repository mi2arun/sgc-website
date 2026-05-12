import type { CollectionConfig } from 'payload'

const formatBytes = (bytes?: number | null): string => {
  if (!bytes || bytes <= 0) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

const deriveType = (mime?: string | null): 'image' | 'document' | 'video' | 'audio' | 'other' => {
  if (!mime) return 'other'
  if (mime.startsWith('image/')) return 'image'
  if (mime.startsWith('video/')) return 'video'
  if (mime.startsWith('audio/')) return 'audio'
  if (mime === 'application/pdf' || mime.startsWith('application/')) return 'document'
  return 'other'
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 512, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
  },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: [
      'filename',
      'alt',
      'mediaType',
      'category',
      'mimeType',
      'filesizeLabel',
      'dimensions',
      'updatedAt',
    ],
    listSearchableFields: ['filename', 'alt', 'caption', 'category'],
    pagination: { defaultLimit: 50 },
    group: 'Media',
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.mimeType) {
          data.mediaType = deriveType(data.mimeType)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Short description for accessibility & search' },
    },
    {
      name: 'caption',
      type: 'text',
      admin: { description: 'Optional caption shown alongside the asset' },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Hero / Banner', value: 'hero' },
        { label: 'Faculty Photo', value: 'faculty' },
        { label: 'Testimonial', value: 'testimonial' },
        { label: 'Gallery', value: 'gallery' },
        { label: 'Department', value: 'department' },
        { label: 'Event', value: 'event' },
        { label: 'News', value: 'news' },
        { label: 'Logo', value: 'logo' },
        { label: 'Document / PDF', value: 'document' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        position: 'sidebar',
        description: 'How is this asset used? (manual tagging for search)',
      },
    },
    {
      name: 'mediaType',
      type: 'select',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Document', value: 'document' },
        { label: 'Video', value: 'video' },
        { label: 'Audio', value: 'audio' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-detected from MIME type',
      },
    },
    {
      name: 'filesizeLabel',
      type: 'text',
      virtual: true,
      admin: { hidden: true },
      hooks: {
        afterRead: [({ data }) => formatBytes(data?.filesize)],
      },
    },
    {
      name: 'dimensions',
      type: 'text',
      virtual: true,
      admin: { hidden: true },
      hooks: {
        afterRead: [
          ({ data }) => {
            const w = data?.width
            const h = data?.height
            return w && h ? `${w}×${h}` : '—'
          },
        ],
      },
    },
  ],
}
