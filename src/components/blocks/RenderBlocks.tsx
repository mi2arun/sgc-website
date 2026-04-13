import FlashNews from '@/components/sections/FlashNews'
import HeroSection from '@/components/sections/HeroSection'
import PromoBanner from '@/components/sections/PromoBanner'
import QuickAccess from '@/components/sections/QuickAccess'
import AccreditationStrip from '@/components/sections/AccreditationStrip'
import AboutSection from '@/components/sections/AboutSection'
import StatsSection from '@/components/sections/StatsSection'
import ProgrammesSection from '@/components/sections/ProgrammesSection'
import ScholarshipBanner from '@/components/sections/ScholarshipBanner'
import AnnouncementsPanel from '@/components/sections/AnnouncementsPanel'
import NewsEventsSection from '@/components/sections/NewsEventsSection'
import ActivityFeed from '@/components/sections/ActivityFeed'
import WhyJoinSection from '@/components/sections/WhyJoinSection'
import PlacementSection from '@/components/sections/PlacementSection'
import RecruiterLogos from '@/components/sections/RecruiterLogos'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ComplianceLinks from '@/components/sections/ComplianceLinks'
import CTASection from '@/components/sections/CTASection'

type Block = {
  blockType: string
  [key: string]: any
}

type Props = {
  blocks: Block[]
}

const blockComponents: Record<string, React.ComponentType<any>> = {
  'hero': HeroSection,
  'flash-news': FlashNews,
  'promo-banner': PromoBanner,
  'quick-access': QuickAccess,
  'accreditation': AccreditationStrip,
  'about': AboutSection,
  'stats': StatsSection,
  'programmes': ProgrammesSection,
  'scholarship': ScholarshipBanner,
  'announcements': AnnouncementsPanel,
  'news-events': NewsEventsSection,
  'activity-feed': ActivityFeed,
  'why-join': WhyJoinSection,
  'placements': PlacementSection,
  'recruiter-logos': RecruiterLogos,
  'testimonials': TestimonialsSection,
  'compliance-links': ComplianceLinks,
  'cta': CTASection,
}

export default function RenderBlocks({ blocks }: Props) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        const Component = blockComponents[block.blockType]
        if (!Component) return null

        const { blockType, id, blockName, ...props } = block
        return <Component key={id || index} {...props} />
      })}
    </>
  )
}
