import { InterfacesChart } from "@/components/admin/interface-chart";
import type { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  // TODO: Add metadata InterfacesPage
};

export default async function InterfacesPage({}: Props) {
  return (
    <section>
      <InterfacesChart />
    </section>
  );
}
