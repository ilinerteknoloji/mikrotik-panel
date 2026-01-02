import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchGreTunnelById } from "@/lib/utils/fetch-requests/interfaces/fetch-gre-tunnel";
import type { Metadata } from "next";
import { GreTunnelForm } from "../_form/form";

type Props = Readonly<{
  params: {
    id: string;
  };
}>;

export const metadata: Metadata = {
  // TODO: Add metadata [id]Page
};

export default async function GreTunnelUpdatePage({ params: { id } }: Props) {
  const response = await fetchGreTunnelById(id);
  if (!response.status) {
    throw new Error(response.message);
  }
  const { data } = response;
  return (
    <Card>
      <CardHeader>
        <CardTitle>GRE Tunnel {id}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mx-auto w-[500px] max-w-full">
          <GreTunnelForm type="update" id={id} formData={data} />
        </div>
      </CardContent>
    </Card>
  );
}
