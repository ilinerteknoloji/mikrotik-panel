"use client";

import { navigationItems } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { usePageStore } from "@/stores";
import Link from "next/link";

type PageName = (typeof navigationItems)[number]["title"];
type Href = (typeof navigationItems)[number]["href"];
type Props = {
  item: {
    title: PageName;
    href: Href;
    icon: React.ReactNode;
  };
};

export function SidebarItem({ item }: Props) {
  const pageName = usePageStore((state) => state.pageName);
  const setPage = usePageStore((state) => state.setPage);

  return (
    <Link
      href={item.href}
      className={cn(
        "flex gap-2 rounded px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-secondary",
        pageName === item.title ? "text-primary" : "text-muted-foreground",
      )}
      onClick={() => setPage(item.title, item.href)}
    >
      {item.icon}
      {item.title}
    </Link>
  );
}
