import { authConfig } from "@/app/api/(auth)/auth/[...nextauth]/auth.config";
import { ServerToast } from "@/components/general/server-toast";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { DataTable } from "./components/data-table";
import { columns } from "./components/data-table/columns";
import { addressListsResponseSchema } from "@/lib/schema/response/firewall/address-list.schema";
import { env } from "@/lib/schema/env";

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
    <div className="w-full">
      {!userIpsResponse.ok ? (
        <ServerToast title="Error" description={userIpsResponse.statusText} />
      ) : null}
      {!parsedUserIps.success
        ? parsedUserIps.error.errors.map((error, index) => (
            <ServerToast
              key={index}
              title="Error"
              description={error.message}
            />
          ))
        : null}
      {parsedUserIps.success && !parsedUserIps.data.status ? (
        <ServerToast title="Error" description={parsedUserIps.data.error} />
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
