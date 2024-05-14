import parsePhoneNumber from "libphonenumber-js";
import { z } from "zod";

export function filterSignInValueType(
  username: string,
): "username" | "email" | "phoneNumber" {
  const emailValidation = z.string().email().safeParse(username);
  const phoneNumberValidation = z
    .string()
    .transform((value) =>
      parsePhoneNumber(value, { defaultCountry: "TR", extract: true }),
    )
    .safeParse(username);
  if (emailValidation.success) {
    return "email";
  } else if (
    phoneNumberValidation.success &&
    phoneNumberValidation.data.nationalNumber.length >= 9
  ) {
    return "phoneNumber";
  }
  return "username";
}
