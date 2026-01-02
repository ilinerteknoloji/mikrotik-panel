import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "..";
import {
  ipCategoriesResponseSchema,
  IpCategoriesSchema,
} from "@/lib/schema/response/firewall/ip-categories.schema";

export async function fetchAllCategories(): Promise<
  FormAction<IpCategoriesSchema>
> {
  try {
    const response = await fetchBackEnd("ip-categories");
    if (!response.status) throw new Error(response.message);
    const parsed = ipCategoriesResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.error);
    return { status: true, data: parsed.response };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
