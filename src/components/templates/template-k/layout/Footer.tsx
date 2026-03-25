"use client";

import Link from "next/link";
import { GraduationCap, Phone, Mail, MapPin, ArrowUp } from "lucide-react";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";

export default function FooterK() {
  return (
    <footer className="bg-[#0c2340]">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#c9a84c]" />
              </div>
              <div>
                <h3 className="font-bold text-white">{SITE_CONFIG.shortName}</h3>
                <p className="text-[10px] text-white/30">Est. 2010</p>
              </div>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-5">
              Autonomous Institution affiliated to Pondicherry University. NAAC Accredited. ISO 9001:2015.
            </p>
            <div className="space-y-2.5 text-sm text-white/40">
              <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2 hover:text-[#c9a84c] transition-colors"><Phone className="w-3.5 h-3.5 shrink-0" /> {SITE_CONFIG.phone}</a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 hover:text-[#c9a84c] transition-colors"><Mail className="w-3.5 h-3.5 shrink-0" /> {SITE_CONFIG.email}</a>
              <div className="flex items-start gap-2"><MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" /> {SITE_CONFIG.address}</div>
            </div>
          </div>
          {[
            { title: "Quick Links", links: FOOTER_LINKS.quickLinks },
            { title: "Academics", links: FOOTER_LINKS.academics },
            { title: "Resources", links: FOOTER_LINKS.resources },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#c9a84c] mb-5">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}><Link href={l.href} className="text-sm text-white/40 hover:text-[#c9a84c] transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/25">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-1.5 text-xs text-white/25 hover:text-[#c9a84c] transition-colors">
            <ArrowUp className="w-3.5 h-3.5" /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
