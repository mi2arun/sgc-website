"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, TrendingUp, Users, BookOpen, Award } from "lucide-react";
import { CAMPUS_IMAGES } from "@/lib/images";

const quickStats = [
  { icon: BookOpen, value: "13+", label: "Courses", color: "text-[#2563eb]" },
  { icon: Users, value: "79+", label: "Faculty", color: "text-[#7c3aed]" },
  { icon: TrendingUp, value: "92%", label: "Placed", color: "text-[#16a34a]" },
  { icon: Award, value: "A+", label: "NAAC", color: "text-[#ea580c]" },
];

export default function HeroH() {
  return (
    <section className="bg-[#f4f4f5]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 md:py-10">
        <div className="grid lg:grid-cols-5 gap-5">
          {/* Main hero card */}
          <div className="lg:col-span-3 relative rounded-2xl overflow-hidden h-[380px] md:h-[440px] group">
            <Image src={CAMPUS_IMAGES.main} alt="SGC Campus" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

            {/* Live badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full th-live-dot" />
              Admissions Open
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-3">
                Saradha Gangadharan College
              </h1>
              <p className="text-white/60 text-sm mb-5 max-w-md">
                Autonomous Institution affiliated to Pondicherry University. Shaping future leaders since 2010.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/admissions/apply" className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
                  Apply for 2026-27 <ArrowRight className="w-4 h-4" />
                </Link>
                <button className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
                  <Play className="w-4 h-4" /> Campus Tour
                </button>
              </div>
            </div>
          </div>

          {/* Right column — stats + quick cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {quickStats.map(({ icon: Icon, value, label, color }) => (
                <div key={label} className="bg-white rounded-xl p-4 border border-[#e4e4e7]">
                  <Icon className={`w-5 h-5 ${color} mb-2`} />
                  <p className="text-2xl font-bold text-[#18181b]">{value}</p>
                  <p className="text-[11px] text-[#71717a] uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>

            {/* Announcement card */}
            <div className="bg-gradient-to-br from-[#2563eb] to-[#7c3aed] rounded-xl p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">Latest</span>
                <h3 className="text-base font-bold text-white mt-1 leading-snug">SGC Awarded NAAC A+ Grade for Excellence in Education</h3>
              </div>
              <Link href="/news" className="inline-flex items-center gap-1 text-xs font-semibold text-white/80 hover:text-white mt-3 transition-colors">
                Read More <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
