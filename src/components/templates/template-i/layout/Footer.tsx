import Link from "next/link";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";

export default function FooterI() {
  return (
    <footer className="bg-[#0f0f0f] text-white">
      <div className="max-w-[1440px] mx-auto px-5 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-lg font-black mb-3">SGC<span className="text-[#0d9488]">.</span></p>
            <p className="text-xs text-white/30 leading-relaxed">{SITE_CONFIG.address}<br />{SITE_CONFIG.phone}<br />{SITE_CONFIG.email}</p>
          </div>
          {[FOOTER_LINKS.quickLinks, FOOTER_LINKS.academics, FOOTER_LINKS.resources].map((links, i) => (
            <ul key={i} className="space-y-2">
              {links.map((l) => <li key={l.label}><Link href={l.href} className="text-xs text-white/30 hover:text-[#0d9488] transition-colors">{l.label}</Link></li>)}
            </ul>
          ))}
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-5 py-4">
          <p className="text-[10px] text-white/20">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}</p>
        </div>
      </div>
    </footer>
  );
}
