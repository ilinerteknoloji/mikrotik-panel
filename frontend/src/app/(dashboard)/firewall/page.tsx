import { authConfig } from "@/app/api/(auth)/auth/[...nextauth]/auth.config";
import { ServerToast } from "@/components/general/server-toast";
import { env } from "@/schema";
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
  const userIpsResponse = await fetch(`${env.BACKEND_URL}/user-ips?limit=100`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  const userIps = await userIpsResponse.json();
  return (
    <div className="w-full">
      <DataTable columns={columns} data={userIps?.response ?? []} />
      {!userIpsResponse.ok ? (
        // TODO: Add error message
        <ServerToast title="Error" description={userIpsResponse.statusText} />
      ) : null}
    </div>
  );
}
