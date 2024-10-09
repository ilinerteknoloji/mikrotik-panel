import { authConfig } from "@/app/api/(auth)/auth/[...nextauth]/auth.config";
import { Button } from "@/components/ui/button";
import Logo from "@/images/logo.svg";
import { APP_NAME } from "@/lib/constant/app.constant";
import { Bell, Settings } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "./mobile-menu";
import { PageName } from "./page-name";
import { ProfileButton } from "./profile-button";
import { SearchInput } from "./search-input";
import { ThemeButton } from "./theme-button";

type Props = {
  type: "admin" | "dashboard";
};

export async function Header({ type }: Props) {
  const session = await getServerSession(authConfig);

  return (
    <header>
      <div className="flex h-16 gap-4 md:h-20">
        <Link
          href={type === "admin" ? "/admin" : "/dashboard"}
          className="hidden h-full w-48 min-w-48 max-w-48 items-center gap-2 border-r px-2 py-2 md:flex lg:w-64 lg:min-w-64 lg:max-w-64 lg:px-4"
        >
          <Image src={Logo} alt={`${APP_NAME} Logo`} className="size-16" />
          <h1 className="text-2xl font-semibold text-white">{APP_NAME}</h1>
        </Link>

        <div className="flex w-full items-center justify-between gap-4 px-4">
          <div className="flex gap-4">
            <MobileMenu type={type} />
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
