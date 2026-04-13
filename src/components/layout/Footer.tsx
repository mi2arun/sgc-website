import { getSettings, getFooter } from "@/lib/payload";
import FooterClient from "./FooterClient";

const DEFAULT_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "About SGC", href: "/about" },
      { label: "Admissions", href: "/admissions" },
      { label: "Departments", href: "/academics/departments" },
      { label: "Faculty", href: "/faculty" },
      { label: "Research", href: "/research" },
      { label: "Placements", href: "/placements" },
    ],
  },
  {
    title: "Academics",
    links: [
      { label: "UG Programmes", href: "/academics/ug-programmes" },
      { label: "PG Programmes", href: "/academics/pg-programmes" },
      { label: "Library", href: "/academics/library" },
      { label: "Academic Calendar", href: "/academics/calendar" },
      { label: "Examination", href: "/examination" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "NAAC", href: "/accreditation/naac" },
      { label: "IQAC", href: "/accreditation/iqac" },
      { label: "NIRF", href: "/accreditation/nirf" },
      { label: "Gallery", href: "/gallery" },
      { label: "Alumni", href: "/alumni" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export default async function Footer() {
  let settings;
  let footerData;
  try {
    [settings, footerData] = await Promise.all([getSettings(), getFooter()]);
  } catch {
    settings = null;
    footerData = null;
  }

  const logoUrl = settings?.logo && typeof settings.logo === 'object' && settings.logo.url
    ? settings.logo.url
    : "/logo.png";

  const social = settings?.social
    ? [
        { label: "Facebook", href: settings.social.facebook || "" },
        { label: "Twitter", href: settings.social.twitter || "" },
        { label: "Instagram", href: settings.social.instagram || "" },
        { label: "YouTube", href: settings.social.youtube || "" },
        { label: "LinkedIn", href: settings.social.linkedin || "" },
      ].filter((s) => s.href)
    : [
        { label: "Facebook", href: "https://facebook.com/sgcpdy" },
        { label: "Twitter", href: "https://twitter.com/sgcpdy" },
        { label: "Instagram", href: "https://instagram.com/sgcpdy" },
        { label: "YouTube", href: "https://youtube.com/@sgcpdy" },
        { label: "LinkedIn", href: "https://linkedin.com/school/sgcpdy" },
      ];

  const columns = footerData?.columns && footerData.columns.length > 0
    ? footerData.columns.map((col: any) => ({
        title: col.title,
        links: col.links?.map((l: any) => ({ label: l.label, href: l.href })) || [],
      }))
    : DEFAULT_COLUMNS;

  return (
    <FooterClient
      collegeName={settings?.collegeName || "Saradha Gangadharan College"}
      shortName={settings?.shortName || "SGC"}
      phone={settings?.phone || "+91-413-2211800"}
      email={settings?.email || "info@sgc.edu.in"}
      address={settings?.address || "Puducherry - 605 004, India"}
      mapUrl={settings?.mapUrl || "https://maps.google.com/?q=Saradha+Gangadharan+College+Puducherry"}
      logoUrl={logoUrl}
      social={social}
      columns={columns}
      newsletterHeading={footerData?.newsletterHeading || "Stay Updated"}
      newsletterDescription={footerData?.newsletterDescription || "Subscribe to receive news, events, and admission updates."}
      copyright={footerData?.copyright || "\u00a9 {year} Saradha Gangadharan College. All rights reserved."}
    />
  );
}
