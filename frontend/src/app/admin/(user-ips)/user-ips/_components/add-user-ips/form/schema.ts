import { createResponseSchema } from "@/lib/schema/response";
import { z } from "zod";

export const addUserIpsSchema = z.object({
  userId: z.string(),
  ips: z.string(),
});

export type AddUserIpsSchema = z.infer<typeof addUserIpsSchema>;

export const addUserIpsResponseSchema = createResponseSchema(
  z.object({
    created: z.array(z.string()),
    errors: z.array(z.string()),
  }),
);
