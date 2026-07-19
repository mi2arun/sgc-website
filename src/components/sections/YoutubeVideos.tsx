import { ArrowRight } from "lucide-react";
import YoutubeGrid, { type YtItem } from "./YoutubeGrid";
import { fetchChannelVideos } from "@/lib/youtube";

type Video = { url: string; title?: string | null };
type Props = {
  heading?: string;
  subheading?: string | null;
  channelUrl?: string | null;
  columns?: string;
  source?: string;
  channelId?: string | null;
  maxVideos?: number;
  videos?: Video[];
};

// Pull the 11-char video id out of any YouTube URL or a bare id.
function ytId(input: string): string | null {
  if (!input) return null;
  const s = input.trim();
  const m = s.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([\w-]{11})/);
  if (m) return m[1];
  if (/^[\w-]{11}$/.test(s)) return s;
  return null;
}

export default async function YoutubeVideos({
  heading,
  subheading,
  channelUrl,
  columns = "3",
  source = "manual",
  channelId,
  maxVideos = 6,
  videos,
}: Props) {
  let items: YtItem[];

  if (source === "channel" && channelId) {
    // Latest uploads from the channel (cached until the Reindex button purges the tag).
    items = (await fetchChannelVideos(channelId, maxVideos || 6)).map((v) => ({ id: v.id, title: v.title }));
  } else {
    items = (videos || [])
      .map((v) => ({ id: ytId(v.url), title: v.title }))
      .filter((v) => v.id) as YtItem[];
  }

  if (items.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          {heading && <h2 className="text-2xl md:text-3xl font-bold text-primary">{heading}</h2>}
          {subheading && <p className="mt-3 text-muted max-w-2xl mx-auto">{subheading}</p>}
        </div>

        <YoutubeGrid items={items} columns={columns} />

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
