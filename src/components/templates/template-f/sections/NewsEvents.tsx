"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EVENTS, NEWS } from "@/lib/constants";
import { EVENT_IMAGES, NEWS_IMAGES } from "@/lib/images";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

const eventImages = [EVENT_IMAGES.orientation, EVENT_IMAGES.scienceDay, EVENT_IMAGES.techFest, EVENT_IMAGES.nssCamp];
const newsImages = [NEWS_IMAGES.naac, NEWS_IMAGES.mou, NEWS_IMAGES.publication, NEWS_IMAGES.bloodDonation];

type Tab = "events" | "news";

function formatDate(d: string) {
  const date = new Date(d);
  return { day: date.getDate(), month: date.toLocaleDateString("en-IN", { month: "short" }) };
}

export default function NewsEventsF() {
  const [tab, setTab] = useState<Tab>("events");

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <span className="inline-block bg-[#7c1d3e]/10 text-[#7c1d3e] text-xs font-bold px-3 py-1 rounded mb-3 uppercase tracking-wider">
              Stay Updated
            </span>
            <h2 className="text-3xl font-bold text-[#155e3d]">News & Events</h2>
          </div>

          {/* Tab buttons */}
          <div className="flex gap-1 bg-[#fdf8f0] rounded-lg p-1 border border-[#e0d8c8]">
            <button
              onClick={() => setTab("events")}
              className={cn("flex items-center gap-1.5 px-4 py-2 rounded text-sm font-semibold transition-colors", tab === "events" ? "bg-[#155e3d] text-white" : "text-[#6b6b6b]")}
            >
              <Calendar className="w-3.5 h-3.5" /> Events
            </button>
            <button
              onClick={() => setTab("news")}
              className={cn("flex items-center gap-1.5 px-4 py-2 rounded text-sm font-semibold transition-colors", tab === "news" ? "bg-[#155e3d] text-white" : "text-[#6b6b6b]")}
            >
              <Newspaper className="w-3.5 h-3.5" /> News
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tab === "events"
            ? EVENTS.map((event, i) => {
                const d = formatDate(event.date);
                return (
                  <div key={i} className="group bg-[#fdf8f0] rounded-lg overflow-hidden border border-[#e0d8c8] hover:shadow-md transition-all">
                    <div className="relative h-36">
                      <Image src={eventImages[i]} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 bg-[#155e3d] text-white rounded px-2.5 py-1 text-center">
                        <span className="text-lg font-bold leading-none block">{d.day}</span>
                        <span className="text-[9px] uppercase">{d.month}</span>
                      </div>
                      <div className="absolute top-3 right-3 bg-[#d4a843] text-[#0d3d28] text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                        {event.category}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm text-[#2d2d2d] mb-1 line-clamp-2 group-hover:text-[#155e3d] transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-xs text-[#6b6b6b] line-clamp-2">{event.description}</p>
                    </div>
                  </div>
                );
              })
            : NEWS.map((item, i) => (
                <div key={i} className="group bg-[#fdf8f0] rounded-lg overflow-hidden border border-[#e0d8c8] hover:shadow-md transition-all">
                  <div className="relative h-36">
                    <Image src={newsImages[i]} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] text-[#6b6b6b] mb-1">{new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                    <h3 className="font-semibold text-sm text-[#2d2d2d] mb-1 line-clamp-2 group-hover:text-[#155e3d] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#6b6b6b] line-clamp-2">{item.excerpt}</p>
                  </div>
                </div>
              ))}
        </div>

        <div className="text-center mt-8">
          <Link href={tab === "events" ? "/events" : "/news"} className="inline-flex items-center gap-2 text-sm font-semibold text-[#155e3d] hover:text-[#0d3d28] transition-colors">
            View All {tab === "events" ? "Events" : "News"} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
