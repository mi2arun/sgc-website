"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    text: "SGC gave me the freedom to explore, fail, and grow. The faculty mentorship and research culture here shaped me into the professional I am today.",
    name: "Priya Raman",
    batch: "B.Sc CS, Batch of 2024",
  },
  {
    text: "The placement cell connected me with opportunities I never imagined. From campus interviews to industry projects, every experience was transformative.",
    name: "Arjun Mehta",
    batch: "B.Com, Batch of 2023",
  },
  {
    text: "Being part of NCC and the innovation club at SGC taught me discipline and creativity in equal measure. Those years were the best of my life.",
    name: "Kavitha Sundaram",
    batch: "B.B.A, Batch of 2024",
  },
];

function TestimonialPanel({
  text,
  name,
  batch,
}: {
  text: string;
  name: string;
  batch: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  const words = text.split(" ");

  return (
    <div
      ref={ref}
      className="te-snap-child flex min-h-screen flex-col items-center justify-center px-6 md:px-12"
    >
      <p className="max-w-3xl text-center text-xl leading-relaxed text-[#ededed]/80 md:text-2xl">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="mr-[0.3em] inline-block"
            initial={{ opacity: 0.1 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.04, duration: 0.3 }}
          >
            {word}
          </motion.span>
        ))}
      </p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: words.length * 0.04 + 0.3, duration: 0.5 }}
        className="mt-10 text-center"
      >
        <span className="text-sm text-[#ededed]/50">{name}</span>
        <span className="mx-3 text-[#262626]">/</span>
        <span className="border-b border-[#22d3ee]/40 pb-0.5 text-sm text-[#525252]">
          {batch}
        </span>
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="te-snap-container">
      {testimonials.map((t) => (
        <TestimonialPanel key={t.name} {...t} />
      ))}
    </section>
  );
}
