"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { getQueueById } from "@/lib/utils/fetch-requests/queues/get-queue-by-id";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { QueueForm } from "../../../queues/add/_form/form";
import { QueueFormSchema } from "../../../queues/add/_form/schema";

type Props = Readonly<{
  params: {
    id: string;
  };
}>;

export default function QueuesSheetPage({ params: { id } }: Props) {
  const router = useRouter();
  const [queue, setQueue] = useState<QueueFormSchema>();
  const { toast } = useToast();

  useEffect(() => {
    async function getData() {
      const response = await getQueueById(id);
      if (response.status) return setQueue(response.data);
      toast({
        title: "Error",
        description: response.message,
      });
    }
    getData();
  }, [id, toast]);

  const handleOpenChange = () => router.back();

  return (
    <Sheet defaultOpen open onOpenChange={handleOpenChange}>
      <SheetContent className="lg:min-w-[750px]">
        <SheetHeader>
          <SheetTitle>
            {queue ? queue.name : <LoaderCircle className="animate-spin" />}
          </SheetTitle>
        </SheetHeader>

        {queue ? (
          <QueueForm type="update" id={id} formData={queue} />
        ) : (
          <LoaderCircle className="animate-spin" />
        )}
      </SheetContent>
    </Sheet>
  );
}
