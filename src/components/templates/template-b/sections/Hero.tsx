"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { STATS } from "@/lib/constants";

export default function HeroB() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-[72px]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-[#a1a1aa] mb-8 opacity-0 animate-fade stagger-1" style={{ animationFillMode: "forwards" }}>
          Autonomous Institution &middot; Pondicherry University
        </p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-[#18181b] leading-[1.05] tracking-tight mb-8 opacity-0 animate-fade stagger-2" style={{ animationFillMode: "forwards" }}>
          Where Curiosity Becomes Capability
        </h1>

        <p className="text-base md:text-lg text-[#a1a1aa] leading-relaxed max-w-xl mx-auto mb-10 opacity-0 animate-fade stagger-3" style={{ animationFillMode: "forwards" }}>
          Saradha Gangadharan College offers a transformative education across 13 programmes
          in Science, Arts, Commerce, and Technology. NAAC Accredited. ISO Certified.
        </p>

        <div className="opacity-0 animate-fade stagger-4" style={{ animationFillMode: "forwards" }}>
          <Link
            href="/admissions/apply"
            className="inline-flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-medium px-8 py-3.5 rounded-full transition-colors text-sm"
          >
            Explore Programmes
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stats as inline text */}
        <div className="mt-20 pt-8 border-t border-[#e4e4e7]">
          <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-2 text-sm text-[#a1a1aa]">
            {STATS.map((stat, i) => (
              <span key={stat.label}>
                <span className="font-semibold text-[#18181b]">{stat.value.toLocaleString()}{stat.suffix}</span>
                {" "}{stat.label}
                {i < STATS.length - 1 && <span className="ml-6 text-[#e4e4e7]">|</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
