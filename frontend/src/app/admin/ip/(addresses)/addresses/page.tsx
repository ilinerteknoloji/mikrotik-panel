import { ClientSideTable } from "@/components/general/cliend-side-data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAllAddresses } from "@/lib/utils/fetch-requests/ip/addresses/fetch-all-addresses";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ipAddressesColumns } from "./column";

type Props = Readonly<{}>;

export const metadata: Metadata = {
  // TODO: Add metadata AddressesPage
};

export default async function AddressesPage({}: Props) {
  const response = await fetchAllAddresses();
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Ip Addresses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-stretch justify-center gap-4 md:flex-row md:items-center md:justify-between">
            <Link href="/admin/ip/addresses/add">
              <Button type="button" variant="default" size="icon">
                <Plus />
              </Button>
            </Link>
          </div>
          <div className="flex flex-1 flex-col items-stretch justify-center gap-4">
            <ClientSideTable
              data={response.status ? response.data : []}
              columns={ipAddressesColumns}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
