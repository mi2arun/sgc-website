import type { FieldHook } from 'payload'

// Turn any string into a URL-safe slug: lowercase, spaces/punctuation → single
// hyphens, trimmed. Used to guarantee valid slugs regardless of what editors type.
export const slugify = (val: string): string =>
  val
    .toString()
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // any run of non-alphanumerics → one hyphen
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '')

// beforeValidate hook for a `slug` field: slugifies whatever was entered, and
// falls back to the doc's title/name when the slug is left blank.
export const formatSlug: FieldHook = ({ value, data, originalDoc }) => {
  if (typeof value === 'string' && value.trim().length) return slugify(value)
  const fallback =
    data?.title || data?.name || originalDoc?.title || originalDoc?.name
  if (typeof fallback === 'string' && fallback.trim().length) return slugify(fallback)
  return value
}
