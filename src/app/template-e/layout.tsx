import type { Metadata } from "next";
import SideDock from "@/components/templates/template-e/layout/SideDock";
import Footer from "@/components/templates/template-e/layout/Footer";
import "@/components/templates/template-e/styles.css";

export const metadata: Metadata = {
  title: "SGC — Saradha Gangadharan College",
  description:
    "An Autonomous Institution Affiliated to Pondicherry University — Where Curiosity Becomes Capability.",
};

export default function TemplateELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="template-e">
      <SideDock />
      <main className="pl-0 md:pl-[60px]">{children}</main>
      <Footer />
    </div>
  );
}
