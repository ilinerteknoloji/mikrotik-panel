"use server";

import { queueItemResponseSchema } from "@/lib/schema/response/queues";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "@/lib/utils/fetch-requests";
import { QueueFormSchema } from "./schema";

export async function addQueue(
  values: QueueFormSchema,
): Promise<FormAction<string>> {
  try {
    values.priority = values.priority - 1;
    const response = await fetchBackEnd("queues", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (!response.status) return response;
    const parsedData = queueItemResponseSchema.parse(response.data);
    if (!parsedData.status) throw new Error(parsedData.error);
    return {
      status: true,
      data: `${parsedData.response.name} added successfully.`,
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred.",
    };
  }
}

export async function updateQueue(
  id: string,
  values: QueueFormSchema,
): Promise<FormAction<string>> {
  try {
    const response = await fetchBackEnd(`queues/${id}`, {
      method: "PATCH",
      body: JSON.stringify(values),
    });
    if (!response.status) return response;
    const parsedData = queueItemResponseSchema.parse(response.data);
    if (!parsedData.status) throw new Error(parsedData.error);
    return {
      status: true,
      data: `${parsedData.response.name} updated successfully.`,
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred.",
    };
  }
}
