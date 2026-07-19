"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  heading?: string;
  pageUrl?: string;
  height?: number;
  smallHeader?: boolean;
  hideCover?: boolean;
  showFacepile?: boolean;
};

// Uses Facebook's official Page Plugin *iframe* (no SDK script, no API key).
// The plugin needs an explicit pixel width (max 500), so we measure the
// container on the client and cap it.
export default function FacebookFeed({
  heading,
  pageUrl = "https://www.facebook.com/sgcpdy",
  height = 640,
  smallHeader = false,
  hideCover = false,
  showFacepile = true,
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
    <section className="py-14 bg-[#eef3fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">{heading}</h2>
        )}
        <div ref={ref} className="mx-auto w-full max-w-[500px] rounded-xl overflow-hidden bg-white shadow-lg border border-border/50" style={{ minHeight: height }}>
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
      </div>
    </section>
  );
}
