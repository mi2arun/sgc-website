"use client";

import Link from "next/link";
import { GraduationCap, Phone, Mail, MapPin, ArrowUp, ExternalLink, Send } from "lucide-react";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";

const socialLinks = [
  { label: "Fb", href: SITE_CONFIG.social.facebook },
  { label: "Tw", href: SITE_CONFIG.social.twitter },
  { label: "Ig", href: SITE_CONFIG.social.instagram },
  { label: "Yt", href: SITE_CONFIG.social.youtube },
  { label: "Li", href: SITE_CONFIG.social.linkedin },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary-dark text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">{SITE_CONFIG.shortName}</h3>
                <p className="text-xs text-white/60">Est. 2010</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              An Autonomous Institution affiliated to Pondicherry University, accredited by NAAC, and certified with ISO 9001:2015.
            </p>
            <div className="space-y-2.5">
              <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors">
                <Phone className="w-4 h-4 shrink-0" />
                {SITE_CONFIG.phone}
              </a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors">
                <Mail className="w-4 h-4 shrink-0" />
                {SITE_CONFIG.email}
              </a>
              <div className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                {SITE_CONFIG.address}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-base mb-5 text-accent">Quick Links</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h3 className="font-semibold text-base mb-5 text-accent">Academics</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.academics.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-base mb-5 text-accent">Resources</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Icons */}
            <div className="mt-6">
              <h4 className="font-medium text-sm mb-3 text-white/90">Follow Us</h4>
              <div className="flex gap-2">
                {socialLinks.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary-dark transition-colors text-xs font-bold"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-base mb-1">Stay Updated</h3>
              <p className="text-sm text-white/60">Subscribe to receive news, events, and admission updates.</p>
            </div>
            <form className="flex w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 md:w-64 px-4 py-2.5 bg-white/10 border border-white/20 rounded-l-lg text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-accent text-primary-dark rounded-r-lg font-semibold text-sm hover:bg-accent/90 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-sm text-white/50 hover:text-accent transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
