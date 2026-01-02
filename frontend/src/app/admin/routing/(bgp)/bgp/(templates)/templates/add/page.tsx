import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import { RoutingBGPTemplateAddForm } from "./form";

type Props = Readonly<{}>;

export const metadata: Metadata = {
  // TODO: Add metadata AddPage
};

export default async function RoutingBGPTemplatesAddPage({}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create BGP Template</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mx-auto w-[500px] max-w-full">
          <RoutingBGPTemplateAddForm />
        </div>
      </CardContent>
    </Card>
  );
}
