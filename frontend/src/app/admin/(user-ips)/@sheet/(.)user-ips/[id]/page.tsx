"use client";

import { CategoryForm } from "@/app/dashboard/firewall/components/data-table/category-form";
import { UpdateUserIpForm } from "@/components/forms/admin/update-user-ip";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { UserIpSchema } from "@/lib/schema/response/user-ips/user-ips.schema";
import { fetchUserIpById } from "@/lib/utils/fetch-requests/user-ips/fetch-user-ip-by-id";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = Readonly<{
  params: {
    id: string;
  };
}>;

export default function UserIpDetailSheet({ params: { id } }: Props) {
  const router = useRouter();
  const [response, setResponse] = useState<UserIpSchema | null>(null);

  const handleOpenChange = () => router.back();

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchUserIpById(id);
      if (!response.status) throw new Error(response.message);
      setResponse(response.data);
    };
    fetch();
  }, [id]);

  return (
    <Sheet defaultOpen open onOpenChange={handleOpenChange}>
      <SheetContent className="lg:min-w-[750px]">
        <SheetHeader>
          <SheetTitle>
            {response === null ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <>
                <Link href={`/admin/users/${response.user.username}`}>
                  {response.user.username}
                </Link>{" "}
                / {response.ip}
              </>
            )}
          </SheetTitle>
        </SheetHeader>
        {response === null ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <div className="mt-4 space-y-8">
            <CategoryForm ip={response.ip} className="w-full" />
            <UpdateUserIpForm
              id={response.id.toString()}
              ip={response.ip}
              status={response.status}
            />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
