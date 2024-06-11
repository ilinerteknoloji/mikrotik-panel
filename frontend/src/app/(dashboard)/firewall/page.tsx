import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { env } from "@/schema";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { columns } from "./components/data-table/columns";
import { DataTable } from "./components/data-table";

type Props = {};

export const metadata: Metadata = {
  // TODO: Add metadata DashboardPage
};

export default async function FirewallPage({}: Props) {
  const token = await getServerSession(authOptions);
  const userIpsResponse = await fetch(`${env.BACKEND_URL}/user-ips?limit=100`, {
    headers: {
      Authorization: `Bearer ${token?.tokens.accessToken.token}`,
    },
  });
  if (!userIpsResponse.ok) {
    return <>null</>;
  }
  const userIps = await userIpsResponse.json();
  return (
    <div className="w-full">
      <DataTable columns={columns} data={userIps.response} />
    </div>
  );
}
