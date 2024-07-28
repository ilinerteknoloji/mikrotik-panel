import { z } from "zod";
import { createResponseSchema } from "..";

export const rDnsRecord = z.object({
  id: z.string(),
  type: z.string(),
  host: z.string(),
  record: z.string(),
  failover: z.string(),
  ttl: z.string(),
  status: z.number(),
  domainName: z.string(),
});
export const rDnsRecords = z.array(rDnsRecord);
export const rDnsRecordsResponseSchema = createResponseSchema(rDnsRecords);
export type RDnsRecords = z.infer<typeof rDnsRecords>;
