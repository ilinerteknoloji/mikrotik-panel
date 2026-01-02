import { ClientSideTable } from "@/components/general/cliend-side-data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAllBGPConnections } from "@/lib/utils/fetch-requests/routing/bgp/fetch-all-bgp-connections";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { bgpConnectionsColumns } from "./columns";

type Props = Readonly<{}>;

export const metadata: Metadata = {
  // TODO: Add metadata (bgp)Page
};

export default async function BGPPage({}: Props) {
  const response = await fetchAllBGPConnections();
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>BGP Connections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-stretch justify-center gap-4 md:flex-row md:items-center md:justify-between">
            <Link href="/admin/routing/bgp/add">
              <Button type="button" variant="default" size="icon">
                <Plus />
              </Button>
            </Link>
          </div>
          <div className="flex flex-1 flex-col items-stretch justify-center gap-4">
            <ClientSideTable
              data={response.status ? response.data : []}
              columns={bgpConnectionsColumns}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
