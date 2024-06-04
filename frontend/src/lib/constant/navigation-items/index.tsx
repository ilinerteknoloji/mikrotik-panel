import {
  HomeIcon,
  LayoutDashboard,
  MonitorSmartphone,
  Receipt,
  Settings,
  User,
  Users,
} from "lucide-react";

export const navigationItems = [
  {
    title: "Home",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Devices",
    href: "/devices",
    icon: <MonitorSmartphone />,
  },
  {
    title: "Users",
    href: "/users",
    icon: <User />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings />,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: <User />,
  },
  {
    title: "Billing",
    href: "/billing",
    icon: <Receipt />,
  },
  {
    title: "Team",
    href: "/team",
    icon: <Users />,
  },
] as const;
