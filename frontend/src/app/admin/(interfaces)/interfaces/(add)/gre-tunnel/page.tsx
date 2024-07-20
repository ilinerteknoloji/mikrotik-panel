import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";

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
        <CardContent></CardContent>
      </Card>
    </section>
  );
}
