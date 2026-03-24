import HeaderI from "@/components/templates/template-i/layout/Header";
import FooterI from "@/components/templates/template-i/layout/Footer";
import "@/components/templates/template-i/styles.css";

export const metadata = {
  title: "Template I: Campus Grid | SGC",
};

export default function TemplateILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="template-i bg-[#f7f7f7] text-[#0f0f0f] min-h-screen flex flex-col">
      <HeaderI />
      <main className="flex-1">{children}</main>
      <FooterI />
    </div>
  );
}
