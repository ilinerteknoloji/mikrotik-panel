import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchInterfaces } from "@/lib/utils/fetch-requests/interfaces/fetch-interfaces";
import type { Metadata } from "next";
import { ARPForm } from "./form";

type Props = Readonly<{}>;

export const metadata: Metadata = {
  // TODO: Add metadata AddPage
};

export default async function ARPAddPage({}: Props) {
  const interfaces = await fetchInterfaces();
  let interfaceNames: string[] = [];
  if (interfaces.status)
    interfaceNames = interfaces.data.map((interfaceItem) => interfaceItem.name);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create ARP</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mx-auto w-[500px] max-w-full">
          <ARPForm interfaceNames={interfaceNames} />
        </div>
      </CardContent>
    </Card>
  );
}
