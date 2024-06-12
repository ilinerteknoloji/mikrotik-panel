import { FormAction } from "@/types";
import { SignUpFormSchema } from "./form-schema";

export async function signUpFormSubmitAction(
  values: SignUpFormSchema,
): Promise<FormAction<undefined>> {
  try {
    const response = await fetch(`/api/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const responseJson = await response.json();
    if (!response.ok)
      return {
        status: false,
        message: Array.isArray(responseJson.message)
          ? responseJson.message.join(", ")
          : responseJson.message,
      };
    return {
      status: true,
      data: responseJson,
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
