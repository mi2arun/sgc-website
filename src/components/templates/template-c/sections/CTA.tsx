import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-violet-500 to-cyan-500" style={{ backgroundImage: "linear-gradient(135deg, #7c3aed, #06b6d4)" }} />

      {/* Subtle animated mesh overlay */}
      <div className="absolute inset-0 tc-gradient-mesh opacity-30" />

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] bg-[length:28px_28px]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
          Ready to Level Up?
        </h2>
        <p className="mt-5 text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
          Join a vibrant community of learners, innovators, and future leaders. Your journey
          to excellence starts here at SGC.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/admissions/apply"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-violet-700 font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Apply Now
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/10 backdrop-blur border border-white/30 text-white font-semibold hover:bg-white/20 transition-all"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
