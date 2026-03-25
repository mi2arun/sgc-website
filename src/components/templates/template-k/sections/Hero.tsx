"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowDown, GraduationCap, BookOpen, FlaskConical, Award, Users } from "lucide-react";
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [textVisible, setTextVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [current]);

  useEffect(() => {
    setTextVisible(false);
    const t = setTimeout(() => setTextVisible(true), 100);
    return () => clearTimeout(t);
  }, [current]);

  const goTo = (i: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrent(i);
    setTimeout(() => setTransitioning(false), 800);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[560px] md:h-[640px] overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Background slides with parallax */}
      {slides.map((slide, i) => (
        <div key={i} className={cn("absolute inset-0 transition-all duration-1000", i === current ? "opacity-100 scale-100" : "opacity-0 scale-105")}>
          <div style={{ transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px) scale(1.05)`, transition: "transform 0.3s ease-out" }}>
            <Image src={slide.image} alt={slide.title} fill className="object-cover" priority={i === 0} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c2340]/95 via-[#0c2340]/70 to-[#0c2340]/30" />
        </div>
      ))}

      {/* Animated decorative elements with mouse parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Morphing blobs — move opposite to mouse */}
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[#c9a84c]/20 tk-morph blur-3xl"
          style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`, transition: "transform 0.5s ease-out" }} />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white/10 tk-morph blur-[100px]"
          style={{ transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`, transition: "transform 0.6s ease-out", animationDelay: "3s" }} />

        {/* Floating particles — bigger and brighter */}
        <div className="absolute top-[15%] left-[60%] w-3 h-3 bg-[#c9a84c]/60 rounded-full tk-particle-1" />
        <div className="absolute top-[40%] left-[75%] w-2.5 h-2.5 bg-white/50 rounded-full tk-particle-2" />
        <div className="absolute top-[60%] left-[55%] w-3.5 h-3.5 bg-[#c9a84c]/40 rounded-full tk-particle-3" />
        <div className="absolute top-[25%] left-[85%] w-2 h-2 bg-white/60 rounded-full tk-particle-1" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[70%] left-[70%] w-2.5 h-2.5 bg-[#c9a84c]/50 rounded-full tk-particle-2" style={{ animationDelay: "4s" }} />
        <div className="absolute top-[80%] left-[45%] w-2 h-2 bg-white/40 rounded-full tk-particle-3" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[10%] left-[50%] w-3 h-3 bg-[#c9a84c]/35 rounded-full tk-particle-1" style={{ animationDelay: "5s" }} />

        {/* Rotating decorative rings — parallax with mouse, much more visible */}
        <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2"
          style={{ transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`, transition: "transform 0.4s ease-out" }}>
          <svg width="340" height="340" className="tk-spin-slow opacity-20">
            <circle cx="170" cy="170" r="160" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeDasharray="8 12" />
            <circle cx="170" cy="170" r="120" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 16" />
            <circle cx="170" cy="170" r="80" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeDasharray="2 20" />
          </svg>
          {/* Orbiting dot */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#c9a84c]/60 rounded-full tk-pulse-glow" />
        </div>

        {/* Floating icons with parallax — much more visible */}
        <div className="hidden md:block absolute top-[18%] right-[22%] tk-float opacity-20"
          style={{ transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)`, transition: "transform 0.5s ease-out" }}>
          <GraduationCap className="w-16 h-16 text-white" />
        </div>
        <div className="hidden md:block absolute bottom-[22%] right-[10%] tk-float-slow opacity-[0.15]"
          style={{ transform: `translate(${mousePos.x * -18}px, ${mousePos.y * -18}px)`, transition: "transform 0.5s ease-out" }}>
          <BookOpen className="w-12 h-12 text-[#c9a84c]" />
        </div>
        <div className="hidden lg:block absolute top-[45%] right-[35%] tk-float-fast opacity-[0.12]"
          style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * -20}px)`, transition: "transform 0.6s ease-out" }}>
          <FlaskConical className="w-10 h-10 text-white" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* Content with text animation */}
      <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="max-w-xl">
          {/* Subtitle with slide-in */}
          <div className={cn("flex items-center gap-2.5 mb-5 transition-all duration-700", textVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8")}>
            <div className="tk-accent-line" />
            <span className="text-xs font-bold text-[#c9a84c] uppercase tracking-widest">{slides[current].subtitle}</span>
          </div>

          {/* Title with character stagger */}
          <h2 className={cn("text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] mb-5 whitespace-pre-line tk-shimmer-text transition-all duration-700 delay-100", textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
            {slides[current].title}
          </h2>

          {/* Description slide up */}
          <p className={cn("text-white/50 text-base mb-8 leading-relaxed max-w-md transition-all duration-700 delay-200", textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
            {slides[current].desc}
          </p>

          {/* Buttons stagger */}
          <div className={cn("flex flex-wrap gap-3 transition-all duration-700 delay-300", textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
            <Link href={slides[current].href} className="group inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#b8963d] text-[#0c2340] font-semibold px-7 py-3.5 rounded-lg text-sm transition-all hover:shadow-xl hover:shadow-[#c9a84c]/20 tk-pulse-glow hover:scale-105">
              {slides[current].cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur text-white font-medium px-7 py-3.5 rounded-lg text-sm transition-all border border-white/10 hover:border-white/25 hover:scale-105">
              Discover SGC
            </Link>
          </div>

          {/* Animated stats row */}
          <div className={cn("flex gap-6 mt-10 pt-8 border-t border-white/10 transition-all duration-700 delay-500", textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
            {[
              { icon: BookOpen, value: "13+", label: "Courses" },
              { icon: Users, value: "79+", label: "Faculty" },
              { icon: Award, value: "A+", label: "NAAC" },
            ].map(({ icon: Icon, value, label }, i) => (
              <div key={label} className="flex items-center gap-2.5 group cursor-default" style={{ transitionDelay: `${600 + i * 100}ms` }}>
                <div className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:bg-[#c9a84c]/20 group-hover:border-[#c9a84c]/30 transition-all">
                  <Icon className="w-4 h-4 text-[#c9a84c]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{value}</p>
                  <p className="text-[10px] text-white/30">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <button onClick={() => goTo((current - 1 + slides.length) % slides.length)} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 hover:scale-110 backdrop-blur rounded-full flex items-center justify-center text-white transition-all border border-white/10" aria-label="Previous">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={() => goTo((current + 1) % slides.length)} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 hover:scale-110 backdrop-blur rounded-full flex items-center justify-center text-white transition-all border border-white/10" aria-label="Next">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Progress bar indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className={cn("relative h-1 rounded-full overflow-hidden transition-all duration-500", i === current ? "w-12" : "w-3 hover:w-5")} aria-label={`Slide ${i + 1}`}>
            <div className="absolute inset-0 bg-white/20 rounded-full" />
            {i === current && <div className="absolute inset-0 bg-[#c9a84c] rounded-full tk-bar-shine" style={{ animation: "tk-bar-shine 2s ease-in-out infinite, tk-progress 6s linear" }} />}
          </button>
        ))}
      </div>

      {/* Scroll hint with line */}
      <div className="absolute bottom-6 right-8 hidden md:flex flex-col items-center gap-2">
        <span className="text-[9px] text-white/20 uppercase tracking-widest" style={{ writingMode: "vertical-rl" }}>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
          <div className="absolute inset-0 bg-[#c9a84c] animate-bounce" style={{ animationDuration: "2s" }} />
        </div>
      </div>
    </section>
  );
}
