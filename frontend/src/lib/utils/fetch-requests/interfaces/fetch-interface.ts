"use server";

import {
  InterfaceItem,
  interfaceResponseSchema,
} from "@/lib/schema/response/interfaces";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "..";

export async function fetchInterfaceById(
  id: string,
): Promise<FormAction<InterfaceItem>> {
  try {
    const response = await fetchBackEnd(`/interface/${id}`);
    if (!response.status) throw new Error(response.message);
    const parsed = interfaceResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.response.toString());
    return { status: true, data: parsed.response };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
