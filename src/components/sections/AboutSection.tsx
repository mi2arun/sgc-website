import Image from "next/image";
import Link from "next/link";
import { Award, Shield, BookOpen, ArrowRight } from "lucide-react";
import { PEOPLE_IMAGES } from "@/lib/images";

const badges = [
  { icon: Award, label: "NAAC Accredited" },
  { icon: Shield, label: "ISO 9001:2015" },
  { icon: BookOpen, label: "Autonomous" },
];

type Props = {
  heading?: string;
  description?: string;
  chairmanName?: string;
  chairmanTitle?: string;
  chairmanOrg?: string;
  chairmanPhoto?: any;
  chairmanQuote?: string;
};

export default function AboutSection({
  heading,
  description,
  chairmanName,
  chairmanTitle,
  chairmanOrg,
  chairmanPhoto,
  chairmanQuote,
}: Props) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — Content */}
          <div>
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Welcome to SGC</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-5 leading-tight">
              {heading || <>Excellence in Education<br />Since 2010</>}
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Saradha Gangadharan College has been a beacon of quality education in Puducherry,
              offering a diverse range of undergraduate and postgraduate programmes. Our commitment
              to academic excellence, research, and holistic development has made us one of the
              most sought-after institutions in the region.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              With a state-of-the-art campus, dedicated faculty, and a vibrant student community,
              SGC provides an environment that nurtures talent, encourages innovation, and prepares
              students for the challenges of the modern world.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-4 mb-8">
              {badges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
                  <Icon className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-primary">{label}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-light transition-colors text-sm"
            >
              Learn more about SGC
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right — Chairman Message Card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 text-white">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full blur-2xl" />
              <div className="relative">
                <p className="text-accent font-medium text-sm mb-4 uppercase tracking-wide">From the Chairman&apos;s Desk</p>
                <blockquote className="text-white/90 italic leading-relaxed text-lg mb-6">
                  &ldquo;{chairmanQuote || "Education is the most powerful weapon which you can use to change the world. At SGC, we are committed to providing an education that transforms lives and builds a better tomorrow."}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden relative ring-2 ring-accent/50 ring-offset-2 ring-offset-primary">
                    <Image
                      src={chairmanPhoto && typeof chairmanPhoto === "object" ? chairmanPhoto.url : "/founder.jpg"}
                      alt={`Founder - ${chairmanName || "Shri. Swaminathan G"}`}
                      fill
                      className="object-cover object-top"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{chairmanName || "Shri. Swaminathan G"}</p>
                    <p className="text-white/60 text-sm">{chairmanTitle || "Founder & Chairman"}, {chairmanOrg || "SGC Trust"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative accent */}
            <div className="absolute -bottom-3 -left-3 w-full h-full border-2 border-accent/30 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
