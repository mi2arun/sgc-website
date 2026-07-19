"use client";

import { useState } from "react";
import { Play, ArrowRight } from "lucide-react";

type Video = { url: string; title?: string | null };
type Props = {
  heading?: string;
  subheading?: string | null;
  channelUrl?: string | null;
  columns?: string;
  videos?: Video[];
};

// Pull the 11-char video id out of any YouTube URL (watch, youtu.be, embed, shorts, live) or a bare id.
function ytId(input: string): string | null {
  if (!input) return null;
  const s = input.trim();
  const m = s.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([\w-]{11})/);
  if (m) return m[1];
  if (/^[\w-]{11}$/.test(s)) return s;
  return null;
}

function VideoCard({ id, title }: { id: string; title?: string | null }) {
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

const colClass: Record<string, string> = {
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-4",
};

export default function YoutubeVideos({ heading, subheading, channelUrl, columns = "3", videos }: Props) {
  const items = (videos || [])
    .map((v) => ({ id: ytId(v.url), title: v.title }))
    .filter((v) => v.id) as Array<{ id: string; title?: string | null }>;

  if (items.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          {heading && <h2 className="text-2xl md:text-3xl font-bold text-primary">{heading}</h2>}
          {subheading && <p className="mt-3 text-muted max-w-2xl mx-auto">{subheading}</p>}
        </div>

        <div className={`grid grid-cols-1 ${colClass[columns] || colClass["3"]} gap-6`}>
          {items.map((v, i) => (
            <VideoCard key={`${v.id}-${i}`} id={v.id} title={v.title} />
          ))}
        </div>

        {channelUrl && (
          <div className="text-center mt-10">
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
            >
              Visit our channel
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
