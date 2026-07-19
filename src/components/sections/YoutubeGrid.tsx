"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export type YtItem = { id: string; title?: string | null };

const colClass: Record<string, string> = {
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-4",
};

function VideoCard({ id, title }: YtItem) {
  const [play, setPlay] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-lg border border-border/50 flex flex-col">
      <div className="relative aspect-video bg-black">
        {play ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            frameBorder={0}
          />
        ) : (
          <button onClick={() => setPlay(true)} className="group absolute inset-0 w-full h-full" aria-label={`Play ${title || "video"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={title || ""} className="w-full h-full object-cover" loading="lazy" />
            <span className="absolute inset-0 bg-black/15 group-hover:bg-black/30 transition-colors" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-16 h-16 rounded-full bg-red-600 group-hover:bg-red-700 flex items-center justify-center shadow-xl transition-all group-hover:scale-105">
                <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
              </span>
            </span>
          </button>
        )}
      </div>
      {title && (
        <div className="p-4">
          <p className="text-sm font-semibold text-primary line-clamp-2">{title}</p>
        </div>
      )}
    </div>
  );
}

export default function YoutubeGrid({ items, columns = "3" }: { items: YtItem[]; columns?: string }) {
  return (
    <div className={`grid grid-cols-1 ${colClass[columns] || colClass["3"]} gap-6`}>
      {items.map((v, i) => (
        <VideoCard key={`${v.id}-${i}`} id={v.id} title={v.title} />
      ))}
    </div>
  );
}
