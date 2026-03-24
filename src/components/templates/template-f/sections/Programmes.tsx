"use client";

import { useState } from "react";
import Link from "next/link";
import { DEPARTMENTS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Filter = "all" | "UG" | "PG";

export default function ProgrammesF() {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = filter === "all" ? DEPARTMENTS : DEPARTMENTS.filter((d) => d.type === filter);

  return (
    <section className="py-16 bg-[#fdf8f0]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#155e3d]/10 text-[#155e3d] text-xs font-bold px-3 py-1 rounded mb-3 uppercase tracking-wider">
            Our Programmes
          </span>
          <h2 className="text-3xl font-bold text-[#155e3d] mb-3">Academic Programmes</h2>
          <p className="text-sm text-[#6b6b6b] max-w-xl mx-auto">
            Choose from our diverse range of UG and PG programmes across Science, Arts, Commerce, and Technology.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {(["all", "UG", "PG"] as Filter[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={cn(
                "px-5 py-2 rounded text-sm font-semibold transition-colors",
                filter === tab
                  ? "bg-[#155e3d] text-white"
                  : "bg-white text-[#6b6b6b] border border-[#e0d8c8] hover:border-[#155e3d]/30"
              )}
            >
              {tab === "all" ? "All Programmes" : `${tab} Programmes`}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((dept) => (
            <Link
              key={dept.name}
              href="/academics"
              className="group bg-white rounded-lg border border-[#e0d8c8] hover:border-[#155e3d]/30 p-5 transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-3">
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded",
                  dept.type === "UG" ? "bg-[#155e3d]/10 text-[#155e3d]" : "bg-[#7c1d3e]/10 text-[#7c1d3e]"
                )}>
                  {dept.type}
                </span>
                <ArrowRight className="w-4 h-4 text-[#e0d8c8] group-hover:text-[#155e3d] transition-colors" />
              </div>
              <h3 className="font-semibold text-[#2d2d2d] text-sm mb-2 group-hover:text-[#155e3d] transition-colors">
                {dept.name}
              </h3>
              <p className="text-xs text-[#6b6b6b]">{dept.fees} per semester</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/academics" className="inline-flex items-center gap-2 bg-[#155e3d] hover:bg-[#0d3d28] text-white font-semibold px-6 py-2.5 rounded text-sm transition-colors">
            View All Programmes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
