import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Shield, BookOpen, Star } from "lucide-react";
import { CAMPUS_IMAGES, PEOPLE_IMAGES } from "@/lib/images";

export default function AboutF() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Image + accreditation */}
          <div>
            <div className="relative rounded-xl overflow-hidden h-[320px] mb-6">
              <Image src={CAMPUS_IMAGES.entrance} alt="SGC Campus" fill className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0d3d28]/80 to-transparent p-5">
                <div className="flex items-center gap-3">
                  {[
                    { icon: Award, label: "NAAC" },
                    { icon: Shield, label: "ISO 9001" },
                    { icon: Star, label: "Autonomous" },
                    { icon: BookOpen, label: "NIRF" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 bg-white/20 backdrop-blur rounded px-3 py-1.5">
                      <Icon className="w-3.5 h-3.5 text-[#d4a843]" />
                      <span className="text-[10px] font-bold text-white">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chairman card */}
            <div className="bg-[#155e3d] rounded-xl p-6 text-white">
              <p className="text-[#d4a843] text-xs font-bold uppercase tracking-wider mb-3">From the Chairman&apos;s Desk</p>
              <blockquote className="italic text-white/85 text-sm leading-relaxed mb-4">
                &ldquo;Education is the most powerful weapon which you can use to change the world.
                At SGC, we are committed to providing an education that transforms lives.&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden relative border-2 border-[#d4a843]/40">
                  <Image src={PEOPLE_IMAGES.chairman} alt="Chairman" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Shri. Saradha Gangadharan</p>
                  <p className="text-white/50 text-xs">Chairman, SGC Trust</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div>
            <span className="inline-block bg-[#155e3d]/10 text-[#155e3d] text-xs font-bold px-3 py-1 rounded mb-3 uppercase tracking-wider">
              About SGC
            </span>
            <h2 className="text-3xl font-bold text-[#155e3d] mb-5 leading-tight">
              Excellence in Education Since 2010
            </h2>
            <p className="text-[#6b6b6b] leading-relaxed mb-4 text-sm">
              Saradha Gangadharan College has been a beacon of quality education in Puducherry,
              offering a diverse range of undergraduate and postgraduate programmes. Our commitment
              to academic excellence, research, and holistic development has made us one of the
              most sought-after institutions in the region.
            </p>
            <p className="text-[#6b6b6b] leading-relaxed mb-6 text-sm">
              With a state-of-the-art campus, dedicated faculty of 79+ experts, and a vibrant
              student community of 1,245+ scholars, SGC provides an environment that nurtures
              talent, encourages innovation, and prepares students for the challenges of the modern world.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { value: "13+", label: "Courses Offered" },
                { value: "79+", label: "Expert Faculty" },
                { value: "1,245+", label: "Students" },
                { value: "1,000+", label: "Placements" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-[#fdf8f0] border border-[#e0d8c8] rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-[#155e3d]">{value}</p>
                  <p className="text-[10px] text-[#6b6b6b] font-medium uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>

            <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-[#155e3d] hover:text-[#0d3d28] transition-colors">
              Learn more about SGC <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
