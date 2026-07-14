import Link from "next/link";
import { FileText, CreditCard, Download, ClipboardList } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText, CreditCard, Download, ClipboardList,
};

// "R G B" triplets, consumed by the --hl custom property in globals.css.
const HL_COLORS: Record<string, string> = {
  gold: "245 194 32",
  green: "22 163 74",
  red: "220 38 38",
  blue: "28 76 156",
};

type Button = {
  label: string;
  description?: string;
  href: string;
  icon?: string;
  color?: string;
  highlight?: boolean | null;
  highlightStart?: string | null;
  highlightEnd?: string | null;
  highlightColor?: string | null;
  badgeText?: string | null;
};

type Props = { buttons?: Button[] };

// These sections render on force-dynamic pages, so evaluating the window against
// the current request time is safe (and never causes a hydration mismatch, since
// this is a server component).
function isHighlighted(b: Button, now: number): boolean {
  if (!b.highlight) return false;
  if (b.highlightStart && new Date(b.highlightStart).getTime() > now) return false;
  if (b.highlightEnd && new Date(b.highlightEnd).getTime() < now) return false;
  return true;
}

export default function QuickAccess({ buttons }: Props) {
  if (!buttons || buttons.length === 0) return null;
  const now = Date.now();

  return (
    <section className="py-8 bg-[#eef3fb] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {buttons.map((b) => {
            const Icon = iconMap[b.icon || ""] || FileText;
            const baseColor = b.color?.startsWith("bg-") ? b.color : `bg-${b.color || "primary"}`;
            const hot = isHighlighted(b, now);
            const hlRgb = HL_COLORS[b.highlightColor || "gold"] || HL_COLORS.gold;

            return (
              <Link
                key={b.label}
                href={b.href}
                style={hot ? ({ "--hl": hlRgb } as React.CSSProperties) : undefined}
                className={`group relative bg-white rounded-xl p-5 flex items-start gap-4 border transition-all duration-300 hover:-translate-y-1 ${
                  hot
                    ? "border-transparent animate-highlight-glow"
                    : "shadow-lg hover:shadow-xl border-border/50"
                }`}
              >
                {hot && b.badgeText && (
                  <span
                    className="absolute -top-2 -right-2 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full text-white shadow animate-highlight-badge whitespace-nowrap"
                    style={{ backgroundColor: `rgb(${hlRgb})` }}
                  >
                    {b.badgeText}
                  </span>
                )}
                <div
                  className={`${hot ? "" : baseColor} w-12 h-12 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                  style={hot ? { backgroundColor: `rgb(${hlRgb})` } : undefined}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{b.label}</h3>
                  {b.description && (
                    <p className="text-xs text-muted mt-0.5 hidden sm:block">{b.description}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
