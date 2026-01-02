import { ClientSideTable } from "@/components/general/cliend-side-data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { arpColumns } from "./columns";
import { fetchAllArps } from "@/lib/utils/fetch-requests/ip/arp/fetch-all-arps";

type Props = Readonly<{}>;

export const metadata: Metadata = {
  // TODO: Add metadata ArpPage
};

export default async function ArpPage({}: Props) {
  const response = await fetchAllArps();
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>ARP</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-stretch justify-center gap-4 md:flex-row md:items-center md:justify-between">
            <Link href="/admin/ip/arp/add">
              <Button type="button" variant="default" size="icon">
                <Plus />
              </Button>
            </Link>
          </div>
          <div className="flex flex-1 flex-col items-stretch justify-center gap-4">
            <ClientSideTable
              data={response.status ? response.data : []}
              columns={arpColumns}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
