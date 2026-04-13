import { getNavigation } from "@/lib/payload";
import HeaderClient from "./HeaderClient";

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
    : [];

  return <HeaderClient items={items} />;
}
