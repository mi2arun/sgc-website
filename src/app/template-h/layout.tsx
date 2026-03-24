import HeaderH from "@/components/templates/template-h/layout/Header";
import FooterH from "@/components/templates/template-h/layout/Footer";
import "@/components/templates/template-h/styles.css";

export const metadata = {
  title: "Template H: Social Campus | SGC",
};

export default function TemplateHLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="template-h bg-[#f4f4f5] text-[#18181b] min-h-screen flex flex-col">
      <HeaderH />
      <main className="flex-1">{children}</main>
      <FooterH />
    </div>
  );
}
