"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Bell, ChevronDown, GraduationCap } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function HeaderH() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="bg-white border-b border-[#e4e4e7] sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/template-h" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-base font-bold text-[#18181b] hidden sm:block">SGC</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 mx-6">
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
                    "px-2.5 py-1.5 text-[13px] font-medium text-[#71717a] hover:text-[#18181b] hover:bg-[#f4f4f5] rounded-md transition-colors flex items-center gap-0.5",
                    activeDropdown === item.label && "text-[#18181b] bg-[#f4f4f5]"
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3 h-3" />}
                </Link>
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-1 z-50">
                    <div className="bg-white rounded-lg shadow-xl border border-[#e4e4e7] py-1.5 min-w-[200px]">
                      {item.children.map((c) => (
                        <Link key={c.label} href={c.href} className="block px-3.5 py-2 text-sm text-[#71717a] hover:text-[#2563eb] hover:bg-[#2563eb]/5 transition-colors">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg hover:bg-[#f4f4f5] flex items-center justify-center text-[#71717a] transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-[#f4f4f5] flex items-center justify-center text-[#71717a] transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#dc2626] rounded-full" />
            </button>
            <Link href="/admissions/apply" className="hidden sm:inline-flex bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
              Apply Now
            </Link>
            <button className="lg:hidden p-1" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5 text-[#18181b]" /> : <Menu className="w-5 h-5 text-[#18181b]" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#e4e4e7] max-h-[70vh] overflow-y-auto">
          <nav className="px-4 py-3 space-y-0.5">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <Link href={item.href} className="block py-2 text-sm font-medium text-[#18181b] hover:text-[#2563eb]" onClick={() => !item.children && setMobileOpen(false)}>{item.label}</Link>
                {item.children && (
                  <div className="ml-3 mb-1">{item.children.map((c) => (
                    <Link key={c.label} href={c.href} className="block py-1.5 text-sm text-[#71717a] hover:text-[#2563eb]" onClick={() => setMobileOpen(false)}>{c.label}</Link>
                  ))}</div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
