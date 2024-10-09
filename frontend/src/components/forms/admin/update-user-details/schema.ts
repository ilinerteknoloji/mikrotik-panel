import { regexConstants } from "@/lib/constant/regex";
import { z } from "zod";

export const updateUserDetailsFormSchema = z.object({
  password: z
    .string()
    .refine(
      (data) => {
        if (data.length === 0) return true;
        const isValid = z
          .string()
          .regex(regexConstants.password[0], regexConstants.password[1])
          .safeParse(data);
        return isValid.success;
      },
      {
        message: regexConstants.password[1],
      },
    )
    .optional(),
  role: z.enum(["admin", "user"]),
  status: z.coerce.boolean(),
});

export type UpdateUserDetailsFormSchema = z.infer<
  typeof updateUserDetailsFormSchema
>;
