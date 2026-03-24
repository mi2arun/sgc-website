import HeroSection from "@/components/sections/HeroSection";
import FlashNews from "@/components/sections/FlashNews";
import QuickAccess from "@/components/sections/QuickAccess";
import AboutSection from "@/components/sections/AboutSection";
import ProgrammesSection from "@/components/sections/ProgrammesSection";
import StatsSection from "@/components/sections/StatsSection";
import NewsEventsSection from "@/components/sections/NewsEventsSection";
import WhyJoinSection from "@/components/sections/WhyJoinSection";
import PlacementSection from "@/components/sections/PlacementSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <FlashNews />
      <HeroSection />
      <QuickAccess />
      <AboutSection />
      <ProgrammesSection />
      <StatsSection />
      <NewsEventsSection />
      <WhyJoinSection />
      <PlacementSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
