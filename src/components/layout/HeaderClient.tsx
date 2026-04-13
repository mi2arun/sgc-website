"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type NavChild = {
  label: string;
  link: string;
  openInNewTab?: boolean;
};

type NavItem = {
  label: string;
  link: string;
  openInNewTab?: boolean;
  children?: NavChild[];
};

type Props = {
  items: NavItem[];
};

export default function HeaderClient({ items }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="bg-primary sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-0 flex-1">
            {items.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.link}
                  target={item.openInNewTab ? "_blank" : undefined}
                  className={cn(
                    "px-2.5 py-2 text-[13px] font-medium text-white/85 hover:text-accent transition-colors flex items-center gap-0.5 rounded-md hover:bg-white/10 whitespace-nowrap",
                    activeDropdown === item.label && "text-accent bg-white/10"
                  )}
                >
                  {item.label}
                  {item.children && item.children.length > 0 && <ChevronDown className="w-3 h-3" />}
                </Link>

                {/* Dropdown */}
                {item.children && item.children.length > 0 && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-1 z-50">
                    <div className="bg-white rounded-lg shadow-xl border border-border/50 py-2 min-w-[220px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.link}
                          target={child.openInNewTab ? "_blank" : undefined}
                          className="block px-4 py-2.5 text-sm text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden xl:block shrink-0 ml-4">
            <Link
              href="/admissions/apply"
              className="bg-accent hover:bg-accent-light text-primary-dark font-semibold px-5 py-2 rounded-lg text-xs transition-colors whitespace-nowrap"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="xl:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-border max-h-[70vh] overflow-y-auto">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {items.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.link}
                  className="block px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                  onClick={() => {
                    if (!item.children || item.children.length === 0) setMobileOpen(false);
                  }}
                >
                  {item.label}
                </Link>
                {item.children && item.children.length > 0 && (
                  <div className="ml-4 space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.link}
                        className="block px-3 py-2 text-sm text-foreground/60 hover:text-primary transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3">
              <Link
                href="/admissions/apply"
                className="block text-center bg-accent hover:bg-accent/90 text-primary-dark font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Apply Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
