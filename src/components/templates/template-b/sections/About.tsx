import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CAMPUS_IMAGES } from "@/lib/images";

export default function AboutB() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          <div className="lg:col-span-3">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#18181b] leading-tight tracking-tight mb-8">
              A Legacy of Excellence
            </h2>
            <p className="text-base text-[#a1a1aa] leading-[1.8] mb-6">
              Saradha Gangadharan College has been a beacon of quality education in Puducherry
              since 2010, offering a diverse range of undergraduate and postgraduate programmes.
              Our commitment to academic excellence, research, and holistic development has made
              us one of the most sought-after institutions in the region.
            </p>
            <p className="text-base text-[#a1a1aa] leading-[1.8] mb-8">
              With a state-of-the-art campus, dedicated faculty, and a vibrant student community,
              SGC provides an environment that nurtures talent, encourages innovation, and prepares
              students for the challenges of the modern world.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-[#18181b] hover:text-[#6366f1] transition-colors group"
            >
              Learn more about SGC
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="lg:col-span-2">
            <div className="relative border border-[#e4e4e7] rounded-lg aspect-[3/4] overflow-hidden">
              <Image src={CAMPUS_IMAGES.entrance} alt="SGC Campus" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
