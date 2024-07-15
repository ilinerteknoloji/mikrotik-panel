import { z } from "zod";
import { tokensSchema } from "./tokens.schema";
import { createResponseSchema } from "..";
import { userSchema } from "../user/user.schema";

export const signInSchema = z.object({
  user: userSchema,
  tokens: tokensSchema,
});

export const signInResponseSchema = createResponseSchema(signInSchema);
