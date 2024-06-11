"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CategoryForm } from "./category-form";

export type UserIps = {
  id: number;
  ip: string;
  status: boolean;
  updatedAt: Date;
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
    header: "Category",
    cell: ({ row }) => {
      const ip: string = row.getValue("ip");
      return <CategoryForm ip={ip} />;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return row.original.status ? "Active" : "Passive";
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const date: string = row.getValue("updatedAt");
      const localeDate = new Date(date).toLocaleDateString("tr", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return localeDate;
    },
  },
];
