"use client";

import { useTorchStore } from "@/stores";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { torchTableData } from "./columns";
import { TorchDataTable } from "./data-table";

type Props = {
  className?: string;
};

export function TorchTables({ className }: Props) {
  const { labels, rxData, rxPacketsData, txData, txPacketsData } =
    useTorchStore();

  const data = [];
  for (let i = 0; i < labels.length; i++) {
    data.unshift({
      labels: labels[i],
      rxData: rxData[i],
      rxPacketsData: rxPacketsData[i],
      txData: txData[i],
      txPacketsData: txPacketsData[i],
    });
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Torch Data</CardTitle>
      </CardHeader>
      <CardContent>
        <TorchDataTable columns={torchTableData} data={data} />
      </CardContent>
    </Card>
  );
}
