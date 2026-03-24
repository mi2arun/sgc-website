import Image from "next/image";
import Link from "next/link";
import { EVENTS, NEWS } from "@/lib/constants";
import { CAMPUS_IMAGES } from "@/lib/images";
import { ArrowRight } from "lucide-react";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function HeroD() {
  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Lead Story */}
          <div className="lg:col-span-8 lg:border-r lg:border-[#d6d3d1] lg:pr-12">
            <span className="text-[11px] tracking-[0.15em] uppercase text-[#b91c1c] font-semibold">
              Admissions
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-[1.1] mt-3 mb-5">
              Admissions Open for 2026-27 Academic Year
            </h2>
            <p className="font-playfair text-lg md:text-xl italic text-[#78716c] leading-relaxed mb-6 max-w-2xl">
              Choose from 13 programmes across Science, Arts, Commerce, and Technology at one
              of Puducherry&apos;s leading autonomous institutions.
            </p>
            {/* Featured image */}
            <div className="relative w-full h-48 md:h-64 rounded-sm overflow-hidden mb-6">
              <Image src={CAMPUS_IMAGES.building} alt="SGC Campus" fill className="object-cover" />
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/admissions/apply"
                className="inline-flex items-center gap-2 text-sm text-[#b91c1c] hover:text-[#991b1b] font-medium transition-colors"
              >
                Apply Now <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/admissions/prospectus"
                className="inline-flex items-center gap-2 text-sm text-[#78716c] hover:text-[#b91c1c] transition-colors"
              >
                View Prospectus <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-8 pt-6 border-t border-[#d6d3d1] flex flex-wrap gap-x-6 gap-y-1 text-sm text-[#78716c]">
              <span>13 Courses</span>
              <span>&middot;</span>
              <span>79 Faculty</span>
              <span>&middot;</span>
              <span>1,245 Students</span>
              <span>&middot;</span>
              <span>1,000+ Placed</span>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Flash News */}
            <div className="mb-8">
              <h3 className="text-[11px] tracking-[0.15em] uppercase text-[#b91c1c] font-semibold mb-4">
                Latest News
              </h3>
              <div className="divide-y divide-[#d6d3d1]">
                {NEWS.slice(0, 4).map((item, i) => (
                  <div key={i} className="py-3">
                    <p className="text-xs text-[#78716c] mb-1">{formatDate(item.date)}</p>
                    <p className="text-sm font-medium text-[#1a1a1a] leading-snug hover:text-[#b91c1c] cursor-pointer transition-colors">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="border-t border-[#d6d3d1] pt-6">
              <h3 className="text-[11px] tracking-[0.15em] uppercase text-[#b91c1c] font-semibold mb-4">
                Quick Links
              </h3>
              <div className="space-y-2">
                {["Apply Online", "Fee Payment", "Prospectus", "Exam Results"].map((label) => (
                  <Link key={label} href="#" className="block text-sm text-[#78716c] hover:text-[#b91c1c] transition-colors">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="h-px bg-[#d6d3d1] mt-10" />
      </div>
    </section>
  );
}
