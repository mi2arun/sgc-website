import HeaderB from "@/components/templates/template-b/layout/Header";
import FooterB from "@/components/templates/template-b/layout/Footer";
import "@/components/templates/template-b/styles.css";

export const metadata = {
  title: "Template B: Modern Minimal | SGC",
};

export default function TemplateBLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="template-b bg-[#fafafa] text-[#111111] min-h-screen flex flex-col">
      <HeaderB />
      <main className="flex-1">{children}</main>
      <FooterB />
    </div>
  );
}
