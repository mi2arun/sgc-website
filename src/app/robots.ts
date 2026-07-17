import type { MetadataRoute } from 'next'

const BASE = (process.env.PAYLOAD_PUBLIC_SERVER_URL || 'https://sgc.edu.in').replace(/\/$/, '')

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}
