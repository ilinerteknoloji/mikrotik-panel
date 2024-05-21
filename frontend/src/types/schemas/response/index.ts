import { z } from "zod";

export const responseSchema = z.object({
  status: z.boolean(),
  statusCode: z.number(),
  response: z.object({}),
});
