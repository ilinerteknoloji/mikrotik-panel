import { DataTable } from "@/components/admin/data-table/table";
import { InterfacesChart } from "@/components/admin/interface-chart";
import { ServerAlerts } from "@/components/general/server-alerts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchInterfaces } from "@/lib/utils/fetch-requests/interfaces/fetch-interfaces";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

type Props = {};

export const metadata: Metadata = {
  // TODO: Add metadata InterfacesPage
};

export default async function InterfacesPage({}: Props) {
  const response = await fetchInterfaces();
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Interfaces</CardTitle>
          <CardDescription>
            Total number of interfaces grouped by type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4">
            {!response.status ? (
              <ServerAlerts title="Error" description={response.message} />
            ) : null}

            <DataTable
              data={response.status ? response.data : []}
              headerData={[
                {
                  label: "ID",
                  data: (data) => data.id.slice(1),
                  className: "text-right",
                },
                {
                  label: "Name",
                  data: (data) => data.name,
                },
                {
                  label: "Type",
                  data: (data) => data.type,
                },
                {
                  label: "Open",
                  data: (data) => (
                    <Link href={`/admin/interfaces/${data.id.slice(1)}`}>
                      <ExternalLink />
                    </Link>
                  ),
                },
              ]}
            />
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </section>
  );
}
