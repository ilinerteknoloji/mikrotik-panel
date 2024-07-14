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

export function StatusSelector({ searchParams }: Props) {
  const router = useRouter();
  const selectItems = [
    { value: "all", title: "User Status" },
    { value: "true", title: "Active" },
    { value: "false", title: "Passive" },
  ];
  const role = searchParams?.role ?? "all";

  const handleSelect = (value: string) => {
    if (value === "all") {
      delete searchParams.status;
      return router.push(`?${searchParamsToText({ ...searchParams })}`);
    }
    return router.push(
      `?${searchParamsToText({ ...searchParams, status: value })}`,
    );
  };

  return (
    <div className="flex w-full max-w-full items-center justify-end gap-4 md:max-w-fit">
      <Select onValueChange={handleSelect} defaultValue={role}>
        <SelectTrigger className="w-fit capitalize">
          <SelectValue placeholder={role} />
        </SelectTrigger>
        <SelectContent className="min-w-fit">
          {selectItems.map((item, index) => (
            <SelectItem key={index} value={item.value} className="capitalize">
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
