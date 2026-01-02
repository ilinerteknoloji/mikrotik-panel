"use server";

import { arpsResponseSchema, ArpsSchema } from "@/lib/schema/response/ip/arp";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "../..";

export async function fetchAllArps(): Promise<FormAction<ArpsSchema>> {
  try {
    const response = await fetchBackEnd("ip/arps");
    if (!response.status) throw new Error(response.message);
    const parsed = arpsResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.error);
    return { status: true, data: parsed.response };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
