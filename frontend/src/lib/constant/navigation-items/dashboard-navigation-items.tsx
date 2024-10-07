import { FileSlidersIcon, HomeIcon, Server } from "lucide-react";
import { NavigationItem } from "./navigation-item.type";

export const navigationItemsDashboard: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <HomeIcon />,
  },
  {
    title: "Firewall",
    href: "/dashboard/firewall",
    icon: <FileSlidersIcon />,
  },
  {
    title: "RDns",
    href: "/dashboard/rdns",
    icon: <Server />,
  },
] as const;
