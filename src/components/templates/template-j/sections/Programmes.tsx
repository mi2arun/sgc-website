"use client";

import Link from "next/link";
import { BookOpen, BarChart3, Briefcase, Atom, Calculator, Monitor, Laptop, Globe, Scale, ArrowUpRight } from "lucide-react";
import { DEPARTMENTS } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { BookOpen, BarChart3, Briefcase, Scale, Atom, Calculator, Monitor, Laptop, Globe };

const colorCycle = [
  "from-green-400 to-green-600",
  "from-purple-400 to-purple-600",
  "from-blue-400 to-blue-600",
  "from-orange-400 to-orange-600",
];

export default function ProgrammesJ() {
  return (
    <section className="py-20 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">Our Programmes</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1e40af] to-[#4f46e5] mx-auto rounded-full mb-4" />
            <p className="text-[#6b7280] max-w-xl mx-auto">13+ programmes across Science, Arts, Commerce, and Technology.</p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DEPARTMENTS.slice(0, 8).map((dept, i) => {
            const Icon = iconMap[dept.icon] || BookOpen;
            return (
              <ScrollReveal key={dept.name} delay={i * 80}>
                <Link href="/academics" className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow block h-full">
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${colorCycle[i % 4]} flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-[#1e40af]/10 text-[#1e40af] px-2 py-0.5 rounded">{dept.type}</span>
                    <span className="text-[10px] text-[#6b7280]">{dept.fees}/sem</span>
                  </div>
                  <h3 className="font-bold text-[#111827] text-sm group-hover:text-[#1e40af] transition-colors">{dept.name}</h3>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={700}>
          <div className="text-center mt-10">
            <Link href="/academics" className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#1e40af] to-[#4f46e5] text-white font-semibold px-7 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm">
              View All Programmes <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
