import { z } from "zod";

export const torchSchema = z.object({
  ".section": z.coerce.number(),
  rx: z.coerce.number(),
  "rx-packets": z.coerce.number(),
  tx: z.coerce.number(),
  "tx-packets": z.coerce.number(),
});

export type TorchSchema = z.infer<typeof torchSchema>;
