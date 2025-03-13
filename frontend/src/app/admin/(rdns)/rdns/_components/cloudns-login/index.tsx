import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserIcon } from "lucide-react";
import { CloudnsLoginForm } from "./form";

type Props = Readonly<{}>;

export function CloudnsLogin({}: Props) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" variant="ghost">
            <UserIcon />
          </Button>
        </DialogTrigger>
        <DialogContent aria-describedby="Cloudns Login">
          <DialogHeader>
            <DialogTitle>ClouDNS API Giriş Yapın</DialogTitle>
          </DialogHeader>

          <CloudnsLoginForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
