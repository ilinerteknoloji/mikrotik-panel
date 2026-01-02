import { UsersPageSearchParams } from "@/lib/types/admin/users-page";
import { PageItemCountSelector } from "./page-item-count-selector";
import { RoleSelector } from "./role-selector";
import { SearchUsers } from "./search-users";
import { StatusSelector } from "./status-selector";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

type Props = {
  searchParams: UsersPageSearchParams;
};

export function UsersFilters({ searchParams }: Props) {
  return (
    <div className="flex flex-col items-center justify-end gap-4 md:flex-row md:items-end">
      <SearchUsers searchParams={searchParams} />
      <div className="flex w-full items-center gap-4 md:w-fit">
        <StatusSelector searchParams={searchParams} />
        <RoleSelector searchParams={searchParams} />
        <PageItemCountSelector searchParams={searchParams} />
      </div>
      <Link href="/admin/users" className="w-full md:w-fit">
        <Button
          variant="destructive"
          size="icon"
          className="w-full px-2 md:w-fit"
        >
          <XIcon />
        </Button>
      </Link>
    </div>
  );
}
