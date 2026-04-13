"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { PEOPLE_IMAGES } from "@/lib/images";

const defaultTestimonials = [
  {
    name: "Priya Lakshmi",
    batch: "B.Sc Computer Science, 2024",
    quote: "SGC gave me the platform to grow both academically and personally. The faculty mentorship and placement support helped me secure a position at a top IT company.",
    initials: "PL",
    photo: PEOPLE_IMAGES.student1,
  },
  {
    name: "Rajesh Kumar",
    batch: "B.Com, 2023",
    quote: "The commerce department at SGC is exceptional. The practical exposure through industry visits and guest lectures prepared me well for the corporate world.",
    initials: "RK",
    photo: PEOPLE_IMAGES.student2,
  },
  {
    name: "Anitha Devi",
    batch: "M.A English, 2024",
    quote: "Pursuing my post-graduation at SGC was the best decision. The research opportunities and library resources are outstanding.",
    initials: "AD",
    photo: PEOPLE_IMAGES.student3,
  },
  {
    name: "Mohammed Irfan",
    batch: "B.B.A, 2023",
    quote: "From NCC to cultural events, SGC offers a complete college experience. I developed leadership skills that helped me stand out in interviews.",
    initials: "MI",
    photo: PEOPLE_IMAGES.student4,
  },
];

type Props = {
  items?: { name: string; batch?: string; quote: string; photo?: any }[];
  title?: string;
};

export default function TestimonialsSection({ items, title }: Props) {
  const testimonials = items
    ? items.map((t) => ({
        ...t,
        initials: t.name.split(" ").map((w) => w[0]).join("").slice(0, 2),
        photo: t.photo && typeof t.photo === "object" ? t.photo.url : (t.photo || PEOPLE_IMAGES.student1),
      }))
    : defaultTestimonials;
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{title || "What Our Alumni Say"}</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={cn(
                  "transition-all duration-500",
                  i === current ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
                )}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 text-center">
                  <Quote className="w-10 h-10 text-accent/40 mx-auto mb-6" />
                  <blockquote className="text-white/90 text-lg md:text-xl italic leading-relaxed mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-accent/30">
                      <Image src={t.photo} alt={t.name} fill className="object-cover" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">{t.name}</p>
                      <p className="text-sm text-white/60">{t.batch}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-colors",
                    i === current ? "bg-accent" : "bg-white/30"
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
