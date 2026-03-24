"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/constants";

function Counter({ value, isVisible }: { value: number; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2500;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value, isVisible]);
  return <>{count.toLocaleString()}</>;
}

export default function StatsB() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-12 px-6">
      <div className="max-w-6xl mx-auto border-y border-[#e4e4e7] py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-5xl md:text-6xl font-semibold text-[#18181b] tracking-tight">
                <Counter value={stat.value} isVisible={visible} />
                <span className="text-[#6366f1]">{stat.suffix}</span>
              </p>
              <p className="text-xs tracking-widest uppercase text-[#a1a1aa] mt-3">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
