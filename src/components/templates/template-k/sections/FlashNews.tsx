import { Bell } from "lucide-react";

const items = [
  "Admissions Open for 2026-27 Academic Year — Apply Now!",
  "NAAC Peer Team Visit Scheduled for April 2026",
  "NSS Special Camp — March 28 to April 3, 2026",
  "Semester Examination Timetable Released",
  "SGC Awarded NAAC A+ Grade",
];

export default function FlashNewsK() {
  return (
    <div className="bg-[#0c2340] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex items-center h-10">
        <div className="flex items-center gap-2 shrink-0 pr-4 border-r border-white/10">
          <Bell className="w-3.5 h-3.5 text-[#c9a84c]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#c9a84c]">Updates</span>
        </div>
        <div className="overflow-hidden flex-1 ml-4">
          <div className="tk-ticker whitespace-nowrap">
            {[...items, ...items].map((t, i) => (
              <span key={i} className="text-xs text-white/50 mx-6">{t} <span className="text-[#c9a84c] mx-3">&bull;</span></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
