import { FileSlidersIcon, HomeIcon } from "lucide-react";
import { NavigationItem } from "./navigation-item.type";

export const navigationItemsDashboard: NavigationItem[] = [
  {
    title: "Home",
    href: "/dashboard",
    icon: <HomeIcon />,
  },
  {
    title: "Firewall",
    href: "/dashboard/firewall",
    icon: <FileSlidersIcon />,
  },
] as const;
