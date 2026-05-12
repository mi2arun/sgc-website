'use client'

import {
  createClientFeature,
  slashMenuBasicGroupWithItems,
  toolbarAddDropdownGroupWithItems,
} from '@payloadcms/richtext-lexical/client'

import { INSERT_RESIZABLE_IMAGE_COMMAND } from './commands'
import { ResizableImageNode } from './ResizableImageClientNode'
import { ResizableImagePlugin } from './Plugin'

const ImageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
)

async function pickImage(): Promise<{ imageId: number; url: string; alt: string } | null> {
  const urlInput = window.prompt(
    'Paste image URL, OR a Media ID number from your library:\n(Tip: open Media in admin → click an image → copy its URL or ID)',
  )
  if (!urlInput) return null
  const trimmed = urlInput.trim()
  if (!trimmed) return null

  // Numeric → fetch by id
  if (/^\d+$/.test(trimmed)) {
    try {
      const res = await fetch(`/api/media/${trimmed}?depth=0`, { credentials: 'include' })
      if (!res.ok) {
        alert(`Couldn't fetch media #${trimmed} (status ${res.status})`)
        return null
      }
      const doc = await res.json()
      if (!doc?.url) {
        alert('Media record has no URL')
        return null
      }
      return { imageId: doc.id, url: doc.url, alt: doc.alt || '' }
    } catch (err) {
      alert(`Fetch failed: ${err instanceof Error ? err.message : String(err)}`)
      return null
    }
  }

  // Pasted URL → use as-is
  return { imageId: 0, url: trimmed, alt: '' }
}

function insertImage(editor: unknown): void {
  pickImage().then((picked) => {
    if (!picked) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(editor as any).dispatchCommand(INSERT_RESIZABLE_IMAGE_COMMAND, {
      imageId: picked.imageId,
      url: picked.url,
      alt: picked.alt,
      widthPercent: 60,
      align: 'center',
    })
  })
}

export const ResizableImageFeatureClient = createClientFeature({
  nodes: [ResizableImageNode],
  plugins: [{ Component: ResizableImagePlugin, position: 'normal' }],
  slashMenu: {
    groups: [
      slashMenuBasicGroupWithItems([
        {
          Icon: ImageIcon,
          key: 'resizableImage',
          keywords: ['image', 'picture', 'photo', 'resizable'],
          label: 'Image (resizable)',
          onSelect: ({ editor }) => insertImage(editor),
        },
      ]),
    ],
  },
  toolbarFixed: {
    groups: [
      toolbarAddDropdownGroupWithItems([
        {
          ChildComponent: ImageIcon,
          isActive: () => false,
          key: 'resizableImage',
          label: 'Image (resizable)',
          onSelect: ({ editor }) => insertImage(editor),
        },
      ]),
    ],
  },
})
