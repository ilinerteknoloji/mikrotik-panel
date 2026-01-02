import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import React from "react";

type Props<T> = Readonly<{
  data: T;
  headerData: {
    label: string;
    key?: keyof T;
    data: (data: T) => unknown;
    className?: string;
  }[];
}>;

export function DataTableRow<T extends Record<string, unknown>>({
  data,
  headerData,
}: Props<T>) {
  return (
    <TableRow>
      {headerData.map((item, index) => {
        const value = item.data(data);
        return (
          <TableCell key={index} className={cn("", item.className)}>
            {typeof value === "string" ||
            typeof value === "number" ||
            React.isValidElement(value)
              ? value
              : JSON.stringify(value)}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
