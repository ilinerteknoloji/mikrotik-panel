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

export function RoleSelector({ searchParams }: Props) {
  const router = useRouter();
  const roles = [
    {
      value: "all",
      title: "Tümü",
    },
    {
      value: "user",
      title: "Kullanıcı",
    },
    {
      value: "admin",
      title: "Admin",
    },
  ];
  const role = searchParams?.role ?? "all";

  const handleSelect = (value: string) => {
    if (value === "all") {
      delete searchParams.role;
      return router.push(`?${searchParamsToText({ ...searchParams })}`);
    }
    return router.push(
      `?${searchParamsToText({ ...searchParams, role: value })}`,
    );
  };

  return (
    <div className="flex w-full max-w-full items-center justify-end gap-4 md:max-w-fit">
      <Select onValueChange={handleSelect} defaultValue={role}>
        <SelectTrigger className="w-full capitalize md:w-fit">
          <SelectValue placeholder={role} />
        </SelectTrigger>
        <SelectContent className="min-w-fit">
          {roles.map((role, index) => (
            <SelectItem key={index} value={role.value} className="capitalize">
              {role.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
