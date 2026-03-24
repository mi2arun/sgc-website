const testimonials = [
  { name: "Priya Lakshmi", batch: "B.Sc Computer Science, 2024", quote: "SGC gave me the platform to grow both academically and personally. The faculty mentorship and placement support helped me secure a position at a top IT company." },
  { name: "Rajesh Kumar", batch: "B.Com, 2023", quote: "The commerce department at SGC is exceptional. The practical exposure through industry visits and guest lectures prepared me well for the corporate world." },
  { name: "Anitha Devi", batch: "M.A English, 2024", quote: "Pursuing my post-graduation at SGC was the best decision. The research opportunities and library resources are outstanding." },
];

export default function TestimonialsD() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <span className="text-[11px] tracking-[0.15em] uppercase text-[#b91c1c] font-semibold">
          Voices
        </span>
        <h2 className="font-playfair text-3xl font-bold text-[#1a1a1a] mt-3 mb-10">
          What Our Alumni Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:divide-x md:divide-[#d6d3d1]">
          {testimonials.map((t, i) => (
            <div key={i} className={`${i > 0 ? "md:pl-8" : ""} ${i < testimonials.length - 1 ? "md:pr-8" : ""} py-4 md:py-0`}>
              <span className="font-playfair text-6xl text-[#b91c1c]/20 leading-none">&ldquo;</span>
              <blockquote className="font-playfair text-base italic text-[#292524] leading-relaxed -mt-4 mb-6">
                {t.quote}
              </blockquote>
              <p className="text-[11px] tracking-[0.1em] uppercase text-[#1a1a1a] font-semibold">{t.name}</p>
              <p className="text-xs text-[#78716c] mt-0.5">{t.batch}</p>
            </div>
          ))}
        </div>

        <div className="h-px bg-[#d6d3d1] mt-10" />
      </div>
    </section>
  );
}
