import { CategoryForm } from "@/app/dashboard/firewall/components/data-table/category-form";
import { UpdateUserIpForm } from "@/components/forms/admin/update-user-ip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchUserIpById } from "@/lib/utils/fetch-requests/user-ips/fetch-user-ip-by-id";
import type { Metadata } from "next";
import Link from "next/link";

type Props = Readonly<{ params: { id: string } }>;

export const metadata: Metadata = {
  // TODO: Add metadata [id]Page
};

export default async function UserIpDetailPage({ params: { id } }: Props) {
  const response = await fetchUserIpById(id);
  if (!response.status) throw new Error(response.message);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <Link href={`/admin/users/${response.data.user.username}`}>
              {response.data.user.username}
            </Link>{" "}
            / {response.data.ip}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-8">
            <CategoryForm ip={response.data.ip} className="w-full" />
            <UpdateUserIpForm
              id={response.data.id.toString()}
              ip={response.data.ip}
              status={response.data.status}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
