import { createResponseSchema } from "@/schema";
import { z } from "zod";

const addressListSchema = z.object({
  id: z.number(),
  userId: z.number(),
  ip: z.string(),
  status: z.boolean(),
  mikrotikId: z.string(),
  category: z.string(),
  categoryId: z.number(),
});

export const addressListsSchema = z.array(addressListSchema);

export const addressListsResponseSchema =
  createResponseSchema(addressListsSchema);
