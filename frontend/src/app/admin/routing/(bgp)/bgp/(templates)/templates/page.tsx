import { ClientSideTable } from "@/components/general/cliend-side-data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAllBGPTemplates } from "@/lib/utils/fetch-requests/routing/bgp/templates/fetch-all-bgp-templates";
import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bgpTemplatesColumns } from "./columns";

type Props = Readonly<{}>;

export const metadata: Metadata = {
  // TODO: Add metadata (templates)Page
};

export default async function BGPTemplatesPage({}: Props) {
  const response = await fetchAllBGPTemplates();
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>BGP Templates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-stretch justify-center gap-4 md:flex-row md:items-center md:justify-between">
            <Link href="/admin/routing/bgp/templates/add">
              <Button type="button" variant="default" size="icon">
                <Plus />
              </Button>
            </Link>
          </div>
          <div className="flex flex-1 flex-col items-stretch justify-center gap-4">
            <ClientSideTable
              data={response.status ? response.data : []}
              columns={bgpTemplatesColumns}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
