"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  FileText,
  FlaskConical,
  Users,
  Grid3X3,
  X,
} from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";

const dockIcons = [
  { icon: Home, label: "Home", href: "/" },
  { icon: BookOpen, label: "Academics", href: "/academics" },
  { icon: FileText, label: "Admissions", href: "/admissions" },
  { icon: FlaskConical, label: "Research", href: "/research" },
  { icon: Users, label: "Campus Life", href: "/campus-life" },
];

export default function SideDock() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Split nav items into two columns
  const mid = Math.ceil(NAV_ITEMS.length / 2);
  const col1 = NAV_ITEMS.slice(0, mid);
  const col2 = NAV_ITEMS.slice(mid);

  return (
    <>
      {/* Fixed side bar */}
      <aside className="fixed left-0 top-0 z-50 hidden h-full w-[60px] flex-col items-center justify-between border-r border-[#262626] bg-[#141414]/80 py-6 backdrop-blur-md md:flex">
        {/* Logo */}
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#262626] text-sm font-semibold text-[#ededed] transition-colors hover:border-[#22d3ee] hover:text-[#22d3ee]"
        >
          S
        </Link>

        {/* Icon buttons */}
        <nav className="flex flex-col items-center gap-5">
          {dockIcons.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="group relative flex h-9 w-9 items-center justify-center rounded-lg text-[#525252] transition-colors hover:bg-white/5 hover:text-[#ededed]"
            >
              <Icon size={18} />
              {/* Tooltip */}
              <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-[#141414] px-2.5 py-1 text-xs text-[#ededed] opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Menu trigger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#525252] transition-colors hover:bg-white/5 hover:text-[#ededed]"
          aria-label="Open menu"
        >
          <Grid3X3 size={18} />
        </button>
      </aside>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-2xl"
          >
            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute right-8 top-8 text-[#525252] transition-colors hover:text-[#ededed]"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {/* Nav links in 2-col grid */}
            <div className="grid grid-cols-1 gap-x-24 gap-y-6 px-8 md:grid-cols-2">
              {[col1, col2].map((col, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-6">
                  {col.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: (colIdx * mid + i) * 0.06,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block text-3xl font-light text-[#ededed]/70 transition-colors hover:text-[#22d3ee] md:text-4xl"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
