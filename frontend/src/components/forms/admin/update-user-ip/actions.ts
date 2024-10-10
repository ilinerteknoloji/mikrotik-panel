"use server";

import { FormAction } from "@/lib/types";
import { UpdateUserIpFormSchema } from "./schama";
import { fetchBackEnd } from "@/lib/utils/fetch-requests";

export async function updateUserIpFormSubmitSchema(
  id: string,
  values: UpdateUserIpFormSchema,
): Promise<FormAction<string>> {
  try {
    const response = await fetchBackEnd(`/user-ips/${id}`, {
      method: "PATCH",
      body: JSON.stringify(values),
    });
    if (!response.status) throw new Error(response.message);
    return { status: true, data: "User IP updated successfully" };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
