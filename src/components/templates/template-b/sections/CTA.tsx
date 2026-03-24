import Link from "next/link";

export default function CTAbB() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#18181b] tracking-tight mb-6">
          Begin your journey at SGC.
        </h2>
        <div className="flex items-center justify-center gap-8">
          <Link
            href="/admissions/apply"
            className="text-sm text-[#6366f1] underline underline-offset-4 hover:text-[#4f46e5] transition-colors"
          >
            Apply for Admission
          </Link>
          <Link
            href="/contact"
            className="text-sm text-[#a1a1aa] underline underline-offset-4 hover:text-[#18181b] transition-colors"
          >
            Contact Admissions
          </Link>
        </div>
      </div>
    </section>
  );
}
