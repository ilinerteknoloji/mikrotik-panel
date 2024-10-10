"use client";

import { UpdateUserDetailsForm } from "@/components/forms/admin/update-user-details";
import { UpdateProfileForm } from "@/components/forms/update-profile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { UserSchema } from "@/lib/schema/response/user/user.schema";
import { getUserByUsernameOrId } from "@/lib/utils/fetch-requests/user/get-user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  params: {
    username: string;
  };
};

export default function InterceptedUserDetailPage({
  params: { username },
}: Props) {
  const router = useRouter();
  const [user, setUser] = useState<UserSchema>();
  const { toast } = useToast();

  useEffect(() => {
    async function getData() {
      const response = await getUserByUsernameOrId(username);
      if (response.status) return setUser(response.data);
      toast({
        title: "Error",
        description: response.message,
      });
    }
    getData();
  }, [username, toast]);

  const handleOpenChange = () => router.back();
  return (
    <Sheet defaultOpen open onOpenChange={handleOpenChange}>
      <SheetContent className="lg:min-w-[750px]">
        <SheetHeader>
          <SheetTitle>{username}</SheetTitle>
        </SheetHeader>

        {user ? (
          <div className="flex flex-col gap-4">
            <UpdateProfileForm id={user?.id} user={user} />
            <hr />
            <UpdateUserDetailsForm
              id={user.id}
              role={user.role}
              status={user?.status ?? false}
            />
          </div>
        ) : (
          <div>loading...</div>
        )}
      </SheetContent>
    </Sheet>
  );
}
