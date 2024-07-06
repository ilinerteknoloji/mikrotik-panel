import { z } from "zod";
import { userSchema } from "../user.schema";
import { createResponseSchema } from "..";

export const signUpSchema = z.object({
  message: z.string(),
  user: userSchema,
});

export const signUpResponseSchema = createResponseSchema(signUpSchema);
