"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const x = useSpring(useTransform(mouseX, [-200, 200], [-15, 15]), springConfig);
  const y = useSpring(useTransform(mouseY, [-200, 200], [-15, 15]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex min-h-[60vh] flex-col items-center justify-center px-6"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-6xl font-light text-[#ededed] md:text-8xl"
      >
        Start Here.
      </motion.h2>

      {/* Magnetic button */}
      <motion.div style={{ x, y }}>
        <Link
          href="/admissions/apply"
          className="group flex h-40 w-40 items-center justify-center rounded-full border-2 border-[#22d3ee] text-lg font-light text-[#22d3ee] transition-all duration-300 hover:scale-110 hover:bg-[#22d3ee] hover:text-[#0a0a0a]"
        >
          Apply
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-10"
      >
        <Link
          href="/academics/departments"
          className="text-sm text-[#525252] transition-colors hover:text-[#22d3ee]"
        >
          or explore our programmes
        </Link>
      </motion.div>
    </section>
  );
}
