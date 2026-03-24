"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";
import { Menu, X } from "lucide-react";

export default function HeaderD() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-[#fffdf7]">
      {/* Masthead */}
      <div className="py-6 text-center">
        <Link href="/template-d">
          <h1 className="font-playfair text-2xl md:text-3xl font-bold tracking-[0.08em] uppercase text-[#1a1a1a]">
            Saradha Gangadharan College
          </h1>
          <p className="font-playfair text-sm italic text-[#78716c] mt-1">
            Autonomous Institution &middot; Pondicherry University
          </p>
        </Link>
      </div>

      {/* Red rule */}
      <div className="flex justify-center">
        <div className="w-4/5 h-[2px] bg-[#b91c1c]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#fffdf7] border-b border-[#d6d3d1]">
        <div className="max-w-6xl mx-auto px-4">
          {/* Desktop */}
          <div className="hidden md:flex items-center justify-center py-3 gap-0 flex-wrap">
            {NAV_ITEMS.map((item, i) => (
              <span key={item.label} className="flex items-center">
                <Link
                  href={item.href}
                  className="text-[11px] tracking-[0.15em] uppercase text-[#78716c] hover:text-[#b91c1c] transition-colors px-3"
                >
                  {item.label}
                </Link>
                {i < NAV_ITEMS.length - 1 && (
                  <span className="text-[#d6d3d1] text-xs">|</span>
                )}
              </span>
            ))}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center justify-between py-3">
            <span className="text-xs tracking-widest uppercase text-[#78716c]">Menu</span>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-[#78716c]">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {mobileOpen && (
            <div className="md:hidden pb-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-2 text-sm text-[#78716c] hover:text-[#b91c1c] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
