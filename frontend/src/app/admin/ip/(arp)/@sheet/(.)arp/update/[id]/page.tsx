"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { InterfaceItem } from "@/lib/schema/response/interfaces";
import { fetchInterfaces } from "@/lib/utils/fetch-requests/interfaces/fetch-interfaces";
import { fetchArpById } from "@/lib/utils/fetch-requests/ip/arp/fetch-arp-by-id";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArpFormSchema } from "../../../arp/add/schema";
import { ARPForm } from "../../../arp/add/form";

type Props = Readonly<{
  params: {
    id: string;
  };
}>;

export default function ArpSheetPage({ params: { id } }: Props) {
  const router = useRouter();
  const [arp, setArp] = useState<ArpFormSchema>();
  const [interfaces, setInterfaces] = useState<Array<InterfaceItem>>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function getData() {
      const response = await fetchArpById(id);
      console.log(response);

      if (response.status) return setArp(response.data);
      toast({
        title: "Error",
        description: response.message,
      });
    }
    async function getInterfaces() {
      const interfaces = await fetchInterfaces();
      if (interfaces.status) return setInterfaces(interfaces.data);
      toast({
        title: "Error",
        description: interfaces.message,
      });
    }
    getData();
    getInterfaces();
  }, [id, toast]);

  const handleOpenChange = () => router.back();
  return (
    <Sheet defaultOpen open onOpenChange={handleOpenChange}>
      <SheetContent className="lg:min-w-[750px]">
        <SheetHeader>
          <SheetTitle>
            {arp?.address ? (
              arp?.address
            ) : (
              <LoaderCircle className="animate-spin" />
            )}
          </SheetTitle>
        </SheetHeader>

        {arp && interfaces.length > 0 ? (
          <ARPForm
            type="update"
            id={id}
            formData={arp}
            interfaceNames={interfaces?.map(
              (interfaceItem) => interfaceItem.name,
            )}
          />
        ) : (
          <LoaderCircle className="animate-spin" />
        )}
      </SheetContent>
    </Sheet>
  );
}
