"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UsersPageSearchParams } from "@/lib/types/admin/users-page";
import { searchParamsToText } from "@/lib/utils/search-params-to-text";
import { useRouter } from "next/navigation";

type Props = {
  searchParams: UsersPageSearchParams;
};

export function PageItemCountSelector({ searchParams }: Props) {
  const router = useRouter();
  const counts = ["10", "25", "50"];
  const limit = (searchParams?.limit ?? 10).toString();

  const handleSelect = (value: string) => {
    if (value === "10") {
      delete searchParams.limit;
      return router.push(`?${searchParamsToText({ ...searchParams })}`);
    }
    return router.push(
      `?${searchParamsToText({ ...searchParams, limit: value })}`,
    );
  };

  return (
    <div className="flex w-full max-w-full items-center justify-end gap-4 md:max-w-fit">
      <Select onValueChange={handleSelect} defaultValue={limit}>
        <SelectTrigger className="w-fit">
          <SelectValue placeholder={limit} />
        </SelectTrigger>
        <SelectContent className="min-w-fit">
          {counts.map((count) => (
            <SelectItem key={count} value={count}>
              {count}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
