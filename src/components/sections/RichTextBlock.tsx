import RichText from '@/components/RichText'
import { cn } from '@/lib/utils'

type Props = {
  eyebrow?: string
  heading?: string
  subheading?: string
  content?: unknown
  width?: 'narrow' | 'wide' | 'full'
  align?: 'left' | 'center' | 'right'
}

const widthClass: Record<NonNullable<Props['width']>, string> = {
  narrow: 'max-w-3xl',
  wide: 'max-w-5xl',
  full: 'max-w-7xl',
}

const alignClass: Record<NonNullable<Props['align']>, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

export default function RichTextBlock({ eyebrow, heading, subheading, content, width = 'narrow', align = 'left' }: Props) {
  if (!content && !heading && !eyebrow) return null
  const hasHeader = !!(eyebrow || heading || subheading)
  return (
    <section className="py-12">
      <div className={cn(widthClass[width], 'mx-auto px-4 sm:px-6 lg:px-8')}>
        {hasHeader && (
          <header className={cn('mb-8', alignClass[align])}>
            {eyebrow && (
              <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">{eyebrow}</p>
            )}
            {heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{heading}</h2>
            )}
            {subheading && (
              <p className="text-muted text-lg max-w-2xl mx-auto">{subheading}</p>
            )}
          </header>
        )}
        {content ? <RichText content={content} /> : null}
      </div>
    </section>
  )
}
