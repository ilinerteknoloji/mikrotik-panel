import { z } from "zod";
import { userSchema } from "../user.schema";
import { tokensSchema } from "./tokens.schema";
import { createResponseSchema } from "..";

export const signInSchema = z.object({
  user: userSchema,
  tokens: tokensSchema,
});

export const signInResponseSchema = createResponseSchema(signInSchema);
