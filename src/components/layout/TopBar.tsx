import { getSettings } from "@/lib/payload";
import TopBarClient from "./TopBarClient";

const DEFAULTS = {
  phone: "+91-413-2211800",
  email: "info@sgc.edu.in",
  address: "Puducherry - 605 004, India",
  social: [
    { label: "Facebook", href: "https://facebook.com/sgcpdy" },
    { label: "Twitter", href: "https://twitter.com/sgcpdy" },
    { label: "Instagram", href: "https://instagram.com/sgcpdy" },
    { label: "YouTube", href: "https://youtube.com/@sgcpdy" },
    { label: "LinkedIn", href: "https://linkedin.com/school/sgcpdy" },
  ],
};

export default async function TopBar() {
  let settings;
  try {
    settings = await getSettings();
  } catch {
    settings = null;
  }

  const phone = settings?.phone || DEFAULTS.phone;
  const email = settings?.email || DEFAULTS.email;
  const address = settings?.address || DEFAULTS.address;
  const social = settings?.social
    ? [
        { label: "Facebook", href: settings.social.facebook || "" },
        { label: "Twitter", href: settings.social.twitter || "" },
        { label: "Instagram", href: settings.social.instagram || "" },
        { label: "YouTube", href: settings.social.youtube || "" },
        { label: "LinkedIn", href: settings.social.linkedin || "" },
      ].filter((s) => s.href)
    : DEFAULTS.social;

  return <TopBarClient phone={phone} email={email} address={address} social={social} />;
}
