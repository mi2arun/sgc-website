"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { STATS } from "@/lib/constants";
import { CAMPUS_IMAGES } from "@/lib/images";
import { BookOpen, Users, GraduationCap, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = [BookOpen, Users, GraduationCap, Briefcase];

// Counter with spring overshoot effect
function Counter({ value, visible, delay = 0 }: { value: number; visible: boolean; delay?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [visible, delay]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const overshoot = 1.08; // go 8% over then settle
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Spring easing: overshoot then settle
      let easedProgress;
      if (progress < 0.7) {
        easedProgress = (progress / 0.7) * overshoot;
      } else {
        const settleProgress = (progress - 0.7) / 0.3;
        easedProgress = overshoot - (overshoot - 1) * settleProgress;
      }

      setCount(Math.min(Math.floor(value * easedProgress), Math.floor(value * overshoot)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };
    requestAnimationFrame(animate);
  }, [started, value]);

  return <>{count.toLocaleString()}</>;
}

export default function StatsK() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <Image src={CAMPUS_IMAGES.building} alt="Campus" fill className="object-cover" />
      <div className="absolute inset-0 bg-[#0c2340]/90" />

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-2 h-2 bg-[#c9a84c]/30 rounded-full tk-particle-1" />
        <div className="absolute top-[30%] right-[15%] w-1.5 h-1.5 bg-white/20 rounded-full tk-particle-2" />
        <div className="absolute bottom-[20%] left-[25%] w-2 h-2 bg-[#c9a84c]/20 rounded-full tk-particle-3" />
        <div className="absolute top-[50%] right-[30%] w-1 h-1 bg-white/30 rounded-full tk-particle-1" style={{ animationDelay: "3s" }} />
        <div className="absolute bottom-[30%] right-[10%] w-2.5 h-2.5 bg-[#c9a84c]/15 rounded-full tk-particle-2" style={{ animationDelay: "5s" }} />
        <div className="absolute -top-10 left-1/2 w-[300px] h-[300px] bg-[#c9a84c]/[0.05] tk-morph blur-[80px]" />

        {/* Connecting line animation */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
          <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#c9a84c" strokeWidth="0.5" strokeDasharray="4 8">
            <animate attributeName="stroke-dashoffset" from="0" to="24" dur="3s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className={cn("text-center mb-14 transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <div className={cn("h-[3px] bg-gradient-to-r from-[#c9a84c] to-transparent rounded-full transition-all duration-1000 delay-300", visible ? "w-12" : "w-0")} />
            <span className="text-xs font-bold text-[#c9a84c] uppercase tracking-widest">SGC at a Glance</span>
            <div className={cn("h-[3px] bg-gradient-to-l from-[#c9a84c] to-transparent rounded-full transition-all duration-1000 delay-300", visible ? "w-12" : "w-0")} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Numbers That Speak</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {STATS.map((stat, i) => {
            const Icon = icons[i];
            return (
              <div
                key={stat.label}
                className={cn(
                  "text-center group cursor-default transition-all duration-700",
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                )}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={cn(
                  "w-18 h-18 mx-auto mb-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center transition-all duration-500 w-[72px] h-[72px]",
                  hoveredIndex === i && "bg-[#c9a84c]/20 border-[#c9a84c]/30 scale-110 rotate-3"
                )}>
                  <Icon className={cn("w-8 h-8 transition-all duration-500", hoveredIndex === i ? "text-[#ddc06e] scale-110" : "text-[#c9a84c]")} />
                </div>
                <p className={cn("text-4xl md:text-5xl font-bold text-white mb-1 transition-all duration-300", hoveredIndex === i && "scale-110")}>
                  <Counter value={stat.value} visible={visible} delay={i * 200} /><span className="text-[#c9a84c]">{stat.suffix}</span>
                </p>
                <p className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</p>

                {/* Animated underline on hover */}
                <div className={cn("h-0.5 mx-auto mt-3 bg-[#c9a84c]/40 rounded-full transition-all duration-500", hoveredIndex === i ? "w-12" : "w-0")} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
