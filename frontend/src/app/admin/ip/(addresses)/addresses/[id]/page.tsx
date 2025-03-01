import { ServerAlerts } from "@/components/general/server-alerts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAddressById } from "@/lib/utils/fetch-requests/ip/addresses/fetch-address-by-id";
import type { Metadata } from "next";
import { IpAddressesForm } from "../add/form";
import { fetchInterfaces } from "@/lib/utils/fetch-requests/interfaces/fetch-interfaces";

type Props = Readonly<{
  params: {
    id: string;
  };
}>;

export const metadata: Metadata = {
  // TODO: Add metadata [id]Page
};

export default async function AddressPage({ params: { id } }: Props) {
  const response = await getAddressById(id);
  const interfaces = await fetchInterfaces();
  let interfaceNames: string[] = [];
  if (interfaces.status)
    interfaceNames = interfaces.data.map((interfaceItem) => interfaceItem.name);
  if (!response.status)
    return <ServerAlerts title="Error" description={response.message} />;
  const { data } = response;
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>{data.address}</CardTitle>
        </CardHeader>
        <CardContent>
          <IpAddressesForm
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
