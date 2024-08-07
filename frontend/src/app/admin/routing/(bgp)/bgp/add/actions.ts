"use server";

import { FormAction } from "@/lib/types";
import { CreateBgpConnectionFormSchema } from "./schema";
import { bgpConnectionResponseSchema } from "@/lib/schema/response/routing/bgp/connections";
import { fetchBackEnd } from "@/lib/utils/fetch-requests";

export async function addRoutingBgpConnection(
  values: CreateBgpConnectionFormSchema,
): Promise<FormAction<string>> {
  try {
    const response = await fetchBackEnd("routing/bgp/connection", {
      method: "POST",
      body: JSON.stringify({
        ...values,
        allowedAs: values?.allowedAs?.split(",").map((as) => +as.trim()),
      }),
    });
    if (!response.status) throw new Error(response.message);
    const parsedData = bgpConnectionResponseSchema.parse(response.data);
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
