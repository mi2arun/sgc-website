export default function AboutD() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-8 lg:border-r lg:border-[#d6d3d1] lg:pr-12">
            <span className="text-[11px] tracking-[0.15em] uppercase text-[#b91c1c] font-semibold">
              About
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1a1a1a] leading-tight mt-3 mb-6">
              A Beacon of Excellence in Puducherry
            </h2>

            <div className="drop-cap font-playfair text-base text-[#1a1a1a] leading-[1.9] text-justify mb-6">
              Saradha Gangadharan College has been a beacon of quality education in Puducherry
              since its establishment in 2010, offering a diverse range of undergraduate and postgraduate
              programmes. Our commitment to academic excellence, research, and holistic development
              has made us one of the most sought-after institutions in the region. The college is
              proud to be recognised as an autonomous institution, giving us the freedom to design
              curricula that meet industry standards while nurturing intellectual curiosity.
            </div>

            <p className="font-playfair text-base text-[#1a1a1a] leading-[1.9] text-justify mb-8">
              With state-of-the-art facilities, a dedicated faculty of over 79 experts, and a
              vibrant student community of 1,245 scholars, SGC provides an environment that nurtures
              talent, encourages innovation, and prepares students for the challenges of the modern world.
            </p>

            {/* Chairman quote */}
            <blockquote className="border-l-4 border-[#b91c1c] pl-6 my-8">
              <p className="font-playfair text-lg italic text-[#292524] leading-relaxed">
                &ldquo;Education is the most powerful weapon which you can use to change the world.
                At SGC, we are committed to providing an education that transforms lives and
                builds a better tomorrow.&rdquo;
              </p>
              <footer className="mt-4 text-sm text-[#78716c]">
                &mdash; <strong className="text-[#1a1a1a]">Shri. Saradha Gangadharan</strong>, Chairman, SGC Trust
              </footer>
            </blockquote>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <h3 className="text-[11px] tracking-[0.15em] uppercase text-[#b91c1c] font-semibold mb-6">
              Accreditations
            </h3>
            <div className="divide-y divide-[#d6d3d1]">
              {[
                { label: "NAAC", desc: "Accredited with high grade for quality standards" },
                { label: "ISO 9001:2015", desc: "Certified quality management system" },
                { label: "Autonomous", desc: "Self-governing institution under Pondicherry University" },
                { label: "NIRF", desc: "Ranked in National Institutional Ranking Framework" },
              ].map(({ label, desc }) => (
                <div key={label} className="py-4">
                  <p className="text-sm font-semibold text-[#1a1a1a]">{label}</p>
                  <p className="text-xs text-[#78716c] mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
