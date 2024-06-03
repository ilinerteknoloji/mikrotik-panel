"use client";

import { globeConfig, sampleArcs } from "@/data/globe-config";
import { FaSpinner } from "react-icons/fa6";
import dynamic from "next/dynamic";

const Globe = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => <FaSpinner className="size-8 animate-spin fill-primary" />,
  },
);

type Props = {};

export function World({}: Props) {
  return <Globe data={sampleArcs} globeConfig={globeConfig} />;
}
