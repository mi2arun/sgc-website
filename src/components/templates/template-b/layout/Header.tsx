"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function HeaderB() {
  const [scrolled, setScrolled] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (overlayOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [overlayOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "h-12 bg-white/70 backdrop-blur-xl border-b border-[#e4e4e7]"
            : "h-[72px] bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/template-b" className="text-lg font-semibold tracking-tight text-[#18181b]">
            SGC
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.filter((_, i) => i < 7).map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.children) {
                    setOverlayOpen(true);
                  }
                }}
                className="text-[13px] text-[#a1a1aa] hover:text-[#18181b] transition-colors relative group"
              >
                {item.children ? (
                  <span>{item.label}</span>
                ) : (
                  <Link href={item.href} className="text-[13px] text-[#a1a1aa] hover:text-[#18181b] transition-colors">
                    {item.label}
                  </Link>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#18181b] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Link
              href="/admissions/apply"
              className="text-[13px] text-[#a1a1aa] hover:text-[#6366f1] transition-colors underline underline-offset-4 decoration-[#a1a1aa] hover:decoration-[#6366f1]"
            >
              Apply
            </Link>
            <button
              onClick={() => setOverlayOpen(true)}
              className="md:hidden text-[13px] text-[#a1a1aa]"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Full-page overlay navigation */}
      {overlayOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <div className="h-[72px] flex items-center justify-between">
              <Link href="/template-b" className="text-lg font-semibold tracking-tight text-[#18181b]" onClick={() => setOverlayOpen(false)}>
                SGC
              </Link>
              <button onClick={() => setOverlayOpen(false)} className="text-[#a1a1aa] hover:text-[#18181b] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center">
            <div className="max-w-6xl mx-auto px-6 w-full">
              <div className="grid md:grid-cols-2 gap-x-20 gap-y-10">
                {NAV_ITEMS.map((item, i) => (
                  <div key={item.label} className="opacity-0 animate-fade" style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}>
                    <Link
                      href={item.href}
                      className="text-3xl md:text-4xl font-semibold text-[#18181b] hover:text-[#6366f1] transition-colors"
                      onClick={() => setOverlayOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="mt-3 space-y-1.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block text-sm text-[#a1a1aa] hover:text-[#6366f1] transition-colors"
                            onClick={() => setOverlayOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
