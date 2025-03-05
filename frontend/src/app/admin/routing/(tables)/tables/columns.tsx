"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RoutingTableSchema } from "@/lib/schema/response/routing/tables";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import Link from "next/link";

export const routingTablesColumns: ColumnDef<RoutingTableSchema>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "comment",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Comment
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "disabled",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Disabled
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge variant={row.original.disabled ? "default" : "secondary"}>
        {row.original.disabled ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    accessorKey: "dynamic",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Dynamic
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge variant={row.original.dynamic ? "default" : "secondary"}>
        {row.original.dynamic ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    accessorKey: "invalid",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Invalid
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge variant={row.original.invalid ? "default" : "secondary"}>
        {row.original.invalid ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    accessorKey: "open",
    header: "Open",
    cell: ({ row }) => (
      <Link
        href="/admin/routing/tables/update/[id]"
        as={`/admin/routing/tables/update/${row.original[".id"].slice(1)}`}
      >
        <ExternalLink />
      </Link>
    ),
  },
];
