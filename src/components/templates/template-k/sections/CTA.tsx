import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { CAMPUS_IMAGES } from "@/lib/images";
import Reveal from "./Reveal";

export default function CTAK() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden">
            <Image src={CAMPUS_IMAGES.classroom} alt="Campus" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c2340]/95 via-[#0c2340]/80 to-[#0c2340]/50" />
            <div className="relative p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="tk-accent-line mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Ready to Begin Your Journey?</h2>
                <p className="text-white/50 leading-relaxed max-w-lg">
                  Take the first step towards a bright future. Apply today and become part of the SGC family.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link href="/admissions/apply" className="group inline-flex items-center justify-center gap-2 bg-[#c9a84c] hover:bg-[#b8963d] text-[#0c2340] font-semibold px-7 py-3.5 rounded-lg text-sm transition-all hover:shadow-xl hover:shadow-[#c9a84c]/20">
                  Apply Now <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <a href={`tel:${SITE_CONFIG.phone}`} className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white/40 text-white font-medium px-7 py-3.5 rounded-lg text-sm transition-colors">
                  <Phone className="w-4 h-4" /> Call Us
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
