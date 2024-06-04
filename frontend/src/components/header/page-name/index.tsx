"use client";

import { usePageStore } from "@/stores";

type Props = {};

export function PageName({}: Props) {
  const pageName = usePageStore((state) => state.pageName);
  return <h2 className="text-xl">{pageName}</h2>;
}
