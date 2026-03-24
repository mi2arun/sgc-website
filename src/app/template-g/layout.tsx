import HeaderG from "@/components/templates/template-g/layout/Header";
import FooterG from "@/components/templates/template-g/layout/Footer";
import "@/components/templates/template-g/styles.css";

export const metadata = {
  title: "Template G: Warm Academic | SGC",
};

export default function TemplateGLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="template-g bg-[#f5f0e8] text-[#333] min-h-screen flex flex-col">
      <HeaderG />
      <main className="flex-1">{children}</main>
      <FooterG />
    </div>
  );
}
