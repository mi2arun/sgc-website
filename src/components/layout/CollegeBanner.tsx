import Image from "next/image";
import { getSettings } from "@/lib/payload";

export default async function CollegeBanner() {
  let settings;
  try {
    settings = await getSettings();
  } catch {
    settings = null;
  }

  const collegeName = settings?.collegeName || "Saradha Gangadharan College";
  const phone = settings?.phone || "";
  const logoUrl = settings?.logo && typeof settings.logo === 'object' && settings.logo.url
    ? settings.logo.url
    : "/logo.png";

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={logoUrl}
              alt={collegeName}
              width={72}
              height={72}
              className="shrink-0"
            />
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary leading-tight">
                {collegeName}
              </h1>
              <p className="text-accent font-semibold text-xs sm:text-sm">
                (Autonomous)
              </p>
              <p className="text-muted text-[11px] sm:text-xs mt-0.5 leading-snug">
                An Institution of Sri Saradha Gangadharan Educational Trust
              </p>
              <p className="text-muted text-[11px] sm:text-xs leading-snug hidden sm:block">
                Accredited by NAAC | Affiliated to Pondicherry University | ISO 9001:2015 Certified
              </p>
              {phone && (
                <p className="text-foreground/70 text-[11px] sm:text-xs font-medium mt-0.5 hidden md:block">
                  Lake Road, Velrampet, Puducherry — 605 004 | Ph: {phone}
                </p>
              )}
            </div>
          </div>
          <div className="hidden lg:flex flex-col items-center gap-1 shrink-0">
            <div className="w-16 h-16 rounded-full bg-primary flex flex-col items-center justify-center text-white">
              <span className="text-[10px] font-medium leading-none">EST.</span>
              <span className="text-lg font-bold leading-none">2010</span>
            </div>
            <span className="text-[10px] text-muted font-medium">Silver Jubilee</span>
          </div>
        </div>
      </div>
    </div>
  );
}
