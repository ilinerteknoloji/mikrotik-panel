import {
  FileSlidersIcon,
  HomeIcon,
  ListCollapse,
  ListEnd,
  NotebookTabs,
  NotepadText,
  NotepadTextDashed,
  Ratio,
  Server,
  Table,
  Users,
  Waypoints,
} from "lucide-react";
import { NavigationItem } from "./navigation-item.type";

export const navigationItemsAdmin: NavigationItem[] = [
  {
    title: "Admin Dashboard",
    href: "/admin",
    icon: <HomeIcon />,
  },
  {
    title: "Kullanıcılar",
    href: "/admin/users",
    icon: <Users />,
  },
  {
    title: "Kullanıcı Ipleri",
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
  {
    title: "Routing",
    icon: <Waypoints />,
    children: [
      {
        title: "BGP",
        href: "/admin/routing/bgp",
        icon: <NotepadText />,
        children: [
          {
            title: "Templates",
            href: "/admin/routing/bgp/templates",
            icon: <NotepadTextDashed />,
          },
        ],
      },
      {
        title: "Tables",
        href: "/admin/routing/tables",
        icon: <Table />,
      },
    ],
  },
  {
    title: "Ip",
    icon: <Server />,
    children: [
      {
        title: "Ip Adresleri",
        href: "/admin/ip/addresses",
        icon: <ListCollapse />,
      },
      {
        title: "ARP",
        href: "/admin/ip/arp",
        icon: <Ratio />,
      },
    ],
  },
] as const;
