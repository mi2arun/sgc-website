import Link from "next/link";

export default function CTAD() {
  return (
    <section className="py-16 px-4 bg-[#f5f5f4]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#1a1a1a]">
          Begin Your Academic Journey
        </h2>
        <div className="flex items-center gap-6">
          <Link
            href="/admissions/apply"
            className="text-sm text-[#b91c1c] underline underline-offset-4 decoration-[#b91c1c] hover:text-[#991b1b] font-medium transition-colors"
          >
            Apply for Admission
          </Link>
          <Link
            href="/contact"
            className="text-sm text-[#78716c] underline underline-offset-4 decoration-[#d6d3d1] hover:text-[#b91c1c] transition-colors"
          >
            Contact Admissions
          </Link>
        </div>
      </div>
    </section>
  );
}
