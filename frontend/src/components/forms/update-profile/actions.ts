"use server";

import { env } from "@/lib/schema/env";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "@/lib/utils/fetch-requests";
import { UpdateProfileFormSchema } from "./schema";

export async function updateProfileFormSubmitAction(
  id: number,
  values: UpdateProfileFormSchema,
): Promise<FormAction<string>> {
  try {
    const response = await fetchBackEnd(`${env.BACKEND_URL}/users/${id}`, {
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
      data: "Profile updated successfully",
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
