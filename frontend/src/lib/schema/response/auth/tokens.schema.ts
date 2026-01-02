import { z } from "zod";
import { createResponseSchema } from "..";

const tokenSchema = z.object({
  token: z.string(),
  expiresAt: z.number(),
});

export const tokensSchema = z.object({
  accessToken: tokenSchema,
  refreshToken: tokenSchema,
});

export const tokensResponseSchema = createResponseSchema(tokensSchema);
