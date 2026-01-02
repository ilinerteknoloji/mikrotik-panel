import { z } from "zod";

export const categoryFormSchema = z.object({
  category: z.string(),
});

export type CategoryFormSchema = z.infer<typeof categoryFormSchema>;
