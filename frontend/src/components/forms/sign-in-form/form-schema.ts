import { regexConstants } from "@/lib/constant/regex";
import { z } from "zod";

export const signInFormSchema = z.object({
  username: z.string(),
  password: z
    .string()
    .regex(regexConstants.password[0], regexConstants.password[1]),
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;
