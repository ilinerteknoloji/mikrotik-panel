import { createResponseSchema } from "@/types";
import { z } from "zod";
import { userSchema } from "../user.schema";

export const signUpSchema = z.object({
  message: z.string(),
  user: userSchema,
});

export const signUpResponseSchema = createResponseSchema(signUpSchema);
