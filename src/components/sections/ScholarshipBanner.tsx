import Link from "next/link";
import { SCHOLARSHIPS } from "@/lib/constants";
import { GraduationCap, ArrowRight } from "lucide-react";

type Props = {
  title?: string;
  description?: string;
  items?: typeof SCHOLARSHIPS;
  ctaLabel?: string;
  ctaLink?: string;
};

export default function ScholarshipBanner({ title, description, items, ctaLabel, ctaLink }: Props) {
  const data = items || SCHOLARSHIPS;
  return (
    <section className="py-16 bg-gradient-to-br from-[#1e3a5f] to-[#15294a] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#c8a951] rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-white rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#c8a951]/20 px-4 py-1.5 rounded-full mb-4">
            <GraduationCap className="w-4 h-4 text-[#c8a951]" />
            <span className="text-xs font-semibold text-[#c8a951] uppercase tracking-wider">
              Financial Aid
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title || "Scholarships & Financial Aid"}</h2>
          <p className="text-white/60 text-sm max-w-xl mx-auto">
            {description || "We believe financial constraints should never be a barrier to quality education."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((item, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-[#c8a951]/40 transition-colors"
            >
              <h3 className="font-bold text-sm mb-2">{item.name}</h3>
              <p className="text-[#c8a951] font-semibold text-lg mb-2">{item.amount}</p>
              <p className="text-white/50 text-xs">{item.eligibility}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href={ctaLink || "/admissions/scholarships"}
            className="inline-flex items-center gap-2 bg-[#c8a951] text-[#1e3a5f] px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#d4b85c] transition-colors"
          >
            {ctaLabel || "View All Scholarships"} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
