import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";

type Props = {
  title?: string;
  description?: string;
  items?: { name: string; amount: string; eligibility: string }[];
  ctaLabel?: string;
  ctaLink?: string;
};

export default function ScholarshipBanner({ title, description, items, ctaLabel, ctaLink }: Props) {
  const data = items || [];
  if (data.length === 0) return null;
  return (
    <section id="scholarships" className="py-16 bg-gradient-to-br from-[#1c4c9c] to-[#143a78] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#f5c220] rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-white rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#f5c220]/20 px-4 py-1.5 rounded-full mb-4">
            <GraduationCap className="w-4 h-4 text-[#f5c220]" />
            <span className="text-xs font-semibold text-[#f5c220] uppercase tracking-wider">
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
              className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-[#f5c220]/40 transition-colors"
            >
              <h3 className="font-bold text-sm mb-2">{item.name}</h3>
              <p className="text-[#f5c220] font-semibold text-lg mb-2">{item.amount}</p>
              <p className="text-white/50 text-xs">{item.eligibility}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href={ctaLink || "/admissions/scholarships"}
            className="inline-flex items-center gap-2 bg-[#f5c220] text-[#1c4c9c] px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#d4a017] transition-colors"
          >
            {ctaLabel || "View All Scholarships"} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
