"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/constants";

function Counter({ value, visible }: { value: number; visible: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const inc = value / 125;
    const t = setInterval(() => { start += inc; if (start >= value) { setCount(value); clearInterval(t); } else setCount(Math.floor(start)); }, 16);
    return () => clearInterval(t);
  }, [value, visible]);
  return <>{count.toLocaleString()}</>;
}

export default function StatsG() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-[#2c2c2c]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white">
                <Counter value={stat.value} visible={visible} />
                <span className="text-[#c45d3e]">{stat.suffix}</span>
              </p>
              <p className="text-xs text-white/40 uppercase tracking-wider mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
