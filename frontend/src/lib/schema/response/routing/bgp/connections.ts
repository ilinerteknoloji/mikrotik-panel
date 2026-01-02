import { z } from "zod";
import { createResponseSchema } from "../..";

export const bgpConnectionSchema = z.object({
  ".about": z.string().optional(),
  ".id": z.string(),
  as: z.coerce.number(),
  connect: z.coerce.boolean(),
  inactive: z.coerce.boolean(),
  listen: z.coerce.boolean(),
  "local.address": z.string(),
  "local.port": z.coerce.number(),
  "local.role": z.enum([
    "ebgp",
    "ebgp-customer",
    "ebgp-peer",
    "ebgp-provider",
    "ebgp-rs",
    "ebgp-rs-client",
    "ibgp",
    "ibgp-rr",
    "ibgp-rr-client",
  ]),
  name: z.string(),
  "remote.address": z.string(),
  "remote.port": z.coerce.number(),
  "routing-table": z.string(),
  templates: z.string(),
});
export type BGPConnectionSchema = z.infer<typeof bgpConnectionSchema>;
export const bgpConnectionResponseSchema =
  createResponseSchema(bgpConnectionSchema);

export const bgpConnectionsSchema = z.array(bgpConnectionSchema);
export type BGPConnectionsSchema = z.infer<typeof bgpConnectionsSchema>;
export const bgpConnectionsResponseSchema =
  createResponseSchema(bgpConnectionsSchema);
