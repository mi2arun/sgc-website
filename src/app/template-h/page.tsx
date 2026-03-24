import GovBanners from "@/components/templates/template-h/sections/GovBanners";
import HeroH from "@/components/templates/template-h/sections/Hero";
import Spotlights from "@/components/templates/template-h/sections/Spotlights";
import LiveFeed from "@/components/templates/template-h/sections/LiveFeed";
import ProgrammesH from "@/components/templates/template-h/sections/Programmes";
import PlacementsH from "@/components/templates/template-h/sections/Placements";
import TestimonialsH from "@/components/templates/template-h/sections/Testimonials";
import CTAH from "@/components/templates/template-h/sections/CTA";

export default function TemplateHPage() {
  return (
    <>
      <GovBanners />
      <HeroH />
      <Spotlights />
      <LiveFeed />
      <ProgrammesH />
      <PlacementsH />
      <TestimonialsH />
      <CTAH />
    </>
  );
}
