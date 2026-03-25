import Link from "next/link";
import { FileText, CreditCard, Download, ClipboardList } from "lucide-react";
import Reveal from "./Reveal";

const actions = [
  { icon: FileText, label: "Apply Online", desc: "Submit your application", href: "/admissions/apply", gradient: "from-[#0c2340] to-[#163a5f]" },
  { icon: CreditCard, label: "Pay Fees", desc: "Online fee payment", href: "/admissions/fees", gradient: "from-[#163a5f] to-[#1e5082]" },
  { icon: Download, label: "Prospectus", desc: "Download prospectus", href: "/admissions/prospectus", gradient: "from-[#c9a84c] to-[#b8963d]" },
  { icon: ClipboardList, label: "Exam Results", desc: "Check results", href: "/examination/results", gradient: "from-[#1e5082] to-[#0c2340]" },
];

export default function QuickAccessK() {
  return (
    <section className="relative z-10 -mt-14 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {actions.map(({ icon: Icon, label, desc, href, gradient }, i) => (
            <Reveal key={label} delay={i * 80}>
              <Link href={href} className="group flex items-center gap-4 bg-white rounded-xl p-4 md:p-5 shadow-xl shadow-black/5 border border-[#e8e4dc]/50 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1 transition-all">
                <div className={`w-11 h-11 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a1a2e] text-sm">{label}</h3>
                  <p className="text-[10px] text-[#5f6980] mt-0.5 hidden sm:block">{desc}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
