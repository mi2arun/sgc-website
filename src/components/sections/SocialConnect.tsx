import { getSettings } from "@/lib/payload";
import FacebookEmbed from "./FacebookEmbed";
import SocialIcon from "@/components/ui/SocialIcon";
import { ArrowRight } from "lucide-react";

type Props = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  pageUrl?: string;
  ctaLabel?: string;
  height?: number;
};

export default async function SocialConnect({
  eyebrow = "Stay Connected",
  heading = "Follow Us on Facebook",
  description = "Campus news, events, results and moments — straight from our official page.",
  pageUrl = "https://www.facebook.com/sgcpdy",
  ctaLabel = "Follow on Facebook",
  height = 620,
}: Props) {
  const settings = await getSettings().catch(() => null);
  const s = (settings?.social || {}) as Record<string, string>;

  const socials = [
    { href: s.facebook || pageUrl, name: "Facebook" },
    { href: s.instagram, name: "Instagram" },
    { href: s.youtube, name: "YouTube" },
    { href: s.linkedin, name: "LinkedIn" },
    { href: s.twitter, name: "Twitter" },
  ].filter((x) => x.href);

  return (
    <section className="py-16 bg-[#eef3fb]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Left: branded panel */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white p-8 md:p-10 flex flex-col justify-center">
            {/* decorative glow */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <p className="text-accent font-semibold text-xs md:text-sm tracking-widest uppercase mb-3">{eyebrow}</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">{heading}</h2>
              {description && <p className="mt-4 text-white/80 text-sm md:text-base max-w-md">{description}</p>}

              <a
                href={pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-primary-dark font-semibold px-6 py-3 rounded-lg text-sm shadow-lg shadow-accent/20 transition-colors"
              >
                {ctaLabel}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {socials.length > 0 && (
                <div className="mt-8">
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-3">Find us elsewhere</p>
                  <div className="flex flex-wrap gap-2.5">
                    {socials.map(({ href, name }) => (
                      <a
                        key={name}
                        href={href!}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={name}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent hover:text-primary-dark flex items-center justify-center transition-colors"
                      >
                        <SocialIcon name={name} className="w-5 h-5 block" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: feed card */}
          <div className="rounded-2xl bg-white p-2 shadow-xl border border-border/50 flex justify-center overflow-hidden">
            <FacebookEmbed pageUrl={pageUrl} height={height} smallHeader />
          </div>
        </div>
      </div>
    </section>
  );
}
