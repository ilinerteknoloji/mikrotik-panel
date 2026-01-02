"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LabelList, RadialBar, RadialBarChart } from "recharts";

type Props = {
  interfaces: { type: string; count: number; fill: string }[];
  chartConfig: ChartConfig;
};

export function InterfaceRadialChart({ interfaces, chartConfig }: Props) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square size-[250px]"
    >
      <RadialBarChart
        data={interfaces}
        startAngle={-90}
        endAngle={380}
        innerRadius={30}
        outerRadius={110}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="type" />}
        />
        <RadialBar dataKey="count" background>
          <LabelList
            position="insideStart"
            dataKey="type"
            className="fill-white capitalize mix-blend-luminosity"
            fontSize={11}
          />
        </RadialBar>
      </RadialBarChart>
    </ChartContainer>
  );
}
