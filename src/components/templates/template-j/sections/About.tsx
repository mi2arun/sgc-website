import Image from "next/image";
import Link from "next/link";
import { Users, Award, Rocket, Heart, ArrowRight } from "lucide-react";
import { CAMPUS_IMAGES, PEOPLE_IMAGES } from "@/lib/images";
import ScrollReveal from "./ScrollReveal";

const pillars = [
  { icon: Users, title: "79+ Expert Faculty", desc: "Experienced educators dedicated to student success" },
  { icon: Award, title: "NAAC A+ Grade", desc: "Nationally recognized for academic excellence" },
  { icon: Rocket, title: "Innovation Focus", desc: "Research centres and startup incubation" },
  { icon: Heart, title: "Holistic Growth", desc: "NCC, NSS, clubs, sports, and cultural events" },
];

export default function AboutJ() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">About SGC</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1e40af] to-[#4f46e5] mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Left — Image with tilted gradient border */}
          <ScrollReveal delay={100}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1e40af] to-[#4f46e5] rounded-2xl transform rotate-3" />
              <div className="relative rounded-2xl overflow-hidden h-[350px]">
                <Image src={CAMPUS_IMAGES.building} alt="SGC Campus" fill className="object-cover" />
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Text + pillars */}
          <div>
            <ScrollReveal delay={200}>
              <p className="text-lg text-[#6b7280] leading-relaxed mb-6">
                Saradha Gangadharan College has been a beacon of quality education in Puducherry since 2010,
                offering diverse undergraduate and postgraduate programmes. Our commitment to academic excellence,
                research, and holistic development makes us one of the most sought-after institutions in the region.
              </p>
            </ScrollReveal>

            {/* Pillar grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {pillars.map(({ icon: Icon, title, desc }, i) => (
                <ScrollReveal key={title} delay={300 + i * 100}>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <Icon className="w-6 h-6 text-[#1e40af] mb-2" />
                    <p className="font-semibold text-sm text-[#111827]">{title}</p>
                    <p className="text-xs text-[#6b7280] mt-0.5">{desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={700}>
              <Link href="/about" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#1e40af] hover:text-[#3730a3] transition-colors">
                Learn more about SGC <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
