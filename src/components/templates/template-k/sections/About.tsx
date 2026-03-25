import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Shield, BookOpen } from "lucide-react";
import { CAMPUS_IMAGES, PEOPLE_IMAGES } from "@/lib/images";
import Reveal from "./Reveal";

export default function AboutK() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <Reveal direction="left">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="tk-accent-line-animated" />
                <span className="text-xs font-bold text-[#c9a84c] uppercase tracking-widest">Welcome to SGC</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0c2340] mb-6 leading-tight">
                Excellence in Education Since 2010
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-[#5f6980] leading-[1.8] mb-4">
                Saradha Gangadharan College has been a beacon of quality education in Puducherry,
                offering a diverse range of programmes. Our commitment to academic excellence,
                research, and holistic development has made us one of the most sought-after institutions.
              </p>
              <p className="text-[#5f6980] leading-[1.8] mb-8">
                With state-of-the-art facilities, 79+ expert faculty, and 1,245+ students,
                SGC provides an environment that nurtures talent and prepares students for the modern world.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: Award, label: "NAAC Accredited" },
                  { icon: Shield, label: "ISO 9001:2015" },
                  { icon: BookOpen, label: "Autonomous" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 bg-[#faf8f3] border border-[#e8e4dc] rounded-full px-4 py-2">
                    <Icon className="w-4 h-4 text-[#c9a84c]" />
                    <span className="text-xs font-semibold text-[#0c2340]">{label}</span>
                  </div>
                ))}
              </div>
              <Link href="/about" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#0c2340] hover:text-[#163a5f] transition-colors">
                Learn more about SGC <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Reveal>
          </div>

          {/* Right — Chairman card */}
          <Reveal delay={200}>
            <div className="relative">
              {/* Campus image */}
              <div className="tk-img-zoom rounded-2xl overflow-hidden h-[250px] mb-5 relative">
                <Image src={CAMPUS_IMAGES.building} alt="Campus" fill className="object-cover" />
              </div>
              {/* Chairman card */}
              <div className="bg-gradient-to-br from-[#0c2340] to-[#163a5f] rounded-2xl p-7 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a84c]/10 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="tk-accent-line mb-4" />
                  <p className="text-xs font-bold text-[#c9a84c] uppercase tracking-widest mb-3">From the Chairman&apos;s Desk</p>
                  <blockquote className="text-white/80 italic leading-relaxed mb-5">
                    &ldquo;Education is the most powerful weapon to change the world. At SGC, we transform lives and build a better tomorrow.&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden relative border-2 border-[#c9a84c]/30">
                      <Image src={PEOPLE_IMAGES.chairman} alt="Chairman" fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Shri. Saradha Gangadharan</p>
                      <p className="text-white/40 text-xs">Chairman, SGC Trust</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
