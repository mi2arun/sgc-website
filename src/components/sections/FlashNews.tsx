"use client";

import Link from "next/link";
import { Megaphone } from "lucide-react";

type Props = {
  items?: { text: string; link?: string | null }[];
};

function Item({ text, link }: { text: string; link?: string | null }) {
  if (!link) return <span className="text-foreground/70">{text}</span>;
  const external = /^https?:\/\//i.test(link);
  const className =
    "text-foreground/80 hover:text-primary hover:underline underline-offset-2 transition-colors";
  return external ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className={className}>
      {text}
    </a>
  ) : (
    <Link href={link} className={className}>
      {text}
    </Link>
  );
}

export default function FlashNews({ items }: Props) {
  const list = (items || []).filter((i) => i?.text);
  if (list.length === 0) return null;

  return (
    <div className="bg-accent/10 border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-11 overflow-hidden">
        <div className="flex items-center gap-2 shrink-0 pr-4 border-r border-accent/30">
          <Megaphone className="w-4 h-4 text-accent" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">Flash News</span>
        </div>
        {/* group + pause-on-hover so the moving links can actually be clicked */}
        <div className="group overflow-hidden ml-4 flex-1">
          <div className="animate-ticker whitespace-nowrap group-hover:[animation-play-state:paused]">
            {list.map((item, i) => (
              <span key={i} className="text-sm mx-8">
                <Item text={item.text} link={item.link} />
                {i < list.length - 1 && <span className="text-accent mx-4">|</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
