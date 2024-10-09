import { UpdateUserDetailsForm } from "@/components/forms/admin/update-user-details";
import { UpdateProfileForm } from "@/components/forms/update-profile";
import { ServerAlerts } from "@/components/general/server-alerts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserByUsernameOrId } from "@/lib/utils/fetch-requests/user/get-user";
import type { Metadata } from "next";

type Props = {
  params: {
    username: string;
  };
};

export const metadata: Metadata = {
  // TODO: Add metadata [username]Page
};

export default async function UserDetailPage({ params: { username } }: Props) {
  const response = await getUserByUsernameOrId(username);
  if (!response.status)
    return <ServerAlerts title="Error" description={response.message} />;
  const { data } = response;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{data.username}</CardTitle>
          </CardHeader>
          <CardContent>
            <UpdateProfileForm id={data.id} user={data} />
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Detaylar</CardTitle>
          </CardHeader>
          <CardContent>
            <UpdateUserDetailsForm
              id={data.id}
              role={data.role}
              status={data?.status ?? false}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
