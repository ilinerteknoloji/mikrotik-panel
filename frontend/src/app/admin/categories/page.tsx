import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchAllCategories } from "@/lib/utils/fetch-requests/categories/fetch-all-categories";
import { ClientSideTable } from "@/components/general/cliend-side-data-table";
import { ipCategoriesColumns } from "./column";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = Readonly<{}>;

export const metadata: Metadata = {
  // TODO: Add metadata CategoriesPage
};

export default async function CategoriesPage({}: Props) {
  const response = await fetchAllCategories();

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Kategoriler</CardTitle>
          <CardDescription>
            Kategorileri yönetin. Kategoriyi açmak için &quot;Aç&quot; düğmesine
            tıklayın
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-stretch justify-center gap-4 md:flex-row md:items-center md:justify-between">
            <Link href="/admin/categories/add">
              <Button type="button" variant="default" size="icon">
                <Plus />
              </Button>
            </Link>
          </div>

          <div className="flex flex-1 flex-col items-stretch justify-center gap-4">
            <ClientSideTable
              data={response.status ? response.data : []}
              columns={ipCategoriesColumns}
            />
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </section>
  );
}
