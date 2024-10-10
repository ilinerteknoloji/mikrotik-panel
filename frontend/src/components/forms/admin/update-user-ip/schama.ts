import { z } from "zod";

export const updateUserIpFormSchema = z.object({
  status: z.boolean(),
});

export type UpdateUserIpFormSchema = z.infer<typeof updateUserIpFormSchema>;
