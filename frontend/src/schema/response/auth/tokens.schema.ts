import { createResponseSchema } from "@/schema";
import { z } from "zod";

const tokenSchema = z.object({
  token: z.string(),
  expiresAt: z.number(),
});

export const tokensSchema = z.object({
  accessToken: tokenSchema,
  refreshToken: tokenSchema,
});

export const tokensResponseSchema = createResponseSchema(tokensSchema);
