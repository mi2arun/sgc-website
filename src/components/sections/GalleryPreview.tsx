import Image from "next/image";
import Link from "next/link";
import { Camera, ChevronRight } from "lucide-react";

type Props = {
  title?: string;
  images?: { image: any }[];
};

export default function GalleryPreview({ title, images: imagesProp }: Props) {
  const galleryImages = imagesProp
    ? imagesProp.map((img) => (typeof img.image === "object" ? img.image.url : img.image))
    : [];
  if (galleryImages.length === 0) return null;
  return (
    <section className="py-16 bg-[#f8f6f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-[#c8a951]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">{title || "Campus Gallery"}</h2>
              <p className="text-sm text-gray-500">Life at Saradha Gangadharan College</p>
            </div>
          </div>
          <Link
            href="/gallery"
            className="text-sm text-[#1e3a5f] font-medium hover:text-[#c8a951] transition-colors flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((src, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className={`relative ${i === 0 ? "h-64 md:h-full" : "h-40 md:h-48"}`}>
                <Image
                  src={src}
                  alt={`Campus photo ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                />
                <div className="absolute inset-0 bg-[#1e3a5f]/0 group-hover:bg-[#1e3a5f]/30 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
