"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { CAMPUS_IMAGES } from "@/lib/images";

const tagline = "Where Curiosity Becomes Capability";

export default function Hero() {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowCursor(false), tagline.length * 50 + 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="te-gradient-mesh relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background campus image */}
      <Image src={CAMPUS_IMAGES.aerial} alt="Campus" fill className="object-cover opacity-[0.08]" priority />

      {/* Rotating SVG ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          className="te-rotate-ring"
        >
          <circle
            cx="100"
            cy="100"
            r="95"
            stroke="rgba(34,211,238,0.2)"
            strokeWidth="0.5"
            strokeDasharray="4 6"
          />
        </svg>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-7xl font-light tracking-tight text-[#ededed] md:text-8xl">
          {SITE_CONFIG.shortName}
        </h1>

        <p className="mt-4 text-sm tracking-widest text-[#525252] uppercase">
          {SITE_CONFIG.tagline}
        </p>

        {/* Typewriter tagline */}
        <div className="mt-8 flex h-8 items-center">
          <span className="text-base font-light text-[#ededed]/60 md:text-lg">
            {tagline.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.05, duration: 0.01 }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {showCursor && (
            <span className="ml-0.5 inline-block h-5 w-[2px] animate-pulse bg-[#22d3ee]" />
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="te-bounce absolute bottom-10 left-1/2 -translate-x-1/2 text-[#525252]">
        <ChevronDown size={20} strokeWidth={1} />
      </div>
    </section>
  );
}
