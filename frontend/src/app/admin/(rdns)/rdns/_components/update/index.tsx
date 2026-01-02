import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";
import { RDnsHostForm } from "../add/form/form";

type Props = Readonly<{
  id: number;
  hostname: string;
  hostnameMain: string;
  status: boolean;
}>;

export function UpdateRdns({ id, hostname, hostnameMain, status }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="ghost" size="icon">
          <ExternalLink />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="Update RDns Host">
        <DialogHeader>
          <DialogTitle>RDns Host Güncelle</DialogTitle>
        </DialogHeader>
        <RDnsHostForm
          type="update"
          id={id}
          hostname={hostname}
          hostnameMain={hostnameMain}
          status={status}
        />
      </DialogContent>
    </Dialog>
  );
}
