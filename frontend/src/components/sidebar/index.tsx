import { navigationItems } from "@/lib/constant";
import { SidebarItem } from "./sidebar-item";

type Props = {};

export function Sidebar({}: Props) {
  return (
    <aside className="hidden w-48 min-w-48 max-w-48 border-r bg-background md:block lg:w-64 lg:min-w-64 lg:max-w-64 lg:px-4">
      <nav className="flex flex-col gap-2 p-4">
        {navigationItems.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </nav>
    </aside>
  );
}
