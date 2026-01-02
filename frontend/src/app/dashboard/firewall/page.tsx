import { authConfig } from "@/app/api/(auth)/auth/[...nextauth]/auth.config";
import { ServerAlerts } from "@/components/general/server-alerts";
import { env } from "@/lib/schema/env";
import { addressListsResponseSchema } from "@/lib/schema/response/firewall/address-list.schema";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { DataTable } from "./components/data-table";
import { columns } from "./components/data-table/columns";

type Props = {};

export const metadata: Metadata = {
  // TODO: Add metadata DashboardPage
};

export default async function FirewallPage({}: Props) {
  const session = await getServerSession(authConfig);

  const userIpsResponse = await fetch(`${env.BACKEND_URL}/address-lists`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  const userIpsJson = await userIpsResponse.json();
  const parsedUserIps = addressListsResponseSchema.safeParse(userIpsJson);
  const withIndexUserIps: Array<{
    id: number;
    ip: string;
    status: boolean;
    userId: number;
    mikrotikId: string;
    category: string;
    categoryId: number;
    index: number;
  }> = [];
  if (parsedUserIps.success && parsedUserIps.data.status)
    parsedUserIps.data.response.forEach((ip, index) =>
      withIndexUserIps.push({ ...ip, index }),
    );
  return (
    <div className="w-full space-y-4">
      {!parsedUserIps.success
        ? parsedUserIps.error.errors.map((error, index) => (
            <ServerAlerts
              key={index}
              title="Error"
              description={error.message}
            />
          ))
        : null}
      {parsedUserIps.success && !parsedUserIps.data.status ? (
        <ServerAlerts title="Error" description={parsedUserIps.data.error} />
      ) : null}
      <DataTable
        columns={columns}
        data={
          parsedUserIps.success && parsedUserIps.data.status
            ? withIndexUserIps ?? parsedUserIps.data.response
            : []
        }
      />
    </div>
  );
}
