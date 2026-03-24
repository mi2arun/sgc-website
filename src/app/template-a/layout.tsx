import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Template A: Classic Institutional | SGC",
};

export default function TemplateALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
