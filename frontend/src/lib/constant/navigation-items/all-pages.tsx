import { MonitorSmartphone, Receipt, Settings, User } from "lucide-react";
import React from "react";
import { navigationItemsAdmin } from "./admin-navigation-items";
import { navigationItemsDashboard } from "./dashboard-navigation-items";

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
