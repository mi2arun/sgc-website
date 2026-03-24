"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PLACEMENT_STATS } from "@/lib/constants";

export default function Placements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const targetPercent = 92;
  const strokeDashoffset = circumference - (circumference * targetPercent) / 100;

  return (
    <section
      ref={ref}
      className="flex min-h-screen flex-col items-center justify-center px-6 py-32"
    >
      {/* Animated SVG ring */}
      <div className="relative flex items-center justify-center">
        <svg width="250" height="250" viewBox="0 0 250 250" className="-rotate-90">
          <defs>
            <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          {/* Track */}
          <circle
            cx="125"
            cy="125"
            r={radius}
            fill="none"
            stroke="#262626"
            strokeWidth="4"
          />
          {/* Progress */}
          <motion.circle
            cx="125"
            cy="125"
            r={radius}
            fill="none"
            stroke="url(#ring-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute flex flex-col items-center">
          <motion.span
            initial={{ filter: "blur(10px)", opacity: 0 }}
            animate={inView ? { filter: "blur(0px)", opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl font-light text-[#ededed]"
          >
            {targetPercent}%
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-1 text-sm text-[#525252]"
          >
            Placement Rate
          </motion.span>
        </div>
      </div>

      {/* Stat items row */}
      <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
        {PLACEMENT_STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 + i * 0.12, duration: 0.5 }}
            className="text-center"
          >
            <span className="block text-3xl font-light text-[#ededed]">
              {stat.percentage}%
            </span>
            <span className="mt-1 block text-xs text-[#525252]">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
