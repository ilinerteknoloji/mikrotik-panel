import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import { IpCategoriesForm } from "../_components/form";

type Props = Readonly<{}>;

export const metadata: Metadata = {
  // TODO: Add metadata AddPage
};

export default async function CategoryAddPage({}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kategori oluştur</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mx-auto w-[500px] max-w-full">
          <IpCategoriesForm />
        </div>
      </CardContent>
    </Card>
  );
}
