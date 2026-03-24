"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function HeaderJ() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDD, setActiveDD] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "bg-white shadow-xl" : "bg-white shadow-lg")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/template-j" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-[#1e40af] to-[#4f46e5] rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">S</span>
            </div>
            <span className="text-base font-bold text-[#111827]">SGC</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.slice(0, 7).map((item) => (
              <div key={item.label} className="relative" onMouseEnter={() => setActiveDD(item.label)} onMouseLeave={() => setActiveDD(null)}>
                <Link href={item.href} className="text-sm font-medium text-[#6b7280] hover:text-[#1e40af] transition-colors flex items-center gap-1">
                  {item.label}
                  {item.children && <ChevronDown className="w-3 h-3" />}
                </Link>
                {item.children && activeDD === item.label && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-white rounded-xl shadow-2xl border border-[#e5e7eb] py-2 min-w-[220px]">
                      {item.children.map((c) => (
                        <Link key={c.label} href={c.href} className="block px-4 py-2.5 text-sm text-[#6b7280] hover:text-[#1e40af] hover:bg-[#1e40af]/5 transition-colors">{c.label}</Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden md:inline-flex text-sm font-semibold text-[#1e40af] hover:text-[#3730a3] transition-colors">Contact</Link>
            <Link href="/admissions/apply" className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-[#1e40af] to-[#4f46e5] hover:shadow-lg hover:scale-105 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all group">
              Apply Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="lg:hidden p-1.5" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5 text-[#111827]" /> : <Menu className="w-5 h-5 text-[#111827]" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#e5e7eb] shadow-lg">
          <nav className="px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <Link href={item.href} className="block py-2.5 text-sm font-medium text-[#111827] hover:text-[#1e40af]" onClick={() => !item.children && setMobileOpen(false)}>{item.label}</Link>
                {item.children && <div className="ml-3 mb-1">{item.children.map((c) => <Link key={c.label} href={c.href} className="block py-1.5 text-sm text-[#6b7280] hover:text-[#1e40af]" onClick={() => setMobileOpen(false)}>{c.label}</Link>)}</div>}
              </div>
            ))}
            <Link href="/admissions/apply" className="block mt-3 text-center bg-gradient-to-r from-[#1e40af] to-[#4f46e5] text-white font-semibold py-2.5 rounded-lg text-sm" onClick={() => setMobileOpen(false)}>Apply Now</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
