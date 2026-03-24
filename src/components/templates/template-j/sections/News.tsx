import Image from "next/image";
import Link from "next/link";
import { NEWS, EVENTS } from "@/lib/constants";
import { NEWS_IMAGES, EVENT_IMAGES } from "@/lib/images";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const items = [
  { ...NEWS[0], image: NEWS_IMAGES.naac, type: "News" },
  { ...EVENTS[0], image: EVENT_IMAGES.orientation, type: "Event", excerpt: EVENTS[0].description },
  { ...NEWS[1], image: NEWS_IMAGES.mou, type: "News" },
  { ...EVENTS[1], image: EVENT_IMAGES.scienceDay, type: "Event", excerpt: EVENTS[1].description },
];

export default function NewsJ() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">News & Events</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1e40af] to-[#4f46e5] mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow h-full">
                <div className="relative h-44 overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full text-white ${item.type === "News" ? "bg-[#1e40af]" : "bg-[#4f46e5]"}`}>{item.type}</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[10px] text-[#6b7280] mb-1">{new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                  <h3 className="font-bold text-sm text-[#111827] mb-1 line-clamp-2 group-hover:text-[#1e40af] transition-colors">{item.title}</h3>
                  <p className="text-xs text-[#6b7280] line-clamp-2">{item.excerpt}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={500}>
          <div className="text-center mt-10">
            <Link href="/news" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#1e40af] hover:text-[#3730a3]">
              View All Updates <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
