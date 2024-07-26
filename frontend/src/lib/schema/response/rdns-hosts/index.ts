import { z } from "zod";
import { createResponseSchema } from "..";

export const rDnsHostSchema = z.object({
  id: z.number(),
  hostname: z.string(),
  status: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const rDnsHostsSchema = z.array(rDnsHostSchema);
export const rDnsHostsResponseSchema = createResponseSchema(rDnsHostsSchema);
export type RDnsHosts = z.infer<typeof rDnsHostsSchema>;
