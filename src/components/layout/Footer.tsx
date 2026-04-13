import { getSettings, getFooter } from "@/lib/payload";
import FooterClient from "./FooterClient";

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
    : [];

  const columns = footerData?.columns && footerData.columns.length > 0
    ? footerData.columns.map((col: any) => ({
        title: col.title,
        links: col.links?.map((l: any) => ({ label: l.label, href: l.href })) || [],
      }))
    : [];

  return (
    <FooterClient
      collegeName={settings?.collegeName || "Saradha Gangadharan College"}
      shortName={settings?.shortName || "SGC"}
      phone={settings?.phone || ""}
      email={settings?.email || ""}
      address={settings?.address || ""}
      mapUrl={settings?.mapUrl || ""}
      logoUrl={logoUrl}
      social={social}
      columns={columns}
      newsletterHeading={footerData?.newsletterHeading || "Stay Updated"}
      newsletterDescription={footerData?.newsletterDescription || "Subscribe to receive news, events, and admission updates."}
      copyright={footerData?.copyright || "\u00a9 {year} Saradha Gangadharan College. All rights reserved."}
    />
  );
}
