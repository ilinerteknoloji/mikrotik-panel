import { ServerAlerts } from "@/components/general/server-alerts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAllBGPConnections } from "@/lib/utils/fetch-requests/routing/bgp/fetch-all-bgp-connections";
import { fetchBGPById } from "@/lib/utils/fetch-requests/routing/bgp/fetch-bgp-bg-id";
import { fetchAllBGPTemplates } from "@/lib/utils/fetch-requests/routing/bgp/templates/fetch-all-bgp-templates";
import type { Metadata } from "next";
import { RoutingBGPConnectionAddForm } from "../../add/form";

type Props = Readonly<{
  params: {
    id: string;
  };
}>;

export const metadata: Metadata = {
  // TODO: Add metadata [id]Page
};

export default async function BGPUpdatePage({ params: { id } }: Props) {
  const response = await fetchBGPById(id);
  const templates = await fetchAllBGPTemplates();
  let templatesNames: string[] = [];
  if (templates.status)
    templatesNames = templates.data.map((template) => template.name);
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
            <RoutingBGPConnectionAddForm
              type="update"
              id={id}
              formData={data}
              templates={templatesNames}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
