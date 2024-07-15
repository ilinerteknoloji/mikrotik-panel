"use client";

import { Button } from "@/components/ui/button";
import { UsersPageSearchParams } from "@/lib/types/admin/users-page";
import { fetchAllUsers } from "@/lib/utils/fetch-requests/user/all-users";
import { searchParamsToText } from "@/lib/utils/search-params-to-text";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  searchParams: UsersPageSearchParams;
};

export function UsersPagination({ searchParams }: Props) {
  if (searchParams?.limit && searchParams.limit === 10)
    delete searchParams.limit;
  const prevPage = +searchParams.page - 1;
  const nextPage = +searchParams.page + 1;

  const [isExist, setIsExist] = useState(false);
  useEffect(() => {
    async function getData() {
      const response = await fetchAllUsers({
        ...searchParams,
        page: nextPage,
      });
      if (response.status) setIsExist(response.data.length > 0);
    }
    getData();
  }, [nextPage, searchParams]);

  return (
    <div className="flex w-full justify-end gap-4">
      {searchParams.page == 1 ? (
        <Button
          type="button"
          variant="ghost"
          className="flex items-center gap-2"
          disabled
        >
          <ArrowLeft className="size-4" /> Prev
        </Button>
      ) : (
        <Link
          href={`?${searchParamsToText({ ...searchParams, page: prevPage })}`}
        >
          <Button
            type="button"
            variant="ghost"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="size-4" /> Prev
          </Button>
        </Link>
      )}

      {isExist ? (
        <Link
          href={`?${searchParamsToText({ ...searchParams, page: nextPage })}`}
        >
          <Button
            type="button"
            variant="ghost"
            className="flex items-center gap-2"
          >
            Next <ArrowRight className="size-4" />
          </Button>
        </Link>
      ) : (
        <Button
          type="button"
          variant="ghost"
          className="flex items-center gap-2"
          disabled
        >
          Next <ArrowRight className="size-4" />
        </Button>
      )}
    </div>
  );
}
