"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function HeaderG() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/template-g" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#c45d3e] flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div className="hidden sm:block">
              <p className={cn("text-sm font-bold leading-tight transition-colors", scrolled ? "text-[#2c2c2c]" : "text-white")}>
                Saradha Gangadharan
              </p>
              <p className={cn("text-[10px] leading-tight transition-colors", scrolled ? "text-[#7a7a7a]" : "text-white/60")}>
                College
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.slice(0, 8).map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-[13px] font-medium transition-colors flex items-center gap-1 rounded",
                    scrolled
                      ? "text-[#333] hover:text-[#c45d3e] hover:bg-[#c45d3e]/5"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3 h-3" />}
                </Link>

                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-1 z-50">
                    <div className="bg-white rounded-lg shadow-xl border border-[#e2ddd4] py-2 min-w-[220px]">
                      {item.children.map((child) => (
                        <Link key={child.label} href={child.href} className="block px-4 py-2.5 text-sm text-[#7a7a7a] hover:text-[#c45d3e] hover:bg-[#c45d3e]/5 transition-colors">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/admissions/apply"
              className={cn(
                "hidden md:inline-flex text-sm font-semibold px-5 py-2 rounded transition-colors",
                scrolled
                  ? "bg-[#c45d3e] text-white hover:bg-[#a04530]"
                  : "bg-white text-[#2c2c2c] hover:bg-white/90"
              )}
            >
              Apply Now
            </Link>
            <button
              className="lg:hidden p-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen
                ? <X className={cn("w-6 h-6", scrolled ? "text-[#2c2c2c]" : "text-white")} />
                : <Menu className={cn("w-6 h-6", scrolled ? "text-[#2c2c2c]" : "text-white")} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#e2ddd4] shadow-lg max-h-[75vh] overflow-y-auto">
          <nav className="px-6 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <Link href={item.href} className="block py-2.5 text-sm font-medium text-[#333] hover:text-[#c45d3e]" onClick={() => { if (!item.children) setMobileOpen(false); }}>
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 space-y-0.5 mb-2">
                    {item.children.map((c) => (
                      <Link key={c.label} href={c.href} className="block py-1.5 text-sm text-[#7a7a7a] hover:text-[#c45d3e]" onClick={() => setMobileOpen(false)}>{c.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/admissions/apply" className="block mt-3 text-center bg-[#c45d3e] text-white font-semibold py-2.5 rounded text-sm" onClick={() => setMobileOpen(false)}>Apply Now</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
