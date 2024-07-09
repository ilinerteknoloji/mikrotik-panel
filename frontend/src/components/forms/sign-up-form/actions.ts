"use server";

import { FormAction } from "@/lib/types";
import { SignUpFormSchema } from "./form-schema";
import { env } from "@/lib/schema/env";
import { signUpResponseSchema } from "@/lib/schema/response/auth/sign-up.schema";

export async function signUpFormSubmitAction(
  values: SignUpFormSchema,
): Promise<FormAction<undefined>> {
  try {
    const response = await fetch(`${env.BACKEND_URL}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const responseJson = await response.json();
    const parsedResponse = signUpResponseSchema.safeParse(responseJson);
    if (!parsedResponse.success) {
      throw new Error("An error occurred while parsing the response");
    } else if (!parsedResponse.data.status) {
      const message = parsedResponse.data.response.message;
      throw new Error(Array.isArray(message) ? message.join(", ") : message);
    }

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
