import { Shield, ExternalLink } from "lucide-react";

const banners = [
  { label: "NAAC Accreditation", tag: "Accredited", color: "bg-[#2563eb]" },
  { label: "UGC Recognition", tag: "Recognized", color: "bg-[#7c3aed]" },
  { label: "NIRF Ranking 2026", tag: "Ranked", color: "bg-[#16a34a]" },
  { label: "AICTE Approved", tag: "Approved", color: "bg-[#ea580c]" },
  { label: "ISO 9001:2015", tag: "Certified", color: "bg-[#0891b2]" },
  { label: "Autonomous Status", tag: "Granted", color: "bg-[#dc2626]" },
  { label: "NAAC Accreditation", tag: "Accredited", color: "bg-[#2563eb]" },
  { label: "UGC Recognition", tag: "Recognized", color: "bg-[#7c3aed]" },
  { label: "NIRF Ranking 2026", tag: "Ranked", color: "bg-[#16a34a]" },
  { label: "AICTE Approved", tag: "Approved", color: "bg-[#ea580c]" },
  { label: "ISO 9001:2015", tag: "Certified", color: "bg-[#0891b2]" },
  { label: "Autonomous Status", tag: "Granted", color: "bg-[#dc2626]" },
];

export default function GovBanners() {
  return (
    <div className="bg-[#18181b] overflow-hidden">
      <div className="th-banner-scroll flex items-center h-9 whitespace-nowrap">
        {banners.map((b, i) => (
          <span key={i} className="inline-flex items-center gap-2 mx-6 text-xs text-white/70">
            <Shield className="w-3 h-3 text-white/40" />
            <span className={`${b.color} text-white text-[9px] font-bold px-1.5 py-0.5 rounded`}>{b.tag}</span>
            {b.label}
          </span>
        ))}
      </div>
    </div>
  );
}
