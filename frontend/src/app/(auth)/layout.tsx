import { Card, CardContent } from "@/components/ui/card";
import { World } from "@/components/general/world";
import Logo from "@/images/logo.svg";
import { headers } from "next/headers";
import Image from "next/image";
import { APP_NAME } from "@/lib/constant/app.constant";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = headers();
  const isMobile = header.get("user-agent")?.includes("Mobile");
  return (
    <main className="flex">
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 shadow-lg lg:w-1/3">
        <Card className="w-96 border-none shadow-none">
          <CardContent>
            <div className="flex items-center justify-center gap-4">
              <Image
                src={Logo}
                alt={`${APP_NAME} Logo`}
                width={100}
                height={100}
                className="drop-shadow"
                priority
              />
              <div>
                <h1 className="text-xl font-semibold leading-none tracking-tight">
                  {APP_NAME}
                </h1>
                <p className="text-sm text-gray-500">
                  MikroTik cihazlarını kolayca yönetmek için basit ve kullanıcı
                  dostu bir panel
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div>{children}</div>
      </div>
      {isMobile ? null : (
        <div className="hidden w-2/3 items-center justify-center lg:flex">
          <World />
        </div>
      )}
    </main>
  );
}
