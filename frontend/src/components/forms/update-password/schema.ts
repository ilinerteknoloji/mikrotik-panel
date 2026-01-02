import { regexConstants } from "@/lib/constant/regex";
import { z } from "zod";

export const updatePasswordFormSchema = z.object({
  oldPassword: z
    .string()
    .regex(regexConstants.password[0], regexConstants.password[1]),
  newPassword: z
    .string()
    .regex(regexConstants.password[0], regexConstants.password[1]),
});

export type UpdatePasswordFormSchema = z.infer<typeof updatePasswordFormSchema>;
