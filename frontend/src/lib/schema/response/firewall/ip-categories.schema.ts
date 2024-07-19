import { z } from "zod";
import { createResponseSchema } from "..";

export const ipCategorySchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ipCategoriesSchema = z.array(ipCategorySchema);

export type IpCategoriesSchema = z.infer<typeof ipCategoriesSchema>;

export const ipCategoriesResponseSchema =
  createResponseSchema(ipCategoriesSchema);
