import {
  FileSlidersIcon,
  HomeIcon,
  ListCollapse,
  ListEnd,
  NotebookTabs,
  Server,
  Users,
} from "lucide-react";
import { NavigationItem } from "./navigation-item.type";

export const navigationItemsAdmin: NavigationItem[] = [
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
    title: "Interfaces",
    href: "/admin/interfaces",
    icon: <FileSlidersIcon />,
    children: [
      {
        href: "/admin/interfaces/bridge",
        title: "Bridge",
      },
      {
        href: "/admin/interfaces/	gre-tunnel",
        title: "GRE Tunnel",
      },
      {
        href: "/admin/interfaces/ipip-tunnel",
        title: "IpIp Tunnel",
      },
    ],
  },
  {
    title: "Queues",
    href: "/admin/queues",
    icon: <ListEnd />,
  },
  {
    title: "RDns Hosts",
    href: "/admin/rdns",
    icon: <Server />,
    children: [
      {
        title: "Records",
        href: "/admin/rdns/records",
        icon: <ListCollapse />,
      },
    ],
  },
] as const;
