import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import { IpAddressesForm } from "./form";
import { fetchInterfaces } from "@/lib/utils/fetch-requests/interfaces/fetch-interfaces";

type Props = Readonly<{}>;

export const metadata: Metadata = {
  // TODO: Add metadata AddPage
};

export default async function IpAddressesAddPage({}: Props) {
  const interfaces = await fetchInterfaces();
  let interfaceNames: string[] = [];
  if (interfaces.status)
    interfaceNames = interfaces.data.map((interfaceItem) => interfaceItem.name);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create BGP Connection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mx-auto w-[500px] max-w-full">
          <IpAddressesForm interfaceNames={interfaceNames} />
        </div>
      </CardContent>
    </Card>
  );
}
