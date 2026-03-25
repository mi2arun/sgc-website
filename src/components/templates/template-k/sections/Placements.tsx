"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PLACEMENT_STATS } from "@/lib/constants";
import { ArrowRight, TrendingUp } from "lucide-react";
import Reveal from "./Reveal";

export default function PlacementsK() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="tk-accent-line" />
                <span className="text-xs font-bold text-[#c9a84c] uppercase tracking-widest">Career Growth</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0c2340] mb-5">Placement Excellence</h2>
              <p className="text-[#5f6980] leading-relaxed mb-8">
                Our dedicated placement cell connects students with top employers across management,
                banking, IT, and other sectors.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#faf8f3] border border-[#e8e4dc] rounded-xl p-5">
                  <p className="text-3xl font-bold text-[#0c2340]">92<span className="text-[#c9a84c]">%</span></p>
                  <p className="text-xs text-[#5f6980] mt-1">Placement Rate</p>
                </div>
                <div className="bg-[#faf8f3] border border-[#e8e4dc] rounded-xl p-5">
                  <p className="text-3xl font-bold text-[#0c2340]">50<span className="text-[#c9a84c]">+</span></p>
                  <p className="text-xs text-[#5f6980] mt-1">Recruiting Companies</p>
                </div>
              </div>
              <Link href="/placements" className="group inline-flex items-center gap-2 bg-[#0c2340] hover:bg-[#163a5f] text-white font-semibold px-7 py-3 rounded-lg text-sm transition-all hover:shadow-lg">
                View Placement Details <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="bg-[#faf8f3] border border-[#e8e4dc] rounded-2xl p-7">
              <div className="flex items-center gap-2 mb-7">
                <TrendingUp className="w-5 h-5 text-[#c9a84c]" />
                <h3 className="font-bold text-[#0c2340]">Sector-wise Placements</h3>
              </div>
              <div className="space-y-6">
                {PLACEMENT_STATS.map((stat, i) => (
                  <div key={stat.label}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-[#1a1a2e]">{stat.label}</span>
                      <span className="text-sm font-bold text-[#0c2340]">{stat.percentage}%</span>
                    </div>
                    <div className="h-2.5 bg-[#e8e4dc]/50 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-[#0c2340] to-[#c9a84c] relative tk-bar-shine"
                        style={{ width: visible ? `${stat.percentage}%` : "0%", transitionDelay: `${i * 150}ms` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
