import Link from "next/link";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";

export default function FooterB() {
  return (
    <footer className="border-t border-[#e4e4e7]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-sm font-semibold text-[#18181b] mb-3">{SITE_CONFIG.name}</p>
            <p className="text-sm text-[#a1a1aa] leading-relaxed max-w-xs">
              {SITE_CONFIG.address}
            </p>
            <p className="text-sm text-[#a1a1aa] mt-2">{SITE_CONFIG.phone}</p>
            <p className="text-sm text-[#a1a1aa]">{SITE_CONFIG.email}</p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {[
              { title: "College", links: FOOTER_LINKS.quickLinks },
              { title: "Academics", links: FOOTER_LINKS.academics },
              { title: "Resources", links: FOOTER_LINKS.resources },
            ].map(({ title, links }) => (
              <div key={title}>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-[#a1a1aa] hover:text-[#18181b] transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-[#e4e4e7]">
          <p className="text-xs text-[#a1a1aa]">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
