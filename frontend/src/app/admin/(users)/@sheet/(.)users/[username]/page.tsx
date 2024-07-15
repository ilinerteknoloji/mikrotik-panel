"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
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
  const objectToString = (obj: object): React.ReactNode => {
    return (
      <ul className="ml-4 list-disc">
        {Object.entries(obj).map(([key, value]) => (
          <li key={key}>
            <strong>{key}: </strong>
            {typeof value === "object" &&
            typeof value !== null &&
            typeof value !== undefined
              ? Array.isArray(value)
                ? value.join(", ")
                : objectToString(value ?? {})
              : value
                ? value
                : "N/A"}
          </li>
        ))}
      </ul>
    );
  };
  // TODO: Make prettier and add more details
  return (
    <Sheet defaultOpen open onOpenChange={handleOpenChange}>
      <SheetContent className="lg:min-w-[750px]">
        <SheetHeader>
          <SheetTitle>{username}</SheetTitle>
        </SheetHeader>

        {user ? objectToString(user) : null}

        <SheetFooter>Footer</SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
