"use client";

import { useState } from "react";
import Link from "next/link";
import { DEPARTMENTS } from "@/lib/constants";
import { ArrowRight, BookOpen, BarChart3, Briefcase, Scale, Atom, Calculator, Monitor, Laptop, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, BarChart3, Briefcase, Scale, Atom, Calculator, Monitor, Laptop, Globe,
};

type Filter = "all" | "UG" | "PG";

export default function ProgrammesSection() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all"
    ? DEPARTMENTS
    : DEPARTMENTS.filter((d) => d.type === filter);

  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Our Programmes</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Academic Excellence Across Disciplines</h2>
          <p className="text-muted max-w-2xl mx-auto">
            Explore our diverse range of undergraduate and postgraduate programmes designed to
            prepare you for a successful career.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {(["all", "UG", "PG"] as Filter[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-medium transition-colors",
                filter === tab
                  ? "bg-primary text-white"
                  : "bg-white text-muted hover:text-primary border border-border"
              )}
            >
              {tab === "all" ? "All Programmes" : `${tab} Programmes`}
            </button>
          ))}
        </div>

        {/* Programme Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((dept) => {
            const Icon = iconMap[dept.icon] || BookOpen;
            return (
              <Link
                key={dept.name}
                href="/academics"
                className="group bg-white rounded-xl p-6 border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-accent/10 text-accent rounded-full mb-2">
                      {dept.type}
                    </span>
                    <h3 className="font-semibold text-foreground text-sm leading-snug mb-1 group-hover:text-primary transition-colors">
                      {dept.name}
                    </h3>
                    <p className="text-xs text-muted">{dept.fees} / semester</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/academics"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-medium px-7 py-3 rounded-lg transition-colors text-sm"
          >
            View All Programmes
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
