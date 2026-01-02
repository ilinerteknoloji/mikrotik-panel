import { z } from "zod";

export const rDnsRecordSchema = z.object({
  record: z.string(),
});

export type RDnsRecordSchema = z.infer<typeof rDnsRecordSchema>;
