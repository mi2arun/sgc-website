import HeaderK from "@/components/templates/template-k/layout/Header";
import FooterK from "@/components/templates/template-k/layout/Footer";
import "@/components/templates/template-k/styles.css";

export const metadata = {
  title: "Template K: Polished Classic | SGC",
};

export default function TemplateKLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="template-k bg-white text-[#1a1a2e] min-h-screen flex flex-col">
      <HeaderK />
      <main className="flex-1">{children}</main>
      <FooterK />
    </div>
  );
}
