"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/constants";

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center px-6 md:px-12"
    >
      {/* Subtle radial pulse */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-[#22d3ee]/[0.04] blur-3xl" />
      </div>

      <div className="relative grid w-full max-w-5xl grid-cols-2 gap-12 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="relative flex flex-col items-center text-center">
            {/* Large background number */}
            <span className="pointer-events-none absolute top-1/2 -translate-y-1/2 select-none text-[120px] font-bold leading-none text-white/[0.03] md:text-[150px]">
              {stat.value}
            </span>

            {/* Animated number */}
            <motion.span
              initial={{ filter: "blur(10px)", opacity: 0 }}
              animate={inView ? { filter: "blur(0px)", opacity: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="relative text-5xl font-light text-[#ededed] md:text-6xl"
            >
              {stat.value.toLocaleString()}
              {stat.suffix}
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
              className="relative mt-3 text-sm text-[#525252]"
            >
              {stat.label}
            </motion.span>
          </div>
        ))}
      </div>
    </section>
  );
}
