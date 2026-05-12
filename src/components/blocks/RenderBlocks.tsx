import FlashNews from '@/components/sections/FlashNews'
import HeroSection from '@/components/sections/HeroSection'
import PromoBanner from '@/components/sections/PromoBanner'
import QuickAccess from '@/components/sections/QuickAccess'
import AccreditationStrip from '@/components/sections/AccreditationStrip'
import AboutSection from '@/components/sections/AboutSection'
import StatsSection from '@/components/sections/StatsSection'
import ProgrammesServer from '@/components/sections/ProgrammesServer'
import ScholarshipBanner from '@/components/sections/ScholarshipBanner'
import AnnouncementsServer from '@/components/sections/AnnouncementsServer'
import NewsEventsServer from '@/components/sections/NewsEventsServer'
import ActivityFeed from '@/components/sections/ActivityFeed'
import WhyJoinSection from '@/components/sections/WhyJoinSection'
import PlacementSection from '@/components/sections/PlacementSection'
import RecruiterLogos from '@/components/sections/RecruiterLogos'
import TestimonialsServer from '@/components/sections/TestimonialsServer'
import ComplianceLinks from '@/components/sections/ComplianceLinks'
import CTASection from '@/components/sections/CTASection'
import PortalsSection from '@/components/sections/PortalsSection'
import EventsCircularsServer from '@/components/sections/EventsCircularsServer'
import RichTextBlock from '@/components/sections/RichTextBlock'
import GalleryPreviewServer from '@/components/sections/GalleryPreviewServer'
import FacultyGridServer from '@/components/sections/FacultyGridServer'
import SingleImageSection from '@/components/sections/SingleImageSection'
import TwoColumnSection from '@/components/sections/TwoColumnSection'
import SectionWrapper from '@/components/blocks/SectionWrapper'

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
  'programmes': ProgrammesServer,
  'scholarship': ScholarshipBanner,
  'announcements': AnnouncementsServer,
  'news-events': NewsEventsServer,
  'activity-feed': ActivityFeed,
  'why-join': WhyJoinSection,
  'placements': PlacementSection,
  'recruiter-logos': RecruiterLogos,
  'testimonials': TestimonialsServer,
  'compliance-links': ComplianceLinks,
  'cta': CTASection,
  'portals': PortalsSection,
  'events-circulars': EventsCircularsServer,
  'rich-text': RichTextBlock,
  'gallery-preview': GalleryPreviewServer,
  'faculty-grid': FacultyGridServer,
  'single-image': SingleImageSection,
  'two-column': TwoColumnSection,
}

export default function RenderBlocks({ blocks }: Props) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        const Component = blockComponents[block.blockType]
        if (!Component) return null
        // Hide blocks the editor toggled off in admin. Defaults to enabled
        // for backwards-compat with rows created before the field existed.
        if (block.enabled === false) return null

        const { blockType, id, blockName, style, enabled, ...props } = block
        return (
          <SectionWrapper key={id || index} settings={style}>
            <Component {...props} />
          </SectionWrapper>
        )
      })}
    </>
  )
}
