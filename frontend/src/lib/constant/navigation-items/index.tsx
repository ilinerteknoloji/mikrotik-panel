import {
  FileSlidersIcon,
  HomeIcon,
  MonitorSmartphone,
  NotebookTabs,
  Receipt,
  Settings,
  User,
  Users,
} from "lucide-react";
import React from "react";

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

export const navigationItemsAdmin = [
  {
    title: "Admin Home",
    href: "/admin",
    icon: <HomeIcon />,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: <Users />,
  },
  {
    title: "User Ips",
    href: "/admin/user-ips",
    icon: <NotebookTabs />,
  },
  {
    title: "Admin Interface",
    href: "/admin/interface",
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
  ...navigationItemsDashboard,
  ...navigationItemsAdmin,
] as const;
