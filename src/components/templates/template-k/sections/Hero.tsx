"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowDown, GraduationCap, BookOpen } from "lucide-react";
import { HERO_IMAGES, CAMPUS_IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";

const slides = [
  { title: "Shaping Future\nLeaders", subtitle: "Excellence in Education", desc: "An Autonomous Institution affiliated to Pondicherry University with NAAC Accreditation and ISO 9001:2015.", image: HERO_IMAGES.slide1, cta: "Explore Programmes", href: "/academics" },
  { title: "Admissions Open\n2026-27", subtitle: "UG & PG Programmes", desc: "Choose from 13+ courses across Science, Arts, Commerce, and Technology.", image: HERO_IMAGES.slide2, cta: "Apply Now", href: "/admissions/apply" },
  { title: "Research &\nInnovation", subtitle: "Driving Knowledge", desc: "Dedicated research centres, funding support, and innovation programmes.", image: CAMPUS_IMAGES.library, cta: "Learn More", href: "/research" },
];

export default function HeroK() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (i: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrent(i);
    setTimeout(() => setTransitioning(false), 800);
  };

  return (
    <section className="relative h-[560px] md:h-[640px] overflow-hidden">
      {slides.map((slide, i) => (
        <div key={i} className={cn("absolute inset-0 transition-all duration-1000", i === current ? "opacity-100 scale-100" : "opacity-0 scale-105")}>
          <Image src={slide.image} alt={slide.title} fill className="object-cover" priority={i === 0} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c2340]/95 via-[#0c2340]/70 to-[#0c2340]/30" />
        </div>
      ))}

      {/* Animated decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Morphing blob */}
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[#c9a84c]/[0.08] tk-morph blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white/[0.04] tk-morph blur-[100px]" style={{ animationDelay: "3s" }} />

        {/* Floating particles */}
        <div className="absolute top-[15%] left-[60%] w-2 h-2 bg-[#c9a84c]/40 rounded-full tk-particle-1" />
        <div className="absolute top-[40%] left-[75%] w-1.5 h-1.5 bg-white/30 rounded-full tk-particle-2" />
        <div className="absolute top-[60%] left-[55%] w-2.5 h-2.5 bg-[#c9a84c]/20 rounded-full tk-particle-3" />
        <div className="absolute top-[25%] left-[85%] w-1 h-1 bg-white/40 rounded-full tk-particle-1" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[70%] left-[70%] w-1.5 h-1.5 bg-[#c9a84c]/30 rounded-full tk-particle-2" style={{ animationDelay: "4s" }} />

        {/* Rotating decorative ring */}
        <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2">
          <svg width="280" height="280" className="tk-spin-slow opacity-[0.06]">
            <circle cx="140" cy="140" r="130" fill="none" stroke="#c9a84c" strokeWidth="1" strokeDasharray="8 12" />
            <circle cx="140" cy="140" r="100" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 16" />
          </svg>
        </div>

        {/* Floating icons */}
        <div className="hidden md:block absolute top-[20%] right-[18%] tk-float opacity-[0.06]">
          <GraduationCap className="w-12 h-12 text-white" />
        </div>
        <div className="hidden md:block absolute bottom-[25%] right-[12%] tk-float-slow opacity-[0.06]">
          <BookOpen className="w-10 h-10 text-[#c9a84c]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="max-w-xl">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="tk-accent-line" />
            <span className="text-xs font-bold text-[#c9a84c] uppercase tracking-widest">{slides[current].subtitle}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] mb-5 whitespace-pre-line tk-shimmer-text">
            {slides[current].title}
          </h2>
          <p className="text-white/50 text-base mb-8 leading-relaxed max-w-md">{slides[current].desc}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={slides[current].href} className="group inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#b8963d] text-[#0c2340] font-semibold px-7 py-3.5 rounded-lg text-sm transition-all hover:shadow-xl hover:shadow-[#c9a84c]/20 tk-pulse-glow">
              {slides[current].cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/about" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur text-white font-medium px-7 py-3.5 rounded-lg text-sm transition-all border border-white/10">
              Discover SGC
            </Link>
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <button onClick={() => goTo((current - 1 + slides.length) % slides.length)} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white transition-all border border-white/10" aria-label="Previous">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={() => goTo((current + 1) % slides.length)} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white transition-all border border-white/10" aria-label="Next">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Progress bar indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className="group relative h-1 rounded-full overflow-hidden transition-all" style={{ width: i === current ? 48 : 16 }} aria-label={`Slide ${i + 1}`}>
            <div className="absolute inset-0 bg-white/20 rounded-full" />
            {i === current && <div className="absolute inset-0 bg-[#c9a84c] rounded-full animate-[tk-reveal_6s_linear]" />}
          </button>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-4 right-8 hidden md:flex flex-col items-center gap-1">
        <ArrowDown className="w-4 h-4 text-white/20 animate-bounce" />
      </div>
    </section>
  );
}
