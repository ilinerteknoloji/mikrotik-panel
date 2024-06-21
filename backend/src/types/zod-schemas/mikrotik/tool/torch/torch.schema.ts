import { z } from "zod";

export const torchSchema = z.object({
  ".section": z.string(),
  rx: z.string(),
  "rx-packets": z.string(),
  tx: z.string(),
  "tx-packets": z.string(),
});
