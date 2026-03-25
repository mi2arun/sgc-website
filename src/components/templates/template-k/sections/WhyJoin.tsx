import { Award, Users, Building2, Lightbulb, HeartHandshake, Globe } from "lucide-react";
import Reveal from "./Reveal";

const reasons = [
  { icon: Award, title: "NAAC Accredited", desc: "Recognized by NAAC for quality education standards and institutional excellence." },
  { icon: Users, title: "Expert Faculty", desc: "79+ experienced educators dedicated to research, mentorship, and student success." },
  { icon: Building2, title: "Modern Infrastructure", desc: "Smart classrooms, digital library, advanced laboratories, and sports complex." },
  { icon: Lightbulb, title: "Research & Innovation", desc: "Dedicated research fund, incentive schemes, and innovation programmes." },
  { icon: HeartHandshake, title: "Industry Connect", desc: "Strong MoUs with leading companies for internships and placements." },
  { icon: Globe, title: "Holistic Development", desc: "NCC, NSS, clubs, cultural festivals, and sports for all-round growth." },
];

export default function WhyJoinK() {
  return (
    <section className="py-24 bg-[#faf8f3]">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <div className="tk-accent-line" />
              <span className="text-xs font-bold text-[#c9a84c] uppercase tracking-widest">Why Choose Us</span>
              <div className="tk-accent-line" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0c2340]">Why Join SGC?</h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 80} direction="scale">
              <div className="group bg-white rounded-xl p-7 border border-[#e8e4dc] tk-card-hover">
                <div className="w-13 h-13 bg-[#0c2340]/5 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#0c2340] transition-colors w-[52px] h-[52px]">
                  <Icon className="w-6 h-6 text-[#0c2340] group-hover:text-[#c9a84c] transition-colors" />
                </div>
                <h3 className="font-bold text-[#1a1a2e] mb-2">{title}</h3>
                <p className="text-sm text-[#5f6980] leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
