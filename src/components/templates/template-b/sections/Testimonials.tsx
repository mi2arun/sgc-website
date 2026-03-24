"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { name: "Priya Lakshmi", batch: "B.Sc Computer Science, 2024", quote: "SGC gave me the platform to grow both academically and personally. The faculty mentorship and placement support helped me secure a position at a top IT company." },
  { name: "Rajesh Kumar", batch: "B.Com, 2023", quote: "The commerce department at SGC is exceptional. The practical exposure through industry visits and guest lectures prepared me well for the corporate world." },
  { name: "Anitha Devi", batch: "M.A English, 2024", quote: "Pursuing my post-graduation at SGC was the best decision. The research opportunities and library resources are outstanding." },
  { name: "Mohammed Irfan", batch: "B.B.A, 2023", quote: "From NCC to cultural events, SGC offers a complete college experience. I developed leadership skills that helped me stand out in interviews." },
];

export default function TestimonialsB() {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  return (
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-6xl text-[#e4e4e7] font-serif leading-none mb-8">&ldquo;</p>

        <blockquote className="text-xl md:text-2xl text-[#18181b] leading-relaxed font-normal min-h-[120px]">
          {t.quote}
        </blockquote>

        <div className="mt-10">
          <p className="text-sm font-semibold text-[#18181b]">{t.name}</p>
          <p className="text-xs text-[#a1a1aa] mt-1">{t.batch}</p>
        </div>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
            className="w-10 h-10 rounded-full border border-[#e4e4e7] flex items-center justify-center text-[#a1a1aa] hover:text-[#18181b] hover:border-[#a1a1aa] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? "bg-[#18181b]" : "bg-[#e4e4e7]"}`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
            className="w-10 h-10 rounded-full border border-[#e4e4e7] flex items-center justify-center text-[#a1a1aa] hover:text-[#18181b] hover:border-[#a1a1aa] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
