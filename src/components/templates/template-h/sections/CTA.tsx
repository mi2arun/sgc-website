import Link from "next/link";
import { ArrowRight, Phone, FileText, CreditCard, ClipboardList } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const actions = [
  { icon: FileText, label: "Apply Online", href: "/admissions/apply", color: "bg-[#2563eb]" },
  { icon: CreditCard, label: "Pay Fees", href: "/admissions/fees", color: "bg-[#16a34a]" },
  { icon: ClipboardList, label: "Exam Results", href: "/examination", color: "bg-[#ea580c]" },
  { icon: Phone, label: "Contact Us", href: "/contact", color: "bg-[#7c3aed]" },
];

export default function CTAH() {
  return (
    <section className="py-10 bg-[#f4f4f5]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] rounded-2xl p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to start your journey?</h2>
              <p className="text-white/60 text-sm mb-6">
                Join 1,245+ students and 79+ faculty at SGC. Apply for the 2026-27 academic year.
              </p>
              <Link href="/admissions/apply" className="inline-flex items-center gap-2 bg-white text-[#2563eb] font-semibold px-6 py-3 rounded-lg text-sm hover:bg-white/90 transition-colors">
                Start Application <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {actions.map(({ icon: Icon, label, href, color }) => (
                <Link key={label} href={href} className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur rounded-xl p-3.5 transition-colors">
                  <div className={`w-9 h-9 ${color} rounded-lg flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-white">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
