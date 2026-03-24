import Hero from "@/components/templates/template-e/sections/Hero";
import About from "@/components/templates/template-e/sections/About";
import Programmes from "@/components/templates/template-e/sections/Programmes";
import Stats from "@/components/templates/template-e/sections/Stats";
import News from "@/components/templates/template-e/sections/News";
import WhyJoin from "@/components/templates/template-e/sections/WhyJoin";
import Placements from "@/components/templates/template-e/sections/Placements";
import Testimonials from "@/components/templates/template-e/sections/Testimonials";
import CTA from "@/components/templates/template-e/sections/CTA";

export default function TemplateEPage() {
  return (
    <>
      <Hero />
      <About />
      <Programmes />
      <Stats />
      <News />
      <WhyJoin />
      <Placements />
      <Testimonials />
      <CTA />
    </>
  );
}
