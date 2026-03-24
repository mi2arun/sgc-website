"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PLACEMENT_STATS } from "@/lib/constants";
import { ArrowRight, TrendingUp, Building2, Users, Briefcase } from "lucide-react";

export default function PlacementsH() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-10 bg-[#f4f4f5]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="bg-[#18181b] rounded-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left — stats */}
            <div className="p-8 md:p-10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563eb]">Placements 2026</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-6">92% Placement Rate</h2>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Building2, value: "50+", label: "Companies" },
                  { icon: Users, value: "1,000+", label: "Placed" },
                  { icon: Briefcase, value: "₹6.5L", label: "Avg. Package" },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="text-center">
                    <Icon className="w-5 h-5 text-[#2563eb] mx-auto mb-1.5" />
                    <p className="text-xl font-bold text-white">{value}</p>
                    <p className="text-[10px] text-white/40 uppercase">{label}</p>
                  </div>
                ))}
              </div>

              <Link href="/placements" className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
                Full Report <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right — bars */}
            <div className="p-8 md:p-10 bg-white/5">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-4 h-4 text-[#2563eb]" />
                <h3 className="text-sm font-bold text-white">By Sector</h3>
              </div>
              <div className="space-y-5">
                {PLACEMENT_STATS.map((stat, i) => (
                  <div key={stat.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs font-medium text-white/70">{stat.label}</span>
                      <span className="text-xs font-bold text-white">{stat.percentage}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed] rounded-full transition-all duration-1000 ease-out"
                        style={{ width: visible ? `${stat.percentage}%` : "0%", transitionDelay: `${i * 150}ms` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
