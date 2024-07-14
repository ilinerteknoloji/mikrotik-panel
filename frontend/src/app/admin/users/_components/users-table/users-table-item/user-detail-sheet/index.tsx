import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ExternalLink } from "lucide-react";

type Props = {
  userId: number;
};

export function UserDetailSheet({ userId }: Props) {
  return (
    <Sheet>
      <SheetTrigger title="Open User Detail" className="mx-auto">
        <ExternalLink />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>

        <div className="h-full overflow-y-auto">
          <div className="h-32 w-full bg-gradient-to-b from-white to-rose-50" />
          <div className="h-32 w-full bg-gradient-to-b from-rose-50 to-rose-100" />
          <div className="h-32 w-full bg-gradient-to-b from-rose-100 to-rose-200" />
          <div className="h-32 w-full bg-gradient-to-b from-rose-200 to-rose-300" />
          <div className="h-32 w-full bg-gradient-to-b from-rose-300 to-rose-400" />
          <div className="h-32 w-full bg-gradient-to-b from-rose-400 to-rose-500" />
          <div className="h-32 w-full bg-gradient-to-b from-rose-500 to-rose-600" />
          <div className="h-32 w-full bg-gradient-to-b from-rose-600 to-rose-700" />
          <div className="h-32 w-full bg-gradient-to-b from-rose-700 to-rose-800" />
          <div className="h-32 w-full bg-gradient-to-b from-rose-800 to-rose-900" />
          <div className="h-32 w-full bg-gradient-to-b from-rose-900 to-rose-950" />
          <div className="h-32 w-full bg-gradient-to-b from-rose-950 to-black" />
        </div>
        <SheetFooter>Footer</SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
