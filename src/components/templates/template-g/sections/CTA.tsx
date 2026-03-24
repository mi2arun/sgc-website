import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function CTAG() {
  return (
    <section className="py-24 bg-[#f5f0e8]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-10 bg-[#c45d3e]" />
          <span className="text-xs font-semibold text-[#c45d3e] uppercase tracking-widest">Get Started</span>
          <div className="h-px w-10 bg-[#c45d3e]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#2c2c2c] mb-5 leading-tight">
          Your journey begins here.
        </h2>
        <p className="text-[#7a7a7a] leading-relaxed mb-8 max-w-xl mx-auto">
          Take the first step towards a bright future. Join the SGC family of 1,245+ students,
          79+ faculty, and 1,000+ successful alumni.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/admissions/apply"
            className="group inline-flex items-center gap-2 bg-[#c45d3e] hover:bg-[#a04530] text-white font-semibold px-8 py-4 rounded text-sm transition-colors"
          >
            Apply for Admission <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-[#2c2c2c]/20 hover:border-[#2c2c2c]/40 text-[#2c2c2c] font-medium px-8 py-4 rounded text-sm transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
