"use client";

import Image from "next/image";
import { NEWS } from "@/lib/constants";
import { NEWS_IMAGES } from "@/lib/images";
import { ArrowUpRight, Calendar } from "lucide-react";
import Link from "next/link";

export default function News() {
  const featured = NEWS[0];
  const rest = NEWS.slice(1);

  const categoryColors: Record<string, string> = {
    default: "bg-violet-100 text-violet-700",
  };

  const colorCycle = [
    "bg-cyan-100 text-cyan-700",
    "bg-orange-100 text-orange-700",
    "bg-violet-100 text-violet-700",
  ];

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm font-semibold text-violet-600 uppercase tracking-wider mb-2">
              Latest Updates
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              News &{" "}
              <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                Highlights
              </span>
            </h2>
          </div>
          <Link
            href="/news"
            className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors"
          >
            View All <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Asymmetric masonry */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Large featured card — 60% */}
          <div className="lg:col-span-3 group relative rounded-2xl overflow-hidden min-h-[400px] flex items-end cursor-pointer hover:shadow-xl transition-shadow">
            <Image src={NEWS_IMAGES.naac} alt={featured.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="relative p-8">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-semibold text-white mb-3">
                Featured
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
                {featured.title}
              </h3>
              <p className="text-sm text-white/80 max-w-md">{featured.excerpt}</p>
              <div className="flex items-center gap-2 mt-4 text-xs text-white/60">
                <Calendar className="h-3 w-3" />
                <span>{new Date(featured.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
            </div>
          </div>

          {/* 3 stacked cards — 40% */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {rest.map((item, i) => (
              <div
                key={item.title}
                className="group relative rounded-2xl bg-white border border-gray-100 p-5 cursor-pointer hover:shadow-lg hover:border-transparent transition-all"
                style={{
                  backgroundImage:
                    "linear-gradient(white, white), linear-gradient(135deg, #7c3aed, #06b6d4)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  border: "1.5px solid transparent",
                  opacity: 1,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget.style.border as string) = "1.5px solid transparent";
                }}
              >
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 ${
                    colorCycle[i % colorCycle.length]
                  }`}
                >
                  News
                </span>
                <h4 className="font-bold text-gray-900 leading-snug group-hover:text-violet-600 transition-colors">
                  {item.title}
                </h4>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.excerpt}</p>
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
