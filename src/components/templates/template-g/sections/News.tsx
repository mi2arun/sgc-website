import Image from "next/image";
import Link from "next/link";
import { EVENTS, NEWS } from "@/lib/constants";
import { EVENT_IMAGES, NEWS_IMAGES } from "@/lib/images";
import { ArrowRight } from "lucide-react";

const allItems = [
  { ...EVENTS[0], type: "event", image: EVENT_IMAGES.orientation, excerpt: EVENTS[0].description },
  { ...NEWS[0], type: "news", image: NEWS_IMAGES.naac },
  { ...EVENTS[1], type: "event", image: EVENT_IMAGES.scienceDay, excerpt: EVENTS[1].description },
  { ...NEWS[1], type: "news", image: NEWS_IMAGES.mou },
];

function formatDate(d: string) {
  const date = new Date(d);
  return { day: date.getDate(), month: date.toLocaleDateString("en-IN", { month: "short" }), year: date.getFullYear() };
}

export default function NewsG() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#c45d3e]" />
              <span className="text-xs font-semibold text-[#c45d3e] uppercase tracking-widest">Updates</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2c2c2c]">News & Events</h2>
          </div>
          <Link href="/news" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-[#c45d3e] hover:text-[#a04530] group">
            All Updates <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Featured + list layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Featured card */}
          <div className="group relative rounded-xl overflow-hidden h-[400px]">
            <Image src={allItems[0].image} alt={allItems[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2c2c2c] via-[#2c2c2c]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <span className="inline-block bg-[#c45d3e] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-3">
                {allItems[0].type === "event" ? "Event" : "News"}
              </span>
              <h3 className="text-xl font-bold text-white mb-2 leading-snug">{allItems[0].title}</h3>
              <p className="text-sm text-white/60 line-clamp-2">{allItems[0].excerpt}</p>
            </div>
          </div>

          {/* Stacked list */}
          <div className="flex flex-col gap-4">
            {allItems.slice(1).map((item, i) => {
              const d = formatDate(item.date);
              return (
                <div key={i} className="group flex gap-4 bg-[#f5f0e8] rounded-lg overflow-hidden border border-[#e2ddd4] hover:border-[#c45d3e]/30 transition-all">
                  <div className="relative w-32 md:w-40 shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="py-4 pr-4 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#c45d3e]">
                        {item.type === "event" ? "Event" : "News"}
                      </span>
                      <span className="text-[10px] text-[#7a7a7a]">{d.day} {d.month} {d.year}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-[#2c2c2c] mb-1 group-hover:text-[#c45d3e] transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#7a7a7a] line-clamp-2">{item.excerpt}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
