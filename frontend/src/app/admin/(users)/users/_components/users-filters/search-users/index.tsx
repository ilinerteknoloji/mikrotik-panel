"use client";

import { Input } from "@/components/ui/input";
import { UsersPageSearchParams } from "@/lib/types/admin/users-page";
import { searchParamsToText } from "@/lib/utils/search-params-to-text";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  searchParams: UsersPageSearchParams;
};

export function SearchUsers({ searchParams }: Props) {
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let searchParamsText: string = "";
    if (e.target.value.length > 0) {
      searchParamsText = searchParamsToText({
        ...searchParams,
        search: e.target.value,
      });
    } else {
      delete searchParams.search;
      searchParamsText = searchParamsToText({
        ...searchParams,
      });
    }
    return router.push(`?${searchParamsText}`);
  };

  return (
    <div className="flex w-full items-center rounded border shadow ring-primary focus-within:ring-1 md:max-w-[250px]">
      <div className="px-2">
        <Search className="size-4" />
      </div>
      <Input
        type="search"
        placeholder="Search users"
        className="border-0 pl-0 focus-visible:ring-0"
        onChange={handleSearch}
      />
    </div>
  );
}
0;
