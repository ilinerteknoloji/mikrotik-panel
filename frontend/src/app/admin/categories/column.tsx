"use client";

import { Button } from "@/components/ui/button";
import { IpCategorySchema } from "@/lib/schema/response/firewall/ip-categories.schema";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import Link from "next/link";

export const ipCategoriesColumns: ColumnDef<IpCategorySchema>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Kategori
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Açıklama
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="truncate">{row.original.description}</div>
    ),
  },
  {
    accessorKey: "open",
    header: "Aç",
    cell: ({ row }) => (
      <Link
        href="/admin/categories/update/[id]"
        as={`/admin/categories/update/${row.original.id}`}
      >
        <ExternalLink />
      </Link>
    ),
  },
];
