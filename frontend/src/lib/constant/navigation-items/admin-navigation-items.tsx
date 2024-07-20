import { FileSlidersIcon, HomeIcon, NotebookTabs, Users } from "lucide-react";

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
    title: "Interfaces",
    href: "/admin/interfaces",
    icon: <FileSlidersIcon />,
  },
] as const;
