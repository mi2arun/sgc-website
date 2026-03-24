import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CAMPUS_IMAGES, PEOPLE_IMAGES } from "@/lib/images";

export default function AboutG() {
  return (
    <section className="py-24 bg-[#f5f0e8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left — Text */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-[#c45d3e]" />
              <span className="text-xs font-semibold text-[#c45d3e] uppercase tracking-widest">About SGC</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2c2c2c] leading-tight mb-6">
              A Tradition of Excellence Since 2010
            </h2>
            <p className="text-[#7a7a7a] leading-[1.8] mb-5">
              Saradha Gangadharan College has been a beacon of quality education in Puducherry,
              offering a diverse range of undergraduate and postgraduate programmes. Our commitment
              to academic excellence, research, and holistic development has made us one of the
              most sought-after institutions in the region.
            </p>

            {/* Chairman quote */}
            <div className="border-l-[3px] border-[#c45d3e] pl-5 my-8">
              <p className="text-[#2c2c2c] italic leading-relaxed mb-3">
                &ldquo;At SGC, we are committed to providing an education that transforms lives
                and builds a better tomorrow.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden relative">
                  <Image src={PEOPLE_IMAGES.chairman} alt="Chairman" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#2c2c2c]">Shri. Saradha Gangadharan</p>
                  <p className="text-xs text-[#7a7a7a]">Chairman</p>
                </div>
              </div>
            </div>

            <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-[#c45d3e] hover:text-[#a04530] transition-colors group">
              Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Right — Image mosaic */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden h-48">
                  <Image src={CAMPUS_IMAGES.entrance} alt="Campus entrance" fill className="object-cover" />
                </div>
                <div className="relative rounded-lg overflow-hidden h-64">
                  <Image src={CAMPUS_IMAGES.library} alt="Library" fill className="object-cover" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative rounded-lg overflow-hidden h-64">
                  <Image src={CAMPUS_IMAGES.classroom} alt="Classroom" fill className="object-cover" />
                </div>
                <div className="relative rounded-lg overflow-hidden h-48">
                  <Image src={CAMPUS_IMAGES.lab} alt="Lab" fill className="object-cover" />
                </div>
              </div>
            </div>
            {/* Accreditation strip */}
            <div className="flex flex-wrap gap-3 mt-6 justify-center">
              {["NAAC Accredited", "ISO 9001:2015", "Autonomous", "NIRF Ranked"].map((badge) => (
                <span key={badge} className="text-[10px] font-semibold uppercase tracking-wider text-[#5a7a64] bg-[#5a7a64]/10 px-3 py-1.5 rounded-full">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
