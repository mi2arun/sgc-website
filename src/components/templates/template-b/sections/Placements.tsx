"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PLACEMENT_STATS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export default function PlacementsB() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-6xl md:text-7xl font-semibold text-[#18181b] tracking-tight leading-none">
              92%
            </h2>
            <p className="text-lg text-[#a1a1aa] mt-3 mb-8">Placement Rate &middot; 50+ Companies</p>
            <p className="text-sm text-[#a1a1aa] leading-relaxed mb-8 max-w-md">
              Our dedicated placement cell connects students with leading employers across
              management, banking, IT, and other sectors. The track record speaks for itself.
            </p>
            <Link href="/placements" className="inline-flex items-center gap-2 text-sm text-[#18181b] hover:text-[#6366f1] transition-colors group">
              View placement details
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-8">
            {PLACEMENT_STATS.map((stat, i) => (
              <div key={stat.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#18181b] font-medium">{stat.label}</span>
                  <span className="text-[#a1a1aa]">{stat.percentage}%</span>
                </div>
                <div className="h-1 bg-[#e4e4e7] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#6366f1] rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: visible ? `${stat.percentage}%` : "0%",
                      transitionDelay: `${i * 150}ms`,
                    }}
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
