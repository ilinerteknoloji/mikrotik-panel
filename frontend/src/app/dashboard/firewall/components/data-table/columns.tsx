"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CategoryForm } from "./category-form";

export type UserIps = {
  index: number;
  id: number;
  ip: string;
  status: boolean;
};

export const columns: ColumnDef<UserIps>[] = [
  {
    accessorKey: "checkbox",
    header: "",
    cell: ({ row }) => {
      return <Checkbox id={`user-ips-${row.index}`} />;
    },
  },
  {
    accessorKey: "index",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Index
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "ip",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ip
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "categories",
    header: "Kategori",
    cell: ({ row }) => {
      const ip: string = row.getValue("ip");
      return <CategoryForm ip={ip} />;
    },
  },
  {
    accessorKey: "status",
    header: "Durum",
    cell: ({ row }) => {
      return row.original.status ? "Aktif" : "Pasif";
    },
  },
];
