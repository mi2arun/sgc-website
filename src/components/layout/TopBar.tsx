"use client";

import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const socialLinks = [
  { label: "Facebook", href: SITE_CONFIG.social.facebook },
  { label: "Twitter", href: SITE_CONFIG.social.twitter },
  { label: "Instagram", href: SITE_CONFIG.social.instagram },
  { label: "YouTube", href: SITE_CONFIG.social.youtube },
  { label: "LinkedIn", href: SITE_CONFIG.social.linkedin },
];

export default function TopBar() {
  return (
    <div className="bg-primary-dark text-white text-sm hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-10">
        <div className="flex items-center gap-6">
          <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span>{SITE_CONFIG.phone}</span>
          </a>
          <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Mail className="w-3.5 h-3.5" />
            <span>{SITE_CONFIG.email}</span>
          </a>
          <span className="flex items-center gap-1.5 text-white/70">
            <MapPin className="w-3.5 h-3.5" />
            <span>{SITE_CONFIG.address}</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors flex items-center gap-1"
            >
              <span className="text-xs">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
