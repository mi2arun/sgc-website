import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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
  },
  collections: [Users, Media, Pages, News, Events, Announcements, Testimonials, Gallery, Placements, Documents, Departments, Courses, Faculty],
  globals: [SiteSettings, Navigation, FooterContent],
  editor: lexicalEditor(),
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
