import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { RoutingTableForm } from "./form";
import { Button } from "@/components/ui/button";

type Props = Readonly<{}>;

export function AddRoutingTableDialog({}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="default" size="icon">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Routing Table</DialogTitle>
        </DialogHeader>

        <RoutingTableForm />
      </DialogContent>
    </Dialog>
  );
}
