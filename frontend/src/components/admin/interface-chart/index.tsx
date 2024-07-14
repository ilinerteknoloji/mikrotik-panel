import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { InterfaceRadialChart } from "./interface-radial-chart";
import { fetchInterfaces } from "@/lib/utils/fetch-requests/interfaces/fetch-interfaces";

type Props = {};

type GroupedInterface = { type: string; count: number; fill: string }[];

export async function InterfacesChart({}: Props) {
  const response = await fetchInterfaces();
  if (!response.status) return null;

  const interfaces: GroupedInterface = [];
  const chartConfig: ChartConfig = {};

  response.data.forEach((interfaceItem, index) => {
    const type = interfaceItem.type;
    const count = interfaces.find((item) => item.type === type);
    if (count) {
      count.count++;
    } else {
      interfaces.push({
        type,
        count: 1,
        fill: `var(--color-${type})`,
      });
      chartConfig[type] = {
        label: type,
        color: `hsl(var(--chart-${interfaces.length + 1 > 5 ? (interfaces.length % 5) + 1 : interfaces.length + 1}))`,
      };
    }
  });

  return (
    <Card className="w-full md:w-fit">
      <CardHeader>
        <CardTitle>Interfaces</CardTitle>
        <CardDescription>
          Total number of interfaces grouped by type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mx-auto size-[250px] max-w-full">
          <InterfaceRadialChart
            interfaces={interfaces}
            chartConfig={chartConfig}
          />
        </div>
      </CardContent>
    </Card>
  );
}
