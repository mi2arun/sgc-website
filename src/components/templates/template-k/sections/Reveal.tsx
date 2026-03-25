"use client";

import { useEffect, useRef, ReactNode } from "react";

type Direction = "up" | "left" | "right" | "scale";

const classMap: Record<Direction, string> = {
  up: "tk-reveal",
  left: "tk-reveal-left",
  right: "tk-reveal-right",
  scale: "tk-reveal-scale",
};

export default function Reveal({ children, className = "", delay = 0, direction = "up" }: { children: ReactNode; className?: string; delay?: number; direction?: Direction }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add("tk-visible"), delay); obs.unobserve(el); }
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`${classMap[direction]} ${className}`}>{children}</div>;
}
