import { SidebarItem } from "@/components/general/sidebar/sidebar-item";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigationItemsAdmin } from "@/lib/constant/navigation-items/admin-navigation-items";
import { navigationItemsDashboard } from "@/lib/constant/navigation-items/dashboard-navigation-items";
import { Menu } from "lucide-react";

type Props = {
  type: "admin" | "dashboard";
};

export function MobileMenu({ type }: Props) {
  const navigationItems =
    type === "admin" ? navigationItemsAdmin : navigationItemsDashboard;
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="size-6" />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Mikrotik Panel</SheetTitle>
          </SheetHeader>

          {navigationItems.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </SheetContent>
      </Sheet>
    </div>
  );
}
