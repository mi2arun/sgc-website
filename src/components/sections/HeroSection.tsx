"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, GraduationCap, BookOpen, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";
import { HERO_IMAGES } from "@/lib/images";

const slides = [
  {
    title: "Shaping Future Leaders",
    subtitle: "Through Excellence in Education",
    description: "An Autonomous Institution affiliated to Pondicherry University with NAAC Accreditation and ISO 9001:2015 Certification.",
    cta: { label: "Explore Programmes", href: "/academics" },
    image: HERO_IMAGES.slide1,
    icon: GraduationCap,
  },
  {
    title: "Admissions Open 2026-27",
    subtitle: "UG & PG Programmes",
    description: "Choose from 13+ courses across Science, Arts, Commerce, and Technology. Apply now for the upcoming academic year.",
    cta: { label: "Apply Now", href: "/admissions/apply" },
    image: HERO_IMAGES.slide2,
    icon: BookOpen,
  },
  {
    title: "Research & Innovation",
    subtitle: "Driving Knowledge Forward",
    description: "Dedicated research centres, funding support, and innovation programmes to foster academic excellence.",
    cta: { label: "Learn More", href: "/research" },
    image: HERO_IMAGES.slide3,
    icon: FlaskConical,
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[520px] md:h-[620px]">
        {slides.map((slide, i) => {
          const SlideIcon = slide.icon;
          return (
            <div
              key={i}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                i === current ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              {/* Background image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={i === 0}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0c1f3d]/90 via-[#0c1f3d]/75 to-[#0c1f3d]/40" />

              {/* Decorative elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-accent/[0.07] rounded-full blur-[100px]" />
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />

                {/* Large decorative icon on the right */}
                <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 items-center justify-center">
                  <div className="relative">
                    <div className="w-80 h-80 rounded-full border border-white/[0.06] flex items-center justify-center">
                      <div className="w-60 h-60 rounded-full border border-white/[0.08] flex items-center justify-center">
                        <div className="w-40 h-40 rounded-full bg-white/[0.04] flex items-center justify-center">
                          <SlideIcon className="w-20 h-20 text-accent/30" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-10 w-3 h-3 bg-accent/40 rounded-full" />
                    <div className="absolute bottom-10 left-4 w-2 h-2 bg-white/30 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm rounded-full px-4 py-1.5 mb-5">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                    <p className="text-accent font-medium text-xs tracking-widest uppercase">
                      {slide.subtitle}
                    </p>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
                    {slide.title}
                  </h2>
                  <p className="text-white/70 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={slide.cta.href}
                      className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-primary-dark font-semibold px-7 py-3.5 rounded-lg transition-all text-sm shadow-lg shadow-accent/20 hover:shadow-accent/30"
                    >
                      {slide.cta.label}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-sm text-white font-medium px-7 py-3.5 rounded-lg transition-all text-sm border border-white/[0.12]"
                    >
                      Discover SGC
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all border border-white/[0.1]"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all border border-white/[0.1]"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "rounded-full transition-all duration-500",
              i === current
                ? "w-10 h-2.5 bg-accent"
                : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/10 to-transparent" />
    </section>
  );
}
