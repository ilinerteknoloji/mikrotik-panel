"use server";

import { FormAction } from "@/lib/types";
import { ArpFormSchema } from "./schema";
import { fetchBackEnd } from "@/lib/utils/fetch-requests";
import { arpResponseSchema } from "@/lib/schema/response/ip/arp";

export async function arpAddAction(
  values: ArpFormSchema,
): Promise<FormAction<string>> {
  try {
    const response = await fetchBackEnd("ip/arps", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (!response.status) throw new Error(response.message);
    const parsedData = arpResponseSchema.parse(response.data);
    if (!parsedData.status) throw new Error(parsedData.error);
    return {
      status: true,
      data: `${parsedData.response.address} added successfully.`,
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred.",
    };
  }
}
