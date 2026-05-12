import Link from 'next/link'
import { cn } from '@/lib/utils'

type Media = { url?: string | null; alt?: string | null; width?: number | null; height?: number | null }

type Props = {
  image?: Media | number | string | null
  caption?: string
  altOverride?: string
  width?: 'narrow' | 'container' | 'full'
  aspect?: 'natural' | 'landscape' | 'wide' | 'hero' | 'square'
  link?: string
}

const widthClass: Record<NonNullable<Props['width']>, string> = {
  narrow: 'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  full: 'w-full',
}

const aspectClass: Record<NonNullable<Props['aspect']>, string> = {
  natural: '',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-video',
  hero: 'aspect-[21/9]',
  square: 'aspect-square',
}

export default function SingleImageSection({ image, caption, altOverride, width = 'container', aspect = 'natural', link }: Props) {
  if (!image || typeof image !== 'object') return null
  const url = image.url
  if (!url) return null
  const alt = altOverride || image.alt || ''
  const isFullBleed = width === 'full'

  const Img = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={url}
      alt={alt}
      className={cn('w-full block', isFullBleed ? '' : 'rounded-lg', aspect !== 'natural' && 'object-cover', aspectClass[aspect])}
    />
  )

  return (
    <section className="py-8">
      <figure className={widthClass[width]}>
        {link ? (
          <Link href={link} className="block group">
            {Img}
          </Link>
        ) : (
          Img
        )}
        {caption && (
          <figcaption className={cn('text-sm text-muted italic mt-2', isFullBleed ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' : '')}>
            {caption}
          </figcaption>
        )}
      </figure>
    </section>
  )
}
