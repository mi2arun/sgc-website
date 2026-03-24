import Link from "next/link";
import { EVENTS, NEWS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default function NewsEventsD() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-[#d6d3d1]">
          {/* Events Column */}
          <div className="md:pr-8">
            <h3 className="text-[11px] tracking-[0.15em] uppercase text-[#b91c1c] font-semibold mb-6">
              Events
            </h3>
            <div className="divide-y divide-[#d6d3d1]">
              {EVENTS.map((e, i) => (
                <div key={i} className="py-4">
                  <p className="text-xs text-[#78716c] mb-1">{formatDate(e.date)}</p>
                  <p className="text-sm font-medium text-[#1a1a1a] leading-snug mb-1">{e.title}</p>
                  <p className="text-xs text-[#78716c] line-clamp-2">{e.description}</p>
                </div>
              ))}
            </div>
            <Link href="/events" className="inline-flex items-center gap-1 text-xs text-[#b91c1c] mt-4">
              More <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* News Column */}
          <div className="md:px-8">
            <h3 className="text-[11px] tracking-[0.15em] uppercase text-[#b91c1c] font-semibold mb-6">
              News
            </h3>
            <div className="divide-y divide-[#d6d3d1]">
              {NEWS.map((n, i) => (
                <div key={i} className="py-4">
                  <p className="text-xs text-[#78716c] mb-1">{formatDate(n.date)}</p>
                  <p className="text-sm font-medium text-[#1a1a1a] leading-snug mb-1">{n.title}</p>
                  <p className="text-xs text-[#78716c] line-clamp-2">{n.excerpt}</p>
                </div>
              ))}
            </div>
            <Link href="/news" className="inline-flex items-center gap-1 text-xs text-[#b91c1c] mt-4">
              More <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Notices Column */}
          <div className="md:pl-8">
            <h3 className="text-[11px] tracking-[0.15em] uppercase text-[#b91c1c] font-semibold mb-6">
              Notices
            </h3>
            <div className="divide-y divide-[#d6d3d1]">
              {[
                { date: "2026-03-22", title: "Semester Examination Timetable Released" },
                { date: "2026-03-18", title: "Library Timings Extended During Exams" },
                { date: "2026-03-15", title: "Fee Payment Deadline — March 31, 2026" },
                { date: "2026-03-10", title: "Holiday Declaration — Holi Festival" },
              ].map((n, i) => (
                <div key={i} className="py-4">
                  <p className="text-xs text-[#78716c] mb-1">{formatDate(n.date)}</p>
                  <p className="text-sm font-medium text-[#1a1a1a] leading-snug">{n.title}</p>
                </div>
              ))}
            </div>
            <Link href="/circulars" className="inline-flex items-center gap-1 text-xs text-[#b91c1c] mt-4">
              More <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="h-px bg-[#d6d3d1] mt-10" />
      </div>
    </section>
  );
}
