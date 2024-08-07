"use client";

import { Button } from "@/components/ui/button";
import { IpAddressSchema } from "@/lib/schema/response/ip/addresses";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import Link from "next/link";

export const ipAddressesColumns: ColumnDef<IpAddressSchema>[] = [
  {
    accessorKey: "address",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Ip Address
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "interface",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Interface
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) =>
      row.original.interface === row.original["actual-interface"]
        ? row.original.interface
        : `${row.original.interface} (${row.original["actual-interface"]})`,
  },
  {
    accessorKey: "network",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Network
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "open",
    header: "Open",
    cell: ({ row }) => (
      <Link
        href="/admin/ip/addresses/[id]"
        as={`/admin/ip/addresses/${row.original[".id"].slice(1)}`}
      >
        <ExternalLink />
      </Link>
    ),
  },
];
