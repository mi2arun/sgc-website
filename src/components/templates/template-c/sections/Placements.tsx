"use client";

import { useEffect, useRef, useState } from "react";
import { PLACEMENT_STATS } from "@/lib/constants";

export default function Placements() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const overallPercent = 92;
  const circumference = 2 * Math.PI * 45; // r=45
  const dashArray = visible
    ? `${(overallPercent / 100) * circumference} ${circumference}`
    : `0 ${circumference}`;

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-[#0f0a1e] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            Career Outcomes
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Placement{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Highlights
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Donut ring chart */}
          <div className="flex justify-center">
            <div className="relative">
              <svg width="240" height="240" viewBox="0 0 100 100" className="-rotate-90">
                <defs>
                  <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                {/* Background ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="8"
                />
                {/* Animated foreground ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#ring-gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={dashArray}
                  style={{ transition: "stroke-dasharray 1.5s ease" }}
                />
              </svg>
              {/* Center percentage */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-white">
                  {visible ? `${overallPercent}%` : "0%"}
                </span>
                <span className="text-sm text-gray-400 mt-1">Placed</span>
              </div>
            </div>
          </div>

          {/* Right — Sector bars */}
          <div className="space-y-6">
            {PLACEMENT_STATS.map((stat, i) => (
              <div key={stat.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white">{stat.label}</span>
                  <span className="text-sm font-bold text-cyan-400">{stat.percentage}%</span>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500"
                    style={{
                      width: visible ? `${stat.percentage}%` : "0%",
                      transition: `width 1.2s ease ${i * 0.15}s`,
                    }}
                  />
                </div>
              </div>
            ))}

            <p className="text-sm text-gray-500 mt-4">
              Data based on 2025-26 graduating batch across all departments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
