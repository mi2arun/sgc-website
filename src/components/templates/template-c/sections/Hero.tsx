"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { STATS } from "@/lib/constants";
import { CAMPUS_IMAGES } from "@/lib/images";

export default function Hero() {
  const floatingStats = [
    { label: "Courses", value: "13+", top: "20%", right: "10%" },
    { label: "Faculty", value: "79+", top: "50%", right: "25%" },
    { label: "Students", value: "1,245+", top: "72%", right: "8%" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* LEFT HALF — dark bg with gradient mesh */}
      <div className="absolute inset-0 w-[55%] bg-[#0f0a1e]">
        {/* Animated gradient mesh blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-1/4 -left-1/4 w-[80%] h-[80%] rounded-full opacity-30 blur-3xl"
            style={{
              background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
              animation: "gradient-mesh 12s ease infinite",
            }}
          />
          <div
            className="absolute -bottom-1/4 -right-1/4 w-[70%] h-[70%] rounded-full opacity-25 blur-3xl"
            style={{
              background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
              animation: "gradient-mesh 15s ease infinite reverse",
            }}
          />
          <div
            className="absolute top-1/3 left-1/3 w-[50%] h-[50%] rounded-full opacity-20 blur-3xl"
            style={{
              background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
              animation: "gradient-mesh 10s ease infinite 2s",
            }}
          />
        </div>
      </div>

      {/* RIGHT HALF — campus image with diagonal clip */}
      <div
        className="absolute top-0 right-0 w-[50%] h-full"
        style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}
      >
        <Image src={CAMPUS_IMAGES.main} alt="SGC Campus" fill className="object-cover" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/60 to-violet-800/40" />

        {/* Floating glassmorphism stat bubbles */}
        {floatingStats.map((stat) => (
          <div
            key={stat.label}
            className="absolute hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-3 shadow-xl"
            style={{ top: stat.top, right: stat.right }}
          >
            <span className="text-lg font-black text-white">{stat.value}</span>
            <span className="text-xs font-medium text-white/70">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Content overlay */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full pt-32 pb-20">
        <div className="max-w-xl">
          {/* Badge pill */}
          <div className="inline-flex mb-6">
            <div className="tc-gradient-border rounded-full p-[1.5px]">
              <div className="flex items-center gap-2 bg-[#0f0a1e] rounded-full px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span className="text-xs font-semibold text-white/90">Admissions Open 2026-27</span>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
            Your Future.{" "}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
              Amplified.
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-5 text-lg text-gray-300 leading-relaxed max-w-md">
            An autonomous institution affiliated to Pondicherry University, empowering students with
            knowledge, innovation, and purpose since day one.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/admissions/apply"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:scale-105"
            >
              Explore Programmes
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white font-semibold hover:bg-white/20 transition-all"
            >
              Know More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
