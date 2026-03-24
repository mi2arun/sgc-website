import { Award, Users, Building2, Lightbulb, HeartHandshake, Globe } from "lucide-react";

const reasons = [
  { icon: Award, title: "NAAC Accredited", desc: "Recognized for quality education standards by the National Assessment and Accreditation Council." },
  { icon: Users, title: "Expert Faculty", desc: "79+ experienced faculty committed to student success through mentorship and guidance." },
  { icon: Building2, title: "Modern Campus", desc: "State-of-the-art laboratories, smart classrooms, digital library, and sports complex." },
  { icon: Lightbulb, title: "Research Focus", desc: "Dedicated research fund, incentive schemes, and innovation programmes for scholars." },
  { icon: HeartHandshake, title: "Industry Ties", desc: "Strong MoUs with leading companies ensuring real-world exposure and placements." },
  { icon: Globe, title: "Holistic Growth", desc: "NCC, NSS, clubs, cultural festivals, and sports for all-round development." },
];

export default function WhyJoinG() {
  return (
    <section className="py-24 bg-[#f5f0e8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#c45d3e]" />
            <span className="text-xs font-semibold text-[#c45d3e] uppercase tracking-widest">Why SGC</span>
            <div className="h-px w-10 bg-[#c45d3e]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2c2c2c]">Why Choose SGC?</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group bg-white rounded-xl p-7 border border-[#e2ddd4] hover:border-[#c45d3e]/20 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-lg bg-[#c45d3e]/5 flex items-center justify-center mb-5 group-hover:bg-[#c45d3e] transition-colors">
                <Icon className="w-6 h-6 text-[#c45d3e] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-[#2c2c2c] mb-2">{title}</h3>
              <p className="text-sm text-[#7a7a7a] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
