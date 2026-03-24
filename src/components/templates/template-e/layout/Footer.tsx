import Link from "next/link";
import { FOOTER_LINKS, SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  const allLinks = [
    ...FOOTER_LINKS.quickLinks,
    ...FOOTER_LINKS.academics,
    ...FOOTER_LINKS.resources,
  ];

  return (
    <footer className="border-t border-white/10 px-6 py-10 md:pl-[60px]">
      <div className="mx-auto max-w-6xl">
        {/* Links row */}
        <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2">
          {allLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-white/40 transition-colors hover:text-[#22d3ee]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Copyright row */}
        <p className="text-xs text-white/25">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
