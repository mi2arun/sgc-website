"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import SocialIcon from "@/components/ui/SocialIcon";

type Props = {
  phone: string;
  email: string;
  address: string;
  social: { label: string; href: string }[];
};

export default function TopBarClient({ phone, email, address, social }: Props) {
  return (
    <div className="bg-primary-dark text-white text-sm hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-10">
        <div className="flex items-center gap-6">
          <a href={`tel:${phone}`} className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span>{phone}</span>
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Mail className="w-3.5 h-3.5" />
            <span>{email}</span>
          </a>
          <span className="flex items-center gap-1.5 text-white/70">
            <MapPin className="w-3.5 h-3.5" />
            <span>{address}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          {social.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary-dark transition-colors"
              title={label}
            >
              <SocialIcon name={label} className="w-3.5 h-3.5 block" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
