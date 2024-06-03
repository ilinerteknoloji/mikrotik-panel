"use server";

import { SignUpFormSchema } from "./form-schema";

export const signUpFormSubmitAction = async (values: SignUpFormSchema) => {
  const response = await fetch(`/api/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  return response;
};
