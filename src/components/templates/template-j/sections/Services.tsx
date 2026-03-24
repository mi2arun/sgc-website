import { Award, TrendingUp, HeartHandshake, Lightbulb, Building2, Globe } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const services = [
  { icon: Award, title: "Academic Excellence", desc: "NAAC A+ accredited curriculum designed for industry relevance and intellectual growth." },
  { icon: TrendingUp, title: "Career Development", desc: "92% placement rate with 50+ recruiting companies across sectors." },
  { icon: HeartHandshake, title: "Student Support", desc: "10+ cells and committees ensuring student welfare, grievance redressal, and equal opportunity." },
  { icon: Lightbulb, title: "Research & Innovation", desc: "Dedicated research fund, incentive schemes, IIC activities, and innovation policy." },
  { icon: Building2, title: "Modern Infrastructure", desc: "Smart classrooms, digital library, advanced labs, and sports complex." },
  { icon: Globe, title: "Holistic Campus Life", desc: "NCC, NSS, Rotaract, cultural festivals, tech fests, and community service." },
];

export default function ServicesJ() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">Why Choose SGC?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1e40af] to-[#4f46e5] mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <ScrollReveal key={title} delay={i * 100}>
              <div className="text-center group">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1e40af] to-[#4f46e5] flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-[#1e40af]/20 transition-all">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-2">{title}</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
