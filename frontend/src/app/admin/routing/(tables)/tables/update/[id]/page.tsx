import { ServerAlerts } from "@/components/general/server-alerts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchRoutingTableById } from "@/lib/utils/fetch-requests/routing/tables/fetch-by-id";
import type { Metadata } from "next";
import { RoutingTableForm } from "../../_components/add-routing-table/form";

type Props = Readonly<{
  params: {
    id: string;
  };
}>;

export const metadata: Metadata = {
  // TODO: Add metadata [id]Page
};

export default async function RoutingTablesUpdatePage({
  params: { id },
}: Props) {
  const response = await fetchRoutingTableById(id);
  if (!response.status)
    return <ServerAlerts title="Error" description={response.message} />;
  const { data } = response;

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>{data.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mx-auto w-[500px] max-w-full">
            <RoutingTableForm type="update" id={id} formData={data} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
