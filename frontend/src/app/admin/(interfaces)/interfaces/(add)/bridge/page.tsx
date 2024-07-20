import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import { BridgeForm } from "./_form/form";

type Props = Readonly<{}>;

export const metadata: Metadata = {
  // TODO: Add metadata BridgePage
};

export default async function BridgePage({}: Props) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Add a new Bridge</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-96 max-w-full">
            <BridgeForm />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
