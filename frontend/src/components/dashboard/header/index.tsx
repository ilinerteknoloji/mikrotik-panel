import Logo from "@/images/logo.svg";
import { Bell, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "./mobile-menu";
import { PageName } from "./page-name";
import { ProfileButton } from "./profile-button";
import { SearchInput } from "./search-input";
import { ThemeButton } from "./theme-button";
import { Button } from "@/components/ui/button";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/(auth)/auth/[...nextauth]/auth.config";

type Props = {};

export async function Header({}: Props) {
  const session = await getServerSession(authConfig);

  return (
    <header>
      <div className="flex h-16 gap-4 md:h-20">
        <Link
          href="/dashboard"
          className="hidden h-full w-48 min-w-48 max-w-48 items-end gap-2 border-r px-2 py-2 md:flex lg:w-64 lg:min-w-64 lg:max-w-64 lg:px-4"
        >
          <Image src={Logo} alt="Mikrotik Panel Logo" className="size-16" />
          <div className="flex flex-col">
            {/* <p className="text-[0.75rem] font-semibold text-primary">Company</p> */}
            <h1 className="text-2xl font-bold text-primary">MikroTik</h1>
            <p className="w-full text-right text-[0.75rem] font-bold text-primary">
              Panel
            </p>
          </div>
        </Link>

        <div className="flex w-full items-center justify-between gap-4 px-4">
          <div className="flex gap-4">
            <MobileMenu />
            <PageName />
          </div>

          <nav className="flex gap-4">
            <div className="hidden md:block">
              <SearchInput />
            </div>

            {session?.user.role === "admin" ? (
              <Link href="/admin">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="rounded-full p-2"
                >
                  <Settings className="size-6" />
                </Button>
              </Link>
            ) : null}

            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="rounded-full p-2"
            >
              <Bell className="size-6" />
              {/* <BellDot className="size-6" /> */}
            </Button>

            <ThemeButton />

            <ProfileButton />
          </nav>
        </div>
      </div>
      <div className="block px-4 py-2 md:hidden">
        <SearchInput />
      </div>
    </header>
  );
}
