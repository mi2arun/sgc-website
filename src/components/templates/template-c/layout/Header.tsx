"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Menu, X, ChevronDown } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const topNavItems = NAV_ITEMS.filter((item) =>
    ["Home", "About", "Academics", "Admissions", "Placements", "Contact"].includes(item.label)
  );

  return (
    <>
      {/* Floating pill header */}
      <header className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg shadow-violet-500/5 border border-white/40">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Star className="h-6 w-6 text-violet-600 fill-violet-600" />
            <span className="text-xl font-black text-violet-600 tracking-tight">SGC</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {topNavItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="tc-nav-link px-3 py-2 text-sm font-medium text-gray-700 hover:text-violet-600 transition-colors"
                >
                  <span className="flex items-center gap-1">
                    {item.label}
                    {item.children && <ChevronDown className="h-3 w-3" />}
                  </span>
                </Link>

                {/* Dropdown */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 rounded-xl bg-white/90 backdrop-blur-xl shadow-xl border border-gray-100 py-2 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-violet-600 hover:bg-violet-50/50 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Apply button + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/admissions/apply"
              className="hidden sm:inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow"
            >
              Apply Now
            </Link>
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-violet-50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5 text-violet-600" /> : <Menu className="h-5 w-5 text-violet-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile bottom-sheet navigation */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto"
            style={{ animation: "slide-up 0.3s ease forwards" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>
            <nav className="px-6 pb-8">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="border-b border-gray-100 last:border-0">
                  <Link
                    href={item.href}
                    className="block py-3 text-base font-medium text-gray-800 hover:text-violet-600 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4 pb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-1.5 text-sm text-gray-500 hover:text-violet-600"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/admissions/apply"
                className="mt-4 block w-full text-center px-5 py-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold shadow-lg"
                onClick={() => setMobileOpen(false)}
              >
                Apply Now
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
