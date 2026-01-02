import { z } from "zod";
import { createResponseSchema } from "../..";

export const bgpTemplateSchema = z.object({
  ".id": z.string(),
  ".about": z.string().optional(),
  as: z.string().optional(),
  default: z.string().optional(),
  "hold-time": z.string().optional(),
  inactive: z.string().optional(),
  name: z.string(),
  "routing-table": z.string(),
});
export type BGPTemplateSchema = z.infer<typeof bgpTemplateSchema>;
export const bgpTemplateResponseSchema =
  createResponseSchema(bgpTemplateSchema);

export const bgpTemplatesSchema = z.array(bgpTemplateSchema);
export type BGPTemplatesSchema = z.infer<typeof bgpTemplatesSchema>;
export const bgpTemplatesResponseSchema =
  createResponseSchema(bgpTemplatesSchema);
