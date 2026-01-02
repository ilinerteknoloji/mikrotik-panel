import { FormAction } from "@/lib/types";
import { IpCategoriesFormSchema } from "./schema";
import { fetchBackEnd } from "@/lib/utils/fetch-requests";
import { ipCategoriesResponseSchema } from "@/lib/schema/response/firewall/ip-categories.schema";

export async function addIpCategoryAction(
  data: IpCategoriesFormSchema,
): Promise<FormAction<string>> {
  try {
    const response = await fetchBackEnd("ip-categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.status) throw new Error(response.message);
    const parsedData = ipCategoriesResponseSchema.parse(response.data);
    if (!parsedData.status) throw new Error(parsedData.error);
    return {
      status: true,
      data: `${parsedData.response[0].title} added successfully.`,
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred.",
    };
  }
}

export async function updateIpCategoryAction(
  id: string,
  data: IpCategoriesFormSchema,
): Promise<FormAction<string>> {
  try {
    const response = await fetchBackEnd(`ip-categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    if (!response.status) throw new Error(response.message);
    return {
      status: true,
      data: `${data.title} updated successfully.`,
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred.",
    };
  }
}
