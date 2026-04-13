import { Award, Users, Building2, Lightbulb, HeartHandshake, Globe } from "lucide-react";

const defaultReasons = [
  {
    icon: Award,
    title: "NAAC Accredited",
    description: "Recognized by the National Assessment and Accreditation Council for quality education standards.",
  },
  {
    icon: Users,
    title: "Expert Faculty",
    description: "Learn from 79+ experienced and qualified faculty members dedicated to student success.",
  },
  {
    icon: Building2,
    title: "Modern Infrastructure",
    description: "State-of-the-art laboratories, library, smart classrooms, and sports facilities on campus.",
  },
  {
    icon: Lightbulb,
    title: "Research Opportunities",
    description: "Dedicated research fund, incentive schemes, and innovation programmes for aspiring researchers.",
  },
  {
    icon: HeartHandshake,
    title: "Industry Connect",
    description: "Strong MoUs with leading companies ensuring internships, projects, and placement opportunities.",
  },
  {
    icon: Globe,
    title: "Holistic Development",
    description: "NCC, NSS, clubs, cultural events, and sports activities for all-round personality development.",
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award, Users, Building2, Lightbulb, HeartHandshake, Globe,
};

type Props = {
  title?: string;
  reasons?: { icon?: string; heading: string; description?: string }[];
};

export default function WhyJoinSection({ title, reasons: reasonsProp }: Props) {
  const reasons = reasonsProp
    ? reasonsProp.map((r) => ({
        icon: iconMap[r.icon || ""] || Award,
        title: r.heading,
        description: r.description || "",
      }))
    : defaultReasons;
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{title || "Why Join SGC?"}</h2>
          <p className="text-muted max-w-2xl mx-auto">
            Discover what makes Saradha Gangadharan College the right choice for your academic journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group relative bg-secondary hover:bg-white rounded-xl p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-primary/10"
            >
              <div className="w-14 h-14 bg-primary/5 group-hover:bg-primary rounded-xl flex items-center justify-center mb-5 transition-colors">
                <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
