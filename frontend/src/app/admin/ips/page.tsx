import { authConfig } from "@/app/api/(auth)/auth/[...nextauth]/auth.config";
import { env } from "@/lib/schema/env";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";

type Props = {};

export const metadata: Metadata = {
  // TODO: Add metadata IpsPage
};

export default async function IpsPage({}: Props) {
  const session = await getServerSession(authConfig);
  if (!session) return null;
  const ips = await fetch(`${env.BACKEND_URL}/user-ips?status=0`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  const ipsJson = await ips.json();
  return (
    <section>
      <h1>İps</h1>

      <div className="w-[500px]">
        <pre>{JSON.stringify(ipsJson, null, 2)}</pre>
      </div>
    </section>
  );
}
