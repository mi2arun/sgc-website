import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { CAMPUS_IMAGES } from "@/lib/images";

export default function CTAF() {
  return (
    <section className="py-16 bg-[#fdf8f0]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden">
          <Image src={CAMPUS_IMAGES.classroom} alt="Classroom" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d3d28]/95 via-[#0d3d28]/85 to-[#0d3d28]/60" />

          <div className="relative p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-white/70 text-sm leading-relaxed max-w-lg">
                Take the first step towards a bright future. Apply for admission today and become
                a part of the SGC family.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/admissions/apply"
                className="inline-flex items-center justify-center gap-2 bg-[#d4a843] hover:bg-[#c49a35] text-[#0d3d28] font-semibold px-7 py-3.5 rounded text-sm transition-colors"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/50 text-white font-medium px-7 py-3.5 rounded text-sm transition-colors"
              >
                <Phone className="w-4 h-4" /> Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
