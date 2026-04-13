import { ACCREDITATIONS } from "@/lib/constants";
import { Award, ShieldCheck, BadgeCheck, Trophy, Star } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  NAAC: Trophy,
  UGC: ShieldCheck,
  ISO: BadgeCheck,
  NIRF: Star,
  AUTONOMOUS: Award,
};

type Props = {
  items?: typeof ACCREDITATIONS;
};

export default function AccreditationStrip({ items }: Props) {
  const data = items || ACCREDITATIONS;
  return (
    <section className="py-12 bg-gradient-to-b from-[#f8f6f0] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="h-px w-12 bg-[#c8a951]" />
          <h2 className="text-sm font-semibold text-[#1e3a5f] uppercase tracking-[0.15em]">
            Accreditations & Recognition
          </h2>
          <div className="h-px w-12 bg-[#c8a951]" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {data.map((item) => {
            const Icon = iconMap[item.name] || Award;
            return (
              <div
                key={item.name}
                className="relative bg-white rounded-2xl border border-gray-200 p-5 text-center hover:border-[#c8a951] hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-[#1e3a5f] flex items-center justify-center group-hover:bg-[#c8a951] transition-colors">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-base font-bold text-[#1e3a5f]">{item.name}</h3>
                {item.grade && (
                  <span className="inline-block mt-1 px-2.5 py-0.5 bg-[#c8a951]/15 text-[#8b6914] text-xs font-semibold rounded-full">
                    {item.grade}
                  </span>
                )}
                <p className="text-[11px] text-gray-500 mt-2 leading-snug">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
