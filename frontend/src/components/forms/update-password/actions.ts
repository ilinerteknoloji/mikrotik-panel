"use server";

import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "@/lib/utils/fetch-requests";
import { UpdatePasswordFormSchema } from "./schema";

export async function updatePasswordFormSubmitAction(
  id: number,
  values: UpdatePasswordFormSchema,
): Promise<FormAction<string>> {
  try {
    const response = await fetchBackEnd(`/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (!response.status) {
      throw new Error(response.message);
    }
    return {
      status: true,
      data: "Şifre başarıyla güncellendi",
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
