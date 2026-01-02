import { z } from "zod";

export const queueFormSchema = z.object({
  name: z.string().optional(),
  target: z.string(),
  maxLimit: z
    .string()
    .regex(/^(0|[1-9]\d*([KMGT]?)\/(0|[1-9]\d*([KMGT]?)))/, {
      message: "Invalid max limit format",
    })
    .optional(),
  limitAt: z
    .string()
    .regex(/^(0|[1-9]\d*([KMGT]?)\/(0|[1-9]\d*([KMGT]?)))/, {
      message: "Invalid limit at format",
    })
    .optional(),
  priority: z.coerce.number().int().min(1).max(8),
});

export type QueueFormSchema = z.infer<typeof queueFormSchema>;
