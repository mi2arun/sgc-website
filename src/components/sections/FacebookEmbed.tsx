"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  pageUrl: string;
  height?: number;
  smallHeader?: boolean;
  hideCover?: boolean;
  showFacepile?: boolean;
};

// Just the official Facebook Page Plugin iframe, responsive (caps at FB's 500px).
// Kept separate so it can be dropped inside any server-rendered layout.
export default function FacebookEmbed({
  pageUrl,
  height = 640,
  smallHeader = true,
  hideCover = false,
  showFacepile = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      const w = ref.current?.offsetWidth ?? 340;
      setWidth(Math.min(500, Math.max(180, Math.floor(w))));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const src =
    `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(pageUrl)}` +
    `&tabs=timeline&width=${width || 340}&height=${height}` +
    `&small_header=${smallHeader}&adapt_container_width=true` +
    `&hide_cover=${hideCover}&show_facepile=${showFacepile}`;

  return (
    <div ref={ref} className="w-full" style={{ minHeight: height }}>
      {width > 0 && (
        <iframe
          title="Facebook feed"
          src={src}
          width={width}
          height={height}
          style={{ border: "none", overflow: "hidden", display: "block" }}
          scrolling="no"
          frameBorder={0}
          allowFullScreen
          allow="encrypted-media; clipboard-write; picture-in-picture; web-share"
        />
      )}
    </div>
  );
}
