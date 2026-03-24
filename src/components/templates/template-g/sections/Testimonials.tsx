"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PEOPLE_IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";

const testimonials = [
  { name: "Priya Lakshmi", batch: "B.Sc Computer Science, 2024", quote: "SGC gave me the platform to grow both academically and personally. The faculty mentorship and placement support helped me secure a position at a top IT company.", photo: PEOPLE_IMAGES.student1 },
  { name: "Rajesh Kumar", batch: "B.Com, 2023", quote: "The commerce department at SGC is exceptional. The practical exposure through industry visits and guest lectures prepared me well for the corporate world.", photo: PEOPLE_IMAGES.student2 },
  { name: "Anitha Devi", batch: "M.A English, 2024", quote: "Pursuing my post-graduation at SGC was the best decision. The research opportunities and library resources are outstanding.", photo: PEOPLE_IMAGES.student3 },
  { name: "Mohammed Irfan", batch: "B.B.A, 2023", quote: "From NCC to cultural events, SGC offers a complete college experience. I developed leadership skills that helped me stand out in interviews.", photo: PEOPLE_IMAGES.student4 },
];

export default function TestimonialsG() {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#c45d3e]" />
            <span className="text-xs font-semibold text-[#c45d3e] uppercase tracking-widest">Voices</span>
            <div className="h-px w-10 bg-[#c45d3e]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2c2c2c]">Alumni Stories</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            {/* Photo */}
            <div className="md:col-span-2 flex justify-center">
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-[#f5f0e8]">
                <Image src={t.photo} alt={t.name} fill className="object-cover" />
              </div>
            </div>

            {/* Quote */}
            <div className="md:col-span-3">
              <blockquote className="text-lg md:text-xl text-[#2c2c2c] italic leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <p className="font-bold text-[#2c2c2c]">{t.name}</p>
              <p className="text-sm text-[#7a7a7a]">{t.batch}</p>

              {/* Navigation */}
              <div className="flex items-center gap-3 mt-6">
                <button onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)} className="w-10 h-10 rounded-full border border-[#e2ddd4] flex items-center justify-center text-[#7a7a7a] hover:border-[#c45d3e] hover:text-[#c45d3e] transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-[#7a7a7a]">{current + 1} / {testimonials.length}</span>
                <button onClick={() => setCurrent((c) => (c + 1) % testimonials.length)} className="w-10 h-10 rounded-full border border-[#e2ddd4] flex items-center justify-center text-[#7a7a7a] hover:border-[#c45d3e] hover:text-[#c45d3e] transition-colors">
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
