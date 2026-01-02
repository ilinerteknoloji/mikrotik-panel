import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import { RoutingBGPConnectionAddForm } from "./form";
import { fetchAllBGPTemplates } from "@/lib/utils/fetch-requests/routing/bgp/templates/fetch-all-bgp-templates";

type Props = Readonly<{}>;

export const metadata: Metadata = {
  // TODO: Add metadata AddPage
};

export default async function RoutingBGPConnectionsAddPage({}: Props) {
  const response = await fetchAllBGPTemplates();
  let templates: string[] = [];
  if (response.status)
    templates = response.data.map((template) => template.name);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create BGP Connection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mx-auto w-[500px] max-w-full">
          <RoutingBGPConnectionAddForm templates={templates} />
        </div>
      </CardContent>
    </Card>
  );
}
