"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, GraduationCap, Phone, Mail } from "lucide-react";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function HeaderK() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDD, setActiveDD] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top info bar — only visible when not scrolled */}
      <div className={cn("bg-[#0c2340] text-white text-xs transition-all duration-300 overflow-hidden", scrolled ? "h-0 opacity-0" : "h-9 opacity-100")}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-9">
          <div className="flex items-center gap-5">
            <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-1.5 hover:text-[#c9a84c] transition-colors">
              <Phone className="w-3 h-3" /> {SITE_CONFIG.phone}
            </a>
            <a href={`mailto:${SITE_CONFIG.email}`} className="hidden sm:flex items-center gap-1.5 hover:text-[#c9a84c] transition-colors">
              <Mail className="w-3 h-3" /> {SITE_CONFIG.email}
            </a>
          </div>
          <p className="text-white/40 hidden md:block">{SITE_CONFIG.address}</p>
        </div>
      </div>

      {/* Main header */}
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5"
          : "bg-white shadow-sm"
      )}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={cn("flex items-center justify-between transition-all duration-300", scrolled ? "h-16" : "h-[72px]")}>
            {/* Logo */}
            <Link href="/template-k" className="flex items-center gap-3 shrink-0">
              <div className={cn("rounded-xl flex items-center justify-center bg-[#0c2340] transition-all duration-300", scrolled ? "w-10 h-10" : "w-12 h-12")}>
                <GraduationCap className={cn("text-[#c9a84c] transition-all", scrolled ? "w-6 h-6" : "w-7 h-7")} />
              </div>
              <div className="hidden sm:block">
                <h1 className={cn("font-bold text-[#0c2340] leading-tight transition-all", scrolled ? "text-sm" : "text-base")}>
                  {SITE_CONFIG.shortName}
                </h1>
                <p className="text-[10px] text-[#5f6980] leading-tight">Autonomous | Pondicherry University</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center gap-0.5">
              {NAV_ITEMS.slice(0, 8).map((item) => (
                <div key={item.label} className="relative" onMouseEnter={() => setActiveDD(item.label)} onMouseLeave={() => setActiveDD(null)}>
                  <Link
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-[13px] font-medium transition-all flex items-center gap-1 rounded-lg",
                      activeDD === item.label
                        ? "text-[#0c2340] bg-[#0c2340]/5"
                        : "text-[#5f6980] hover:text-[#0c2340]"
                    )}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="w-3 h-3" />}
                  </Link>
                  {item.children && activeDD === item.label && (
                    <div className="absolute top-full left-0 pt-1.5 z-50">
                      <div className="bg-white rounded-xl shadow-2xl shadow-black/10 border border-[#e8e4dc] py-2 min-w-[230px]">
                        <div className="h-0.5 bg-gradient-to-r from-[#c9a84c] to-[#0c2340] mx-4 mb-2 rounded-full" />
                        {item.children.map((c) => (
                          <Link key={c.label} href={c.href} className="block px-4 py-2.5 text-sm text-[#5f6980] hover:text-[#0c2340] hover:bg-[#faf8f3] transition-colors">
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/admissions/apply" className="hidden md:inline-flex bg-[#c9a84c] hover:bg-[#b8963d] text-[#0c2340] font-semibold px-5 py-2.5 rounded-lg text-sm transition-all hover:shadow-lg hover:shadow-[#c9a84c]/20">
                Apply Now
              </Link>
              <button className="xl:hidden p-1.5" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="w-5 h-5 text-[#0c2340]" /> : <Menu className="w-5 h-5 text-[#0c2340]" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="xl:hidden bg-white border-t border-[#e8e4dc] max-h-[70vh] overflow-y-auto shadow-xl">
            <nav className="px-6 py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <Link href={item.href} className="block py-2.5 text-sm font-medium text-[#1a1a2e] hover:text-[#0c2340]" onClick={() => !item.children && setMobileOpen(false)}>{item.label}</Link>
                  {item.children && <div className="ml-4 mb-1 space-y-0.5 border-l-2 border-[#e8e4dc] pl-3">{item.children.map((c) => <Link key={c.label} href={c.href} className="block py-1.5 text-sm text-[#5f6980] hover:text-[#0c2340]" onClick={() => setMobileOpen(false)}>{c.label}</Link>)}</div>}
                </div>
              ))}
              <Link href="/admissions/apply" className="block mt-3 text-center bg-[#c9a84c] text-[#0c2340] font-semibold py-2.5 rounded-lg text-sm" onClick={() => setMobileOpen(false)}>Apply Now</Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
