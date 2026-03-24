"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PLACEMENT_STATS } from "@/lib/constants";
import { CAMPUS_IMAGES } from "@/lib/images";
import { ArrowRight } from "lucide-react";

export default function PlacementsG() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <Image src={CAMPUS_IMAGES.grounds} alt="Campus" fill className="object-cover" />
      <div className="absolute inset-0 bg-[#2c2c2c]/90" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-[#c45d3e]" />
              <span className="text-xs font-semibold text-[#c45d3e] uppercase tracking-widest">Placements</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              92% Career
              <br />Success Rate
            </h2>
            <p className="text-white/50 leading-relaxed mb-8 max-w-md">
              50+ recruiting companies partner with SGC to hire our graduates across management,
              banking, IT, and higher education sectors.
            </p>
            <Link href="/placements" className="inline-flex items-center gap-2 bg-[#c45d3e] hover:bg-[#a04530] text-white font-semibold px-7 py-3 rounded text-sm transition-colors">
              Placement Report <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-6">
            {PLACEMENT_STATS.map((stat, i) => (
              <div key={stat.label}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-white">{stat.label}</span>
                  <span className="text-sm font-bold text-[#c45d3e]">{stat.percentage}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#c45d3e] to-[#5a7a64] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: visible ? `${stat.percentage}%` : "0%", transitionDelay: `${i * 150}ms` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
