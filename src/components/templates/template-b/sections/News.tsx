import Link from "next/link";
import { EVENTS, NEWS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

const allItems = [...EVENTS.map(e => ({ ...e, type: "event" as const, excerpt: e.description })), ...NEWS.map(n => ({ ...n, type: "news" as const, description: n.excerpt }))]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 5);

function formatDate(d: string) {
  const date = new Date(d);
  return { day: date.getDate(), month: date.toLocaleDateString("en-IN", { month: "short" }), year: date.getFullYear() };
}

export default function NewsB() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold text-[#18181b] tracking-tight mb-12">
          Latest
        </h2>

        <div className="divide-y divide-[#e4e4e7]">
          {allItems.map((item, i) => {
            const d = formatDate(item.date);
            return (
              <div key={i} className="py-6 flex gap-8 items-start group">
                <div className="shrink-0 w-16 text-center">
                  <p className="text-3xl font-semibold text-[#18181b] leading-none">{d.day}</p>
                  <p className="text-xs text-[#a1a1aa] uppercase mt-1">{d.month}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-[#18181b] group-hover:text-[#6366f1] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#a1a1aa] mt-1 line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <Link href="/news" className="inline-flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-[#6366f1] transition-colors group">
            See all updates
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
