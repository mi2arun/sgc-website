import Image from "next/image";
import { Award, Users, Building2, Lightbulb, HeartHandshake, Globe } from "lucide-react";
import { CAMPUS_IMAGES } from "@/lib/images";

const reasons = [
  { icon: Award, title: "NAAC Accredited", desc: "Recognized by NAAC for quality education standards" },
  { icon: Users, title: "79+ Expert Faculty", desc: "Experienced and qualified teaching professionals" },
  { icon: Building2, title: "Modern Infrastructure", desc: "Labs, smart classrooms, library, and sports" },
  { icon: Lightbulb, title: "Research & Innovation", desc: "Dedicated research fund and incentive schemes" },
  { icon: HeartHandshake, title: "Industry Connect", desc: "MoUs with leading companies for placements" },
  { icon: Globe, title: "Holistic Development", desc: "NCC, NSS, clubs, cultural and sports activities" },
];

export default function WhyJoinF() {
  return (
    <section className="py-16 bg-[#155e3d] relative overflow-hidden">
      {/* Background image */}
      <Image src={CAMPUS_IMAGES.grounds} alt="Campus" fill className="object-cover opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#d4a843]/20 text-[#d4a843] text-xs font-bold px-3 py-1 rounded mb-3 uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl font-bold text-white mb-3">Why Join SGC?</h2>
          <p className="text-sm text-white/60 max-w-xl mx-auto">
            Discover what makes Saradha Gangadharan College the right choice for your academic journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group bg-white/10 backdrop-blur border border-white/10 rounded-lg p-6 hover:bg-white/15 transition-all">
              <div className="w-12 h-12 bg-[#d4a843]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#d4a843]/30 transition-colors">
                <Icon className="w-6 h-6 text-[#d4a843]" />
              </div>
              <h3 className="font-bold text-white text-sm mb-1">{title}</h3>
              <p className="text-xs text-white/60 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
