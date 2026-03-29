"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PROMO_BANNERS } from "@/lib/constants";
import { ChevronLeft, ChevronRight, Megaphone } from "lucide-react";

export default function PromoBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % PROMO_BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const banner = PROMO_BANNERS[current];

  return (
    <div className="relative bg-[#1e3a5f] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#c8a951] rounded-full -translate-y-1/2 translate-x-1/2" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 relative">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + PROMO_BANNERS.length) % PROMO_BANNERS.length)}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors shrink-0"
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex-1 flex items-center justify-center gap-4 text-center min-w-0">
            <Megaphone className="w-5 h-5 shrink-0 hidden sm:block" />
            <div className="min-w-0">
              <span className="font-bold text-sm sm:text-base">{banner.title}</span>
              <span className="hidden md:inline text-white/80 text-sm ml-2">— {banner.subtitle}</span>
            </div>
            <Link
              href={banner.href}
              className="bg-[#c8a951] text-[#1e3a5f] px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-[#d4b85c] transition-colors shrink-0 whitespace-nowrap"
            >
              {banner.cta}
            </Link>
          </div>

          <button
            onClick={() => setCurrent((prev) => (prev + 1) % PROMO_BANNERS.length)}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors shrink-0"
            aria-label="Next banner"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center gap-1.5 mt-2">
          {PROMO_BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === current ? "bg-white w-4" : "bg-white/40"
              }`}
              aria-label={`Go to banner ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
