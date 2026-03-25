import HeaderK from "@/components/templates/template-k/layout/Header";
import FooterK from "@/components/templates/template-k/layout/Footer";
import ScrollProgress from "@/components/templates/template-k/sections/ScrollProgress";
import BackToTop from "@/components/templates/template-k/sections/BackToTop";
import "@/components/templates/template-k/styles.css";

export const metadata = {
  title: "Template K: Polished Classic | SGC",
};

export default function TemplateKLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="template-k bg-white text-[#1a1a2e] min-h-screen flex flex-col">
      <ScrollProgress />
      <HeaderK />
      <main className="flex-1">{children}</main>
      <FooterK />
      <BackToTop />
    </div>
  );
}
