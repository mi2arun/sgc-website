"use client";

import { useEffect, useRef, useState } from "react";
import { GraduationCap, Users, BookOpen, Briefcase } from "lucide-react";

const icons = [BookOpen, Users, GraduationCap, Briefcase];

type StatItem = { label: string; value: number; suffix: string };

function useCountUp(target: number, isVisible: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, isVisible]);

  return count;
}

function StatCard({ stat, index, isVisible }: { stat: StatItem; index: number; isVisible: boolean }) {
  const count = useCountUp(stat.value, isVisible);
  const Icon = icons[index % icons.length];

  return (
    <div className="text-center group">
      <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
        <Icon className="w-8 h-8 text-accent" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {count.toLocaleString()}
        <span className="text-accent">{stat.suffix}</span>
      </div>
      <p className="text-white/70 text-sm font-medium">{stat.label}</p>
    </div>
  );
}

type Props = {
  items?: StatItem[];
};

export default function StatsSection({ items }: Props) {
  const data = items || [];
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

  if (data.length === 0) return null;

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-primary via-primary-dark to-primary relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">SGC at a Glance</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Numbers That Speak</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {data.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
