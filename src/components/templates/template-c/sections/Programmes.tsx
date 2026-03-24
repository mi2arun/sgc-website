"use client";

import { useState } from "react";
import { DEPARTMENTS } from "@/lib/constants";
import {
  BookOpen,
  BarChart3,
  Briefcase,
  Scale,
  Atom,
  Calculator,
  Monitor,
  Laptop,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  BarChart3,
  Briefcase,
  Scale,
  Atom,
  Calculator,
  Monitor,
  Laptop,
  Globe,
};

const filters = ["All", "UG", "PG"];

export default function Programmes() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? DEPARTMENTS
      : DEPARTMENTS.filter((d) => d.type === activeFilter);

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-violet-600 uppercase tracking-wider mb-2">Academics</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            Our{" "}
            <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
              Programmes
            </span>
          </h2>
        </div>

        {/* Filter pills */}
        <div className="flex justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold transition-all",
                activeFilter === f
                  ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/25"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {f === "All" ? "All Programmes" : `${f} Programmes`}
            </button>
          ))}
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
          {filtered.map((dept, i) => {
            const Icon = iconMap[dept.icon] || BookOpen;
            const isFeatured = i === 0;

            return (
              <div
                key={dept.name}
                className={cn(
                  "group relative rounded-2xl p-6 transition-all duration-300 hover:scale-[1.03] cursor-pointer overflow-hidden",
                  isFeatured
                    ? "sm:col-span-2 sm:row-span-2 bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-xl shadow-violet-500/20"
                    : i % 5 === 2
                    ? "bg-orange-50 border border-orange-100 hover:shadow-lg hover:shadow-orange-500/10"
                    : i % 5 === 3
                    ? "bg-cyan-50 border border-cyan-100 hover:shadow-lg hover:shadow-cyan-500/10"
                    : "bg-white border border-gray-100 hover:shadow-lg hover:shadow-violet-500/10"
                )}
              >
                <div className={cn("mb-4", isFeatured ? "mb-6" : "")}>
                  <div
                    className={cn(
                      "inline-flex items-center justify-center rounded-xl",
                      isFeatured
                        ? "h-14 w-14 bg-white/20"
                        : "h-10 w-10 bg-violet-100"
                    )}
                  >
                    <Icon
                      className={cn(
                        isFeatured ? "h-7 w-7 text-white" : "h-5 w-5 text-violet-600"
                      )}
                    />
                  </div>
                </div>

                <h3
                  className={cn(
                    "font-bold leading-snug",
                    isFeatured ? "text-xl md:text-2xl" : "text-sm"
                  )}
                >
                  {dept.name}
                </h3>

                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={cn(
                      "text-xs font-semibold px-2 py-0.5 rounded-full",
                      isFeatured
                        ? "bg-white/20 text-white"
                        : "bg-violet-100 text-violet-700"
                    )}
                  >
                    {dept.type}
                  </span>
                  <span
                    className={cn(
                      "text-xs",
                      isFeatured ? "text-white/80" : "text-gray-500"
                    )}
                  >
                    {dept.fees}/yr
                  </span>
                </div>

                {isFeatured && (
                  <p className="mt-4 text-sm text-white/80 leading-relaxed">
                    Our flagship programme offering comprehensive education with industry-ready curriculum and expert faculty guidance.
                  </p>
                )}

                <div
                  className={cn(
                    "mt-4 inline-flex items-center gap-1 text-xs font-semibold",
                    isFeatured ? "text-white" : "text-violet-600"
                  )}
                >
                  Learn more
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
