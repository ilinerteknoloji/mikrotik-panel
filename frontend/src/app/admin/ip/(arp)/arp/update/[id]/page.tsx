import { ServerAlerts } from "@/components/general/server-alerts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchInterfaces } from "@/lib/utils/fetch-requests/interfaces/fetch-interfaces";
import { fetchArpById } from "@/lib/utils/fetch-requests/ip/arp/fetch-arp-by-id";
import type { Metadata } from "next";
import { ARPForm } from "../../add/form";

type Props = Readonly<{
  params: {
    id: string;
  };
}>;

export const metadata: Metadata = {
  // TODO: Add metadata [id]Page
};

export default async function ArpUpdatePage({ params: { id } }: Props) {
  const response = await fetchArpById(id);
  const interfaces = await fetchInterfaces();
  let interfaceNames: string[] = [];
  if (interfaces.status)
    interfaceNames = interfaces.data.map((interfaceItem) => interfaceItem.name);
  if (!response.status) {
    return <ServerAlerts title="Error" description={response.message} />;
  }
  const { data } = response;
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>{data.address}</CardTitle>
        </CardHeader>
        <CardContent>
          <ARPForm
            type="update"
            id={id}
            formData={data}
            interfaceNames={interfaceNames}
          />
        </CardContent>
      </Card>
    </section>
  );
}
