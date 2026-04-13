import Link from "next/link";
import { Calendar, ArrowRight, Clock, Tag } from "lucide-react";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type Props = {
  events?: { title: string; date: string; category: string; description: string }[];
  news?: { title: string; date: string; excerpt: string }[];
  title?: string;
};

export default function NewsEventsSection({ events: eventsProp, news: newsProp, title }: Props) {
  const eventsData = eventsProp || [];
  const newsData = newsProp || [];
  if (eventsData.length === 0 && newsData.length === 0) return null;
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Stay Updated</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">{title || "News & Events"}</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Events */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Upcoming Events
              </h3>
              <Link href="/events" className="text-sm text-primary hover:text-primary-light font-medium flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-4">
              {eventsData.map((event, i) => (
                <div
                  key={i}
                  className="group bg-secondary hover:bg-white border border-transparent hover:border-primary/10 rounded-xl p-5 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex gap-4">
                    <div className="shrink-0 w-14 h-14 bg-primary/5 group-hover:bg-primary rounded-lg flex flex-col items-center justify-center transition-colors">
                      <span className="text-lg font-bold text-primary group-hover:text-white transition-colors leading-none">
                        {new Date(event.date).getDate()}
                      </span>
                      <span className="text-[10px] font-medium text-muted group-hover:text-white/70 transition-colors uppercase">
                        {new Date(event.date).toLocaleDateString("en-IN", { month: "short" })}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                          {event.category}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors mb-1">
                        {event.title}
                      </h4>
                      <p className="text-xs text-muted line-clamp-2">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* News */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                <Tag className="w-5 h-5 text-accent" />
                Latest News
              </h3>
              <Link href="/news" className="text-sm text-primary hover:text-primary-light font-medium flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-4">
              {newsData.map((item, i) => (
                <div
                  key={i}
                  className="group bg-secondary hover:bg-white border border-transparent hover:border-primary/10 rounded-xl p-5 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-3.5 h-3.5 text-muted" />
                    <span className="text-xs text-muted">{formatDate(item.date)}</span>
                  </div>
                  <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted line-clamp-2">{item.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
