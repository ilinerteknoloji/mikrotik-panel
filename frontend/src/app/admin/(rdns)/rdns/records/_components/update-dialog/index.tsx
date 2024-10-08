import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RDnsRecord } from "@/lib/schema/response/rdns-hosts/rdns-records";
import { FilePenLine } from "lucide-react";
import { UpdateRdnsForm } from "./form";

type Props = Readonly<{
  record: RDnsRecord;
}>;

export async function UpdateDialog({ record }: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        <FilePenLine />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>RDns Kaydını Güncelle</DialogTitle>
        </DialogHeader>
        <UpdateRdnsForm record={record} />
      </DialogContent>
    </Dialog>
  );
}
