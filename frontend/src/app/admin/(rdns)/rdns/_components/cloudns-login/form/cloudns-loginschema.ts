import { z } from "zod";

export const cloudnsLoginFormSchema = z.object({
  id: z.string().min(1),
  password: z.string().min(1),
});

export type CloudnsLoginFormSchema = z.infer<typeof cloudnsLoginFormSchema>;
