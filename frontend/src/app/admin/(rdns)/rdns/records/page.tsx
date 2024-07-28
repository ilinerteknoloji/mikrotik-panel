import { ClearFilters } from "@/components/admin/data-table/filters/clear-filters";
import { PageItemCount } from "@/components/admin/data-table/filters/page-item-count";
import { DataTableSearchFilter } from "@/components/admin/data-table/filters/search";
import { DataTablePagination } from "@/components/admin/data-table/pagination";
import { dataTableSearchParamType } from "@/components/admin/data-table/search-params.type";
import { DataTable } from "@/components/admin/data-table/table";
import { ServerAlerts } from "@/components/general/server-alerts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchAllRDnsHosts } from "@/lib/utils/fetch-requests/rdns/all-hosts";
import { fetchAllRDnsRecords } from "@/lib/utils/fetch-requests/rdns/all-records";
import type { Metadata } from "next";
import { DomainFilter } from "./_components/domain-filter";
import { Prettify } from "@/lib/types/pretiffy.type";

type Props = Readonly<{
  searchParams: Prettify<dataTableSearchParamType & { host?: string }>;
}>;

export const metadata: Metadata = {
  // TODO: Add metadata RecordsPage
};

export default async function RDnsRecordsPage({ searchParams }: Props) {
  const rDnsHosts = await fetchAllRDnsHosts({ page: 1, limit: 100 });
  if (searchParams.page < 1 || !searchParams?.page) searchParams.page = 1;
  if ((searchParams.limit && searchParams?.limit < 10) || !searchParams?.limit)
    searchParams.limit = 10;
  else if (searchParams?.limit > 50) searchParams.limit = 50;
  if (!searchParams.host)
    searchParams.host = rDnsHosts.status ? rDnsHosts.data[0].hostname : "";
  const response = await fetchAllRDnsRecords(searchParams);
  const filteredRecords = (response.status ? response.data : []).filter(
    (record) => record.domainName === searchParams.host,
  );
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>RDns Records</CardTitle>
          <CardDescription>
            Reverse DNS (RDns) is a system that enables the resolution of an IP
            address to a domain name.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-stretch justify-center gap-4 md:flex-row md:items-center md:justify-between">
            {/* <AddRdns /> */}
            <div></div>
            <div className="flex flex-col items-center justify-end gap-4 md:flex-row md:items-end">
              <DataTableSearchFilter searchParams={searchParams} />
              <DomainFilter
                searchParams={searchParams}
                hosts={rDnsHosts.status ? rDnsHosts.data : []}
              />
              <PageItemCount searchParams={searchParams} />
              <ClearFilters href="/admin/rdns/records" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            {!response.status ? (
              <ServerAlerts title="Error" description={response.message} />
            ) : null}
            <DataTable
              data={filteredRecords}
              headerData={[
                {
                  label: "ID",
                  data: (data) => data.id,
                },
                {
                  label: "Type",
                  data: (data) => data.type,
                },
                {
                  label: "Host",
                  data: (data) => data.host,
                },
                {
                  label: "Record",
                  data: (data) => data.record,
                },
                {
                  label: "Failover",
                  data: (data) => data.failover,
                },
                {
                  label: "TTL",
                  data: (data) => data.ttl,
                },
                {
                  label: "Status",
                  data: (data) => data.status,
                },
                {
                  label: "Domain Name",
                  data: (data) => data.domainName,
                },
              ]}
            />
          </div>

          <DataTablePagination
            searchParams={searchParams}
            fetchData={fetchAllRDnsRecords}
          />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </section>
  );
}
