import { regex } from "@/lib/constant";
import { z } from "zod";

export const signInFormSchema = z.object({
  username: z.string(),
  password: z.string().regex(regex.password[0], regex.password[1]),
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;
