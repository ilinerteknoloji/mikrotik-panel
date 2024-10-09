import { authConfig } from "@/app/api/(auth)/auth/[...nextauth]/auth.config";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoaderCircle } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { SignOutButton } from "./sign-out-button";

type Props = {};

export async function ProfileButton({}: Props) {
  const session = await getServerSession(authConfig);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="hover:cursor-pointer">
          <AvatarFallback>
            {session?.user.username ? (
              session.user.username.at(0)?.toUpperCase()
            ) : (
              <LoaderCircle className="size-6 animate-spin text-primary" />
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link
          href="/dashboard/p/[username]"
          as={`/dashboard/p/${session?.user.username}`}
        >
          <DropdownMenuItem>Profil</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
