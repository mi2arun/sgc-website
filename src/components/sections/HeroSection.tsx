"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Media = { url?: string | null; alt?: string | null } | string | number | null

type Slide = {
  image: Media
  mobileImage?: Media
  title?: string
  subtitle?: string
  ctaLabel?: string
  ctaLink?: string
  secondaryCtaLabel?: string
  secondaryCtaLink?: string
}

type Props = {
  variant?: 'marketing' | 'split' | 'minimal' | 'video'
  // Content tab
  eyebrow?: string
  title?: string
  titleAccent?: string
  subtitle?: string
  trustLine?: string
  badges?: { label: string }[]
  showLogo?: boolean
  logoOverride?: Media
  // Slides tab
  slides?: Slide[]
  videoUrl?: string
  // Layout tab
  height?: 'compact' | 'medium' | 'large' | 'tall' | 'fullscreen' | 'custom'
  customHeight?: number
  alignment?: 'left' | 'center' | 'right'
  showBadges?: boolean
  showArrows?: boolean
  showIndicators?: boolean
  showScrollIndicator?: boolean
  // Background tab
  overlayOpacity?: number
  overlayColor?: 'navy' | 'black' | 'gradient' | 'none'
  showDecorativeRings?: boolean
  showDotPattern?: boolean
  // Behavior tab
  autoplay?: boolean
  autoplaySpeed?: number
  pauseOnHover?: boolean
}

const resolveUrl = (m: Media): string | null => {
  if (!m) return null
  if (typeof m === 'string') return m
  if (typeof m === 'object' && 'url' in m) return m.url || null
  return null
}

const SGC_DEFAULTS = {
  title: 'Saradha Gangadharan',
  titleAccent: 'College',
  trustLine: 'An Institution of Sri Saradha Gangadharan Educational Trust',
  badges: ['NAAC A+', 'UGC Recognized', 'ISO 9001:2015', 'Pondicherry University'],
}

const heightClass = (h: Props['height'], custom?: number): string => {
  switch (h) {
    case 'compact': return 'h-[480px]'
    case 'medium': return 'h-[560px]'
    case 'large': return 'h-[600px] md:h-[680px]'
    case 'tall': return 'h-[780px]'
    case 'fullscreen': return 'h-screen'
    case 'custom': return ''  // inline style
    default: return 'h-[600px] md:h-[680px]'
  }
}

const overlayStyle = (color: Props['overlayColor'], opacity: number): React.CSSProperties => {
  if (color === 'none' || opacity <= 0) return { display: 'none' }
  const o = opacity / 100
  if (color === 'black') return { background: `rgba(0,0,0,${o})` }
  if (color === 'gradient') return {
    background: `linear-gradient(135deg, rgba(12,31,61,${o}) 0%, rgba(22,45,80,${o * 0.9}) 100%)`,
  }
  // navy (default SGC)
  return {
    background: `linear-gradient(to bottom, rgba(12,31,61,${o * 1.09}) 0%, rgba(12,31,61,${o * 0.96}) 50%, rgba(12,31,61,${o * 1.15}) 100%)`,
  }
}

const alignmentWrap: Record<NonNullable<Props['alignment']>, string> = {
  left: 'text-center md:text-left items-center md:items-start',
  center: 'text-center items-center',
  right: 'text-center md:text-right items-center md:items-end',
}

export default function HeroSection({
  variant = 'marketing',
  eyebrow,
  title,
  titleAccent,
  subtitle,
  trustLine,
  badges,
  showLogo = true,
  logoOverride,
  slides: slidesProp,
  videoUrl,
  height = 'large',
  customHeight = 75,
  alignment = 'left',
  showBadges = true,
  showArrows = true,
  showIndicators = true,
  showScrollIndicator = false,
  overlayOpacity = 78,
  overlayColor = 'navy',
  showDecorativeRings = true,
  showDotPattern = true,
  autoplay = true,
  autoplaySpeed = 6000,
  pauseOnHover = true,
}: Props) {
  const slides = (slidesProp || [])
    .map((s) => ({
      image: resolveUrl(s.image),
      mobileImage: resolveUrl(s.mobileImage as Media),
      title: s.title,
      subtitle: s.subtitle,
      cta: { label: s.ctaLabel || 'Learn More', href: s.ctaLink || '/' },
      secondaryCta: s.secondaryCtaLabel && s.secondaryCtaLink
        ? { label: s.secondaryCtaLabel, href: s.secondaryCtaLink }
        : null,
    }))
    .filter((s) => s.image)

  const hasSlides = slides.length > 0
  const [current, setCurrent] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [paused, setPaused] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!hasSlides || !autoplay || paused || slides.length < 2) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, autoplaySpeed)
    return () => clearInterval(timer)
  }, [slides.length, hasSlides, autoplay, autoplaySpeed, paused])

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent((c) => (c + 1) % slides.length)

  // Effective content (with SGC fallback for backwards-compat)
  const effTitle = title || SGC_DEFAULTS.title
  const effTitleAccent = titleAccent || (title ? '' : SGC_DEFAULTS.titleAccent)
  const effTrustLine = trustLine ?? (title ? '' : SGC_DEFAULTS.trustLine)
  const effBadges = (badges && badges.length > 0)
    ? badges.map((b) => b.label).filter(Boolean)
    : (title ? [] : SGC_DEFAULTS.badges)
  const logoUrl = resolveUrl(logoOverride as Media) || '/logo.png'

  const activeSlide = hasSlides ? slides[current] : null
  const slideTitle = activeSlide?.title
  const slideSubtitle = activeSlide?.subtitle

  const inlineHeight: React.CSSProperties = height === 'custom' ? { height: `${customHeight}vh` } : {}

  return (
    <section
      ref={wrapperRef}
      className="relative overflow-hidden"
      onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
    >
      <div className={cn('relative', heightClass(height))} style={inlineHeight}>
        {/* Background: video, slides, or default gradient */}
        {variant === 'video' && videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={hasSlides ? slides[0].image! : undefined}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : hasSlides ? (
          slides.map((slide, i) => (
            <div
              key={i}
              className={cn(
                'absolute inset-0 transition-opacity duration-1000',
                i === current ? 'opacity-100' : 'opacity-0',
              )}
            >
              <Image
                src={(slide.mobileImage && typeof window !== 'undefined' && window.innerWidth < 768) ? slide.mobileImage : slide.image!}
                alt=""
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c1f3d] to-[#162d50]" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0" style={overlayStyle(overlayColor, overlayOpacity)} />

        {/* Decorative elements */}
        {(showDecorativeRings || showDotPattern) && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-accent/[0.06] rounded-full blur-[120px]" />
            <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-accent/[0.04] rounded-full blur-[100px]" />
            {showDotPattern && (
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
            )}
            {showDecorativeRings && (
              <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2">
                <div className="w-72 h-72 rounded-full border border-white/[0.05]" />
                <div className="absolute inset-8 rounded-full border border-white/[0.07]" />
                <div className="absolute inset-16 rounded-full border border-white/[0.04]" />
              </div>
            )}
          </div>
        )}

        {/* Main content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className={cn('w-full flex', variant === 'split' ? 'md:items-center' : '')}>
            <div className={cn('flex flex-col w-full', alignmentWrap[alignment])}>
              {/* Top row: logo + content for marketing variant */}
              <div className={cn(
                'flex flex-col gap-6 md:gap-8 w-full',
                showLogo && variant !== 'minimal' && variant !== 'video' ? 'md:flex-row md:items-start' : '',
              )}>
                {showLogo && variant !== 'minimal' && (
                  <div
                    className={cn(
                      'shrink-0 transition-all duration-1000',
                      alignment === 'center' ? 'mx-auto md:mx-0' : '',
                      mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75',
                    )}
                  >
                    <div className="w-20 h-20 md:w-28 md:h-28 relative">
                      <div className="absolute inset-0 rounded-full bg-white/10 blur-xl" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logoUrl}
                        alt="Logo"
                        className="relative drop-shadow-2xl w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}

                <div className={cn(
                  'flex flex-col',
                  alignment === 'center' ? 'items-center text-center' : alignment === 'right' ? 'items-end text-right' : 'items-start text-left',
                )}>
                  {eyebrow && (
                    <p
                      className={cn(
                        'text-accent font-semibold text-xs md:text-sm tracking-widest uppercase mb-3 transition-all duration-700',
                        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
                      )}
                    >
                      {eyebrow}
                    </p>
                  )}

                  <h1
                    className={cn(
                      'text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight transition-all duration-1000 delay-200',
                      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
                    )}
                  >
                    {slideTitle ? (
                      <>{slideTitle}</>
                    ) : effTitleAccent ? (
                      <>
                        {effTitle}<br />
                        <span className="text-accent">{effTitleAccent}</span>
                      </>
                    ) : (
                      <>{effTitle}</>
                    )}
                  </h1>

                  {(slideSubtitle || subtitle) && (
                    <p
                      className={cn(
                        'mt-4 text-white/85 text-base md:text-lg max-w-2xl transition-all duration-700 delay-300',
                        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                      )}
                    >
                      {slideSubtitle || subtitle}
                    </p>
                  )}

                  {effTrustLine && (
                    <p
                      className={cn(
                        'mt-4 text-white/70 text-sm md:text-base transition-all duration-700 delay-500',
                        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                      )}
                    >
                      {effTrustLine.includes('Sri Saradha') ? (
                        <>An Institution of <span className="text-white/90 font-medium">Sri Saradha Gangadharan Educational Trust</span></>
                      ) : (
                        effTrustLine
                      )}
                    </p>
                  )}

                  {showBadges && effBadges.length > 0 && (
                    <div
                      className={cn(
                        'mt-4 flex flex-wrap gap-2 transition-all duration-700 delay-700',
                        alignment === 'center' ? 'justify-center' : alignment === 'right' ? 'justify-end' : 'justify-start',
                        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                      )}
                    >
                      {effBadges.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2.5 py-1 bg-white/[0.08] text-white/70 rounded-full border border-white/[0.08]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTAs */}
                  <div
                    className={cn(
                      'mt-6 flex flex-wrap gap-3 transition-all duration-700 delay-[1100ms]',
                      alignment === 'center' ? 'justify-center' : alignment === 'right' ? 'justify-end' : 'justify-start',
                      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                    )}
                  >
                    {activeSlide && (
                      <Link
                        href={activeSlide.cta.href}
                        className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-primary-dark font-semibold px-6 py-3 rounded-lg transition-all text-sm shadow-lg shadow-accent/20"
                      >
                        {activeSlide.cta.label}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    )}
                    {activeSlide?.secondaryCta && (
                      <Link
                        href={activeSlide.secondaryCta.href}
                        className="inline-flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-sm text-white font-medium px-6 py-3 rounded-lg transition-all text-sm border border-white/[0.12]"
                      >
                        {activeSlide.secondaryCta.label}
                      </Link>
                    )}
                    {!activeSlide && !title && (
                      <>
                        <Link
                          href="/admissions/apply"
                          className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-primary-dark font-semibold px-6 py-3 rounded-lg transition-all text-sm shadow-lg shadow-accent/20"
                        >
                          Apply Now
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link
                          href="/about"
                          className="inline-flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-sm text-white font-medium px-6 py-3 rounded-lg transition-all text-sm border border-white/[0.12]"
                        >
                          Discover SGC
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {hasSlides && showArrows && slides.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all border border-white/[0.1] z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all border border-white/[0.1] z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Slide indicators */}
        {hasSlides && showIndicators && slides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  'rounded-full transition-all duration-500',
                  i === current ? 'w-8 h-2 bg-accent' : 'w-2 h-2 bg-white/30 hover:bg-white/50',
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Scroll indicator */}
        {showScrollIndicator && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 animate-bounce z-10">
            <ChevronDown className="w-6 h-6" />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
    </section>
  )
}
