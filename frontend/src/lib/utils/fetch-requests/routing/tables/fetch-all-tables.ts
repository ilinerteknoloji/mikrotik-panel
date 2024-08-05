"use server";

import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "../..";
import {
  routingTablesResponseSchema,
  RoutingTablesSchema,
} from "@/lib/schema/response/routing/tables";

export async function fetchAllTables(): Promise<
  FormAction<RoutingTablesSchema>
> {
  try {
    const response = await fetchBackEnd("routing/tables");
    if (!response.status) throw new Error(response.message);
    const parsed = routingTablesResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.error);
    return { status: true, data: parsed.response };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
