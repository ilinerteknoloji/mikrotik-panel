import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { AddUserIpsForm } from "./form/form";
import { fetchUsernames } from "@/lib/utils/fetch-requests/user/usernames";

type Props = Readonly<{}>;

export async function AddUserIps({}: Props) {
  const response = await fetchUsernames();
  const usernames = response.status ? response.data : [];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="default" size="icon">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User Ips</DialogTitle>
          <DialogDescription>Add user ips to the list</DialogDescription>
        </DialogHeader>

        <AddUserIpsForm usernames={usernames} />
      </DialogContent>
    </Dialog>
  );
}
