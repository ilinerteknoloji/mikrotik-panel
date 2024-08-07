"use server";

import exp from "constants";
import { IpAddressesFormSchema } from "./schema";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "@/lib/utils/fetch-requests";
import { ipAddressResponseSchema } from "@/lib/schema/response/ip/addresses";

export async function ipAddressesAddAction(
  values: IpAddressesFormSchema,
): Promise<FormAction<string>> {
  try {
    const response = await fetchBackEnd("ip/addresses", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (!response.status) throw new Error(response.message);
    const parsedData = ipAddressResponseSchema.parse(response.data);
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
