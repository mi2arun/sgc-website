import Link from "next/link";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";

export default function FooterJ() {
  return (
    <footer className="bg-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-[#1e40af] to-[#4f46e5] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">S</span>
              </div>
              <span className="font-bold">SGC</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{SITE_CONFIG.address}</p>
            <p className="text-sm text-gray-400 mt-2">{SITE_CONFIG.phone}</p>
            <p className="text-sm text-gray-400">{SITE_CONFIG.email}</p>
          </div>
          {[
            { links: FOOTER_LINKS.quickLinks },
            { links: FOOTER_LINKS.academics },
            { links: FOOTER_LINKS.resources },
          ].map((col, i) => (
            <ul key={i} className="space-y-2.5">
              {col.links.map((l) => <li key={l.label}><Link href={l.href} className="text-sm text-gray-400 hover:text-[#4f46e5] transition-colors">{l.label}</Link></li>)}
            </ul>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
