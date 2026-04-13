"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  slides?: { image: any; ctaLabel?: string; ctaLink?: string }[];
};

export default function HeroSection({ slides: slidesProp }: Props) {
  const slides = slidesProp
    ? slidesProp.map((s) => ({
        image: typeof s.image === "object" && s.image?.url ? s.image.url : s.image,
        cta: { label: s.ctaLabel || "Learn More", href: s.ctaLink || "/" },
      }))
    : [];
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[600px] md:h-[680px]">
        {/* Background slides */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              i === current ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={slide.image}
              alt="SGC Campus"
              fill
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1f3d]/85 via-[#0c1f3d]/75 to-[#0c1f3d]/90" />

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-accent/[0.06] rounded-full blur-[120px]" />
          <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-accent/[0.04] rounded-full blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Decorative circles */}
          <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2">
            <div className="w-72 h-72 rounded-full border border-white/[0.05]" />
            <div className="absolute inset-8 rounded-full border border-white/[0.07]" />
            <div className="absolute inset-16 rounded-full border border-white/[0.04]" />
          </div>
        </div>

        {/* Main content — College Identity */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="w-full">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              {/* Logo */}
              <div
                className={cn(
                  "shrink-0 transition-all duration-1000",
                  mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
                )}
              >
                <div className="w-24 h-24 md:w-32 md:h-32 relative">
                  <div className="absolute inset-0 rounded-full bg-white/10 blur-xl" />
                  <Image
                    src="/logo.png"
                    alt="Saradha Gangadharan College"
                    width={128}
                    height={128}
                    className="relative drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* College details */}
              <div className="text-center md:text-left">
                {/* College name — animated */}
                <h1
                  className={cn(
                    "text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight transition-all duration-1000 delay-200",
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  )}
                >
                  Saradha Gangadharan
                  <br />
                  <span className="text-accent">College</span>
                </h1>

                {/* Autonomous tag */}
                <div
                  className={cn(
                    "mt-3 transition-all duration-700 delay-500",
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                >
                  <span className="inline-block bg-accent/20 text-accent font-semibold text-sm px-4 py-1 rounded-full border border-accent/30">
                    Autonomous
                  </span>
                </div>

                {/* Trust name */}
                <p
                  className={cn(
                    "mt-4 text-white/70 text-sm md:text-base transition-all duration-700 delay-700",
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                >
                  An Institution of <span className="text-white/90 font-medium">Sri Saradha Gangadharan Educational Trust</span>
                </p>

                {/* Accreditations line */}
                <div
                  className={cn(
                    "mt-3 flex flex-wrap justify-center md:justify-start gap-2 transition-all duration-700 delay-900",
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                >
                  {["NAAC A+", "UGC Recognized", "ISO 9001:2015", "Pondicherry University"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 bg-white/[0.08] text-white/70 rounded-full border border-white/[0.08]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA buttons */}
                <div
                  className={cn(
                    "mt-6 flex flex-wrap justify-center md:justify-start gap-3 transition-all duration-700 delay-[1300ms]",
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                >
                  <Link
                    href={slides[current].cta.href}
                    className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-primary-dark font-semibold px-6 py-3 rounded-lg transition-all text-sm shadow-lg shadow-accent/20"
                  >
                    {slides[current].cta.label}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-sm text-white font-medium px-6 py-3 rounded-lg transition-all text-sm border border-white/[0.12]"
                  >
                    Discover SGC
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all border border-white/[0.1]"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all border border-white/[0.1]"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "rounded-full transition-all duration-500",
              i === current
                ? "w-8 h-2 bg-accent"
                : "w-2 h-2 bg-white/30 hover:bg-white/50"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/10 to-transparent" />
    </section>
  );
}
