import {
  RichText as PayloadRichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = { content: unknown }

type MediaShape = { url?: string | null; alt?: string | null; width?: number | null; height?: number | null }

type BlockNode<F> = { fields: F; type: 'block'; format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''; version: number }

const floatClasses: Record<string, string> = {
  left: 'float-left mr-6 mb-4',
  right: 'float-right ml-6 mb-4',
}

const calloutStyles: Record<string, string> = {
  info: 'border-l-4 border-blue-500 bg-blue-50 text-blue-900',
  success: 'border-l-4 border-green-500 bg-green-50 text-green-900',
  warning: 'border-l-4 border-amber-500 bg-amber-50 text-amber-900',
  danger: 'border-l-4 border-red-500 bg-red-50 text-red-900',
  note: 'border-l-4 border-gray-400 bg-gray-50 text-gray-900',
}

const buttonStyles: Record<string, string> = {
  primary: 'bg-[#1e3a5f] hover:bg-[#15294a] text-white',
  accent: 'bg-[#c8a951] hover:bg-[#b3964a] text-[#1e3a5f]',
  outline: 'border border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white',
}

const aspectClasses: Record<string, string> = {
  square: 'aspect-square',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-video',
  natural: '',
}

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    'aligned-image': ({ node }: { node: BlockNode<{
      image?: MediaShape | number | string
      caption?: string
      align?: string
      widthValue?: number
      widthUnit?: 'percent' | 'px'
      marginTop?: number
      marginBottom?: number
      rounded?: boolean
      shadow?: boolean
    }> }) => {
      const fields = node.fields
      const img = fields.image
      const url = img && typeof img === 'object' ? img.url : null
      const alt = img && typeof img === 'object' ? (img.alt || '') : ''
      if (!url) return null
      const align = fields.align || 'center'
      const isFloat = align === 'left' || align === 'right'
      const unit = fields.widthUnit === 'px' ? 'px' : '%'
      const value = typeof fields.widthValue === 'number' ? fields.widthValue : (align === 'full' ? 100 : 60)
      const widthStyle = align === 'full' ? '100%' : `${value}${unit}`
      const marginTop = typeof fields.marginTop === 'number' ? fields.marginTop : 24
      const marginBottom = typeof fields.marginBottom === 'number' ? fields.marginBottom : 24
      const rounded = fields.rounded !== false
      const shadow = !!fields.shadow

      const wrapperStyle: React.CSSProperties = {
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
        width: isFloat ? widthStyle : undefined,
        maxWidth: '100%',
      }
      const blockStyle: React.CSSProperties = isFloat
        ? {}
        : {
            width: widthStyle,
            maxWidth: '100%',
            marginLeft: align === 'center' ? 'auto' : undefined,
            marginRight: align === 'center' ? 'auto' : undefined,
          }

      return (
        <figure
          className={cn(isFloat && floatClasses[align])}
          style={isFloat ? wrapperStyle : { ...wrapperStyle, ...blockStyle }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={alt}
            className={cn(
              'block w-full h-auto',
              rounded && 'rounded-lg',
              shadow && 'shadow-lg',
            )}
          />
          {fields.caption && (
            <figcaption className="text-sm text-muted mt-2 italic">{fields.caption}</figcaption>
          )}
        </figure>
      )
    },

    'inline-gallery': ({ node }: { node: BlockNode<{ images?: { image?: MediaShape | number | string; caption?: string }[]; columns?: string; aspect?: string }> }) => {
      const fields = node.fields
      const items = fields.images || []
      if (items.length === 0) return null
      const cols = fields.columns || '3'
      const aspect = fields.aspect || 'landscape'
      const gridCls = cols === '2' ? 'grid-cols-2' : cols === '4' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'
      return (
        <div className={cn('grid gap-3 my-8 not-prose', gridCls)}>
          {items.map((it, i) => {
            const url = it.image && typeof it.image === 'object' ? it.image.url : null
            const alt = it.image && typeof it.image === 'object' ? (it.image.alt || '') : ''
            if (!url) return null
            return (
              <figure key={i} className="overflow-hidden rounded-lg bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={alt}
                  className={cn('w-full object-cover', aspectClasses[aspect])}
                />
                {it.caption && (
                  <figcaption className="text-xs text-muted px-2 py-1.5">{it.caption}</figcaption>
                )}
              </figure>
            )
          })}
        </div>
      )
    },

    callout: ({ node }: { node: BlockNode<{ variant?: string; title?: string; body?: string }> }) => {
      const fields = node.fields
      const variant = fields.variant || 'info'
      return (
        <aside className={cn('not-prose rounded-r-md px-5 py-4 my-6', calloutStyles[variant])}>
          {fields.title && <p className="font-semibold mb-1">{fields.title}</p>}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{fields.body || ''}</p>
        </aside>
      )
    },

    'inline-button': ({ node }: { node: BlockNode<{ label?: string; link?: string; variant?: string; align?: string; openInNewTab?: boolean }> }) => {
      const fields = node.fields
      if (!fields.label || !fields.link) return null
      const variant = fields.variant || 'primary'
      const align = fields.align || 'left'
      const alignWrap = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
      return (
        <div className={cn('not-prose my-6', alignWrap)}>
          <Link
            href={fields.link}
            target={fields.openInNewTab ? '_blank' : undefined}
            rel={fields.openInNewTab ? 'noopener noreferrer' : undefined}
            className={cn(
              'inline-block px-6 py-2.5 rounded-md text-sm font-semibold transition-colors',
              buttonStyles[variant],
            )}
          >
            {fields.label}
          </Link>
        </div>
      )
    },
  },
})

export default function RichText({ content }: Props) {
  if (!content) return null
  return (
    <div className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-accent">
      <PayloadRichText data={content as never} converters={jsxConverters} />
    </div>
  )
}
