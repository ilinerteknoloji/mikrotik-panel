"use server";

import {
  queueFormSchema,
  QueueFormSchema,
} from "@/app/admin/(queues)/queues/add/_form/schema";
import { queueItemResponseSchema } from "@/lib/schema/response/queues";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "..";

export async function getQueueById(
  id: string,
): Promise<FormAction<QueueFormSchema>> {
  try {
    const response = await fetchBackEnd(`/queues/${id}`);
    if (!response.status) throw new Error(response.message);
    const parsed = queueItemResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error("Queue not found");
    const queueParsed = queueFormSchema.parse({
      name: parsed.response.name,
      target: parsed.response.target,
      maxLimit: parsed.response["max-limit"],
      limitAt: parsed.response["limit-at"],
      priority: parsed.response.priority.split("/")[0],
    });
    return { status: true, data: queueParsed };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
