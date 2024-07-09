import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { env } from "@/lib/schema/env";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authConfig } from "../api/(auth)/auth/[...nextauth]/auth.config";

type Props = {};

export const metadata: Metadata = {
  // TODO: Add metadata AdminPage
};

export default async function AdminPage({}: Props) {
  const session = await getServerSession(authConfig);
  const response = await fetch(`${env.BACKEND_URL}/interface`, {
    headers: {
      authorization: `Bearer ${session?.accessToken}`,
    },
  });
  const responseJson = await response.json();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Page</CardTitle>
      </CardHeader>
      <CardContent>
        <pre>{JSON.stringify(responseJson, null, 2)}</pre>
      </CardContent>
    </Card>
  );
}
