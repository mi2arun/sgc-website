import { getPayload } from 'payload'
import config from '@payload-config'

export async function getSettings() {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'site-settings' })
}

export async function getNavigation() {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'navigation' })
}

export async function getFooter() {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'footer' })
}
