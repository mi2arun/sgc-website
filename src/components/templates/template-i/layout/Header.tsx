"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function HeaderI() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDD, setActiveDD] = useState<string | null>(null);

  return (
    <header className="bg-[#0f0f0f] text-white sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-5">
        <div className="flex items-center justify-between h-14">
          <Link href="/template-i" className="text-lg font-black tracking-tight">SGC<span className="text-[#0d9488]">.</span></Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.slice(0, 8).map((item) => (
              <div key={item.label} className="relative" onMouseEnter={() => setActiveDD(item.label)} onMouseLeave={() => setActiveDD(null)}>
                <Link href={item.href} className={cn("px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors flex items-center gap-0.5 rounded", activeDD === item.label && "text-white bg-white/10")}>
                  {item.label}
                  {item.children && <ChevronDown className="w-3 h-3" />}
                </Link>
                {item.children && activeDD === item.label && (
                  <div className="absolute top-full left-0 pt-1 z-50">
                    <div className="bg-[#1a1a1a] rounded-lg border border-white/10 py-1.5 min-w-[200px]">
                      {item.children.map((c) => (
                        <Link key={c.label} href={c.href} className="block px-3.5 py-2 text-xs text-white/50 hover:text-[#0d9488] transition-colors">{c.label}</Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/admissions/apply" className="hidden sm:inline-flex bg-[#0d9488] hover:bg-[#0f766e] text-white text-xs font-bold px-4 py-2 rounded transition-colors">Apply</Link>
            <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-[#1a1a1a] border-t border-white/10 max-h-[70vh] overflow-y-auto">
          <nav className="px-5 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <Link href={item.href} className="block py-2 text-sm text-white/70 hover:text-[#0d9488]" onClick={() => !item.children && setMobileOpen(false)}>{item.label}</Link>
                {item.children && <div className="ml-3 mb-1">{item.children.map((c) => <Link key={c.label} href={c.href} className="block py-1.5 text-xs text-white/40 hover:text-[#0d9488]" onClick={() => setMobileOpen(false)}>{c.label}</Link>)}</div>}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
