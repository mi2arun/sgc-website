import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Saradha Gangadharan College | Autonomous Institution",
    template: "%s | SGC",
  },
  description:
    "Saradha Gangadharan College (SGC) — An Autonomous Institution affiliated to Pondicherry University. NAAC Accredited, ISO 9001:2015 Certified. Offering UG & PG programmes in Science, Arts, Commerce & Technology.",
  keywords: [
    "SGC",
    "Saradha Gangadharan College",
    "Puducherry college",
    "Pondicherry University",
    "autonomous college",
    "NAAC accredited",
    "UG programmes",
    "PG programmes",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
