"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

const heading = "About SGC";
const description =
  "Saradha Gangadharan College is an autonomous institution affiliated to Pondicherry University, committed to academic excellence, research innovation, and holistic development. With a legacy rooted in the pursuit of knowledge, we shape thinkers, leaders, and changemakers.";

const chairmanQuote =
  "Education is not the filling of a pail, but the lighting of a fire. At SGC, we ignite the spark of curiosity that drives lifelong learning.";

const accreditations = [
  "NAAC A+ Grade",
  "Autonomous Status",
  "Pondicherry University",
  "ISO 9001:2015",
  "NIRF Ranked",
];

export default function About() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const inView1 = useInView(ref1, { once: true, margin: "-100px" });
  const inView2 = useInView(ref2, { once: true, margin: "-100px" });

  return (
    <section className="px-6 py-32 md:px-12">
      <div className="mx-auto max-w-5xl space-y-32">
        {/* Panel 1 — Heading + Description */}
        <div ref={ref1} className="space-y-8">
          <h2 className="text-4xl font-light tracking-tight text-[#ededed] md:text-5xl">
            {heading.split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="mr-3 inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, x: 60 }}
            animate={inView1 ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="max-w-2xl text-base leading-relaxed text-[#ededed]/50"
          >
            {description}
          </motion.p>
        </div>

        {/* Panel 2 — Chairman Quote */}
        <div ref={ref2} className="flex flex-col items-center text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-3xl text-2xl font-light italic leading-relaxed text-[#ededed]/70"
          >
            &ldquo;{chairmanQuote}&rdquo;
          </motion.blockquote>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView2 ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6 text-sm text-[#525252]"
          >
            &mdash; Chairman, {SITE_CONFIG.name}
          </motion.p>

          {/* Accreditation badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            {accreditations.map((badge) => (
              <span
                key={badge}
                className="te-glass-pill rounded-full px-4 py-1.5 text-xs text-[#ededed]/60"
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
