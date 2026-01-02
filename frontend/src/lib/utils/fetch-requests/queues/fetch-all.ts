"use server";

import { Queues, queuesResponseSchema } from "@/lib/schema/response/queues";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "..";

export async function fetchAllQueues(): Promise<FormAction<Queues>> {
  try {
    const response = await fetchBackEnd("/queues");
    if (!response.status) return response;
    const parsed = queuesResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.error);
    return { status: true, data: parsed.response };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
