"use client";

import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

type Props = {
  title: string;
  description: string;
};

export function ServerToast({ title, description }: Props) {
  const { toast } = useToast();
  useEffect(() => {
    toast({ title, description });
  }, []);
  return <span />;
}
