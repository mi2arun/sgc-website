import { getNavigation } from "@/lib/payload";
import HeaderClient from "./HeaderClient";

const DEFAULT_NAV = [
  { label: "Home", link: "/" },
  { label: "About", link: "/about", children: [
    { label: "About SGC", link: "/about" },
    { label: "Vision & Mission", link: "/about/vision-mission" },
  ]},
  { label: "Academics", link: "/academics" },
  { label: "Contact", link: "/contact" },
];

export default async function Header() {
  let nav;
  try {
    nav = await getNavigation();
  } catch {
    nav = null;
  }

  const items = nav?.items && nav.items.length > 0
    ? nav.items.map((item: any) => ({
        label: item.label,
        link: item.link,
        openInNewTab: item.openInNewTab || false,
        children: item.children?.map((child: any) => ({
          label: child.label,
          link: child.link,
          openInNewTab: child.openInNewTab || false,
        })),
      }))
    : DEFAULT_NAV;

  return <HeaderClient items={items} />;
}
