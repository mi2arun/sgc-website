import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

type Props = {
  heading?: string;
  description?: string;
  buttonLabel?: string;
  buttonLink?: string;
  phone?: string;
};

export default function CTASection({ heading, description, buttonLabel, buttonLink, phone }: Props) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-accent/10 via-accent/5 to-transparent rounded-3xl p-10 md:p-14 overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full" />

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 leading-tight">
                {heading || "Ready to Begin Your Journey?"}
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                {description || "Take the first step towards a bright future. Apply for admission today and become a part of the SGC family. Our counsellors are here to help you choose the right programme."}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={buttonLink || "/admissions/apply"}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold px-7 py-3.5 rounded-lg transition-colors text-sm"
                >
                  {buttonLabel || "Apply Now"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="inline-flex items-center gap-2 border-2 border-primary/20 hover:border-primary/40 text-primary font-medium px-7 py-3.5 rounded-lg transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Call Us
                  </a>
                )}
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="relative">
                <div className="w-56 h-56 bg-primary/5 rounded-full flex items-center justify-center">
                  <div className="w-40 h-40 bg-primary/10 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-primary">2026</p>
                      <p className="text-sm font-medium text-accent">Admissions Open</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
