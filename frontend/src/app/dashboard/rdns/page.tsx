import { DomainFilter } from "@/app/admin/(rdns)/rdns/records/_components/domain-filter";
import { UpdateDialog } from "@/app/admin/(rdns)/rdns/records/_components/update-dialog";
import { ClearFilters } from "@/components/admin/data-table/filters/clear-filters";
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
import { Prettify } from "@/lib/types/pretiffy.type";
import { fetchAllRDnsHosts } from "@/lib/utils/fetch-requests/rdns/all-hosts";
import { fetchAllRDnsRecords } from "@/lib/utils/fetch-requests/rdns/all-records";
import { Metadata } from "next/types";

type Props = Readonly<{
  searchParams: Prettify<dataTableSearchParamType & { host: string }>;
}>;

export const metadata: Metadata = {
  // TODO: Add metadata RdnsPage
};

export const dynamic = "force-dynamic";

export default async function RdnsPage({ searchParams }: Props) {
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
          <CardTitle>RDns Kayıtları</CardTitle>
          <CardDescription>
            Reverse DNS (RDNS), bir IP adresini alan adına çözümleyen bir
            sistemdir.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-stretch justify-center gap-4 md:flex-row md:items-center md:justify-between">
            <div />
            <div className="flex flex-col items-center justify-end gap-4 md:flex-row md:items-end">
              <DomainFilter
                searchParams={searchParams}
                hosts={rDnsHosts.status ? rDnsHosts.data : []}
              />
              <ClearFilters href="/dashboard/rdns" />
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
                  label: "Alan Adı",
                  data: (data) => data.domainName,
                },
                {
                  label: "Update",
                  data: (data) => <UpdateDialog record={data} />,
                },
              ]}
            />
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </section>
  );
}
