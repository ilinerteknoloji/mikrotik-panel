"use server";

import { interfaceResponseSchema } from "@/lib/schema/response/interfaces";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "@/lib/utils/fetch-requests";
import { BridgeFormSchema } from "./schema";

export async function addBridge(
  values: BridgeFormSchema,
): Promise<FormAction<string>> {
  try {
    const response = await fetchBackEnd("interface/bridge", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (!response.status) throw new Error(response.message);
    const parsedData = interfaceResponseSchema.parse(response.data);
    if (!parsedData.status) throw new Error(parsedData.response.error);
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
