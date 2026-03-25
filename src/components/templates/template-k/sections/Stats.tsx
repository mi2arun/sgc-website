"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { STATS } from "@/lib/constants";
import { CAMPUS_IMAGES } from "@/lib/images";
import { BookOpen, Users, GraduationCap, Briefcase } from "lucide-react";

const icons = [BookOpen, Users, GraduationCap, Briefcase];

function Counter({ value, visible }: { value: number; visible: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let s = 0; const inc = value / 100;
    const t = setInterval(() => { s += inc; if (s >= value) { setCount(value); clearInterval(t); } else setCount(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [value, visible]);
  return <>{count.toLocaleString()}</>;
}

export default function StatsK() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <Image src={CAMPUS_IMAGES.building} alt="Campus" fill className="object-cover" />
      <div className="absolute inset-0 bg-[#0c2340]/90" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <div className="h-[3px] w-12 bg-gradient-to-r from-[#c9a84c] to-transparent rounded-full" />
            <span className="text-xs font-bold text-[#c9a84c] uppercase tracking-widest">SGC at a Glance</span>
            <div className="h-[3px] w-12 bg-gradient-to-l from-[#c9a84c] to-transparent rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Numbers That Speak</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {STATS.map((stat, i) => {
            const Icon = icons[i];
            return (
              <div key={stat.label} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#c9a84c]/20 group-hover:border-[#c9a84c]/30 transition-all">
                  <Icon className="w-7 h-7 text-[#c9a84c]" />
                </div>
                <p className="text-4xl md:text-5xl font-bold text-white mb-1">
                  <Counter value={stat.value} visible={visible} /><span className="text-[#c9a84c]">{stat.suffix}</span>
                </p>
                <p className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
