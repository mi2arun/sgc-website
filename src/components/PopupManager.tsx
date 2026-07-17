"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";

export type Popup = {
  id: string;
  name: string;
  heading?: string | null;
  body?: string | null;
  imageUrl?: string | null;
  ctaLabel?: string | null;
  ctaLink?: string | null;
  ctaNewTab?: boolean;
  targetPaths?: string[];
  startAt?: string | null;
  endAt?: string | null;
  frequency?: string;
  delaySeconds?: number;
  priority?: number;
};

// Empty list → all pages. "/academics/*" → that section. Otherwise exact path.
function pathMatches(paths: string[] | undefined, pathname: string): boolean {
  if (!paths || paths.length === 0) return true;
  return paths.some((raw) => {
    const p = (raw || "").trim();
    if (!p || p === "*" || p === "/*") return true;
    if (p.endsWith("/*")) {
      const base = p.slice(0, -2);
      return pathname === base || pathname.startsWith(base + "/");
    }
    return pathname === p;
  });
}

function withinSchedule(p: Popup, now: number): boolean {
  if (p.startAt && new Date(p.startAt).getTime() > now) return false;
  if (p.endAt && new Date(p.endAt).getTime() < now) return false;
  return true;
}

function seenKey(id: string) {
  return `sgc_popup_${id}`;
}

function alreadySeen(p: Popup): boolean {
  try {
    if (p.frequency === "always") return false;
    if (p.frequency === "daily") return localStorage.getItem(seenKey(p.id)) === new Date().toDateString();
    return sessionStorage.getItem(seenKey(p.id)) === "1"; // session (default)
  } catch {
    return false;
  }
}

function markSeen(p: Popup) {
  try {
    if (p.frequency === "daily") localStorage.setItem(seenKey(p.id), new Date().toDateString());
    else if (p.frequency !== "always") sessionStorage.setItem(seenKey(p.id), "1");
  } catch {
    /* storage blocked — show every time, harmless */
  }
}

export default function PopupManager({ popups }: { popups: Popup[] }) {
  const pathname = usePathname();
  const [active, setActive] = useState<Popup | null>(null);

  // Pick + schedule a popup whenever the route changes.
  useEffect(() => {
    setActive(null);
    if (!popups?.length) return;
    const now = Date.now();
    const candidate = popups
      .filter((p) => withinSchedule(p, now) && pathMatches(p.targetPaths, pathname) && !alreadySeen(p))
      .sort((a, b) => (b.priority || 0) - (a.priority || 0))[0];
    if (!candidate) return;
    const t = setTimeout(() => {
      setActive(candidate);
      markSeen(candidate);
    }, Math.max(0, candidate.delaySeconds ?? 1) * 1000);
    return () => clearTimeout(t);
  }, [pathname, popups]);

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  if (!active) return null;

  const hasExternal = active.ctaNewTab || (active.ctaLink ? /^https?:\/\//.test(active.ctaLink) : false);
  const close = () => setActive(null);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={active.heading || active.name}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden popup-in">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {active.imageUrl &&
          (active.ctaLink && !active.ctaLabel ? (
            // Image-only popup with a link: make the whole banner clickable.
            hasExternal ? (
              <a href={active.ctaLink} target={active.ctaNewTab ? "_blank" : undefined} rel="noopener noreferrer" onClick={close}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={active.imageUrl} alt={active.heading || active.name} className="w-full h-auto max-h-[70vh] object-contain bg-black/5" />
              </a>
            ) : (
              <Link href={active.ctaLink} onClick={close}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={active.imageUrl} alt={active.heading || active.name} className="w-full h-auto max-h-[70vh] object-contain bg-black/5" />
              </Link>
            )
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={active.imageUrl} alt={active.heading || active.name} className="w-full h-auto max-h-[70vh] object-contain bg-black/5" />
          ))}

        {(active.heading || active.body || (active.ctaLabel && active.ctaLink)) && (
          <div className="p-6 text-center">
            {active.heading && <h3 className="text-xl font-bold text-primary">{active.heading}</h3>}
            {active.body && <p className="mt-2 text-sm text-muted whitespace-pre-line">{active.body}</p>}
            {active.ctaLabel && active.ctaLink && (
              hasExternal ? (
                <a
                  href={active.ctaLink}
                  target={active.ctaNewTab ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  onClick={close}
                  className="mt-4 inline-block bg-accent hover:bg-accent-light text-primary-dark font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
                >
                  {active.ctaLabel}
                </a>
              ) : (
                <Link
                  href={active.ctaLink}
                  onClick={close}
                  className="mt-4 inline-block bg-accent hover:bg-accent-light text-primary-dark font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
                >
                  {active.ctaLabel}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
