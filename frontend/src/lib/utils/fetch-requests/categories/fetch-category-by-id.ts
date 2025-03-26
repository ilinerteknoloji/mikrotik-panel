import { IpCategoriesFormSchema } from "@/app/admin/categories/_components/schema";
import {
  ipCategoriesResponseSchema,
  ipCategoryResponseSchema,
} from "@/lib/schema/response/firewall/ip-categories.schema";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "..";

export async function fetchIpCategoryById(
  id: string,
): Promise<FormAction<IpCategoriesFormSchema>> {
  try {
    const response = await fetchBackEnd(`ip-categories/${id}`);
    if (!response.status) throw new Error(response.message);
    const parsed = ipCategoriesResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.error);
    return { status: true, data: parsed.response[0] };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
