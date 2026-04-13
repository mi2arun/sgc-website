import { Building2 } from "lucide-react";

type Props = {
  companies?: { name: string }[] | string[];
  title?: string;
};

export default function RecruiterLogos({ companies: companiesProp, title }: Props) {
  const data = companiesProp
    ? companiesProp.map((c) => (typeof c === "string" ? c : c.name))
    : [];
  if (data.length === 0) return null;
  return (
    <section className="py-10 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Building2 className="w-5 h-5 text-[#c8a951]" />
          <h2 className="text-sm font-semibold text-[#1e3a5f] uppercase tracking-wider">
            {title || "Our Recruiters"}
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10" />

          <div className="flex animate-scroll">
            {[...data, ...data].map((name, i) => (
              <div
                key={i}
                className="shrink-0 mx-4 px-6 py-3 bg-white rounded-lg border border-gray-200 hover:border-[#c8a951] transition-colors"
              >
                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
