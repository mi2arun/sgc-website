"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUp, ExternalLink, Send } from "lucide-react";
import SocialIcon from "@/components/ui/SocialIcon";

type FooterLink = { label: string; href: string };
type FooterColumn = { title: string; links: FooterLink[] };
type SocialLink = { label: string; href: string };

type Props = {
  collegeName: string;
  shortName: string;
  phone: string;
  email: string;
  address: string;
  mapUrl: string;
  logoUrl: string;
  social: SocialLink[];
  columns: FooterColumn[];
  newsletterHeading: string;
  newsletterDescription: string;
  copyright: string;
};

export default function FooterClient({
  collegeName, shortName, phone, email, address, mapUrl, logoUrl,
  social, columns, newsletterHeading, newsletterDescription, copyright,
}: Props) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const displayCopyright = copyright.replace("{year}", new Date().getFullYear().toString());

  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Image src={logoUrl} alt={collegeName} width={48} height={48} className="shrink-0" />
              <div>
                <h3 className="font-bold text-lg leading-tight">{shortName}</h3>
                <p className="text-xs text-white/60">Est. 2010</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              An Autonomous Institution affiliated to Pondicherry University, accredited by NAAC, and certified with ISO 9001:2015.
            </p>
            <div className="space-y-2.5">
              <a href={`tel:${phone}`} className="flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors">
                <Phone className="w-4 h-4 shrink-0" />{phone}
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors">
                <Mail className="w-4 h-4 shrink-0" />{email}
              </a>
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm text-white/70 hover:text-accent transition-colors">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />{address}
                <ExternalLink className="w-3 h-3 shrink-0 mt-1" />
              </a>
            </div>
          </div>

          {/* Dynamic Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-semibold text-base mb-5 text-accent">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/70 hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social — after last column or standalone */}
          {columns.length < 3 && (
            <div>
              <h3 className="font-semibold text-base mb-5 text-accent">Follow Us</h3>
              <div className="flex gap-2">
                {social.map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary-dark transition-colors"
                    title={label}
                  ><SocialIcon name={label} className="w-4 h-4 block" /></a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Social icons inline if 3 columns */}
        {columns.length >= 3 && (
          <div className="mt-10">
            <h4 className="font-medium text-sm mb-3 text-white/90">Follow Us</h4>
            <div className="flex gap-2">
              {social.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary-dark transition-colors text-xs font-bold"
                >{label.slice(0, 2)}</a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Newsletter */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-base mb-1">{newsletterHeading}</h3>
              <p className="text-sm text-white/60">{newsletterDescription}</p>
            </div>
            <form className="flex w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address"
                className="flex-1 md:w-64 px-4 py-2.5 bg-white/10 border border-white/20 rounded-l-lg text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-accent" />
              <button type="submit"
                className="px-5 py-2.5 bg-accent text-primary-dark rounded-r-lg font-semibold text-sm hover:bg-accent/90 transition-colors flex items-center gap-2">
                <Send className="w-4 h-4" />Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-white/50">{displayCopyright}</p>
          <button onClick={scrollToTop}
            className="flex items-center gap-1.5 text-sm text-white/50 hover:text-accent transition-colors">
            <ArrowUp className="w-4 h-4" />Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
