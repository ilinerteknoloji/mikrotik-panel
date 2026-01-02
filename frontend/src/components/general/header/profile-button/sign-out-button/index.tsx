"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

type Props = {};

export function SignOutButton({}: Props) {
  return (
    <DropdownMenuItem onClick={() => signOut()}>Çıkış yap</DropdownMenuItem>
  );
}
