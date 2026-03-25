import Image from "next/image";
import Link from "next/link";
import { EVENTS, NEWS } from "@/lib/constants";
import { EVENT_IMAGES, NEWS_IMAGES } from "@/lib/images";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import Reveal from "./Reveal";

function fmtDate(d: string) { const dt = new Date(d); return { day: dt.getDate(), month: dt.toLocaleDateString("en-IN", { month: "short" }) }; }

export default function NewsK() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <div className="tk-accent-line" />
              <span className="text-xs font-bold text-[#c9a84c] uppercase tracking-widest">Stay Updated</span>
              <div className="tk-accent-line" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0c2340]">News & Events</h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Events */}
          <Reveal delay={100}>
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-[#0c2340] flex items-center gap-2"><Calendar className="w-4 h-4 text-[#c9a84c]" /> Upcoming Events</h3>
                <Link href="/events" className="text-xs font-semibold text-[#c9a84c] hover:text-[#b8963d] flex items-center gap-1">View All <ArrowRight className="w-3 h-3" /></Link>
              </div>
              <div className="space-y-3">
                {EVENTS.map((e, i) => {
                  const d = fmtDate(e.date);
                  return (
                    <div key={i} className="group flex gap-4 bg-[#faf8f3] rounded-xl p-4 border border-transparent hover:border-[#c9a84c]/20 hover:shadow-md transition-all">
                      <div className="tk-img-zoom w-20 h-20 rounded-lg overflow-hidden relative shrink-0">
                        <Image src={[EVENT_IMAGES.orientation, EVENT_IMAGES.scienceDay, EVENT_IMAGES.techFest, EVENT_IMAGES.nssCamp][i]} alt={e.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-[#0c2340]/60 flex flex-col items-center justify-center">
                          <span className="text-lg font-bold text-white leading-none">{d.day}</span>
                          <span className="text-[8px] text-white/70 uppercase font-bold">{d.month}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#c9a84c]">{e.category}</span>
                        <h4 className="text-sm font-semibold text-[#1a1a2e] mt-0.5 group-hover:text-[#0c2340] transition-colors line-clamp-1">{e.title}</h4>
                        <p className="text-xs text-[#5f6980] mt-1 line-clamp-2">{e.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* News */}
          <Reveal delay={200}>
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-[#0c2340] flex items-center gap-2"><Clock className="w-4 h-4 text-[#c9a84c]" /> Latest News</h3>
                <Link href="/news" className="text-xs font-semibold text-[#c9a84c] hover:text-[#b8963d] flex items-center gap-1">View All <ArrowRight className="w-3 h-3" /></Link>
              </div>
              <div className="space-y-3">
                {NEWS.map((n, i) => (
                  <div key={i} className="group flex gap-4 bg-[#faf8f3] rounded-xl p-4 border border-transparent hover:border-[#c9a84c]/20 hover:shadow-md transition-all">
                    <div className="tk-img-zoom w-20 h-20 rounded-lg overflow-hidden relative shrink-0">
                      <Image src={[NEWS_IMAGES.naac, NEWS_IMAGES.mou, NEWS_IMAGES.publication, NEWS_IMAGES.bloodDonation][i]} alt={n.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-[#5f6980]">{new Date(n.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <h4 className="text-sm font-semibold text-[#1a1a2e] mt-0.5 group-hover:text-[#0c2340] transition-colors line-clamp-1">{n.title}</h4>
                      <p className="text-xs text-[#5f6980] mt-1 line-clamp-2">{n.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
