import { regexConstants } from "@/lib/constant/regex";
import { z } from "zod";

export const signUpFormSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  username: z.string().min(3).max(50),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  password: z
    .string()
    .regex(regexConstants.password[0], regexConstants.password[1]),
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
