"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { NavigationItem } from "@/lib/constant/navigation-items/navigation-item.type";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { SidebarItemLink } from "./sidebar-item-link";

type Props = {
  item: NavigationItem;
};

export function SidebarItem({ item }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  // const pageName = usePageStore((state) => state.pageName);
  // const setPage = usePageStore((state) => state.setPage);

  return (
    <Collapsible
      defaultOpen={isExpanded}
      open={isExpanded}
      onOpenChange={setIsExpanded}
    >
      <div className="flex h-9 w-full items-center justify-between">
        <SidebarItemLink
          item={item}
          isExpanded={isExpanded}
          onClick={() => setIsExpanded((prev) => !prev)}
        />
        {item.children && item.href ? (
          <CollapsibleTrigger className="group/trigger" asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? (
                <ChevronDown />
              ) : (
                <ChevronRight className="transition-transform duration-300 group-hover/trigger:rotate-90" />
              )}
            </Button>
          </CollapsibleTrigger>
        ) : null}
      </div>
      {item.children ? (
        <CollapsibleContent className="relative ml-3 flex flex-col gap-3 pl-3 before:absolute before:bottom-[18px] before:left-0 before:top-0 before:border-l before:border-secondary">
          {item.children.map((child, index) => (
            <SidebarItem key={index} item={child} />
          ))}
        </CollapsibleContent>
      ) : null}
    </Collapsible>
  );
}
