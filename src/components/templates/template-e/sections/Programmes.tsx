"use client";

import { useRef, useState, useEffect } from "react";
import { DEPARTMENTS } from "@/lib/constants";

export default function Programmes() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(el.scrollLeft / maxScroll);
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-32">
      <div className="mb-12 px-6 md:px-12">
        <h2 className="text-5xl font-light tracking-tight text-[#ededed] md:text-6xl">
          Programmes
        </h2>
      </div>

      {/* Horizontal scroll strip */}
      <div
        ref={scrollRef}
        className="te-hide-scrollbar flex gap-6 overflow-x-auto px-6 pb-8 md:px-12"
      >
        {DEPARTMENTS.map((dept) => (
          <div
            key={dept.name}
            className="group flex w-[280px] flex-shrink-0 flex-col justify-between rounded-2xl border border-[#262626] bg-[#141414] p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(34,211,238,0.15)]"
            style={{ height: 420 }}
          >
            <div>
              {/* Type badge */}
              <span className="mb-4 inline-block rounded-full bg-[#22d3ee]/10 px-3 py-1 text-xs font-medium text-[#22d3ee]">
                {dept.type}
              </span>
              <h3 className="mt-2 text-lg font-normal leading-snug text-[#ededed]">
                {dept.name}
              </h3>
            </div>
            <p className="text-sm text-[#525252]">{dept.fees} / year</p>
          </div>
        ))}
      </div>

      {/* Scroll progress line */}
      <div className="mx-6 mt-4 h-[1px] bg-[#262626] md:mx-12">
        <div
          className="h-full bg-[#22d3ee] transition-all duration-150"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </section>
  );
}
