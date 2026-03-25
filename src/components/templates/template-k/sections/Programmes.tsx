"use client";

import { useState } from "react";
import Link from "next/link";
import { DEPARTMENTS } from "@/lib/constants";
import { ArrowRight, BookOpen, BarChart3, Briefcase, Scale, Atom, Calculator, Monitor, Laptop, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { BookOpen, BarChart3, Briefcase, Scale, Atom, Calculator, Monitor, Laptop, Globe };
type Filter = "all" | "UG" | "PG";

export default function ProgrammesK() {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = filter === "all" ? DEPARTMENTS : DEPARTMENTS.filter((d) => d.type === filter);

  return (
    <section className="py-24 bg-[#faf8f3]">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <div className="tk-accent-line" />
              <span className="text-xs font-bold text-[#c9a84c] uppercase tracking-widest">Our Programmes</span>
              <div className="tk-accent-line" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0c2340] mb-4">Academic Excellence Across Disciplines</h2>
            <p className="text-[#5f6980] max-w-xl mx-auto">Explore our diverse range of programmes designed for a successful career.</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex justify-center gap-2 mb-10">
            {(["all", "UG", "PG"] as Filter[]).map((tab) => (
              <button key={tab} onClick={() => setFilter(tab)} className={cn("px-6 py-2.5 rounded-lg text-sm font-semibold transition-all", filter === tab ? "bg-[#0c2340] text-white shadow-lg shadow-[#0c2340]/20" : "bg-white text-[#5f6980] border border-[#e8e4dc] hover:border-[#0c2340]/20")}>
                {tab === "all" ? "All Programmes" : `${tab} Programmes`}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((dept, i) => {
            const Icon = iconMap[dept.icon] || BookOpen;
            return (
              <Reveal key={dept.name} delay={i * 50}>
                <Link href="/academics" className="group bg-white rounded-xl p-5 border border-[#e8e4dc] hover:border-[#c9a84c]/30 hover:shadow-lg hover:shadow-[#c9a84c]/5 transition-all block">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-[#0c2340]/5 rounded-lg flex items-center justify-center group-hover:bg-[#0c2340] transition-colors shrink-0">
                      <Icon className="w-5 h-5 text-[#0c2340] group-hover:text-[#c9a84c] transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={cn("text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded", dept.type === "UG" ? "bg-[#0c2340]/10 text-[#0c2340]" : "bg-[#c9a84c]/15 text-[#c9a84c]")}>{dept.type}</span>
                      <h3 className="font-semibold text-[#1a1a2e] text-sm mt-1.5 group-hover:text-[#0c2340] transition-colors">{dept.name}</h3>
                      <p className="text-[10px] text-[#5f6980] mt-0.5">{dept.fees} / semester</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={400}>
          <div className="text-center mt-10">
            <Link href="/academics" className="group inline-flex items-center gap-2 bg-[#0c2340] hover:bg-[#163a5f] text-white font-semibold px-7 py-3 rounded-lg text-sm transition-all hover:shadow-lg hover:shadow-[#0c2340]/20">
              View All Programmes <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
