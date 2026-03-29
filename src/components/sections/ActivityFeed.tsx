import { ACTIVITY_FEED } from "@/lib/constants";
import { ChevronRight, Zap } from "lucide-react";
import Link from "next/link";

const typeColors: Record<string, string> = {
  Workshop: "bg-blue-100 text-blue-700",
  Sports: "bg-green-100 text-green-700",
  Seminar: "bg-purple-100 text-purple-700",
  Service: "bg-orange-100 text-orange-700",
  Collaboration: "bg-teal-100 text-teal-700",
};

export default function ActivityFeed() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#c8a951] rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">Recent Happenings</h2>
              <p className="text-sm text-gray-500">Campus activity feed</p>
            </div>
          </div>
          <Link
            href="/campus-life"
            className="text-sm text-[#1e3a5f] font-medium hover:text-[#c8a951] transition-colors flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

          <div className="space-y-6">
            {ACTIVITY_FEED.map((item, i) => (
              <div key={i} className="relative flex gap-4 md:gap-6 group">
                {/* Timeline dot */}
                <div className="hidden md:flex shrink-0 w-12 items-start justify-center pt-5">
                  <div className="w-3 h-3 rounded-full bg-[#1e3a5f] border-2 border-white ring-2 ring-[#1e3a5f]/20 z-10 group-hover:bg-[#c8a951] group-hover:ring-[#c8a951]/20 transition-colors" />
                </div>

                <div className="flex-1 bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-[#c8a951]/30 hover:shadow-sm transition-all">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${typeColors[item.type] || "bg-gray-100 text-gray-700"}`}>
                      {item.type}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">{item.department}</span>
                    <span className="text-[10px] text-gray-400 ml-auto">
                      {new Date(item.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
