import { z } from "zod";

export const routingTableFormSchema = z.object({
  disabled: z.boolean().optional(),
  name: z.string().optional(),
  comment: z.string().optional(),
  fib: z.boolean().optional(),
});

export type RoutingTableFormSchema = z.infer<typeof routingTableFormSchema>;
