import { ServerAlerts } from "@/components/general/server-alerts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getQueueById } from "@/lib/utils/fetch-requests/queues/get-queue-by-id";
import type { Metadata } from "next";
import { QueueForm } from "../add/_form/form";

type Props = Readonly<{
  params: {
    id: string;
  };
}>;

export const metadata: Metadata = {
  // TODO: Add metadata [id]Page
};

export default async function QueueItemPage({ params: { id } }: Props) {
  const response = await getQueueById(id);
  if (!response.status)
    return <ServerAlerts title="Error" description={response.message} />;
  const { data } = response;

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>{id} Page</CardTitle>
        </CardHeader>
        <CardContent>
          <QueueForm type="update" id={id} formData={data} />
        </CardContent>
      </Card>
    </section>
  );
}
