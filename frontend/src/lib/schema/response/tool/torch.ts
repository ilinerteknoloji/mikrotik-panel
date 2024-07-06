import { z } from "zod";
import { createResponseSchema } from "..";

export const torchDataItemSchema = z.object({
  ".section": z.coerce.number(),
  rx: z.coerce.number(),
  "rx-packets": z.coerce.number(),
  tx: z.coerce.number(),
  "tx-packets": z.coerce.number(),
});

export const torchDataSchema = z.array(torchDataItemSchema);

export const torchSchema = z.object({
  name: z.string(),
  torchData: torchDataSchema,
});

export const torchResponseSchema = createResponseSchema(torchSchema);
