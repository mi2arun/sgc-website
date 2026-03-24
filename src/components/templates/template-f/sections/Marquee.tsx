import { Bell } from "lucide-react";

const announcements = [
  "Admissions Open for 2026-27 Academic Year — Apply Now!",
  "NAAC Accreditation Peer Team Visit scheduled for April 2026",
  "NSS Special Camp — March 28 to April 3, 2026",
  "Semester Examination Timetable Released — Download from Examination Portal",
  "SGC Awarded NAAC A+ Grade",
];

export default function Marquee() {
  return (
    <div className="bg-[#7c1d3e] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-9">
        <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-white/20">
          <Bell className="w-3.5 h-3.5 text-[#d4a843]" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4a843]">Updates</span>
        </div>
        <div className="overflow-hidden flex-1 ml-3">
          <div className="tf-marquee whitespace-nowrap">
            {[...announcements, ...announcements].map((text, i) => (
              <span key={i} className="text-xs mx-6">
                {text}
                <span className="text-[#d4a843] mx-4">&#9670;</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
