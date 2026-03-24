"use client";

import { useRef } from "react";
import Link from "next/link";
import { DEPARTMENTS } from "@/lib/constants";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProgrammesB() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#18181b] tracking-tight">
            Programmes
          </h2>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full border border-[#e4e4e7] flex items-center justify-center text-[#a1a1aa] hover:text-[#18181b] hover:border-[#a1a1aa] transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full border border-[#e4e4e7] flex items-center justify-center text-[#a1a1aa] hover:text-[#18181b] hover:border-[#a1a1aa] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <div className="relative">
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide px-6 md:px-[calc((100%-72rem)/2+1.5rem)] pb-4">
          {DEPARTMENTS.map((dept) => (
            <Link
              key={dept.name}
              href="/academics"
              className="shrink-0 w-[260px] border border-[#e4e4e7] hover:border-[#a1a1aa] rounded-lg p-6 flex flex-col justify-between min-h-[200px] transition-colors bg-white"
            >
              <div>
                <span className="text-[10px] tracking-widest uppercase text-[#a1a1aa]">{dept.type}</span>
                <h3 className="text-sm font-semibold text-[#18181b] mt-2 leading-snug">
                  {dept.name}
                </h3>
              </div>
              <p className="text-xs text-[#a1a1aa] mt-6">{dept.fees} / semester</p>
            </Link>
          ))}
        </div>
        {/* Fade edges */}
        <div className="absolute top-0 left-0 bottom-4 w-12 bg-gradient-to-r from-[#fafafa] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-4 w-12 bg-gradient-to-l from-[#fafafa] to-transparent pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8">
        <Link href="/academics" className="inline-flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-[#6366f1] transition-colors group">
          View all 13 programmes
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
