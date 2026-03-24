import Header from "@/components/templates/template-c/layout/Header";
import Footer from "@/components/templates/template-c/layout/Footer";
import "@/components/templates/template-c/styles.css";

export const metadata = {
  title: "SGC — Bold & Vibrant",
  description: "Saradha Gangadharan College — An Autonomous Institution Affiliated to Pondicherry University",
};

export default function TemplateCLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="template-c bg-[#fafbff] min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
