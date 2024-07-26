import { z } from "zod";

export const rDnsHostForm = z.object({
  host: z.string().min(1),
});

export type RDnsHostForm = z.infer<typeof rDnsHostForm>;
