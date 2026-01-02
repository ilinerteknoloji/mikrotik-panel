import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { RDnsHostForm } from "./form/form";

type Props = Readonly<{}>;

export function AddRdns({}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="default"
          size="icon"
          className="w-full px-2 md:w-fit"
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="Add RDns Host">
        <DialogHeader>
          <DialogTitle>Add RDns Host</DialogTitle>
        </DialogHeader>

        <RDnsHostForm />
      </DialogContent>
    </Dialog>
  );
}
