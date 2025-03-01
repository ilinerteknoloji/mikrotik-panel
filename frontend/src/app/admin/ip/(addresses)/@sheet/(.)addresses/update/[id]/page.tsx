"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { IpAddressesFormSchema } from "../../../addresses/add/schema";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getAddressById } from "@/lib/utils/fetch-requests/ip/addresses/fetch-address-by-id";
import { LoaderCircle } from "lucide-react";
import { IpAddressesForm } from "../../../addresses/add/form";
import { fetchInterfaces } from "@/lib/utils/fetch-requests/interfaces/fetch-interfaces";
import { InterfaceItem } from "@/lib/schema/response/interfaces";

type Props = Readonly<{
  params: {
    id: string;
  };
}>;

export default function AddressesSheetPage({ params: { id } }: Props) {
  const router = useRouter();
  const [ipAddress, setIpAddress] = useState<IpAddressesFormSchema>();
  const [interfaces, setInterfaces] = useState<Array<InterfaceItem>>([]);
  const { toast } = useToast();
  useEffect(() => {
    async function getData() {
      const response = await getAddressById(id);
      if (response.status) return setIpAddress(response.data);
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
            {ipAddress?.address ? (
              ipAddress?.address
            ) : (
              <LoaderCircle className="animate-spin" />
            )}
          </SheetTitle>
        </SheetHeader>

        {ipAddress && interfaces.length > 0 ? (
          <IpAddressesForm
            type="update"
            id={id}
            formData={ipAddress}
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
