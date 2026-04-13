import Link from "next/link";
import { COMPLIANCE_LINKS } from "@/lib/constants";
import {
  ClipboardCheck, Award, BarChart3, FileText, Shield,
  MessageCircle, Users, FileCheck, Building, GraduationCap,
  MessageSquare, Download,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ClipboardCheck, Award, BarChart3, FileText, Shield,
  MessageCircle, Users, FileCheck, Building, GraduationCap,
  MessageSquare, Download,
};

type Props = {
  links?: typeof COMPLIANCE_LINKS;
  title?: string;
};

export default function ComplianceLinks({ links, title }: Props) {
  const data = links || COMPLIANCE_LINKS;
  return (
    <section className="py-12 bg-[#f8f6f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-semibold text-[#1e3a5f] uppercase tracking-wider mb-8">
          {title || "Important Links & Compliance"}
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {data.map((item) => {
            const Icon = iconMap[item.icon] || FileText;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-200 hover:border-[#c8a951] hover:shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#1e3a5f]/5 flex items-center justify-center mb-2 group-hover:bg-[#1e3a5f] transition-colors">
                  <Icon className="w-5 h-5 text-[#1e3a5f] group-hover:text-[#c8a951] transition-colors" />
                </div>
                <span className="text-xs font-medium text-gray-700 leading-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
