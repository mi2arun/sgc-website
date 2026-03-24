"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { CAMPUS_IMAGES } from "@/lib/images";

export default function HeroG() {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px]">
      {/* Full-bleed background image */}
      <Image src={CAMPUS_IMAGES.main} alt="SGC Campus" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2c2c2c] via-[#2c2c2c]/50 to-[#2c2c2c]/30" />

      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="max-w-7xl mx-auto px-6 pb-16 md:pb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-12 bg-[#c45d3e]" />
              <span className="text-xs font-semibold text-[#c45d3e] uppercase tracking-widest">Autonomous Institution</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5">
              Knowledge That
              <br />
              <span className="text-[#c45d3e]">Transforms</span> Lives
            </h1>
            <p className="text-white/60 text-base md:text-lg mb-8 leading-relaxed max-w-lg">
              Affiliated to Pondicherry University. NAAC Accredited.
              13+ programmes across Science, Arts, Commerce & Technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/admissions/apply"
                className="group inline-flex items-center gap-2 bg-[#c45d3e] hover:bg-[#a04530] text-white font-semibold px-7 py-3.5 rounded transition-colors text-sm"
              >
                Apply for 2026-27
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur text-white font-medium px-7 py-3.5 rounded transition-colors text-sm border border-white/15"
              >
                Discover SGC
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden md:flex justify-center pb-8">
          <ArrowDown className="w-5 h-5 text-white/30 animate-bounce" />
        </div>
      </div>

      {/* Side stats strip */}
      <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col gap-6">
        {[
          { value: "13+", label: "Courses" },
          { value: "79+", label: "Faculty" },
          { value: "92%", label: "Placed" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-[10px] text-white/40 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
