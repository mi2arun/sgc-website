import Link from "next/link";

const templates = [
  {
    id: "a",
    name: "Classic Institutional",
    href: "/template-a",
    colors: ["#1e3a5f", "#c8a951", "#f8f6f0"],
    description: "Traditional university aesthetic. Navy blue and gold. Mega-menu navigation, hero carousel, card grids, animated stats. Formal and trustworthy.",
    tags: ["Traditional", "Formal", "Mega-menu", "Carousel"],
  },
  {
    id: "b",
    name: "Modern Minimal",
    href: "/template-b",
    colors: ["#18181b", "#6366f1", "#fafafa"],
    description: "Apple/Stripe-inspired premium design. Giant typography, vast whitespace, monochrome palette with a single indigo accent. No decorations — type does the work.",
    tags: ["Minimal", "Premium", "Typography-led", "Whitespace"],
  },
  {
    id: "c",
    name: "Bold & Vibrant",
    href: "/template-c",
    colors: ["#7c3aed", "#06b6d4", "#f97316"],
    description: "Energetic, Gen-Z-focused design. Violet and cyan gradients, glassmorphism, diagonal hero, bento grids, animated gradient mesh, floating elements.",
    tags: ["Energetic", "Gen-Z", "Gradients", "Glassmorphism"],
  },
  {
    id: "d",
    name: "Editorial / Magazine",
    href: "/template-d",
    colors: ["#b91c1c", "#292524", "#fffdf7"],
    description: "NYT/Guardian-inspired editorial layout. Serif typography, newspaper masthead, multi-column grids, table layouts, drop caps, pull quotes. Content-dense and sophisticated.",
    tags: ["Editorial", "Serif", "Content-dense", "Sophisticated"],
  },
  {
    id: "e",
    name: "Immersive / Experimental",
    href: "/template-e",
    colors: ["#22d3ee", "#a855f7", "#0a0a0a"],
    description: "Awwwards-worthy dark experience. Side dock navigation, animated gradient mesh, typewriter effects, 3D mouse-tracking cards, magnetic button, scroll-driven storytelling.",
    tags: ["Dark mode", "Cinematic", "Interactive", "Experimental"],
  },
  {
    id: "f",
    name: "Classic Emerald",
    href: "/template-f",
    colors: ["#155e3d", "#7c1d3e", "#fdf8f0"],
    description: "Warm, traditional Indian university feel. Deep green and maroon with cream backgrounds. Three-tier header, marquee ticker, tabbed news/events, image-rich cards, campus photo overlays.",
    tags: ["Classic", "Traditional", "Green+Maroon", "Image-rich"],
  },
  {
    id: "g",
    name: "Warm Academic",
    href: "/template-g",
    colors: ["#c45d3e", "#2c2c2c", "#f5f0e8"],
    description: "Stanford/MIT-inspired design. Full-screen hero with campus photo, warm earth tones, transparent-to-solid header, image mosaic about section, charcoal stats bar, rust accent color. Recommended.",
    tags: ["Recommended", "Warm", "Photo-forward", "Academic"],
  },
  {
    id: "h",
    name: "Social Campus",
    href: "/template-h",
    colors: ["#2563eb", "#7c3aed", "#f4f4f5"],
    description: "Feed-driven social media dashboard meets university portal. Live campus feed with filterable tabs (News/Events/Social), Twitter/LinkedIn/Facebook posts, Best Teacher/Student spotlights, government accreditation banners, blog posts sidebar.",
    tags: ["Unique", "Feed-driven", "Social", "Dashboard"],
  },
  {
    id: "i",
    name: "Campus Grid",
    href: "/template-i",
    colors: ["#0d9488", "#0f0f0f", "#f7f7f7"],
    description: "Pinterest/Bento-box mosaic. No traditional stacked sections — the entire homepage is interlocking tiles of different sizes. Hero, stats, about, chairman, news, events, spotlights, social, placements, testimonial, CTA, gov badges — all in one flowing grid.",
    tags: ["Bento", "Mosaic", "Compact", "Modern"],
  },
  {
    id: "j",
    name: "PortX-Inspired",
    href: "/template-j",
    colors: ["#1e40af", "#4f46e5", "#f9fafb"],
    description: "Inspired by portx.in. Blue-indigo gradients, animated gradient text shimmer, typewriter code editor in hero, floating icons, staggered scroll-reveal animations, tilted gradient image border, glassmorphism contact form on deep blue gradient, bouncing scroll indicator.",
    tags: ["Animated", "PortX-style", "Blue gradient", "Typewriter"],
  },
];

export default function TemplateSelectorPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.2em] uppercase text-[#a1a1aa] mb-4">SGC Website</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111] tracking-tight mb-4">
            Template Gallery
          </h1>
          <p className="text-base text-[#a1a1aa] max-w-xl mx-auto">
            10 distinct design directions for the Saradha Gangadharan College website.
            Click any template to preview the full homepage.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((t) => (
            <Link
              key={t.id}
              href={t.href}
              className="group bg-white border border-[#e4e4e7] rounded-2xl overflow-hidden hover:border-[#a1a1aa] transition-all hover:-translate-y-1"
            >
              {/* Color Preview Bar */}
              <div className="h-32 flex">
                {t.colors.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-[#a1a1aa]">0{parseInt(t.id, 36) - 9}</span>
                  <h2 className="text-lg font-semibold text-[#111] group-hover:text-[#6366f1] transition-colors">
                    {t.name}
                  </h2>
                </div>

                <p className="text-sm text-[#a1a1aa] leading-relaxed mb-4">
                  {t.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-1 rounded-full bg-[#f4f4f5] text-[#71717a]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center mt-16">
          <p className="text-xs text-[#a1a1aa]">
            All templates share the same content and will be connected to the Payload CMS backend.
          </p>
        </div>
      </div>
    </div>
  );
}
