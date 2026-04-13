import FlashNews from "@/components/sections/FlashNews";
import PromoBanner from "@/components/sections/PromoBanner";
import HeroSection from "@/components/sections/HeroSection";
import QuickAccess from "@/components/sections/QuickAccess";
import AnnouncementsPanel from "@/components/sections/AnnouncementsPanel";
import AboutSection from "@/components/sections/AboutSection";
import ProgrammesSection from "@/components/sections/ProgrammesSection";
import StatsSection from "@/components/sections/StatsSection";
import ActivityFeed from "@/components/sections/ActivityFeed";
import NewsEventsSection from "@/components/sections/NewsEventsSection";
import WhyJoinSection from "@/components/sections/WhyJoinSection";
import PlacementSection from "@/components/sections/PlacementSection";
import RecruiterLogos from "@/components/sections/RecruiterLogos";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ScholarshipBanner from "@/components/sections/ScholarshipBanner";
import ComplianceLinks from "@/components/sections/ComplianceLinks";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      {/* Hook + Action */}
      <FlashNews />
      <HeroSection />
      <PromoBanner />
      <QuickAccess />

      {/* Trust + Offerings */}
      <AboutSection />
      <StatsSection />
      <ProgrammesSection />
      <ScholarshipBanner />

      {/* Updates — for returning visitors */}
      <AnnouncementsPanel />
      <NewsEventsSection />
      <ActivityFeed />

      {/* Convince + Convert */}
      <WhyJoinSection />
      <PlacementSection />
      <RecruiterLogos />
      <TestimonialsSection />
      <ComplianceLinks />
      <CTASection />
    </>
  );
}
