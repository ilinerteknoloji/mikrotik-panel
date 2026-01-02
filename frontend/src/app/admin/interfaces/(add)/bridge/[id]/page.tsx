import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import { BridgeForm } from "../_form/form";
import { fetchInterfaceById } from "@/lib/utils/fetch-requests/interfaces/fetch-interface";
import { bridgeFormSchema } from "../_form/schema";

type Props = Readonly<{
  params: {
    id: string;
  };
}>;

export const metadata: Metadata = {
  // TODO: Add metadata [id]Page
};

export default async function BridgeIdPage({ params: { id } }: Props) {
  const response = await fetchInterfaceById(id);
  if (!response.status) {
    throw new Error(response.message);
  }
  const data = bridgeFormSchema.parse({
    ...response.data,
    mtu: response.data.mtu === "auto" ? "" : response.data.mtu,
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bridge {id}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mx-auto w-[500px] max-w-full">
          <BridgeForm type="update" id={id} formData={data} />
        </div>
      </CardContent>
    </Card>
  );
}
