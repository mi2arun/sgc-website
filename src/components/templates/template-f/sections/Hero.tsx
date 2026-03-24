"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { HERO_IMAGES, CAMPUS_IMAGES } from "@/lib/images";

const slides = [
  {
    title: "Shaping Future Leaders Through Excellence",
    subtitle: "Welcome to SGC",
    description: "An Autonomous Institution affiliated to Pondicherry University with NAAC Accreditation and ISO 9001:2015 Certification.",
    image: HERO_IMAGES.slide1,
    cta: { label: "Explore Programmes", href: "/academics" },
  },
  {
    title: "Admissions Open for 2026-27",
    subtitle: "Join Us Today",
    description: "Choose from 13+ courses across Science, Arts, Commerce, and Technology.",
    image: HERO_IMAGES.slide2,
    cta: { label: "Apply Now", href: "/admissions/apply" },
  },
  {
    title: "Research, Innovation & Excellence",
    subtitle: "Driving Knowledge Forward",
    description: "Dedicated research centres, funding support, and innovation programmes.",
    image: CAMPUS_IMAGES.library,
    cta: { label: "Learn More", href: "/research" },
  },
];

export default function HeroF() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[440px] md:h-[520px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            i === current ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <Image src={slide.image} alt={slide.title} fill className="object-cover" priority={i === 0} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d3d28]/90 via-[#0d3d28]/70 to-transparent" />

          <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
            <div className="max-w-xl">
              <span className="inline-block bg-[#d4a843] text-[#0d3d28] text-xs font-bold px-3 py-1 rounded mb-4 uppercase tracking-wider">
                {slide.subtitle}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {slide.title}
              </h2>
              <p className="text-white/70 text-sm md:text-base mb-6 leading-relaxed max-w-md">
                {slide.description}
              </p>
              <div className="flex gap-3">
                <Link
                  href={slide.cta.href}
                  className="inline-flex items-center gap-2 bg-[#d4a843] hover:bg-[#c49a35] text-[#0d3d28] font-semibold px-6 py-3 rounded text-sm transition-colors"
                >
                  {slide.cta.label} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/50 text-white font-medium px-6 py-3 rounded text-sm transition-colors"
                >
                  Know More
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white" aria-label="Previous">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={() => setCurrent((c) => (c + 1) % slides.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white" aria-label="Next">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={cn("w-3 h-3 rounded-full transition-all", i === current ? "bg-[#d4a843] scale-110" : "bg-white/40")} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}
