"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PLACEMENT_STATS } from "@/lib/constants";
import { TrendingUp, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  stats?: typeof PLACEMENT_STATS;
  title?: string;
};

export default function PlacementSection({ stats: statsProp, title }: Props) {
  const data = statsProp || PLACEMENT_STATS;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — Content */}
          <div>
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Career Growth</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-5 leading-tight">
              {title || "Placement Excellence"}
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              Our dedicated placement cell works tirelessly to connect students with top employers
              across industries. With an impressive track record of placements, SGC ensures that
              every student has the opportunity to launch a successful career.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-xl p-5 border border-border/50">
                <p className="text-3xl font-bold text-primary">92%</p>
                <p className="text-sm text-muted mt-1">Overall Placement Rate</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-border/50">
                <p className="text-3xl font-bold text-primary">50+</p>
                <p className="text-sm text-muted mt-1">Recruiting Companies</p>
              </div>
            </div>

            <Link
              href="/placements"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-medium px-7 py-3 rounded-lg transition-colors text-sm"
            >
              View Placement Details
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right — Progress Bars */}
          <div className="bg-white rounded-2xl p-8 border border-border/50 shadow-sm">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-5 h-5 text-accent" />
              <h3 className="font-bold text-lg text-primary">Sector-wise Placements</h3>
            </div>
            <div className="space-y-7">
              {data.map((stat, i) => (
                <div key={stat.label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">{stat.label}</span>
                    <span className="text-sm font-bold text-primary">{stat.percentage}%</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-1000 ease-out",
                        i % 2 === 0 ? "bg-gradient-to-r from-primary to-primary-light" : "bg-gradient-to-r from-accent to-accent-light"
                      )}
                      style={{
                        width: isVisible ? `${stat.percentage}%` : "0%",
                        transitionDelay: `${i * 200}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
