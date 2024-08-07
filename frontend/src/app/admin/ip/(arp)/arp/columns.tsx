"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArpSchema } from "@/lib/schema/response/ip/arp";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import Link from "next/link";

export const arpColumns: ColumnDef<ArpSchema>[] = [
  {
    accessorKey: "address",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Address
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
      <Badge variant={row.original.invalid ? "default" : "destructive"}>
        {row.original.invalid ? "yes" : "no"}
      </Badge>
    ),
  },
  {
    accessorKey: "complete",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Complete
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge variant={row.original.complete ? "default" : "destructive"}>
        {row.original.complete ? "yes" : "no"}
      </Badge>
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
      <Badge variant={row.original.disabled ? "default" : "destructive"}>
        {row.original.disabled ? "yes" : "no"}
      </Badge>
    ),
  },
  {
    accessorKey: "DHCP",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        DHCP
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge variant={row.original.DHCP ? "default" : "destructive"}>
        {row.original.DHCP ? "yes" : "no"}
      </Badge>
    ),
  },
  {
    accessorKey: "published",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Published
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge variant={row.original.published ? "default" : "destructive"}>
        {row.original.published ? "yes" : "no"}
      </Badge>
    ),
  },
  {
    accessorKey: "mac-address",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Mac Address
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <>{row.original["mac-address"]}</>,
  },
  {
    accessorKey: "open",
    header: "Open",
    cell: ({ row }) => (
      <Link
        href="/admin/ip/arp/[id]"
        as={`/admin/ip/arp/${row.original[".id"].slice(1)}`}
      >
        <ExternalLink />
      </Link>
    ),
  },
];
