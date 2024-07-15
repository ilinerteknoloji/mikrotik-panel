import { ServerAlerts } from "@/components/general/server-alerts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UsersPageSearchParams } from "@/lib/types/admin/users-page";
import { fetchAllUsers } from "@/lib/utils/fetch-requests/user/all-users";
import type { Metadata } from "next";
import { UsersFilters } from "./_components/users-filters";
import { UsersPagination } from "./_components/users-pagination";
import { UsersTable } from "./_components/users-table";

type Props = {
  params: {};
  searchParams: UsersPageSearchParams;
};

export const metadata: Metadata = {
  // TODO: Add metadata UsersPage
};

export default async function UsersPage({ searchParams }: Props) {
  if (searchParams.page < 1 || !searchParams?.page) searchParams.page = 1;
  if ((searchParams.limit && searchParams?.limit < 10) || !searchParams?.limit)
    searchParams.limit = 10;
  else if (searchParams?.limit > 50) searchParams.limit = 50;

  // unstable_noStore();
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const response = await fetchAllUsers(searchParams);

  return (
    <section className="flex flex-col gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage users. Click on the &quot;Open&quot; button to open the user
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <UsersFilters searchParams={searchParams} />

          <div className="flex flex-col items-center justify-center gap-4">
            {!response.status ? (
              <ServerAlerts title="Error" description={response.message} />
            ) : null}

            <UsersTable users={response.status ? response.data : []} />
          </div>

          <UsersPagination searchParams={searchParams} />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </section>
  );
}
