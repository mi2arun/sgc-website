import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import {
  lexicalEditor,
  UploadFeature,
  EXPERIMENTAL_TableFeature,
  HeadingFeature,
  LinkFeature,
  BlocksFeature,
  HorizontalRuleFeature,
} from '@payloadcms/richtext-lexical'

import { AlignedImageBlock } from './src/blocks/inline/AlignedImageBlock'
import { InlineGalleryBlock } from './src/blocks/inline/InlineGalleryBlock'
import { CalloutBlock } from './src/blocks/inline/CalloutBlock'
import { InlineButtonBlock } from './src/blocks/inline/InlineButtonBlock'
import { ResizableImageFeature } from './src/blocks/inline/resizableImage/server'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Pages } from './src/collections/Pages'
import { News } from './src/collections/News'
import { Events } from './src/collections/Events'
import { Announcements } from './src/collections/Announcements'
import { Testimonials } from './src/collections/Testimonials'
import { Gallery } from './src/collections/Gallery'
import { Placements } from './src/collections/Placements'
import { Documents } from './src/collections/Documents'
import { Departments } from './src/collections/Departments'
import { Courses } from './src/collections/Courses'
import { Faculty } from './src/collections/Faculty'
import { Popups } from './src/collections/Popups'
import { SiteSettings } from './src/globals/SiteSettings'
import { Navigation } from './src/globals/Navigation'
import { FooterContent } from './src/globals/FooterContent'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      actions: ['@/components/admin/FocusModeToggle'],
    },
    livePreview: {
      url: ({ data }) => {
        const base = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
        const slug = (data as { slug?: string })?.slug || ''
        // home and special pages render at `/`; everything else at `/<slug>`
        return slug === 'home' ? base : `${base}/${slug}`
      },
      collections: ['pages'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [Users, Media, Pages, News, Events, Announcements, Testimonials, Gallery, Placements, Documents, Departments, Courses, Faculty, Popups],
  globals: [SiteSettings, Navigation, FooterContent],
  endpoints: [
    {
      // Purge the cached YouTube channel feed so the site re-pulls latest uploads.
      path: '/youtube-reindex',
      method: 'post',
      handler: async (req) => {
        if (!req.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
        const { clearYoutubeCache } = await import('@/lib/youtube')
        clearYoutubeCache()
        return Response.json({ ok: true })
      },
    },
  ],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      EXPERIMENTAL_TableFeature(),
      HorizontalRuleFeature(),
      HeadingFeature({
        enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
      }),
      UploadFeature({
        collections: {
          media: {
            fields: [
              {
                name: 'caption',
                type: 'text',
                label: 'Caption',
              },
            ],
          },
        },
      }),
      BlocksFeature({
        blocks: [AlignedImageBlock, InlineGalleryBlock, CalloutBlock, InlineButtonBlock],
      }),
      ResizableImageFeature(),
    ],
  }),
  plugins: [
    // Object storage for the `media` collection. Migrated off Vercel Blob → S3-compatible
    // RustFS (self-hosted on the veld platform). Payload proxies file requests through its
    // own /api/media/file/<name> route (default access control), reading bytes from S3 over
    // the internal endpoint — so media URLs stay relative and no public S3 exposure is needed.
    // forcePathStyle is required for RustFS/MinIO-style stores.
    ...(process.env.S3_BUCKET
      ? [
          s3Storage({
            collections: {
              media: true,
            },
            bucket: process.env.S3_BUCKET,
            config: {
              endpoint: process.env.S3_ENDPOINT || 'http://s3:9000',
              region: process.env.S3_REGION || 'us-east-1',
              forcePathStyle: true,
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY || '',
                secretAccessKey: process.env.S3_SECRET_KEY || '',
              },
            },
          }),
        ]
      : []),
  ],
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  sharp,
})
