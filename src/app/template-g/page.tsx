import HeroG from "@/components/templates/template-g/sections/Hero";
import AboutG from "@/components/templates/template-g/sections/About";
import StatsG from "@/components/templates/template-g/sections/Stats";
import ProgrammesG from "@/components/templates/template-g/sections/Programmes";
import NewsG from "@/components/templates/template-g/sections/News";
import WhyJoinG from "@/components/templates/template-g/sections/WhyJoin";
import PlacementsG from "@/components/templates/template-g/sections/Placements";
import TestimonialsG from "@/components/templates/template-g/sections/Testimonials";
import CTAG from "@/components/templates/template-g/sections/CTA";

export default function TemplateGPage() {
  return (
    <>
      <HeroG />
      <AboutG />
      <StatsG />
      <ProgrammesG />
      <NewsG />
      <WhyJoinG />
      <PlacementsG />
      <TestimonialsG />
      <CTAG />
    </>
  );
}
