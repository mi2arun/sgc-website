"use client";

import { useState } from "react";
import Link from "next/link";
import { DEPARTMENTS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Filter = "all" | "UG" | "PG";

export default function ProgrammesG() {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = filter === "all" ? DEPARTMENTS : DEPARTMENTS.filter((d) => d.type === filter);

  return (
    <section className="py-24 bg-[#f5f0e8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#c45d3e]" />
              <span className="text-xs font-semibold text-[#c45d3e] uppercase tracking-widest">Programmes</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2c2c2c] leading-tight">
              Academic Programmes
            </h2>
          </div>
          <div className="flex gap-2">
            {(["all", "UG", "PG"] as Filter[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={cn(
                  "px-5 py-2 rounded text-sm font-medium transition-all",
                  filter === tab
                    ? "bg-[#2c2c2c] text-white"
                    : "bg-white text-[#7a7a7a] hover:text-[#2c2c2c] border border-[#e2ddd4]"
                )}
              >
                {tab === "all" ? "All" : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal scrollable programme cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((dept) => (
            <Link
              key={dept.name}
              href="/academics"
              className="group flex items-center gap-4 bg-white rounded-lg p-4 border border-[#e2ddd4] hover:border-[#c45d3e]/30 transition-all hover:shadow-sm"
            >
              <div className={cn(
                "w-14 h-14 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-lg",
                dept.type === "UG" ? "bg-[#5a7a64]" : "bg-[#c45d3e]"
              )}>
                {dept.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn(
                    "text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
                    dept.type === "UG" ? "bg-[#5a7a64]/10 text-[#5a7a64]" : "bg-[#c45d3e]/10 text-[#c45d3e]"
                  )}>
                    {dept.type}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#2c2c2c] group-hover:text-[#c45d3e] transition-colors truncate">
                  {dept.name}
                </h3>
                <p className="text-xs text-[#7a7a7a]">{dept.fees} / semester</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#e2ddd4] group-hover:text-[#c45d3e] transition-colors shrink-0" />
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/academics" className="inline-flex items-center gap-2 bg-[#2c2c2c] hover:bg-[#1a1a1a] text-white font-medium px-7 py-3 rounded text-sm transition-colors">
            View All Programmes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
