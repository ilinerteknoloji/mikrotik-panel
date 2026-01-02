import { FormAction } from "@/lib/types";
import { UpdateUserDetailsFormSchema } from "./schema";
import { fetchBackEnd } from "@/lib/utils/fetch-requests";

export async function updateUserDetailsFormSubmitAction(
  id: number,
  values: UpdateUserDetailsFormSchema,
): Promise<FormAction<string>> {
  try {
    if (values.password === "") {
      delete values.password;
    }
    const response = await fetchBackEnd(`/users/admin/${id}`, {
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
      data: "Kullanıcı başarıyla güncellendi",
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
