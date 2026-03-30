import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";

export default function CollegeBanner() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + College Info */}
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt={SITE_CONFIG.name}
              width={72}
              height={72}
              className="shrink-0"
            />
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary leading-tight">
                Saradha Gangadharan College
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
              <p className="text-foreground/70 text-[11px] sm:text-xs font-medium mt-0.5 hidden md:block">
                Lake Road, Velrampet, Puducherry — 605 004 | Ph: {SITE_CONFIG.phone}
              </p>
            </div>
          </div>

          {/* Right side — optional badge/emblem area */}
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
