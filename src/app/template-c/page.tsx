import Hero from "@/components/templates/template-c/sections/Hero";
import Programmes from "@/components/templates/template-c/sections/Programmes";
import Stats from "@/components/templates/template-c/sections/Stats";
import News from "@/components/templates/template-c/sections/News";
import WhyJoin from "@/components/templates/template-c/sections/WhyJoin";
import Placements from "@/components/templates/template-c/sections/Placements";
import Testimonials from "@/components/templates/template-c/sections/Testimonials";
import CTA from "@/components/templates/template-c/sections/CTA";

export default function TemplateCPage() {
  return (
    <>
      <Hero />
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
