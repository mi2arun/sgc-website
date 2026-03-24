"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PLACEMENT_STATS } from "@/lib/constants";
import { ArrowRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PlacementsF() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-[#fdf8f0]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-[#155e3d]/10 text-[#155e3d] text-xs font-bold px-3 py-1 rounded mb-3 uppercase tracking-wider">
              Placements
            </span>
            <h2 className="text-3xl font-bold text-[#155e3d] mb-4">Placement Excellence</h2>
            <p className="text-sm text-[#6b6b6b] leading-relaxed mb-6">
              Our dedicated placement cell works tirelessly to connect students with top employers
              across management, banking, IT, and other industries.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white border border-[#e0d8c8] rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-[#7c1d3e]">92%</p>
                <p className="text-[10px] text-[#6b6b6b] uppercase tracking-wider font-medium">Placement Rate</p>
              </div>
              <div className="bg-white border border-[#e0d8c8] rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-[#155e3d]">50+</p>
                <p className="text-[10px] text-[#6b6b6b] uppercase tracking-wider font-medium">Companies</p>
              </div>
            </div>
            <Link href="/placements" className="inline-flex items-center gap-2 bg-[#155e3d] hover:bg-[#0d3d28] text-white font-semibold px-6 py-2.5 rounded text-sm transition-colors">
              View Placement Report <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white border border-[#e0d8c8] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-[#d4a843]" />
              <h3 className="font-bold text-[#2d2d2d]">Sector-wise Placements</h3>
            </div>
            <div className="space-y-5">
              {PLACEMENT_STATS.map((stat, i) => (
                <div key={stat.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-[#2d2d2d]">{stat.label}</span>
                    <span className="font-bold text-[#155e3d]">{stat.percentage}%</span>
                  </div>
                  <div className="h-3 bg-[#fdf8f0] rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-1000 ease-out",
                        i % 2 === 0 ? "bg-gradient-to-r from-[#155e3d] to-[#1e7a50]" : "bg-gradient-to-r from-[#7c1d3e] to-[#a02550]"
                      )}
                      style={{ width: visible ? `${stat.percentage}%` : "0%", transitionDelay: `${i * 150}ms` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
