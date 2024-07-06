import {
  FileSlidersIcon,
  HomeIcon,
  MonitorSmartphone,
  Receipt,
  Settings,
  User,
} from "lucide-react";
import React from "react";

export const navigationItems = [
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

export const allPages: {
  title: string;
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    title: "Profile",
    href: "/dashboard/p/",
    icon: <User />,
  },
  {
    title: "Devices",
    href: "/dashboard/devices",
    icon: <MonitorSmartphone />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings />,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: <Receipt />,
  },
  ...navigationItems,
] as const;
