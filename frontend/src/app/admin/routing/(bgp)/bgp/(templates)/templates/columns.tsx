"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BGPTemplateSchema } from "@/lib/schema/response/routing/bgp/templates";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import Link from "next/link";

export const bgpTemplatesColumns: ColumnDef<BGPTemplateSchema>[] = [
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
    accessorKey: ".about",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        About
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => row.original[".about"],
  },
  {
    accessorKey: "as",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Autonomous System
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "default",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Default
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge
        variant={row.original.default === "true" ? "default" : "secondary"}
      >
        {row.original.default === "true" ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    accessorKey: "hold-time",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Hold Time
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => row.original["hold-time"],
  },
  {
    accessorKey: "inactive",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Inactive
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge
        variant={row.original.default === "true" ? "default" : "secondary"}
      >
        {row.original.default === "true" ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    accessorKey: "routing-table",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Routing Table
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => row.original["routing-table"],
  },
  {
    accessorKey: "open",
    header: "Open",
    cell: ({ row }) => (
      <Link
        href="/admin/routing/bgp/templates/update/[id]"
        as={`/admin/routing/bgp/templates/update/${row.original[".id"].slice(1)}`}
      >
        <ExternalLink />
      </Link>
    ),
  },
];
