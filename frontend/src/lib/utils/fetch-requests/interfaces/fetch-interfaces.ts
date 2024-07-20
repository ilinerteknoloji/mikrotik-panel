"use server";

import { env } from "@/lib/schema/env";
import {
  InterfaceItem,
  interfacesResponseSchema,
} from "@/lib/schema/response/interfaces";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "..";

export async function fetchInterfaces(): Promise<
  FormAction<Array<InterfaceItem>>
> {
  try {
    const response = await fetchBackEnd(`${env.BACKEND_URL}/interface`);
    if (!response.status) throw new Error(response.message);
    const parsed = interfacesResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.error);
    return { status: true, data: parsed.response };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
