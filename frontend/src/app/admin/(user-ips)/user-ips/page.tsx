import { DataTablePagination } from "@/components/admin/data-table/pagination";
import { DataTable } from "@/components/admin/data-table/table";
import { ServerAlerts } from "@/components/general/server-alerts";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserIpsPageSearchParams } from "@/lib/types/admin/user-ips-page";
import { fetchUserIps } from "@/lib/utils/fetch-requests/user-ips/all";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AddUserIps } from "./_components/add-user-ips";

type Props = {
  params: {
    locale: string;
  };
  searchParams: UserIpsPageSearchParams;
};

export const metadata: Metadata = {
  // TODO: Add metadata IpsPage
};

export default async function IpsPage({ searchParams }: Props) {
  if (searchParams.page < 1 || !searchParams?.page) searchParams.page = 1;
  if ((searchParams.limit && searchParams?.limit < 10) || !searchParams?.limit)
    searchParams.limit = 10;
  else if (searchParams?.limit > 50) searchParams.limit = 50;

  const response = await fetchUserIps(searchParams);

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>User Ips</CardTitle>
          <CardDescription>
            Kullanıcı Iplerini yönetin. Detayları açmak için &quot;Aç&quot;
            düğmesine tıklayın.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <AddUserIps />
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            {!response.status ? (
              <ServerAlerts title="Error" description={response.message} />
            ) : null}
            {/* TODO: Filters and details pages */}
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
                  label: "IP",
                  key: "ip",
                  data: (data) => data.ip,
                },
                {
                  label: "Kategori",
                  data: (data) => data.addressList[0].ipCategory.title,
                },
                {
                  label: "Kullanıcı",
                  key: "userId",
                  data: (data) => data.user.username,
                  className: "capitalize",
                },
                {
                  label: "Durum",
                  key: "status",
                  data: (data) => (
                    <Badge variant={data.status ? "default" : "destructive"}>
                      {data.status ? "Aktif" : "Pasif"}
                    </Badge>
                  ),
                },
                {
                  label: "Oluşturulduğu Tarih",
                  key: "createdAt",
                  data: (data) => new Date(data.createdAt).toLocaleString("tr"),
                },
                {
                  label: "Aç",
                  data: (data) => (
                    <Link href={`/admin/user-ips/${data.id}`}>
                      <ExternalLink />
                    </Link>
                  ),
                },
              ]}
            />
          </div>

          <DataTablePagination
            searchParams={searchParams}
            fetchData={fetchUserIps}
          />
        </CardContent>
      </Card>
    </section>
  );
}
