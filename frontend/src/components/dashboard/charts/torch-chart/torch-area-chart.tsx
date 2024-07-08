"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTorchStore } from "@/stores";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

type Props = {};

const chartConfig = {
  time: {
    label: "Time",
  },
  rx: {
    label: "RX",
    color: "hsl(var(--chart-1))",
  },
  rxPackets: {
    label: "RX Packets",
    color: "hsl(var(--chart-2))",
  },
  tx: {
    label: "TX",
    color: "hsl(var(--chart-3))",
  },
  txPackets: {
    label: "TX Packets",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function TorchAreaChart({}: Props) {
  const { labels, rxData, rxPacketsData, txData, txPacketsData } =
    useTorchStore();
  // TODO: Implement timeRange state
  const [timeRange, setTimeRange] = useState(
    labels.length < 30 ? labels.length : 30,
  ); // [5, 10, 15, 30, 60]
  const data: {
    time: string;
    rx: number;
    rxPackets: number;
    tx: number;
    txPackets: number;
  }[] = [];
  for (let i = 0; i < timeRange; i++) {
    data.unshift({
      time: labels[i],
      rx: rxData[i],
      rxPackets: rxPacketsData[i],
      tx: txData[i],
      txPackets: txPacketsData[i],
    });
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <AreaChart data={data}>
        <defs>
          <linearGradient id="fillRx" x1={0} y1={0} x2={0} y2={1}>
            <stop offset="5%" stopColor="var(--color-rx)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-rx)" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="fillRxPackets" x1={0} y1={0} x2={0} y2={1}>
            <stop
              offset="5%"
              stopColor="var(--color-rxPackets)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-rxPackets)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillTx" x1={0} y1={0} x2={0} y2={1}>
            <stop offset="5%" stopColor="var(--color-tx)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-tx)" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="fillTxPackets" x1={0} y1={0} x2={0} y2={1}>
            <stop
              offset="5%"
              stopColor="var(--color-txPackets)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-txPackets)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={true} />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) =>
            new Date(value).toLocaleString(window.navigator.language, {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            })
          }
        />
        {/* <YAxis /> */}
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) =>
                new Date(value).toLocaleTimeString(window.navigator.language, {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })
              }
              indicator="line"
            />
          }
        />
        <Area
          dataKey="rx"
          type="natural"
          fill="url(#fillRx)"
          stroke="var(--color-rx)"
          stackId={1}
        />
        <Area
          dataKey="rxPackets"
          type="natural"
          fill="url(#fillRxPackets)"
          stroke="var(--color-rxPackets)"
          stackId={1}
        />
        <Area
          dataKey="tx"
          type="natural"
          fill="url(#fillTx)"
          stroke="var(--color-tx)"
          stackId={1}
        />
        <Area
          dataKey="txPackets"
          type="natural"
          fill="url(#fillTxPackets)"
          stroke="var(--color-txPackets)"
          stackId={1}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
}
