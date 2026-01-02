import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchIpIpTunnelById } from "@/lib/utils/fetch-requests/interfaces/fetch-ipip-tunnel-by-id";
import type { Metadata } from "next";
import { IpUpTunnelForm } from "../_form/form";

type Props = Readonly<{
  params: {
    id: string;
  };
}>;

export const metadata: Metadata = {
  // TODO: Add metadata [id]Page
};

export default async function IpIpUpdatePage({ params: { id } }: Props) {
  const response = await fetchIpIpTunnelById(id);
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
          <IpUpTunnelForm type="update" id={id} formData={data} />
        </div>
      </CardContent>
    </Card>
  );
}
