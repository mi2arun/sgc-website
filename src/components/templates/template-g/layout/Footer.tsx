import Link from "next/link";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";

export default function FooterG() {
  return (
    <footer className="bg-[#2c2c2c] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-sm bg-[#c45d3e] flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <p className="font-bold text-base">Saradha Gangadharan College</p>
                <p className="text-xs text-white/40">Autonomous | Pondicherry University</p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-4 max-w-sm">
              NAAC Accredited, ISO 9001:2015 Certified. Empowering students with knowledge, innovation, and purpose since 2010.
            </p>
            <div className="text-sm text-white/50 space-y-1">
              <p>{SITE_CONFIG.address}</p>
              <p>{SITE_CONFIG.phone} &middot; {SITE_CONFIG.email}</p>
            </div>
          </div>

          {[
            { title: "College", links: FOOTER_LINKS.quickLinks },
            { title: "Academics", links: FOOTER_LINKS.academics },
            { title: "Resources", links: FOOTER_LINKS.resources },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#c45d3e] mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/30">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-white/30">
            <Link href="/about" className="hover:text-white/60">Privacy</Link>
            <Link href="/about" className="hover:text-white/60">Terms</Link>
            <Link href="/contact" className="hover:text-white/60">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
