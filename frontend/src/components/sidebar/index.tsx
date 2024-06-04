import { navigationItems } from "@/lib/constant";
import { SidebarItem } from "./sidebar-item";

type Props = {};

export function Sidebar({}: Props) {
  return (
    <aside className="hidden w-64 border-r bg-background md:block">
      <nav className="flex flex-col gap-2 p-4">
        {navigationItems.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </nav>
    </aside>
  );
}
