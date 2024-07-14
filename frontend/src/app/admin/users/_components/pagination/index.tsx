"use client";

import { Button } from "@/components/ui/button";
import { usersResponseSchema } from "@/lib/schema/response/user.schema";
import { UsersPageSearchParams } from "@/lib/types/admin/users-page";
import { fetchBackEndClient } from "@/lib/utils/fetch-requests/client";
import { searchParamsToText } from "@/lib/utils/search-params-to-text";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  searchParams: UsersPageSearchParams;
};

export function Pagination({ searchParams }: Props) {
  // TODO: Make SSR pagination
  const { data: session } = useSession();
  if (searchParams?.limit && searchParams.limit === 10)
    delete searchParams.limit;
  const { page = 1 }: UsersPageSearchParams = searchParams;
  const prevPage = +page - 1;
  const nextPage = +page + 1;

  const [isExist, setIsExist] = useState(false);
  useEffect(() => {
    async function getData() {
      const searchParamsText = searchParamsToText({
        ...searchParams,
        page: nextPage,
      });
      const { accessToken } = session!;
      const response = await fetchBackEndClient(
        accessToken,
        `users?${searchParamsText}`,
        {
          cache: "no-cache",
        },
      );
      if (response.status) {
        const parsedUsers = usersResponseSchema.parse(response.data);
        if (parsedUsers.status) setIsExist(parsedUsers.response.length > 0);
      }
    }
    if (session) getData();
  }, [session, nextPage, searchParams]);

  return (
    <div className="flex w-full justify-end gap-4">
      {page == 1 ? (
        <Button type="button" variant="outline" disabled>
          Prev
        </Button>
      ) : (
        <Link
          href={`?${searchParamsToText({ ...searchParams, page: prevPage })}`}
        >
          <Button type="button" variant="outline" disabled={page === 1}>
            Prev
          </Button>
        </Link>
      )}

      {isExist ? (
        <Link
          href={`?${searchParamsToText({ ...searchParams, page: nextPage })}`}
        >
          <Button type="button" variant="outline">
            Next
          </Button>
        </Link>
      ) : (
        <Button type="button" variant="outline" disabled>
          Next
        </Button>
      )}
    </div>
  );
}
