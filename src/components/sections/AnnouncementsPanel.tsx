"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Download, ChevronRight, Calendar } from "lucide-react";

const categories = ["All", "Examination", "Admission", "Fees", "Academic", "Accreditation"];

type Props = {
  items?: { title: string; date: string; category: string; isNew?: boolean; href: string }[];
  title?: string;
};

export default function AnnouncementsPanel({ items, title }: Props) {
  const data = items || [];
  const [activeCategory, setActiveCategory] = useState("All");

  if (data.length === 0) return null;

  const filtered =
    activeCategory === "All"
      ? data
      : data.filter((a) => a.category === activeCategory);

  return (
    <section className="py-12 bg-[#f8f6f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#c8a951]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">{title || "Announcements & Circulars"}</h2>
              <p className="text-sm text-gray-500">Important notices and updates</p>
            </div>
          </div>
          <Link
            href="/announcements"
            className="text-sm text-[#1e3a5f] font-medium hover:text-[#c8a951] transition-colors flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-[#1e3a5f] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
          {filtered.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center gap-4 px-5 py-4 hover:bg-[#f8f6f0] transition-colors group"
            >
              <div className="shrink-0 text-center w-14">
                <Calendar className="w-4 h-4 text-gray-400 mx-auto mb-0.5" />
                <span className="text-xs text-gray-500 leading-tight block">
                  {new Date(item.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {item.isNew && (
                    <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
                      New
                    </span>
                  )}
                  <span className="bg-[#1e3a5f]/10 text-[#1e3a5f] text-[10px] px-2 py-0.5 rounded font-medium">
                    {item.category}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-800 mt-1 group-hover:text-[#1e3a5f] transition-colors truncate">
                  {item.title}
                </p>
              </div>
              <Download className="w-4 h-4 text-gray-400 group-hover:text-[#c8a951] transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
