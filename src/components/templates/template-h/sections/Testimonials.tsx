"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PEOPLE_IMAGES } from "@/lib/images";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  { name: "Priya Lakshmi", batch: "B.Sc CS, 2024", quote: "SGC gave me the platform to grow both academically and personally. The faculty mentorship helped me secure a position at a top IT company.", photo: PEOPLE_IMAGES.student1 },
  { name: "Rajesh Kumar", batch: "B.Com, 2023", quote: "The commerce department is exceptional. Industry visits and guest lectures prepared me well for the corporate world.", photo: PEOPLE_IMAGES.student2 },
  { name: "Anitha Devi", batch: "M.A English, 2024", quote: "Pursuing my PG at SGC was the best decision. Research opportunities and library resources are outstanding.", photo: PEOPLE_IMAGES.student3 },
  { name: "Mohammed Irfan", batch: "B.B.A, 2023", quote: "From NCC to cultural events, SGC offers a complete college experience. I built leadership skills that made me stand out.", photo: PEOPLE_IMAGES.student4 },
];

export default function TestimonialsH() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-10 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <h2 className="text-xl font-bold text-[#18181b] mb-6">Alumni Voices</h2>

        <div className="grid md:grid-cols-4 gap-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "cursor-pointer rounded-xl border p-5 transition-all",
                i === current
                  ? "bg-[#2563eb] border-[#2563eb] text-white shadow-lg shadow-[#2563eb]/20"
                  : "bg-[#f4f4f5] border-[#e4e4e7] hover:border-[#2563eb]/30"
              )}
            >
              <Quote className={cn("w-5 h-5 mb-3", i === current ? "text-white/40" : "text-[#e4e4e7]")} />
              <p className={cn("text-xs leading-relaxed mb-4 line-clamp-4", i === current ? "text-white/80" : "text-[#71717a]")}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2.5">
                <div className={cn("w-8 h-8 rounded-full overflow-hidden relative border-2", i === current ? "border-white/30" : "border-[#e4e4e7]")}>
                  <Image src={t.photo} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className={cn("text-xs font-semibold", i === current ? "text-white" : "text-[#18181b]")}>{t.name}</p>
                  <p className={cn("text-[10px]", i === current ? "text-white/60" : "text-[#71717a]")}>{t.batch}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
