import { z } from "zod";

export const ipCategoriesFormSchema = z.object({
  title: z.string(),
  description: z.string().default(""),
  status: z.coerce.boolean().default(true),
});

export type IpCategoriesFormSchema = z.infer<typeof ipCategoriesFormSchema>;
