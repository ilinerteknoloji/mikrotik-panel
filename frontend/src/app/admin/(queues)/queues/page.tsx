import { DataTablePagination } from "@/components/admin/data-table/pagination";
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
import { fetchAllQueues } from "@/lib/utils/fetch-requests/queues/fetch-all";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

type Props = Readonly<{}>;

export const metadata: Metadata = {
  // TODO: Add metadata QueuesPage
};

export default async function QueuesPage({}: Props) {
  const response = await fetchAllQueues();
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Queues</CardTitle>
          <CardDescription>
            Queue is a tool used to limit, prioritize, and manage data traffic.
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
                  data: (data) => data[".id"].slice(1),
                  className: "text-right",
                },
                {
                  label: "Name",
                  data: (data) => data.name,
                },
                {
                  label: "Target",
                  data: (data) => data.target,
                },
                {
                  label: "Max Limit",
                  data: (data) => {
                    const [uploadStr, downloadStr] =
                      data["max-limit"].split("/");
                    if (uploadStr === "0" || downloadStr === "0")
                      return "No Limitation";
                    const uploadMB = parseInt(uploadStr) / (1000 * 1000);
                    const downloadMB = parseInt(downloadStr) / (1000 * 1000);
                    return `${uploadMB}MB/${downloadMB}MB`;
                  },
                },
                {
                  label: "Limit At",
                  data: (data) => {
                    const [uploadStr, downloadStr] =
                      data["limit-at"].split("/");
                    if (uploadStr === "0" || downloadStr === "0")
                      return "No Limitation";
                    const uploadMB = parseInt(uploadStr) / (1000 * 1000);
                    const downloadMB = parseInt(downloadStr) / (1000 * 1000);
                    return `${uploadMB}MB/${downloadMB}MB`;
                  },
                },
                {
                  label: "Priority",
                  data: (data) => data.priority,
                },
                {
                  label: "Open",
                  data: (data) => (
                    <Link href={`/admin/queues/${data[".id"].slice(1)}`}>
                      <ExternalLink />
                    </Link>
                  ),
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
