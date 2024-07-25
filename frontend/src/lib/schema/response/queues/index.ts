import { z } from "zod";
import { createResponseSchema } from "..";

export const queueItemSchema = z.object({
  ".id": z.string(),
  "bucket-size": z.string(),
  "burst-limit": z.string(),
  "burst-threshold": z.string(),
  "burst-time": z.string(),
  bytes: z.string(),
  disabled: z.union([z.string(), z.boolean()]),
  dropped: z.string(),
  dynamic: z.union([z.string(), z.boolean()]),
  invalid: z.union([z.string(), z.boolean()]),
  "limit-at": z.string(),
  "max-limit": z.string(),
  name: z.string(),
  "packet-marks": z.string().optional(),
  "packet-rate": z.string(),
  packets: z.string(),
  parent: z.string(),
  priority: z.string(),
  queue: z.string(),
  "queued-bytes": z.string(),
  "queued-packets": z.string(),
  rate: z.string(),
  target: z.string(),
  "total-bytes": z.string(),
  "total-dropped": z.string(),
  "total-packet-rate": z.string(),
  "total-packets": z.string(),
  "total-queued-bytes": z.string(),
  "total-queued-packets": z.string(),
  "total-rate": z.string(),
});
export type QueueItem = z.infer<typeof queueItemSchema>;
export const queuesSchema = z.array(queueItemSchema);
export type Queues = z.infer<typeof queuesSchema>;
export const queuesResponseSchema = createResponseSchema(queuesSchema);
