import HeaderJ from "@/components/templates/template-j/layout/Header";
import FooterJ from "@/components/templates/template-j/layout/Footer";
import "@/components/templates/template-j/styles.css";

export const metadata = {
  title: "Template J: PortX-Inspired | SGC",
};

export default function TemplateJLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="template-j bg-[#f9fafb] text-[#111827] min-h-screen flex flex-col">
      <HeaderJ />
      <main className="flex-1">{children}</main>
      <FooterJ />
    </div>
  );
}
