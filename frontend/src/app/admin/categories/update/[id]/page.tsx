import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import { IpCategoriesForm } from "../../_components/form";
import { fetchIpCategoryById } from "@/lib/utils/fetch-requests/categories/fetch-category-by-id";
import { ServerAlerts } from "@/components/general/server-alerts";

type Props = Readonly<{
  params: {
    id: string;
  };
}>;

export const metadata: Metadata = {
  // TODO: Add metadata [id]Page
};

export default async function IpCategoriesUpdatePage({
  params: { id },
}: Props) {
  const category = await fetchIpCategoryById(id);
  if (!category.status)
    return <ServerAlerts title="Error" description={category.message} />;
  const { data } = category;
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mx-auto w-[500px] max-w-full">
            <IpCategoriesForm type="update" id={id} category={data} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
