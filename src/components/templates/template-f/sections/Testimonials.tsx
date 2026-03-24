"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { PEOPLE_IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";

const testimonials = [
  { name: "Priya Lakshmi", batch: "B.Sc Computer Science, 2024", quote: "SGC gave me the platform to grow both academically and personally. The faculty mentorship and placement support helped me secure a position at a top IT company.", photo: PEOPLE_IMAGES.student1 },
  { name: "Rajesh Kumar", batch: "B.Com, 2023", quote: "The commerce department at SGC is exceptional. The practical exposure through industry visits and guest lectures prepared me well for the corporate world.", photo: PEOPLE_IMAGES.student2 },
  { name: "Anitha Devi", batch: "M.A English, 2024", quote: "Pursuing my post-graduation at SGC was the best decision. The research opportunities and library resources are outstanding.", photo: PEOPLE_IMAGES.student3 },
  { name: "Mohammed Irfan", batch: "B.B.A, 2023", quote: "From NCC to cultural events, SGC offers a complete college experience. I developed leadership skills that helped me stand out in interviews.", photo: PEOPLE_IMAGES.student4 },
];

export default function TestimonialsF() {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#7c1d3e]/10 text-[#7c1d3e] text-xs font-bold px-3 py-1 rounded mb-3 uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl font-bold text-[#155e3d]">What Our Alumni Say</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-[#fdf8f0] border border-[#e0d8c8] rounded-xl p-8 md:p-10 text-center relative">
            <Quote className="w-10 h-10 text-[#155e3d]/15 mx-auto mb-4" />
            <blockquote className="text-[#2d2d2d] text-base md:text-lg italic leading-relaxed mb-6 min-h-[80px]">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-[#155e3d]/20">
                <Image src={t.photo} alt={t.name} fill className="object-cover" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-[#155e3d]">{t.name}</p>
                <p className="text-xs text-[#6b6b6b]">{t.batch}</p>
              </div>
            </div>

            {/* Student thumbnails */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {testimonials.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={cn("w-9 h-9 rounded-full overflow-hidden relative border-2 transition-all", i === current ? "border-[#d4a843] scale-110" : "border-transparent opacity-50 hover:opacity-80")}
                >
                  <Image src={item.photo} alt={item.name} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <div className="flex justify-center gap-3 mt-6">
            <button onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)} className="w-10 h-10 rounded-full border border-[#e0d8c8] flex items-center justify-center text-[#6b6b6b] hover:border-[#155e3d] hover:text-[#155e3d] transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setCurrent((c) => (c + 1) % testimonials.length)} className="w-10 h-10 rounded-full border border-[#e0d8c8] flex items-center justify-center text-[#6b6b6b] hover:border-[#155e3d] hover:text-[#155e3d] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
