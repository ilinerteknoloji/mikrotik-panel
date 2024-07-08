import { SidebarItem } from "@/components/general/sidebar/sidebar-item";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigationItemsDashboard } from "@/lib/constant";
import { Menu } from "lucide-react";

type Props = {};

export function MobileMenu({}: Props) {
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

          {navigationItemsDashboard.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </SheetContent>
      </Sheet>
    </div>
  );
}
