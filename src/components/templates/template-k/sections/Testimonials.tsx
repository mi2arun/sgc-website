"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { PEOPLE_IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

const testimonials = [
  { name: "Priya Lakshmi", batch: "B.Sc CS, 2024", quote: "SGC gave me the platform to grow both academically and personally. The faculty mentorship and placement support helped me secure a position at a top IT company.", photo: PEOPLE_IMAGES.student1 },
  { name: "Rajesh Kumar", batch: "B.Com, 2023", quote: "The commerce department at SGC is exceptional. Industry visits and guest lectures prepared me well for the corporate world.", photo: PEOPLE_IMAGES.student2 },
  { name: "Anitha Devi", batch: "M.A English, 2024", quote: "Pursuing my PG at SGC was the best decision. The research opportunities and library resources are outstanding.", photo: PEOPLE_IMAGES.student3 },
  { name: "Mohammed Irfan", batch: "B.B.A, 2023", quote: "From NCC to cultural events, SGC offers a complete college experience. I built leadership skills that helped me stand out.", photo: PEOPLE_IMAGES.student4 },
];

export default function TestimonialsK() {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  return (
    <section className="py-24 bg-gradient-to-br from-[#0c2340] to-[#163a5f] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-[120px] tk-morph" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-[100px] tk-morph" style={{ animationDelay: "4s" }} />
        {/* Particles */}
        <div className="absolute top-[15%] left-[20%] w-1.5 h-1.5 bg-[#c9a84c]/30 rounded-full tk-particle-1" />
        <div className="absolute top-[40%] right-[25%] w-2 h-2 bg-white/15 rounded-full tk-particle-2" />
        <div className="absolute bottom-[20%] left-[40%] w-1 h-1 bg-[#c9a84c]/40 rounded-full tk-particle-3" />
        <div className="absolute bottom-[35%] right-[15%] w-1.5 h-1.5 bg-white/10 rounded-full tk-particle-1" style={{ animationDelay: "3s" }} />
        {/* Rotating ring */}
        <svg width="200" height="200" className="absolute top-10 right-10 tk-spin-slow opacity-[0.04]">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#c9a84c" strokeWidth="0.5" strokeDasharray="6 10" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <div className="h-[3px] w-12 bg-gradient-to-r from-[#c9a84c] to-transparent rounded-full" />
              <span className="text-xs font-bold text-[#c9a84c] uppercase tracking-widest">Testimonials</span>
              <div className="h-[3px] w-12 bg-gradient-to-l from-[#c9a84c] to-transparent rounded-full" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">What Our Alumni Say</h2>
          </div>
        </Reveal>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            {/* Photo */}
            <div className="md:col-span-2 flex justify-center">
              <div className="relative">
                <div className="w-44 h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden relative border-4 border-white/10">
                  <Image src={t.photo} alt={t.name} fill className="object-cover" />
                </div>
                <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-[#c9a84c]/20 rounded-2xl -z-10" />
              </div>
            </div>

            {/* Quote */}
            <div className="md:col-span-3">
              <Quote className="w-10 h-10 text-[#c9a84c]/20 mb-4" />
              <blockquote className="text-lg md:text-xl text-white/80 italic leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="tk-accent-line mb-4" />
              <p className="font-bold text-white">{t.name}</p>
              <p className="text-sm text-white/40">{t.batch}</p>

              {/* Nav */}
              <div className="flex items-center gap-3 mt-6">
                <button onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#c9a84c] hover:border-[#c9a84c]/30 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-1.5">
                  {testimonials.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)} className={cn("w-2 h-2 rounded-full transition-all", i === current ? "w-6 bg-[#c9a84c]" : "bg-white/20")} />
                  ))}
                </div>
                <button onClick={() => setCurrent((c) => (c + 1) % testimonials.length)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#c9a84c] hover:border-[#c9a84c]/30 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
