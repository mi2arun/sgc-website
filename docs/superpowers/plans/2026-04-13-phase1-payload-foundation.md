# Phase 1: Payload CMS Foundation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Install Payload CMS 3.x into the existing Next.js 16 app, connect to local PostgreSQL, set up Media + Users collections, and get the `/admin` panel working.

**Architecture:** Payload CMS embeds inside the Next.js app — same server, same deploy. Admin panel lives at `/admin` via a Payload route group `(payload)`. Frontend stays in `(frontend)` route group. PostgreSQL database `sgc_website` on local Postgres.app.

**Tech Stack:** Next.js 16.2, Payload CMS 3.x, @payloadcms/db-postgres, @payloadcms/richtext-lexical, PostgreSQL 18 (Postgres.app), TypeScript 5

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `payload.config.ts` | Create | Root Payload config — DB, editor, collections, globals, secret |
| `.env` | Create | DATABASE_URL, PAYLOAD_SECRET |
| `src/collections/Users.ts` | Create | Admin users collection with auth + roles |
| `src/collections/Media.ts` | Create | Media uploads with image sizes |
| `src/app/(payload)/admin/[[...segments]]/page.tsx` | Create | Payload admin panel route |
| `src/app/(payload)/admin/importMap.js` | Create | Payload import map (auto-generated) |
| `src/app/(payload)/layout.tsx` | Create | Payload admin layout (minimal wrapper) |
| `src/app/(frontend)/layout.tsx` | Create | Frontend layout (move existing root layout here) |
| `src/app/(frontend)/page.tsx` | Move | Homepage moves into frontend route group |
| `src/app/layout.tsx` | Modify | Simplify to bare html/body shell (shared by both route groups) |
| `next.config.ts` | Modify | Add `withPayload` wrapper |
| `tsconfig.json` | Modify | Add `@payload-config` path alias |
| `package.json` | Modify | New dependencies added via npm install |

---

### Task 1: Create PostgreSQL Database

**Files:**
- No code files

- [ ] **Step 1: Create the sgc_website database**

Run:
```bash
/Applications/Postgres.app/Contents/Versions/latest/bin/createdb -U arunkumars sgc_website
```

- [ ] **Step 2: Verify the database exists**

Run:
```bash
/Applications/Postgres.app/Contents/Versions/latest/bin/psql -U arunkumars -d sgc_website -c "SELECT 1 AS connected;"
```
Expected output:
```
 connected
-----------
         1
```

- [ ] **Step 3: Commit**

No files to commit — database is external state.

---

### Task 2: Install Payload CMS Dependencies

**Files:**
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Install Payload CMS core + adapters**

Run:
```bash
npm install payload @payloadcms/next @payloadcms/db-postgres @payloadcms/richtext-lexical
```

- [ ] **Step 2: Verify installation**

Run:
```bash
node -e "require('payload'); console.log('payload OK')"
```
Expected: `payload OK`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install Payload CMS, Postgres adapter, and Lexical editor"
```

---

### Task 3: Create Environment Variables

**Files:**
- Create: `.env`

- [ ] **Step 1: Create .env file**

Create `.env` in the project root:

```env
DATABASE_URL=postgresql://arunkumars@localhost:5432/sgc_website
PAYLOAD_SECRET=sgc-dev-secret-change-in-production-2026
```

- [ ] **Step 2: Verify .env is gitignored**

Run:
```bash
grep -q ".env" .gitignore && echo "already ignored" || echo ".env" >> .gitignore
```

- [ ] **Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: add .env to gitignore"
```

---

### Task 4: Create Users Collection

**Files:**
- Create: `src/collections/Users.ts`

- [ ] **Step 1: Create the Users collection config**

Create `src/collections/Users.ts`:

```ts
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'content-editor',
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Content Editor', value: 'content-editor' },
        { label: 'Department Admin', value: 'department-admin' },
        { label: 'View Only', value: 'view-only' },
      ],
    },
  ],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/collections/Users.ts
git commit -m "feat: add Users collection with auth and roles"
```

---

### Task 5: Create Media Collection

**Files:**
- Create: `src/collections/Media.ts`

- [ ] **Step 1: Create the Media collection config**

Create `src/collections/Media.ts`:

```ts
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
  },
  admin: {
    useAsTitle: 'alt',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/collections/Media.ts
git commit -m "feat: add Media collection with image sizes and PDF support"
```

---

### Task 6: Create Payload Config

**Files:**
- Create: `payload.config.ts`

- [ ] **Step 1: Create the root Payload config**

Create `payload.config.ts` in the project root:

```ts
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  globals: [],
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
})
```

- [ ] **Step 2: Commit**

```bash
git add payload.config.ts
git commit -m "feat: add Payload CMS config with Postgres and Lexical editor"
```

---

### Task 7: Add @payload-config Path Alias

**Files:**
- Modify: `tsconfig.json`

- [ ] **Step 1: Add the path alias**

In `tsconfig.json`, add `@payload-config` to the `paths` object:

```json
"paths": {
  "@/*": ["./src/*"],
  "@payload-config": ["./payload.config.ts"]
}
```

- [ ] **Step 2: Commit**

```bash
git add tsconfig.json
git commit -m "chore: add @payload-config path alias to tsconfig"
```

---

### Task 8: Update next.config.ts with withPayload

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Wrap config with withPayload**

Replace the entire `next.config.ts`:

```ts
import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default withPayload(nextConfig)
```

- [ ] **Step 2: Commit**

```bash
git add next.config.ts
git commit -m "chore: wrap Next.js config with withPayload"
```

---

### Task 9: Create Payload Admin Route

**Files:**
- Create: `src/app/(payload)/admin/[[...segments]]/page.tsx`
- Create: `src/app/(payload)/admin/importMap.js`
- Create: `src/app/(payload)/layout.tsx`

- [ ] **Step 1: Create the admin page route**

Create `src/app/(payload)/admin/[[...segments]]/page.tsx`:

```tsx
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from 'next'

import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, params, searchParams, importMap })

export default Page
```

- [ ] **Step 2: Create the import map placeholder**

Create `src/app/(payload)/admin/importMap.js`:

```js
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
export const importMap = {}
```

- [ ] **Step 3: Create the Payload layout**

Create `src/app/(payload)/layout.tsx`:

```tsx
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { ServerFunctionClient } from 'payload'

import config from '@payload-config'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from './admin/importMap'

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) =>
  RootLayout({ children, config, importMap })

export default Layout
```

- [ ] **Step 4: Commit**

```bash
git add src/app/\(payload\)/
git commit -m "feat: add Payload admin panel routes"
```

---

### Task 10: Restructure App into Route Groups

This is the most important task — we split the app into `(frontend)` and `(payload)` route groups so the admin panel and public site have separate layouts.

**Files:**
- Create: `src/app/(frontend)/layout.tsx`
- Move: `src/app/page.tsx` → `src/app/(frontend)/page.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create the frontend layout**

Create `src/app/(frontend)/layout.tsx`:

```tsx
import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Move homepage to frontend route group**

Run:
```bash
mv src/app/page.tsx src/app/\(frontend\)/page.tsx
```

- [ ] **Step 3: Simplify root layout**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Saradha Gangadharan College | Autonomous Institution',
    template: '%s | SGC',
  },
  description:
    'Saradha Gangadharan College (SGC) — An Autonomous Institution affiliated to Pondicherry University. NAAC Accredited, ISO 9001:2015 Certified. Offering UG & PG programmes in Science, Arts, Commerce & Technology.',
  keywords: [
    'SGC',
    'Saradha Gangadharan College',
    'Puducherry college',
    'Pondicherry University',
    'autonomous college',
    'NAAC accredited',
    'UG programmes',
    'PG programmes',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: Verify no duplicate layout components**

The root layout now only has html/body. TopBar, Header, Footer are only in `(frontend)/layout.tsx`. The Payload admin at `(payload)/layout.tsx` has its own layout from `@payloadcms/next/layouts`.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/\(frontend\)/
git commit -m "refactor: split app into frontend and payload route groups"
```

---

### Task 11: First Boot — Verify Admin Panel

**Files:**
- No new files (verification only)

- [ ] **Step 1: Start the dev server**

Run:
```bash
npm run dev
```

Expected: Server starts without errors. Payload auto-runs database migrations on first boot and creates the tables in `sgc_website`.

- [ ] **Step 2: Verify the admin panel loads**

Open `http://localhost:3000/admin` in a browser.

Expected: Payload admin panel shows the "Create First User" registration form.

- [ ] **Step 3: Create the first admin user**

Fill in:
- Email: `admin@sgc.edu.in`
- Password: (choose a dev password)
- Name: `Admin`
- Role: `super-admin`

Click "Create". Expected: Redirects to admin dashboard showing Users and Media collections in the sidebar.

- [ ] **Step 4: Verify the frontend still works**

Open `http://localhost:3000` in a browser.

Expected: The homepage loads with all existing sections (FlashNews, Hero, About, etc.) — same as before, no visual changes.

- [ ] **Step 5: Verify Media uploads work**

In the admin panel, go to Media → Create New. Upload any image. Fill in alt text.

Expected: Image uploads successfully, thumbnail/card/hero sizes are generated.

- [ ] **Step 6: Test database tables exist**

Run:
```bash
/Applications/Postgres.app/Contents/Versions/latest/bin/psql -U arunkumars -d sgc_website -c "\dt"
```

Expected: Tables for `users`, `media`, and Payload internal tables are listed.

- [ ] **Step 7: Commit any auto-generated files**

Payload may auto-generate `src/payload-types.ts` and update `importMap.js`. Commit them:

```bash
git add src/payload-types.ts src/app/\(payload\)/admin/importMap.js
git commit -m "chore: add Payload auto-generated types and import map"
```

---

### Task 12: Verify Full Build

**Files:**
- No new files

- [ ] **Step 1: Run production build**

Run:
```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 2: Run lint**

Run:
```bash
npm run lint
```

Expected: No lint errors (or only pre-existing ones unrelated to Payload).

- [ ] **Step 3: Final commit if any fixes needed**

If build or lint required fixes, commit them:

```bash
git add -A
git commit -m "fix: resolve build issues from Payload integration"
```

---

## Phase 1 Complete Checklist

After all tasks, verify:

- [ ] PostgreSQL database `sgc_website` exists and has tables
- [ ] `/admin` shows Payload admin panel with login
- [ ] Admin can create users with roles
- [ ] Admin can upload images and PDFs via Media collection
- [ ] `/` (homepage) renders exactly as before — no visual regression
- [ ] `npm run build` passes
- [ ] No hardcoded data was changed — `constants.ts` is still intact (removed in Phase 3)

---

## What Phase 2 Will Do

Phase 2 (Site Settings & Navigation) will:
- Create SiteSettings, Navigation, Footer globals
- Refactor Header/TopBar/Footer/CollegeBanner to read from CMS
- Seed the navigation with the problem statement menu structure
