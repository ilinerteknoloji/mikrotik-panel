import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import { GreTunnelForm } from "./_form/form";

type Props = Readonly<{}>;

export const metadata: Metadata = {
  // TODO: Add metadata Gre-tunnelPage
};

export default async function GRETunnelPage({}: Props) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Add a new GRE Tunnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mx-auto w-[500px] max-w-full">
            <GreTunnelForm />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
