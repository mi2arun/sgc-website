"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, FileText, Bell, ChevronRight, Download, Pin, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Event = {
  id: string;
  title: string;
  slug: string;
  date: string;
  category?: string;
  venue?: string;
};

type Circular = {
  id: string;
  title: string;
  date: string;
  category?: string;
  isNew?: boolean;
  pinned?: boolean;
  link?: string;
  fileUrl?: string;
};

type Props = {
  eventsTitle?: string;
  circularsTitle?: string;
  events?: Event[];
  circulars?: Circular[];
};

const categoryColors: Record<string, string> = {
  Academic: "bg-blue-500/10 text-blue-600",
  Cultural: "bg-purple-500/10 text-purple-600",
  Sports: "bg-green-500/10 text-green-600",
  Service: "bg-orange-500/10 text-orange-600",
  Festival: "bg-pink-500/10 text-pink-600",
  Examination: "bg-red-500/10 text-red-600",
  Fees: "bg-amber-500/10 text-amber-600",
  Admission: "bg-emerald-500/10 text-emerald-600",
  General: "bg-gray-500/10 text-gray-600",
  Accreditation: "bg-indigo-500/10 text-indigo-600",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: d.getDate(),
    month: d.toLocaleDateString("en-IN", { month: "short" }).toUpperCase(),
    full: d.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }),
  };
}

export default function EventsCircularsSection({
  eventsTitle,
  circularsTitle,
  events,
  circulars,
}: Props) {
  const eventList = events || [];
  const circularList = circulars || [];

  const [circularFilter, setCircularFilter] = useState<string>("all");

  if (eventList.length === 0 && circularList.length === 0) return null;

  const circularCategories: string[] = ["all", ...Array.from(new Set(circularList.map((c) => c.category).filter((c): c is string => !!c)))];
  const filteredCirculars =
    circularFilter === "all"
      ? circularList
      : circularList.filter((c) => c.category === circularFilter);

  return (
    <section className="py-16 bg-[#f8f6f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* ─── Events Column ─── */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-primary">
                  {eventsTitle || "Upcoming Events"}
                </h2>
              </div>
              <Link
                href="/events"
                className="text-xs font-medium text-accent hover:text-primary flex items-center gap-1 transition-colors"
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {eventList.map((event) => {
                const date = formatDate(event.date);
                return (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="group flex items-stretch bg-white rounded-xl border border-border/30 overflow-hidden hover:shadow-md hover:border-primary/20 transition-all"
                  >
                    {/* Date badge */}
                    <div className="w-20 bg-primary/5 flex flex-col items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                      <span className="text-[10px] font-bold text-accent group-hover:text-accent tracking-wider">
                        {date.month}
                      </span>
                      <span className="text-2xl font-bold text-primary group-hover:text-white transition-colors leading-none">
                        {date.day}
                      </span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          {event.category && (
                            <span
                              className={cn(
                                "inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1",
                                categoryColors[event.category] || categoryColors.General
                              )}
                            >
                              {event.category}
                            </span>
                          )}
                          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                            {event.title}
                          </h3>
                          {event.venue && (
                            <p className="text-xs text-muted mt-1">{event.venue}</p>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary shrink-0 mt-1 transition-colors" />
                      </div>
                    </div>
                  </Link>
                );
              })}

              {eventList.length === 0 && (
                <div className="text-center py-8 text-muted text-sm bg-white rounded-xl border border-border/30">
                  No upcoming events
                </div>
              )}
            </div>
          </div>

          {/* ─── Circulars Column ─── */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Bell className="w-4 h-4 text-primary-dark" />
                </div>
                <h2 className="text-xl font-bold text-primary">
                  {circularsTitle || "Circulars & Notices"}
                </h2>
              </div>
            </div>

            {/* Category filter tabs */}
            {circularCategories.length > 2 && (
              <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1">
                {circularCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCircularFilter(cat)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors whitespace-nowrap",
                      circularFilter === cat
                        ? "bg-primary text-white"
                        : "bg-white text-muted hover:text-primary border border-border/50"
                    )}
                  >
                    {cat === "all" ? "All" : cat}
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-2">
              {filteredCirculars.map((circular) => (
                <div
                  key={circular.id}
                  className={cn(
                    "flex items-center gap-3 bg-white rounded-lg px-4 py-3 border transition-all hover:shadow-sm",
                    circular.pinned
                      ? "border-accent/30 bg-accent/[0.02]"
                      : "border-border/30"
                  )}
                >
                  {/* Icon */}
                  <div className="shrink-0">
                    {circular.pinned ? (
                      <Pin className="w-4 h-4 text-accent" />
                    ) : (
                      <FileText className="w-4 h-4 text-muted" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-foreground truncate">
                        {circular.title}
                      </h3>
                      {circular.isNew && (
                        <span className="shrink-0 inline-flex items-center gap-0.5 text-[9px] font-bold uppercase bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                          <Sparkles className="w-2.5 h-2.5" />
                          New
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-muted">
                        {formatDate(circular.date).full}
                      </span>
                      {circular.category && (
                        <span
                          className={cn(
                            "text-[10px] font-medium px-1.5 py-0.5 rounded",
                            categoryColors[circular.category] || categoryColors.General
                          )}
                        >
                          {circular.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  {circular.fileUrl && (
                    <a
                      href={circular.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 w-8 h-8 bg-primary/5 hover:bg-primary rounded-lg flex items-center justify-center transition-colors group"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download className="w-3.5 h-3.5 text-primary group-hover:text-white transition-colors" />
                    </a>
                  )}
                  {circular.link && !circular.fileUrl && (
                    <a
                      href={circular.link}
                      className="shrink-0 w-8 h-8 bg-primary/5 hover:bg-primary rounded-lg flex items-center justify-center transition-colors group"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-primary group-hover:text-white transition-colors" />
                    </a>
                  )}
                </div>
              ))}

              {filteredCirculars.length === 0 && (
                <div className="text-center py-8 text-muted text-sm bg-white rounded-xl border border-border/30">
                  No circulars in this category
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
