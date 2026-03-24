"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PLACEMENT_STATS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export default function PlacementsD() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5">
            <span className="text-[11px] tracking-[0.15em] uppercase text-[#b91c1c] font-semibold">
              Placements
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight mt-3 mb-4">
              92% Career Success Rate
            </h2>
            <p className="font-playfair text-base text-[#78716c] leading-[1.8] text-justify mb-6">
              Our dedicated placement cell has built strong relationships with over 50 recruiting
              companies, ensuring students have access to career opportunities in management,
              banking, IT, and higher education.
            </p>
            <Link href="/placements" className="inline-flex items-center gap-2 text-sm text-[#b91c1c] hover:text-[#991b1b] transition-colors">
              Full placement report <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-6">
              {PLACEMENT_STATS.map((stat, i) => (
                <div key={stat.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[11px] tracking-[0.1em] uppercase text-[#78716c]">{stat.label}</span>
                    <span className="font-playfair font-bold text-[#1a1a1a]">{stat.percentage}%</span>
                  </div>
                  <div className="h-1.5 bg-[#f5f5f4] overflow-hidden">
                    <div
                      className="h-full bg-[#b91c1c] transition-all duration-1000 ease-out"
                      style={{ width: visible ? `${stat.percentage}%` : "0%", transitionDelay: `${i * 150}ms` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px bg-[#d6d3d1] mt-10" />
      </div>
    </section>
  );
}
