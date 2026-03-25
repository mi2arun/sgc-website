import FlashNewsK from "@/components/templates/template-k/sections/FlashNews";
import HeroK from "@/components/templates/template-k/sections/Hero";
import QuickAccessK from "@/components/templates/template-k/sections/QuickAccess";
import AboutK from "@/components/templates/template-k/sections/About";
import CampusOutline from "@/components/templates/template-k/sections/CampusOutline";
import ProgrammesK from "@/components/templates/template-k/sections/Programmes";
import StatsK from "@/components/templates/template-k/sections/Stats";
import NewsK from "@/components/templates/template-k/sections/News";
import WhyJoinK from "@/components/templates/template-k/sections/WhyJoin";
import PlacementsK from "@/components/templates/template-k/sections/Placements";
import TestimonialsK from "@/components/templates/template-k/sections/Testimonials";
import CTAK from "@/components/templates/template-k/sections/CTA";

export default function TemplateKPage() {
  return (
    <>
      <FlashNewsK />
      <HeroK />
      <QuickAccessK />
      <AboutK />
      {/* Animated campus building outline */}
      <section className="py-16 bg-[#0c2340] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-[#c9a84c] uppercase tracking-widest mb-3">Our Campus</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Where Knowledge Meets Architecture</h2>
          </div>
          <CampusOutline />
        </div>
      </section>
      <ProgrammesK />
      <StatsK />
      <NewsK />
      <WhyJoinK />
      <PlacementsK />
      <TestimonialsK />
      <CTAK />
    </>
  );
}
