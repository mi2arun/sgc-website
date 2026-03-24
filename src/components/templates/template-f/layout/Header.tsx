"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Menu, X, ChevronDown, GraduationCap } from "lucide-react";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function HeaderF() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <>
      {/* Top info bar */}
      <div className="bg-[#0d3d28] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-9">
          <div className="flex items-center gap-5">
            <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-1 hover:text-[#d4a843] transition-colors">
              <Phone className="w-3 h-3" /> {SITE_CONFIG.phone}
            </a>
            <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-1 hover:text-[#d4a843] transition-colors hidden sm:flex">
              <Mail className="w-3 h-3" /> {SITE_CONFIG.email}
            </a>
          </div>
          <div className="flex items-center gap-1 text-white/60">
            <MapPin className="w-3 h-3" /> {SITE_CONFIG.address}
          </div>
        </div>
      </div>

      {/* Main header with logo */}
      <div className="bg-[#fdf8f0] border-b border-[#e0d8c8]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/template-f" className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#155e3d] rounded-full flex items-center justify-center shadow-md">
              <GraduationCap className="w-9 h-9 text-[#d4a843]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#155e3d] leading-tight">{SITE_CONFIG.name}</h1>
              <p className="text-xs text-[#6b6b6b]">{SITE_CONFIG.tagline}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] bg-[#155e3d]/10 text-[#155e3d] px-2 py-0.5 rounded font-semibold">NAAC Accredited</span>
                <span className="text-[9px] bg-[#7c1d3e]/10 text-[#7c1d3e] px-2 py-0.5 rounded font-semibold">ISO 9001:2015</span>
              </div>
            </div>
          </Link>

          {/* Quick action buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/admissions/apply" className="bg-[#7c1d3e] hover:bg-[#6a1835] text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors">
              Apply Online
            </Link>
            <Link href="/admissions/fees" className="bg-[#155e3d] hover:bg-[#0d3d28] text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors">
              Pay Fees
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="bg-[#155e3d] sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop */}
          <div className="hidden lg:flex items-center h-11">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative h-full"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 h-full px-4 text-sm font-medium text-white/90 hover:bg-white/10 transition-colors",
                    activeDropdown === item.label && "bg-white/10"
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3 h-3" />}
                </Link>

                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 z-50 pt-0.5">
                    <div className="bg-white rounded-b-lg shadow-xl border border-[#e0d8c8] py-1 min-w-[220px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-[#2d2d2d] hover:text-[#155e3d] hover:bg-[#155e3d]/5 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center justify-between h-11">
            <span className="text-white text-sm font-medium">Menu</span>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-[#0d3d28] border-t border-white/10 max-h-[70vh] overflow-y-auto">
            <div className="px-4 py-3 space-y-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="block py-2 text-sm text-white/80 hover:text-[#d4a843] transition-colors"
                    onClick={() => { if (!item.children) setMobileOpen(false); }}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 space-y-0.5">
                      {item.children.map((child) => (
                        <Link key={child.label} href={child.href} className="block py-1.5 text-xs text-white/50 hover:text-[#d4a843]" onClick={() => setMobileOpen(false)}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 flex gap-2">
                <Link href="/admissions/apply" className="flex-1 text-center bg-[#7c1d3e] text-white text-sm font-semibold py-2 rounded" onClick={() => setMobileOpen(false)}>Apply</Link>
                <Link href="/admissions/fees" className="flex-1 text-center bg-[#d4a843] text-[#0d3d28] text-sm font-semibold py-2 rounded" onClick={() => setMobileOpen(false)}>Pay Fees</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
