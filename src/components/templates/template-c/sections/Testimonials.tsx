"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    initials: "PS",
    department: "B.Sc Computer Science",
    year: "2025",
    quote:
      "SGC completely transformed my career trajectory. The faculty mentorship and hands-on lab sessions gave me the confidence to land a role at a top IT firm right after graduation.",
  },
  {
    name: "Arun Kumar",
    initials: "AK",
    department: "B.Com (Honours)",
    year: "2024",
    quote:
      "The exposure I got through seminars, workshops, and industry visits was invaluable. SGC does not just teach — it prepares you for the real world.",
  },
  {
    name: "Meera Nair",
    initials: "MN",
    department: "B.B.A (Honours)",
    year: "2025",
    quote:
      "From NCC to business case competitions, SGC gave me a platform to grow as a leader. The placement cell was incredibly supportive throughout the process.",
  },
  {
    name: "Vikram Raj",
    initials: "VR",
    department: "M.Sc Mathematics",
    year: "2024",
    quote:
      "The research environment at SGC is exceptional. My professors encouraged me to publish papers and attend national conferences, which strengthened my academic profile.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[active];

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-violet-600 uppercase tracking-wider mb-2">
            Student Voices
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            What They{" "}
            <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
              Say
            </span>
          </h2>
        </div>

        {/* Single card carousel */}
        <div className="relative max-w-3xl mx-auto">
          <div className="rounded-3xl bg-white/60 backdrop-blur-xl border border-gray-200 shadow-xl p-10 md:p-14 text-center">
            {/* Quote icon */}
            <div className="mx-auto mb-6 inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-violet-100 to-cyan-100">
              <Quote className="h-5 w-5 text-violet-600" />
            </div>

            {/* Quote text */}
            <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium min-h-[120px]">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Student info */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 p-[2px]">
                <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                  <span className="text-sm font-bold bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                    {current.initials}
                  </span>
                </div>
              </div>
              <div>
                <p className="font-bold text-gray-900">{current.name}</p>
                <p className="text-sm text-gray-500">
                  {current.department} &middot; Batch of {current.year}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() =>
                setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
              }
              className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-violet-50 hover:border-violet-200 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-6 bg-gradient-to-r from-violet-600 to-cyan-500"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActive((prev) => (prev + 1) % testimonials.length)}
              className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-violet-50 hover:border-violet-200 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
