"use client";

import { allPages } from "@/lib/constant";
import { usePageStore } from "@/stores";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type Props = {};

export function PageName({}: Props) {
  const { pageName, href, setPage } = usePageStore((state) => state);
  const path = usePathname();

  useEffect(() => {
    if (path !== href) {
      const page = allPages.find((item) =>
        item.href === "/" ? path === "/" : path.startsWith(item.href),
      );
      if (page) {
        setPage(page.title, page.href);
      }
    }
  }, [path, href, setPage, pageName]);

  return <h2 className="text-xl">{pageName}</h2>;
}
