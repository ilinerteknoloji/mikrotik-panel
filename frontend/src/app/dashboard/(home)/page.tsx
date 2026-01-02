import { TorchChart } from "@/components/dashboard/charts";
import { TorchTables } from "@/components/dashboard/torch-tables";

export default function HomePage() {
  return (
    <div className="min-h-full space-y-4">
      <TorchChart />
      <TorchTables />
    </div>
  );
}
