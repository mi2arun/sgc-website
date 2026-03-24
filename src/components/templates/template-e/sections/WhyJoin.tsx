"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  GraduationCap,
  Microscope,
  Globe,
  Users,
  Award,
  Lightbulb,
} from "lucide-react";

const reasons = [
  {
    icon: GraduationCap,
    title: "Academic Excellence",
    description:
      "NAAC A+ accredited with autonomous status and a legacy of producing university rank holders.",
  },
  {
    icon: Microscope,
    title: "Research Culture",
    description:
      "Dedicated research centers, funded projects, and faculty actively publishing in reputed journals.",
  },
  {
    icon: Globe,
    title: "Industry Connect",
    description:
      "MoUs with top companies, regular industry visits, and guest lectures from industry leaders.",
  },
  {
    icon: Users,
    title: "Vibrant Campus",
    description:
      "NCC, NSS, cultural clubs, sports teams, and festivals that make campus life enriching.",
  },
  {
    icon: Award,
    title: "Placement Record",
    description:
      "92% placement rate with top recruiters from IT, banking, and management sectors.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Hub",
    description:
      "Startup incubation, hackathons, and innovation challenges to foster entrepreneurial thinking.",
  },
];

function TiltCard({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 12;
    const rotateY = (x / rect.width) * 12;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg)");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5 }}
      className="rounded-2xl border border-[#262626] bg-[#141414] p-8 transition-transform duration-200 ease-out"
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

export default function WhyJoin() {
  return (
    <section className="te-grid-bg relative px-6 py-32 md:px-12">
      <h2 className="mb-16 text-center text-4xl font-light tracking-tight text-[#ededed] md:text-5xl">
        Why Join SGC
      </h2>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, i) => {
          const Icon = reason.icon;
          return (
            <TiltCard key={reason.title} delay={i * 0.08}>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#22d3ee]/10 text-[#22d3ee] shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                <Icon size={22} />
              </div>
              <h3 className="mb-2 text-lg font-normal text-[#ededed]">
                {reason.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#ededed]/40">
                {reason.description}
              </p>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
