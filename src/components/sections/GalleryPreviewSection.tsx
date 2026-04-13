import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  title?: string;
  images?: { image: any }[];
};

export default function GalleryPreviewSection({ title, images }: Props) {
  const items = images || [];
  if (items.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">{title || "Campus Gallery"}</h2>
          <Link href="/gallery" className="text-sm font-medium text-accent hover:text-primary flex items-center gap-1 transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((item, i) => {
            const url = typeof item.image === "object" && item.image?.url ? item.image.url : null;
            if (!url) return null;
            return (
              <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 group">
                <img src={url} alt={item.image?.alt || "Gallery"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
