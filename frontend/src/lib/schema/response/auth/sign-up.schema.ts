import { z } from "zod";
import { createResponseSchema } from "..";
import { userSchema } from "../user/user.schema";

export const signUpSchema = z.object({
  message: z.string(),
  user: userSchema,
});

export const signUpResponseSchema = createResponseSchema(signUpSchema);
