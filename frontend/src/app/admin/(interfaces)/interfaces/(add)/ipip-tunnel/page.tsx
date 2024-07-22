import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import { IpUpTunnelForm } from "./_form/form";

type Props = Readonly<{}>;

export const metadata: Metadata = {
  // TODO: Add metadata Ipip-tunnelPage
};

export default async function IpIpTunnelPage({}: Props) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Add a new Ip Ip Tunnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mx-auto w-[500px] max-w-full">
            <IpUpTunnelForm />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
