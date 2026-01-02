"use server";

import { fetchBackEnd } from "@/lib/utils/fetch-requests";
import { RoutingTableFormSchema } from "./schema";
import { routingTableResponseSchema } from "@/lib/schema/response/routing/tables";
import { FormAction } from "@/lib/types";

export async function addRoutingTable(
  values: RoutingTableFormSchema,
): Promise<FormAction<string>> {
  try {
    if (!values.disabled) delete values.disabled;
    const response = await fetchBackEnd("routing/tables", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (!response.status) throw new Error(response.message);
    const parsedData = routingTableResponseSchema.parse(response.data);
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

export async function updateRoutingTable(
  id: string,
  values: RoutingTableFormSchema,
): Promise<FormAction<string>> {
  try {
    if (!values.disabled) delete values.disabled;
    const response = await fetchBackEnd(`routing/tables/${id}`, {
      method: "PATCH",
      body: JSON.stringify(values),
    });
    if (!response.status) throw new Error(response.message);
    const parsedData = routingTableResponseSchema.parse(response.data);
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
