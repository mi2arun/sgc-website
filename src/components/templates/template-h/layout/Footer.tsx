import Link from "next/link";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";
import { GraduationCap } from "lucide-react";

export default function FooterH() {
  return (
    <footer className="bg-[#18181b] text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold">{SITE_CONFIG.shortName}</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-3 max-w-xs">
              Autonomous Institution affiliated to Pondicherry University. NAAC Accredited. ISO 9001:2015.
            </p>
            <p className="text-xs text-white/30">{SITE_CONFIG.address}</p>
            <p className="text-xs text-white/30">{SITE_CONFIG.phone} &middot; {SITE_CONFIG.email}</p>
          </div>
          {[
            { title: "College", links: FOOTER_LINKS.quickLinks },
            { title: "Academics", links: FOOTER_LINKS.academics },
            { title: "Resources", links: FOOTER_LINKS.resources },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.label}><Link href={l.href} className="text-sm text-white/40 hover:text-white transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4">
          <p className="text-xs text-white/25">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
