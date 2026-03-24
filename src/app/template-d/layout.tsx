import { Playfair_Display } from "next/font/google";
import HeaderD from "@/components/templates/template-d/layout/Header";
import FooterD from "@/components/templates/template-d/layout/Footer";
import "@/components/templates/template-d/styles.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Template D: Editorial / Magazine | SGC",
};

export default function TemplateDLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`template-d ${playfair.variable} bg-[#fffdf7] text-[#1a1a1a] min-h-screen flex flex-col`}>
      <style>{`.font-playfair { font-family: var(--font-playfair), Georgia, serif; }`}</style>
      <HeaderD />
      <main className="flex-1">{children}</main>
      <FooterD />
    </div>
  );
}
