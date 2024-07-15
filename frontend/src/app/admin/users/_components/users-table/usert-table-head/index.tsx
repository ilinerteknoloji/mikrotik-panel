"use client";

import { Button } from "@/components/ui/button";
import { TableHead } from "@/components/ui/table";
import { UserSchema } from "@/lib/schema/response/user/user.schema";
import { cn } from "@/lib/utils";
import { searchParamsToText } from "@/lib/utils/search-params-to-text";
import {
  ArrowUp01,
  ArrowUp10,
  ArrowUpAZ,
  ArrowUpDown,
  ArrowUpZA,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  typeofValue: "string" | "number";
  keyofValue: keyof UserSchema;
};

export function UsersTableHead({
  children,
  className,
  keyofValue,
  typeofValue,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> & Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchParamList: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    searchParamList[key] = value;
  });
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const [key, value] = searchParamList?.["order-by"]?.split(":") ?? [];
    if (value && value === "desc" && key !== keyofValue) {
      delete searchParamList["order-by"];
    }
    if (value && value === "asc") {
      searchParamList["order-by"] = `${keyofValue}:desc`;
    } else {
      searchParamList["order-by"] = `${keyofValue}:asc`;
    }
    router.push(`?${searchParamsToText(searchParamList)}`);
  };

  return (
    <TableHead className={cn("py-1", className)} {...props}>
      <div className="flex items-center gap-2">
        {children}

        <Button type="button" variant="ghost" size="icon" onClick={handleClick}>
          {searchParamList["order-by"] &&
          searchParamList["order-by"].startsWith(keyofValue) ? (
            searchParamList["order-by"].endsWith("asc") ? (
              typeofValue === "number" ? (
                <ArrowUp01 />
              ) : (
                <ArrowUpAZ />
              )
            ) : typeofValue === "number" ? (
              <ArrowUp10 />
            ) : (
              <ArrowUpZA />
            )
          ) : (
            <ArrowUpDown />
          )}
        </Button>
      </div>
    </TableHead>
  );
}
