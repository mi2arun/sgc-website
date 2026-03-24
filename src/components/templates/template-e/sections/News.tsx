"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { NEWS } from "@/lib/constants";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const day = d.getDate().toString().padStart(2, "0");
  const month = d.toLocaleString("en", { month: "short" }).toUpperCase();
  return { day, month };
}

export default function News() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="px-6 py-32 md:px-12">
      <h2 className="mb-16 text-4xl font-light tracking-tight text-[#ededed] md:text-5xl">
        Latest News
      </h2>

      <div className="mx-auto max-w-5xl">
        {NEWS.map((item, i) => {
          const { day, month } = formatDate(item.date);
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="group flex cursor-pointer items-center gap-8 border-b border-[#262626] py-6 transition-all duration-300 hover:translate-x-4 hover:border-l-2 hover:border-l-[#22d3ee] hover:pl-4"
            >
              {/* Date */}
              <div className="flex-shrink-0 text-center">
                <span className="block text-4xl font-light text-[#ededed]/60">
                  {day}
                </span>
                <span className="text-xs tracking-widest text-[#525252]">
                  {month}
                </span>
              </div>

              {/* Title + excerpt */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-normal text-[#ededed] transition-colors group-hover:text-[#22d3ee]">
                  {item.title}
                </h3>
                <p className="mt-1 truncate text-sm text-[#525252]">
                  {item.excerpt}
                </p>
              </div>

              {/* Category badge */}
              <span className="hidden flex-shrink-0 rounded-full bg-white/5 px-3 py-1 text-xs text-[#ededed]/40 md:inline-block">
                News
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
