import { getSettings } from "@/lib/payload";
import TopBarClient from "./TopBarClient";

export default async function TopBar() {
  let settings;
  try {
    settings = await getSettings();
  } catch {
    settings = null;
  }

  const phone = settings?.phone || "";
  const email = settings?.email || "";
  const address = settings?.address || "";
  const social = settings?.social
    ? [
        { label: "Facebook", href: settings.social.facebook || "" },
        { label: "Twitter", href: settings.social.twitter || "" },
        { label: "Instagram", href: settings.social.instagram || "" },
        { label: "YouTube", href: settings.social.youtube || "" },
        { label: "LinkedIn", href: settings.social.linkedin || "" },
      ].filter((s) => s.href)
    : [];

  return <TopBarClient phone={phone} email={email} address={address} social={social} />;
}
