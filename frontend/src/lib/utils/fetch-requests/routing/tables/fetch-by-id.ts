import {
  routingTableFormSchema,
  RoutingTableFormSchema,
} from "@/app/admin/routing/(tables)/tables/_components/add-routing-table/schema";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "../..";
import { routingTableResponseSchema } from "@/lib/schema/response/routing/tables";

export async function fetchRoutingTableById(
  id: string,
): Promise<FormAction<RoutingTableFormSchema>> {
  try {
    const response = await fetchBackEnd(`routing/tables/${id}`);
    console.log(response);

    if (!response.status) throw new Error(response.message);
    const parsed = routingTableResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.error);
    const data = routingTableFormSchema.parse({
      disabled: parsed.response.disabled,
      name: parsed.response.name,
      comment: parsed.response.comment,
      fib: undefined,
    });
    return { status: true, data };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
