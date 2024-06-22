"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { env } from "@/schema";
import { torchResponseSchema } from "@/schema/response/tool/torch";
import { useTorchStore } from "@/stores";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { LineChart } from "./chart";

type Props = {};

export function TorchChart({}: Props) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const setData = useTorchStore((state) => state.setData);

  useEffect(() => {
    const fetchData = async () => {
      const torchResponse = await fetch(`${env.BACKEND_URL}/torch`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interface: "ether1",
          duration: 2,
        }),
      });
      const torchJson = await torchResponse.json();
      const parsedTorch = torchResponseSchema.safeParse(torchJson);
      if (!torchResponse.ok) {
        toast({
          title: "Error",
          description: torchResponse.statusText,
        });
      } else if (!parsedTorch.success) {
        parsedTorch.error.errors.forEach((error) => {
          toast({
            title: error.code,
            description: error.message,
          });
        });
      } else if (!parsedTorch.data.status) {
        toast({
          title: "Error",
          description: parsedTorch.data.error,
        });
      } else {
        const response = parsedTorch.data.response;
        setData([
          response.name,
          response.torchData[0].rx,
          response.torchData[0]["rx-packets"],
          response.torchData[0].tx,
          response.torchData[0]["tx-packets"],
        ]);
      }
    };
    // if (session?.accessToken) setChartInterval(setInterval(fetchData, 2000));
    if (session?.accessToken) fetchData();
  }, [session]);

  if (!session) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Torch Chart</CardTitle>
        <CardDescription>Real-time traffic monitoring tool</CardDescription>
      </CardHeader>
      <CardContent>
        <LineChart />
      </CardContent>
    </Card>
  );
}
