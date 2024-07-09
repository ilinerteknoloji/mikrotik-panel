"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { env } from "@/lib/schema/env";
import { torchResponseSchema } from "@/lib/schema/response/tool/torch";
import { useTorchStore } from "@/stores";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { TorchAreaChart } from "./torch-area-chart";

type Props = {};

export function TorchChart({}: Props) {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const setData = useTorchStore((state) => state.setData);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

  useEffect(() => {
    const fetchData = async () => {
      if (status === "loading") return;
      const torchResponse = await fetch(`${env.BACKEND_URL}/torch`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interface: "ether1",
          duration: 5,
        }),
      });
      const torchJson = await torchResponse.json();
      const parsedTorch = torchResponseSchema.safeParse(torchJson);
      if (!parsedTorch.success) {
        return toast({
          title: "Parsing Error",
          description: parsedTorch.error.message,
        });
      } else if (!parsedTorch.data.status) {
        const { error } = parsedTorch.data;
        return toast({
          title: "Error",
          description: Array.isArray(error) ? error.join(", ") : error,
        });
      }
      const response = parsedTorch.data.response;
      setData([
        response.name,
        response.torchData[0].rx,
        response.torchData[0]["rx-packets"],
        response.torchData[0].tx,
        response.torchData[0]["tx-packets"],
      ]);
    };
    if (session?.accessToken)
      setIntervalId(setInterval(fetchData, 1000 * 60 * 5));
    return () => clearInterval(intervalId);
  }, [session, status]);

  if (!session) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Torch Chart</CardTitle>
        <CardDescription>Real-time traffic monitoring tool</CardDescription>
      </CardHeader>
      <CardContent>
        <TorchAreaChart />
      </CardContent>
    </Card>
  );
}
