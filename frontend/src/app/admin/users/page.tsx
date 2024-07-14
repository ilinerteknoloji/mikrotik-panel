import { ServerAlerts } from "@/components/general/server-alerts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  UsersResponseSchema,
  usersResponseSchema,
} from "@/lib/schema/response/user.schema";
import { UsersPageSearchParams } from "@/lib/types/admin/users-page";
import { fetchBackEnd } from "@/lib/utils/fetch-requests";
import { searchParamsToText } from "@/lib/utils/search-params-to-text";
import type { Metadata } from "next";
import { Pagination } from "./_components/pagination";
import { UsersFilters } from "./_components/users-filters";
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
  if (searchParams?.limit && searchParams?.limit > 50) searchParams.limit = 50;

  // unstable_noStore();
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const response = await fetchBackEnd(
    `users?${searchParamsToText(searchParams)}`,
  );
  let error: string = "";
  let parsedUsers: UsersResponseSchema | undefined;
  if (response.status) parsedUsers = usersResponseSchema.parse(response.data);
  else error = response.message;

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
            {parsedUsers ? (
              <>
                {!parsedUsers.status ? (
                  <ServerAlerts title="Error" description={error} />
                ) : null}

                <UsersTable
                  users={parsedUsers.status ? parsedUsers.response : []}
                />
              </>
            ) : (
              <ServerAlerts title="Error" description={error} />
            )}
          </div>

          <Pagination searchParams={searchParams} />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </section>
  );
}
