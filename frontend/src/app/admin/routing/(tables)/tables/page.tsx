import { ClientSideTable } from "@/components/general/cliend-side-data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAllTables } from "@/lib/utils/fetch-requests/routing/tables/fetch-all-tables";
import type { Metadata } from "next";
import { routingTablesColumns } from "./columns";
import { AddRoutingTableDialog } from "./_components/add-routing-table/dialog";

type Props = Readonly<{}>;

export const metadata: Metadata = {
  // TODO: Add metadata TablesPage
};

export default async function TablesPage({}: Props) {
  const response = await fetchAllTables();
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Tables</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-stretch justify-center gap-4 md:flex-row md:items-center md:justify-between">
            <AddRoutingTableDialog />
          </div>
          <div className="flex flex-1 flex-col items-stretch justify-center gap-4">
            <ClientSideTable
              data={response.status ? response.data : []}
              columns={routingTablesColumns}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
