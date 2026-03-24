import Link from "next/link";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";

export default function FooterD() {
  return (
    <footer className="bg-[#fffdf7]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Red rule */}
        <div className="h-[2px] bg-[#b91c1c] mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div>
            <p className="font-playfair font-bold text-[#1a1a1a] mb-3">{SITE_CONFIG.shortName}</p>
            <p className="text-[#78716c] leading-relaxed">{SITE_CONFIG.address}</p>
            <p className="text-[#78716c] mt-2">{SITE_CONFIG.phone}</p>
            <p className="text-[#78716c]">{SITE_CONFIG.email}</p>
          </div>
          {[
            { links: FOOTER_LINKS.quickLinks },
            { links: FOOTER_LINKS.academics },
            { links: FOOTER_LINKS.resources },
          ].map((col, i) => (
            <div key={i}>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[#78716c] hover:text-[#b91c1c] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 py-6 border-t border-[#d6d3d1] text-center">
          <p className="font-playfair text-xs italic text-[#78716c]">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
