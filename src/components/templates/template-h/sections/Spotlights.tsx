import Image from "next/image";
import { PEOPLE_IMAGES } from "@/lib/images";
import { Star, Trophy, Award, Sparkles } from "lucide-react";

const spotlights = [
  {
    title: "Best Teacher Award 2026",
    name: "Dr. Meena Kumari",
    role: "Dept. of Computer Science",
    photo: PEOPLE_IMAGES.student3,
    badge: "Teacher of the Year",
    badgeColor: "bg-[#ea580c]",
    icon: Award,
    description: "Recognized for innovative teaching methods in AI & Machine Learning and outstanding student mentorship.",
    stat: "15+ Publications",
  },
  {
    title: "Best Student Award 2026",
    name: "Arun Prasad",
    role: "B.Sc Computer Science, Final Year",
    photo: PEOPLE_IMAGES.student4,
    badge: "Student of the Year",
    badgeColor: "bg-[#2563eb]",
    icon: Trophy,
    description: "University rank holder, NCC cadet, and founder of the college coding club. Placed at a top IT firm.",
    stat: "University Rank #1",
  },
  {
    title: "Rising Star",
    name: "Divya Sharma",
    role: "M.A English, First Year",
    photo: PEOPLE_IMAGES.student1,
    badge: "Rising Star",
    badgeColor: "bg-[#7c3aed]",
    icon: Sparkles,
    description: "Won the state-level essay competition and published two research papers in national journals.",
    stat: "2 Publications",
  },
];

export default function Spotlights() {
  return (
    <section className="py-10 bg-[#f4f4f5]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 mb-6">
          <Star className="w-5 h-5 text-[#ea580c]" />
          <h2 className="text-xl font-bold text-[#18181b]">Spotlight</h2>
          <span className="text-xs text-[#71717a]">Best Teacher, Best Student & Achievers</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {spotlights.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.name} className="bg-white rounded-xl border border-[#e4e4e7] overflow-hidden hover:shadow-lg transition-shadow group">
                {/* Top colored strip */}
                <div className={`h-1.5 ${s.badgeColor}`} />
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 border-[#e4e4e7]">
                      <Image src={s.photo} alt={s.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`inline-flex items-center gap-1 ${s.badgeColor} text-white text-[9px] font-bold px-2 py-0.5 rounded mb-1.5`}>
                        <Icon className="w-3 h-3" /> {s.badge}
                      </span>
                      <h3 className="font-bold text-[#18181b] text-sm">{s.name}</h3>
                      <p className="text-[11px] text-[#71717a]">{s.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#71717a] leading-relaxed mt-3 line-clamp-3">{s.description}</p>
                  <div className="mt-3 pt-3 border-t border-[#e4e4e7] flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-[#2563eb] bg-[#2563eb]/5 px-2 py-0.5 rounded">{s.stat}</span>
                    <span className="text-[10px] text-[#71717a]">{s.title}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
