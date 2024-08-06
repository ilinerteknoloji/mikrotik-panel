"use server";

import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "@/lib/utils/fetch-requests";
import { RoutingBgpTemplatesAddFormSchema } from "./schema";
import { bgpTemplateResponseSchema } from "@/lib/schema/response/routing/bgp/templates";

export async function addRoutingBgpTemplate(
  values: RoutingBgpTemplatesAddFormSchema,
): Promise<FormAction<string>> {
  try {
    if (!values.disabled) delete values.disabled;
    const response = await fetchBackEnd("routing/bgp/templates", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (!response.status) throw new Error(response.message);
    const parsedData = bgpTemplateResponseSchema.parse(response.data);
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
