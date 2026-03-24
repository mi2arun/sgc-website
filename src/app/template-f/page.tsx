import Marquee from "@/components/templates/template-f/sections/Marquee";
import HeroF from "@/components/templates/template-f/sections/Hero";
import QuickLinks from "@/components/templates/template-f/sections/QuickLinks";
import AboutF from "@/components/templates/template-f/sections/About";
import ProgrammesF from "@/components/templates/template-f/sections/Programmes";
import NewsEventsF from "@/components/templates/template-f/sections/NewsEvents";
import WhyJoinF from "@/components/templates/template-f/sections/WhyJoin";
import PlacementsF from "@/components/templates/template-f/sections/Placements";
import TestimonialsF from "@/components/templates/template-f/sections/Testimonials";
import CTAF from "@/components/templates/template-f/sections/CTA";

export default function TemplateFPage() {
  return (
    <>
      <Marquee />
      <HeroF />
      <QuickLinks />
      <AboutF />
      <ProgrammesF />
      <NewsEventsF />
      <WhyJoinF />
      <PlacementsF />
      <TestimonialsF />
      <CTAF />
    </>
  );
}
