"use client";

import { Button } from "@/components/ui/button";
import { NavigationItem } from "@/lib/constant/navigation-items/navigation-item.type";
import { ChevronDown, ChevronRight, File } from "lucide-react";
import Link from "next/link";

type Props = Readonly<{
  item: NavigationItem;
  isExpanded: boolean;
  onClick: () => void;
}>;

export function SidebarItemLink({
  item: { title, href, icon },
  isExpanded,
  onClick,
}: Props) {
  return (
    <>
      {href ? (
        <Link
          href={href}
          className="flex flex-1 items-center gap-2 hover:text-primary"
        >
          {icon ? icon : <File />}
          <p>{title}</p>
        </Link>
      ) : (
        <button
          type="button"
          className="flex h-full flex-1 items-center justify-between gap-2 rounded-md hover:bg-accent hover:text-accent-foreground"
          onClick={onClick}
        >
          <div className="flex items-center gap-2">
            {icon ? icon : <File />}
            <p>{title}</p>
          </div>
          <Button type="button" variant="ghost" size="icon">
            {isExpanded ? (
              <ChevronDown />
            ) : (
              <ChevronRight className="transition-transform duration-300 group-hover/trigger:rotate-90" />
            )}
          </Button>
        </button>
      )}
    </>
  );
}
