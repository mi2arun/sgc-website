import Link from "next/link";
import { GraduationCap, Phone, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";

export default function FooterF() {
  return (
    <footer className="bg-[#0d3d28] text-white">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-[#d4a843]" />
              </div>
              <div>
                <h3 className="font-bold text-base">{SITE_CONFIG.shortName}</h3>
                <p className="text-[10px] text-white/50">Autonomous Institution</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Affiliated to Pondicherry University. NAAC Accredited. ISO 9001:2015 Certified.
            </p>
            <div className="space-y-2 text-sm text-white/60">
              <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2 hover:text-[#d4a843] transition-colors">
                <Phone className="w-3.5 h-3.5" /> {SITE_CONFIG.phone}
              </a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 hover:text-[#d4a843] transition-colors">
                <Mail className="w-3.5 h-3.5" /> {SITE_CONFIG.email}
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" /> {SITE_CONFIG.address}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#d4a843] font-semibold text-sm mb-4 uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.quickLinks.map((l) => (
                <li key={l.label}><Link href={l.href} className="text-sm text-white/60 hover:text-[#d4a843] transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h4 className="text-[#d4a843] font-semibold text-sm mb-4 uppercase tracking-wide">Academics</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.academics.map((l) => (
                <li key={l.label}><Link href={l.href} className="text-sm text-white/60 hover:text-[#d4a843] transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[#d4a843] font-semibold text-sm mb-4 uppercase tracking-wide">Resources</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.resources.map((l) => (
                <li key={l.label}><Link href={l.href} className="text-sm text-white/60 hover:text-[#d4a843] transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
