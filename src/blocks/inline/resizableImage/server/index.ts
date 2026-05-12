import { createServerFeature, createNode } from '@payloadcms/richtext-lexical'
import { ResizableImageServerNode } from './ResizableImageServerNode'
import type { SerializedResizableImageNode } from '../types'

export const ResizableImageFeature = createServerFeature({
  feature: {
    ClientFeature: '@/blocks/inline/resizableImage/client/feature.client#ResizableImageFeatureClient',
    nodes: [
      createNode({
        node: ResizableImageServerNode,
        converters: {
          html: {
            converter: ({ node }: { node: SerializedResizableImageNode }) => {
              const { data } = node
              if (!data || !data.url) return ''
              const widthPercent = Math.max(5, Math.min(100, Number(data.widthPercent) || 60))
              const align = data.align || 'center'
              const isFloat = align === 'left' || align === 'right'
              const style = isFloat
                ? `float:${align};width:${widthPercent}%;margin:${align === 'left' ? '0 1.5rem 1rem 0' : '0 0 1rem 1.5rem'};`
                : `display:block;width:${align === 'full' ? '100%' : `${widthPercent}%`};margin:1.5rem ${align === 'center' ? 'auto' : '0'};`
              const captionHTML = data.caption ? `<figcaption style="font-size:0.875rem;color:#666;margin-top:0.5rem;font-style:italic">${escapeHtml(data.caption)}</figcaption>` : ''
              return `<figure style="${style}"><img src="${escapeHtml(data.url)}" alt="${escapeHtml(data.alt || '')}" style="width:100%;height:auto;border-radius:0.5rem;display:block" />${captionHTML}</figure>`
            },
            nodeTypes: [ResizableImageServerNode.getType()],
          },
        },
      }),
    ],
  },
  key: 'resizableImage',
})

function escapeHtml(s: string): string {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c] as string))
}
