import { ServerAlerts } from "@/components/general/server-alerts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchBGPTemplateById } from "@/lib/utils/fetch-requests/routing/bgp/templates/fetch-bgp-by-id";
import type { Metadata } from "next";
import { RoutingBGPTemplateAddForm } from "../../add/form";

type Props = Readonly<{
  params: {
    id: string;
  };
}>;

export const metadata: Metadata = {
  // TODO: Add metadata [id]Page
};

export default async function BGPTemplatePage({ params: { id } }: Props) {
  const response = await fetchBGPTemplateById(id);
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
            <RoutingBGPTemplateAddForm type="update" id={id} formData={data} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
