import {
  GraduationCap,
  Users,
  Building2,
  Award,
  BookOpenCheck,
  Rocket,
} from "lucide-react";

const reasons = [
  {
    icon: GraduationCap,
    title: "Autonomous Excellence",
    description:
      "Freedom to design industry-relevant curricula and adopt innovative teaching methodologies.",
  },
  {
    icon: Users,
    title: "Expert Faculty",
    description:
      "79+ experienced educators dedicated to research, mentorship, and student success.",
  },
  {
    icon: Building2,
    title: "Modern Infrastructure",
    description:
      "State-of-the-art labs, smart classrooms, and digital library with 24/7 access.",
  },
  {
    icon: Award,
    title: "NAAC A+ Accredited",
    description:
      "Nationally recognized for maintaining the highest academic and operational standards.",
  },
  {
    icon: BookOpenCheck,
    title: "Holistic Learning",
    description:
      "Beyond textbooks — clubs, sports, cultural fests, NCC, NSS, and community service.",
  },
  {
    icon: Rocket,
    title: "Career Launchpad",
    description:
      "92% placement rate with top recruiters in IT, banking, management, and more.",
  },
];

export default function WhyJoin() {
  return (
    <section className="py-24 px-6 bg-[#0f0a1e] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            Why SGC
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Why Students{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Choose Us
            </span>
          </h2>
        </div>

        {/* 3x2 grid of glass cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-7 hover:bg-white/10 transition-all duration-300"
              >
                <div className="mb-5 inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{reason.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
