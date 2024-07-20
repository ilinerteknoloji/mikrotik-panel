import { FileSlidersIcon, HomeIcon } from "lucide-react";

export const navigationItemsDashboard = [
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
