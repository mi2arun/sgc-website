import Link from "next/link";
import { FileText, CreditCard, Download, ClipboardList, BookOpen, Users } from "lucide-react";

const links = [
  { icon: FileText, label: "Apply Online", href: "/admissions/apply", color: "bg-[#7c1d3e]" },
  { icon: CreditCard, label: "Pay Fees", href: "/admissions/fees", color: "bg-[#155e3d]" },
  { icon: Download, label: "Prospectus", href: "/admissions/prospectus", color: "bg-[#d4a843]" },
  { icon: ClipboardList, label: "Exam Results", href: "/examination/results", color: "bg-[#155e3d]" },
  { icon: BookOpen, label: "E-Resources", href: "/academics/library", color: "bg-[#7c1d3e]" },
  { icon: Users, label: "Alumni", href: "/alumni", color: "bg-[#d4a843]" },
];

export default function QuickLinks() {
  return (
    <section className="py-6 bg-[#fdf8f0]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {links.map(({ icon: Icon, label, href, color }) => (
            <Link
              key={label}
              href={href}
              className="group flex flex-col items-center gap-2 bg-white rounded-lg p-4 border border-[#e0d8c8] hover:border-[#155e3d]/30 hover:shadow-md transition-all text-center"
            >
              <div className={`${color} w-11 h-11 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-semibold text-[#2d2d2d]">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
