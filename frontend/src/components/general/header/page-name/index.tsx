"use client";

import { allPages } from "@/lib/constant";
import { usePageStore } from "@/stores";
import { LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";

type Props = {};

export function PageName({}: Props) {
  const { pageName, href, setPage } = usePageStore((state) => state);
  const path = usePathname();
  const { update } = useSession();

  useEffect(() => {
    const interval = setInterval(() => update(), 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [update]);

  useEffect(() => {
    const visibilityHandler = () =>
      document.visibilityState === "visible" && update();
    window.addEventListener("visibilitychange", visibilityHandler, false);
    return () =>
      window.removeEventListener("visibilitychange", visibilityHandler, false);
  }, [update]);

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

  return (
    <Suspense fallback={<LoaderCircle className="animate-spin" />}>
      <div className="flex items-center justify-center gap-2">
        {allPages.find((item) => item.href === href)?.icon}
        <h2 className="text-xl">{pageName}</h2>
      </div>
    </Suspense>
  );
}
