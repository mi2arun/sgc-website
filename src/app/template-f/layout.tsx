import HeaderF from "@/components/templates/template-f/layout/Header";
import FooterF from "@/components/templates/template-f/layout/Footer";
import "@/components/templates/template-f/styles.css";

export const metadata = {
  title: "Template F: Classic Emerald | SGC",
};

export default function TemplateFLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="template-f bg-[#fdf8f0] text-[#2d2d2d] min-h-screen flex flex-col">
      <HeaderF />
      <main className="flex-1">{children}</main>
      <FooterF />
    </div>
  );
}
