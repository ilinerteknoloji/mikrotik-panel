import { InterfacesChart } from "@/components/admin/interface-chart";
import { TorchChart } from "@/components/dashboard/charts";
import { TorchTables } from "@/components/dashboard/torch-tables";
import type { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  // TODO: Add metadata AdminPage
};

export default async function AdminPage({}: Props) {
  return (
    <section className="flex flex-col gap-4">
      <InterfacesChart />
      <TorchChart />
      <TorchTables />
    </section>
  );
}
