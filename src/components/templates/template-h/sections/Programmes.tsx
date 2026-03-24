"use client";

import { useState } from "react";
import Link from "next/link";
import { DEPARTMENTS } from "@/lib/constants";
import { ArrowRight, BookOpen, BarChart3, Briefcase, Atom, Calculator, Monitor, Laptop, Globe, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { BookOpen, BarChart3, Briefcase, Scale, Atom, Calculator, Monitor, Laptop, Globe };

type Filter = "all" | "UG" | "PG";

export default function ProgrammesH() {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = filter === "all" ? DEPARTMENTS : DEPARTMENTS.filter((d) => d.type === filter);

  return (
    <section className="py-10 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-bold text-[#18181b]">Programmes</h2>
          <div className="flex gap-1.5">
            {(["all", "UG", "PG"] as Filter[]).map((t) => (
              <button key={t} onClick={() => setFilter(t)} className={cn("px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors", filter === t ? "bg-[#18181b] text-white" : "bg-[#f4f4f5] text-[#71717a] hover:text-[#18181b]")}>
                {t === "all" ? "All" : t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map((dept) => {
            const Icon = iconMap[dept.icon] || BookOpen;
            return (
              <Link
                key={dept.name}
                href="/academics"
                className="group flex items-center gap-3 bg-[#f4f4f5] hover:bg-white rounded-xl p-3.5 border border-transparent hover:border-[#e4e4e7] hover:shadow-sm transition-all"
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                  dept.type === "UG" ? "bg-[#2563eb]/10 text-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white" : "bg-[#7c3aed]/10 text-[#7c3aed] group-hover:bg-[#7c3aed] group-hover:text-white"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-semibold text-[#18181b] truncate group-hover:text-[#2563eb] transition-colors">{dept.name}</h3>
                  <p className="text-[10px] text-[#71717a]">{dept.type} &middot; {dept.fees}/sem</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-6">
          <Link href="/academics" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] hover:text-[#1d4ed8]">
            All Programmes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
