const reasons = [
  { title: "NAAC Accredited", description: "Recognized for quality education standards by the National Assessment and Accreditation Council." },
  { title: "Expert Faculty", description: "Learn from 79+ experienced faculty members committed to your academic and professional growth." },
  { title: "Modern Infrastructure", description: "State-of-the-art laboratories, smart classrooms, a well-stocked library, and sports facilities." },
  { title: "Research Opportunities", description: "Dedicated research fund, incentive schemes, and innovation programmes for aspiring researchers." },
  { title: "Industry Connect", description: "Strong partnerships with leading companies ensuring internship and placement opportunities." },
  { title: "Holistic Development", description: "NCC, NSS, clubs, cultural events, and sports for all-round personality development." },
];

export default function WhyJoinB() {
  return (
    <section className="py-32 px-6 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold text-[#18181b] tracking-tight mb-16">
          Why SGC
        </h2>

        <div className="grid md:grid-cols-3 gap-x-12 gap-y-14">
          {reasons.map(({ title, description }, i) => (
            <div key={title} className="relative">
              {/* Vertical divider on md+ */}
              {i % 3 !== 0 && (
                <div className="hidden md:block absolute -left-6 top-0 bottom-0 w-px bg-[#e4e4e7]" />
              )}
              <h3 className="text-base font-semibold text-[#18181b] mb-3">{title}</h3>
              <p className="text-sm text-[#a1a1aa] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
