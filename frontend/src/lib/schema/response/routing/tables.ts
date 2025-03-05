import { z } from "zod";
import { createResponseSchema } from "..";

export const routingTableSchema = z.object({
  ".id": z.string(),
  comment: z.string().optional(),
  disabled: z.coerce.boolean().optional(),
  dynamic: z.string().optional(),
  fib: z.string().optional(),
  invalid: z.string().optional(),
  name: z.string(),
});
export type RoutingTableSchema = z.infer<typeof routingTableSchema>;
export const routingTableResponseSchema =
  createResponseSchema(routingTableSchema);

export const routingTablesSchema = z.array(routingTableSchema);
export type RoutingTablesSchema = z.infer<typeof routingTablesSchema>;

export const routingTablesResponseSchema =
  createResponseSchema(routingTablesSchema);
