import { ClearFilters } from "@/components/admin/data-table/filters/clear-filters";
import { DataTableSearchFilter } from "@/components/admin/data-table/filters/search";
import { StatusFilter } from "@/components/admin/data-table/filters/status-filter";
import { DataTablePagination } from "@/components/admin/data-table/pagination";
import { dataTableSearchParamType } from "@/components/admin/data-table/search-params.type";
import { DataTable } from "@/components/admin/data-table/table";
import { ServerAlerts } from "@/components/general/server-alerts";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchAllRDnsHosts } from "@/lib/utils/fetch-requests/rdns/all-hosts";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AddRdns } from "./_components/add";
import { UpdateRdns } from "./_components/update";

type Props = Readonly<{
  searchParams: dataTableSearchParamType;
}>;

export const metadata: Metadata = {
  // TODO: Add metadata RdnsPage
};

export default async function RDnsPage({ searchParams }: Props) {
  if (searchParams.page < 1 || !searchParams?.page) searchParams.page = 1;
  if ((searchParams.limit && searchParams?.limit < 10) || !searchParams?.limit)
    searchParams.limit = 10;
  else if (searchParams?.limit > 50) searchParams.limit = 50;

  const response = await fetchAllRDnsHosts(searchParams);

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>RDns Hosts</CardTitle>
          <CardDescription>
            Reverse DNS (RDns) is a system that enables the resolution of an IP
            address to a domain name.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col items-stretch justify-center gap-4 md:flex-row md:items-center md:justify-between">
            <AddRdns />
            <div className="flex flex-col items-center justify-end gap-4 md:flex-row md:items-end">
              <DataTableSearchFilter searchParams={searchParams} />
              <StatusFilter searchParams={searchParams} />
              <ClearFilters href="/admin/rdns" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            {!response.status ? (
              <ServerAlerts title="Error" description={response.message} />
            ) : null}
            <DataTable
              data={response.status ? response.data : []}
              headerData={[
                {
                  label: "ID",
                  key: "id",
                  data: (data) => data.id,
                  className: "w-[100px] font-semibold",
                },
                {
                  label: "Hostname",
                  key: "hostname",
                  data: (data) => data.hostname,
                },
                {
                  label: "Hostname Main",
                  key: "hostnameMain",
                  data: (data) => data.hostnameMain,
                },
                {
                  label: "Status",
                  key: "status",
                  data: (data) => (
                    <Badge variant={data.status ? "default" : "destructive"}>
                      {data.status ? "Active" : "Passive"}
                    </Badge>
                  ),
                },
                {
                  label: "Created At",
                  key: "createdAt",
                  data: (data) => new Date(data.createdAt).toLocaleString("tr"),
                },
                {
                  label: "Open",
                  data: (data) => (
                    <UpdateRdns
                      id={data.id}
                      hostname={data.hostname}
                      hostnameMain={data.hostnameMain}
                      status={data.status}
                    />
                  ),
                },
              ]}
            />
          </div>

          <DataTablePagination
            searchParams={searchParams}
            fetchData={fetchAllRDnsHosts}
          />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </section>
  );
}
