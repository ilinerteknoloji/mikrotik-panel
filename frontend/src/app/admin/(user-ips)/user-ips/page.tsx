import { DataTablePagination } from "@/components/admin/data-table/pagination";
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
import { UserIpsPageSearchParams } from "@/lib/types/admin/user-ips-page";
import { fetchUserIps } from "@/lib/utils/fetch-requests/user-ips/all";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

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
            Manage user ips. Click on the &quot;Open&quot; button to open the
            user ip
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
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
                  label: "Ip Category",
                  data: (data) => data.addressList[0].ipCategory.title,
                },
                {
                  label: "User",
                  key: "userId",
                  data: (data) => data.user.username,
                  className: "capitalize",
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
                    <Link
                      href={`/admin/user-ips/${data.user.username}/${data.ip}`}
                    >
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

        <CardFooter></CardFooter>
      </Card>
    </section>
  );
}
