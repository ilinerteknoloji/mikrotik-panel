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
    href: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Firewall",
    href: "/firewall",
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
    href: "/p/",
    icon: <User />,
  },
  {
    title: "Devices",
    href: "/devices",
    icon: <MonitorSmartphone />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings />,
  },
  {
    title: "Billing",
    href: "/billing",
    icon: <Receipt />,
  },
  ...navigationItems,
] as const;
