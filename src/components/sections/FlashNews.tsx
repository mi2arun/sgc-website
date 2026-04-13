"use client";

import { Megaphone } from "lucide-react";

const defaultAnnouncements = [
  "Admissions Open for 2026-27 Academic Year — Apply Now!",
  "NAAC Accreditation Peer Team Visit scheduled for April 2026",
  "NSS Special Camp — March 28 to April 3, 2026",
  "Semester Examination Timetable Released — Download from Examination Portal",
];

type Props = {
  items?: { text: string; link?: string }[];
};

export default function FlashNews({ items }: Props) {
  const announcements = items ? items.map((i) => i.text) : defaultAnnouncements;
  return (
    <div className="bg-accent/10 border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-11 overflow-hidden">
        <div className="flex items-center gap-2 shrink-0 pr-4 border-r border-accent/30">
          <Megaphone className="w-4 h-4 text-accent" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">Flash News</span>
        </div>
        <div className="overflow-hidden ml-4 flex-1">
          <div className="animate-ticker whitespace-nowrap">
            {announcements.map((text, i) => (
              <span key={i} className="text-sm text-foreground/70 mx-8">
                {text}
                {i < announcements.length - 1 && <span className="text-accent mx-4">|</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
