import { z } from "zod";

export const createResponseSchema = <T extends z.ZodTypeAny>(subSchema: T) =>
  z.discriminatedUnion("status", [responseSchema(subSchema), exceptionSchema]);

const responseSchema = <T extends z.ZodTypeAny>(subSchema: T) =>
  z.object({
    status: z.literal(true),
    statusCode: z.number(),
    path: z.string(),
    response: subSchema,
  });

const exceptionSchema = z.object({
  status: z.literal(false),
  statusCode: z.number(),
  path: z.string(),
  error: z.string(),
  response: z.union([
    z.object({
      message: z.union([z.string(), z.array(z.string())]),
      error: z.string(),
      statusCode: z.number(),
    }),
    z.string(),
  ]),
});
