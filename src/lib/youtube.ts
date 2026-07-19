// Fetch a YouTube channel's latest uploads from its public RSS feed (no API key).
// Results are held in a process-level cache so they DON'T change on their own —
// the admin "Reindex" button clears the cache to pull the newest uploads.
// (Prod runs a single container, so this cache is shared across requests.)

export type YtVideo = { id: string; title: string };

let CACHE: Record<string, YtVideo[]> = {};

export function clearYoutubeCache(): void {
  CACHE = {};
}

function decodeXml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

export async function fetchChannelVideos(channelId: string, limit = 6): Promise<YtVideo[]> {
  const id = (channelId || "").trim();
  if (!id) return [];
  const key = `${id}:${limit}`;
  if (CACHE[key]) return CACHE[key];
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(id)}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const out: YtVideo[] = [];
    const re = /<entry>[\s\S]*?<yt:videoId>([\w-]+)<\/yt:videoId>[\s\S]*?<title>([\s\S]*?)<\/title>/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(xml)) && out.length < limit) {
      out.push({ id: m[1], title: decodeXml(m[2]).trim() });
    }
    if (out.length) CACHE[key] = out;
    return out;
  } catch {
    return [];
  }
}
